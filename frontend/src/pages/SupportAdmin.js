import React,{useEffect,useState} from 'react';
import './Dashboard.css';
import { SideDataAdmin } from './SideData';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios'
import CallIcon from '@mui/icons-material/Call';

import {useSelector} from "react-redux";



export default function SupportAdmin() {

  const [data,setData]=useState([]);
  const {user,loggedin} = useSelector(state=>state.user);
  useEffect(()=>{
    axios.get('/api/orders')
        .then(response => {
            console.log(response)
            setData(response.data)
        })
   },[])
  return (
    <div className="divid">
    <div className="sidebar">
      <div className="image">
        <div className="img">
          <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
        </div>
        <div className="top-heading">{!loggedin ? "new user":user.name}</div>
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

      <ul>
              <div className='support'>
                <h3>Stay Connected</h3>
                <h5 >For More information, you can connect our Chief Engineer</h5>
                <h4 >Mr. Talwar Veera </h4>
                <h4>  <CallIcon/> 9876543210</h4>
              </div>
        </ul>
    </div>

    </div>
  );
}
