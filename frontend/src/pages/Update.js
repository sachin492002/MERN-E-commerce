import React, { useState} from 'react';
// import './UpdatePage.css';
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../context/userSlice";


const UpdatePage = () => {

  const dispatch = useDispatch();
  const {user,loggedin,token} = useSelector(state=>state.user);
  console.log(user.email);
  const [formData, setFormData] = useState({
    email: user?.email,
    field: 'name',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/userUpdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),

      });
      console.log(response);
      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(updateUser(updatedUser.result));
      }
    else {
        alert("Invalid Password");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="max-w-4xl p-6 mx-auto bg-[var(--clr-white)] rounded-md shadow-md  mt-20">
      <h2 className='text-2xl font-bold text-[var(--clr-primary-5)] capitalize'>Update Your Information</h2>
      <form onSubmit={handleSubmit} className="formhk">
      <div className="select-container">
        <label htmlFor="select-field" className='block text-sm font-medium text-[var(--clr-primary-5)]'>Select Field to Update:</label>
        <select id="select-field" name="field"  placeholder='field' className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring' value={formData.field} onChange={handleInputChange}>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="mobile">Mobile No</option>
          <option value="address">Address</option>
          <option value="pincode">Pincode</option>
        </select>
      </div>

      {formData.field === "password" ? (
        <>
        <div className="form-group">
          <label htmlFor="new-password" className='block text-sm font-medium text-[var(--clr-primary-5)]'>New Password</label>
          <input
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring"
            type="password"
            id="new-password"
            name="newvalue"
            value={formData.newvalue}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password" className='block text-sm font-medium text-[var(--clr-primary-5)]'>Confirm Password</label>
          <input
            type="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring"
            id="confirm-password"
            name="confirmPassword"
            value={formData.newvalue}
            onChange={handleInputChange}
            required
          />
        </div>
        </>
      ) : formData.field === "email" ? (
        <div className="form-group">
          <label htmlFor="new-email" className='block text-sm font-medium text-[var(--clr-primary-5)]'>New Email</label>
          <input
            type="email"
            id="new-email"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring"
            name="newvalue"
            value={formData.newvalue}
            onChange={handleInputChange}
            required
          />
        </div>
      ) : formData.field === "mobile" ? (
        <div className="form-group">
          <label htmlFor="mobile" className='block text-sm font-medium text-[var(--clr-primary-5)]'>New Mobile No</label>
          <input
            type="tel"
            id="mobile"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring"
            name="newvalue"
            value={formData.newvalue}
            onChange={handleInputChange}
            required
          />
        </div>
      ) : formData.field === "pincode" ? (
        <div className="form-group">
          <label htmlFor="mobile" className='block text-sm font-medium text-[var(--clr-primary-5)]'>New Pincode</label>
          <input
            type="number"
            id="pincode"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring"
            name="newvalue"
            value={formData.newvalue}
            onChange={handleInputChange}
            required
          />
        </div> ) : (

      <div className="form-group">
          <label htmlFor="newvalue" className='block text-sm font-medium text-[var(--clr-primary-5)]'>New {formData.field}</label>
          <input
            type="text"
            id="newvalue"
            name="newvalue"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring"
            value={formData.newvalue}
            onChange={handleInputChange}
            required
          />
        </div>
      )}


        <div className="form-group">
          <label htmlFor="password" className='block text-sm font-medium text-[var(--clr-primary-5)]'>Original Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring"
            value={formData.confirmpassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='flex items-center justify-center h-20'>
        <button type="submit" className="px-6  text-center py-2 leading-5 text-[var(--clr-primary-5)] transition-colors duration-200 transform bg-[var(--clr-grey-1)] rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Update</button>
        </div>
        
      </form>
    </div>
  );
};

export default UpdatePage;
