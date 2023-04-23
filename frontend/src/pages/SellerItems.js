import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { SideData } from "./SideData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";



export default function SellerItems() {
 
  const [value, changeValue] = useState({company:localStorage.getItem("Name")});
  const [items, changeItems] = useState([]);

  function loadData(event) {
    //fetch daata from blocked
    event.preventDefault();
    fetch("http://localhost:3001/load-items-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data)
        changeItems(resData.data)
      })
      .catch((err) => console.log(err));
    
  }


  return (
    <div className="divid">
      <div className="sidebar">
        <div className="image">
        <div className="imghk">
            <img
              src={localStorage.getItem("ProfilePicUrl")}
              alt="Profile Pic"  
              className="imghk"
            />
          </div>
          <div className="top-heading">
            {localStorage.getItem("loggedIn") === null
              ? "new user"
              : localStorage.getItem("Name")}
          </div>
        </div>
        <hr className="hr" />
        <ul className="sidebar-list">
          {SideData.map((val, key) => {
            return (
              <li
                id={window.location.pathname == val.link ? "active" : ""}
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
        <button className="btn" onClick={loadData}>
          My Items
        </button>
        <div className="blkdiv">
          {items?.map((item) => {
            return <h5 className="blkfld">{item.name} Rs.{item.price}</h5>; 
          })}
        </div>
      </div>
    </div>
  );
}
