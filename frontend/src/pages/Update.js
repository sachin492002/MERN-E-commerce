import React, { useState} from 'react';
import './UpdatePage.css';
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../context/userSlice";


const UpdatePage = () => {

  const dispatch = useDispatch();
  const {user,loggedin} = useSelector(state=>state.user);
  const [formData, setFormData] = useState({
    email: user.email,
    field: 'name',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // console.log(formData);
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    console.log(formData);

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/userUpdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(updateUser(updatedUser.result));
      }
    else {
        alert("Invalid Password");
      }
    } catch (error) {
      console.log(error);
      // TODO: Add logic to display error message to user
    }
  };


  return (
    <div className="update-page-container">
      <h2>Update Your Information</h2>


      <form onSubmit={handleSubmit} className="formhk">
      <div className="select-container">
        <label htmlFor="select-field">Select Field to Update:</label>
        <select id="select-field" name="field" value={formData.field} onChange={handleInputChange}>
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
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            name="newvalue"
            value={formData.newvalue}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
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
          <label htmlFor="new-email">New Email</label>
          <input
            type="email"
            id="new-email"
            name="newvalue"
            value={formData.newvalue}
            onChange={handleInputChange}
            required
          />
        </div>
      ) : formData.field === "mobile" ? (
        <div className="form-group">
          <label htmlFor="mobile">New Mobile No</label>
          <input
            type="tel"
            id="mobile"
            name="newvalue"
            value={formData.newvalue}
            onChange={handleInputChange}
            required
          />
        </div>
      ) : formData.field === "pincode" ? (
        <div className="form-group">
          <label htmlFor="mobile">New Pincode</label>
          <input
            type="number"
            id="pincode"
            name="newvalue"
            value={formData.newvalue}
            onChange={handleInputChange}
            required
          />
        </div> ) : (

      <div className="form-group">
          <label htmlFor="newvalue">New {formData.field}</label>
          <input
            type="text"
            id="newvalue"
            name="newvalue"
            value={formData.newvalue}
            onChange={handleInputChange}
            required
          />
        </div>
      )}


        <div className="form-group">
          <label htmlFor="password">Original Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.confirmpassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePage;
