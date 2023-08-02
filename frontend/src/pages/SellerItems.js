import React, { useState } from "react";
import "./Dashboard.css";
import { SideData } from "./SideData";
import {useSelector} from "react-redux";



export default function SellerItems() {
  const {user,loggedin} = useSelector(state=>state.user);
  const [value, changeValue] = useState({company:user.name});
  const [items, changeItems] = useState([]);

  function loadData(event) {
    //fetch daata from blocked
    event.preventDefault();
    fetch("/api/load-items-user", {
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
              src={user.profilePicUrl}
              alt="Profile Pic"
              className="imghk"
            />
          </div>
          <div className="top-heading">
            {!loggedin
              ? "new user"
              : user.name}
          </div>
        </div>
        <hr className="hr" />
        <ul className="sidebar-list">
          {SideData.map((val, key) => {
            return (
              <li
                id={window.location.pathname === val.link ? "active" : ""}
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
