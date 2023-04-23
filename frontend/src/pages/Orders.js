import React,{useEffect,useState} from 'react';
import { FaBeer, FaWindows } from 'react-icons/fa';
import './Dashboard.css';
import { SideData } from './SideData';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios'
import CallIcon from '@mui/icons-material/Call';

import Box from '@mui/material/Box';
import Card from './Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';



export default function Dashboard() {
 
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
      {console.log(data)}
      <ul>
         {/* {
          data.map((msg)=>(
            msg.map((msg1)=>(
              <> */}
              <div className='support'>
                <h3>Stay Connected</h3>
                <h5 >For More information, you can connect our Chief Engineer</h5>
                <h4 className='query'>Mr. Talwar Veera </h4>
                <h4>  <CallIcon/> 9876543210</h4> 
                <h3 className='query'>Your Queries will be ansewered 24X7.</h3>

              </div>
            


      {/* <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {msg1.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {msg1.amount} Pieces
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {msg1.price}RS
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
             dispatched
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={msg1.image}
        alt="hai hi nhi"
        />
    </Card> */}
              {/* </>
            ))
          ))
         } */}
        </ul>
    </div>
                
    </div>
  );
}
