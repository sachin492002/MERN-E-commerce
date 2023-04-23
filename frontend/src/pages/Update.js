import React, { useState,useContext} from 'react';
import './UpdatePage.css';
import { UserContext } from '../App.js';

const UpdatePage = ({handleDataUser}) => {
  const user =  useContext(UserContext);
  const [formData, setFormData] = useState({
    email: localStorage.getItem('Email'),
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
    // Send updated user data to backend
    try {
      const response = await fetch('http://localhost:3001/userUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        console.log('User updated:', updatedUser.result.email);
        // TODO: Add logic to display success message to user
        // handleDataUser({
        //   Name:updatedUser.name,
        //   Email:updatedUser.email,
        //   Address:updatedUser.address,
        //   Phone:updatedUser.mobile,
        //   Type:updatedUser.type,
        //   ProfilePicUrl:updatedUser.profilePicUrl,
        //   loggedIn:true
        // });
        localStorage.setItem('Email', updatedUser.result.email);
        localStorage.setItem('Name', updatedUser.result.name);
        localStorage.setItem('Phone', updatedUser.result.mobile);
        localStorage.setItem('Address', updatedUser.result.address);
        localStorage.setItem('Pincode', updatedUser.result.pincode);
      } else {
        throw new Error('Failed to update user');
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
