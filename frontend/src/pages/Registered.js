import React, { useState } from "react";
import "./Dashboard.css";
import { SideDataAdmin } from "./SideData";
import {useSelector} from "react-redux";



export default function Registered() {

  const [value, changeValue] = useState([]);
  const {user,loggedin}= useSelector(state => state.user)

  function loadData() {
    //fetch daata from blocked
    fetch("/api/usersAll")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        changeValue(data);
      });
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
          {SideDataAdmin.map((val, key) => {
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
          Registered users
        </button>
        <div className="blkdiv">
          {value?.map((item) => {
            return <h5 className="blkfld">{item.name}({item.email})</h5>;
          })}
        </div>
      </div>
    </div>
  );
}
