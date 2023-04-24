
import React, { useEffect, useState } from 'react';
import './Dashboard.css';

import { SideDataAdmin } from './SideData';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { AiOutlineInstagram } from 'react-icons/ai';
import { AiOutlineFacebook, AiOutlineTwitter } from 'react-icons/ai';
import CallIcon from '@mui/icons-material/Call';
export default function Admin() {
  const [data, setData] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  useEffect(() => {
    axios.get('https://localshopper.azurewebsites.net/api/usersBlocked').then((response) => {
      console.log("hi "+response.data.user);
      setBlocked(response.data.user);
    });
  }, []);
  const handleItemClick = (link) => {
    setSelectedItem(link);
  };
  useEffect(() => {
    axios.get('https://localshopper.azurewebsites.net/api/usersAll').then((response) => {
      console.log(response);
      setData(response.data);
    });
  }, []);

  function handleBlock(email) {
    console.log('block');
    setData(data.filter(user => user.email !== email));
    setBlocked([...blocked, data.find(user => user.email === email)]);

    fetch('https://localshopper.azurewebsites.net/api/block-user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email:email })
  })
    alert('blocked');
  }
  function handleUnBlock(email){
    setBlocked(blocked.filter(user => user.email !== email));
    setData([...data, blocked.find(user => user.email === email)]);
    console.log('Unblocked');
    fetch('https://localshopper.azurewebsites.net/api/unblock-user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email:email })
  })
    alert('Unblocked');
  }
  function handleDelete(email) {
    setData(data.filter(user => user.email !== email));
    fetch('https://localshopper.azurewebsites.net/api/delete-user', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email:email })
  })
    alert('deleted');
  }
  return (
    <div className="divid">
      <div className="sidebar">
        <div className="image">
          <div className="imghk">
            <img
              src={localStorage.getItem('ProfilePicUrl')}
              alt="Profile Pic"
              className="imghk"
            />
          </div>
          <div className="top-heading">
            {localStorage.getItem('loggedIn') === null
              ? 'new user'
              : localStorage.getItem('Name')}
          </div>
        </div>
        <hr className="hr" />
        <ul className="sidebar-list">
          {SideDataAdmin.map((val, key) => {
            return (
              <li
                id={window.location.pathname === val.link ? 'active' : ''}
                className="row"
                key={key}
                onClick={() => {
                  handleItemClick(val.link);
                }}
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            );
          })}
        </ul>
    
      </div>
        
      <div className="orders">

      {selectedItem === '/profileAdmin' && (
        <div>
            <div>
                <h1 className="upperhk">{localStorage.getItem('Name')}</h1>
                <h4>({localStorage.getItem('Type')})</h4>
              </div>
            <div className="hk">
              <div>
                <img
                  src={localStorage.getItem('ProfilePicUrl')}
                  alt="profile-Pic-Admin"
                  className="imagehk"
                />
              </div>
    
              <div className="divhk">
                <h3 className="nhk">Details:</h3>
                <h5 className="uphk">Email :</h5>
                <h5 className="downhk">{localStorage.getItem('Email')}</h5>
                <h5 className="uphk">Contact :</h5>
                <h5 className="downhk">{localStorage.getItem('Phone')}</h5>
    
                <h5 className="uphk">Address :</h5>
                <h5 className="downhk">{localStorage.getItem('Address')}</h5>
    
                <div className="iconhk">
                  <AiOutlineInstagram size="2.5rem" />
                  <AiOutlineFacebook size="2.5rem" />
                  <AiOutlineTwitter size="2.5rem" />
                </div>
              </div>
              </div>
        </div>
      )}
      {selectedItem === '/users' && (
        <ul className="user-list">
          <li className="user-item">
            <strong>Name</strong>
            <strong>Email</strong>
            <strong>Action</strong>
          </li>
          {data.map((user) => (
            <li key={user.id} className="user-item">
              <i>{user.name}</i>
              <i>{user.email}</i>
              <div classname="btnnn">
                <button
                  className="block-button"
                  onClick={() => handleBlock(user.email)}
                >
                  Block User
                </button>
                <button
                  className="block-button"
                  onClick={() => handleDelete(user.email)}
                >
                  Delete User
                </button>
              </div>
            </li>
          ))}
        </ul>)}
        {selectedItem === '/blockedUsers' && (
          <ul className="user-list">
          <li className="user-item">
            <strong>Name</strong>
            <strong>Email</strong>
            <strong>Action</strong>
          </li>
          {blocked.map((user) => (
            <li key={user.id} className="user-item">
              <i>{user.name}</i>

              <i>{user.email}</i>
              <div classname="btnnn">
                <button
                  className="block-button"
                  onClick={() => handleUnBlock(user.email)}
                >
                  Unblock User
                </button>
              </div>
            </li>))}
            </ul>
        )}
        {selectedItem === '/supportAdmin' && (
        <ul>
              <div className='support'>
                <h3>Stay Connected</h3>
                <h5 >For More information, you can connect our Chief Engineer</h5>
                <h4 >Mr. Talwar Veera </h4>
                <h4>  <CallIcon/> 9876543210</h4> 
              </div>
        </ul>   )}
      </div>
    </div>
    
  );
}
