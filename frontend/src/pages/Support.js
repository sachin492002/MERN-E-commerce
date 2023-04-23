import React,{useEffect,useState} from 'react';
import './Dashboard.css';
import { SideData } from './SideData';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios'
import CallIcon from '@mui/icons-material/Call';

export default function Support() {
 
  const [data,setData]=useState([]);
  
  useEffect(()=>{
    axios.get('http://localhost:3001/orders')
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
        <div className="top-heading">{localStorage.getItem('loggedIn')===null?"new user":localStorage.getItem('Name')}</div>
      </div>
      <hr className="hr" />
      <ul className="sidebar-list">
        {SideData.map((val, key) => {
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
      {console.log(data)}
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
