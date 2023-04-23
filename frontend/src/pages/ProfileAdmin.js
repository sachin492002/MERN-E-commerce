import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { SideDataAdmin } from './SideData';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { AiOutlineInstagram } from 'react-icons/ai';
import { AiOutlineFacebook, AiOutlineTwitter } from 'react-icons/ai';

export default function ProfileAdmin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/orders').then((response) => {
      console.log(response);
      setData(response.data);
    });
  }, []);
  return (
    <div className="divid">
      <div className="sidebar">
        <div className="image">
          <div className="img">
            <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
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
                id={window.location.pathname == val.link ? 'active' : ''}
                className="row"
                key={key}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            );
          })}
        </ul>
        <div className="boxer">
          <div id="pro">UPGRADE TO PRO</div>
        </div>
      </div>

      <div className="orders">
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
    </div>
  );
}
