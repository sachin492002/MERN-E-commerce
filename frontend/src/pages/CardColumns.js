import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CardColumns.css";

export default function ColumnCard(props) {
  let price = 0;

  return (
    <div className="row">
      <div className="column">
        <div className="card">
          <img
            className="card-image"
            src={props?.items[0].image}
            alt={props?.items[0]?.name}
          />
          <div className="card-items">
            {props?.items.map((item) => {
              price += item.price;
              return (
                <div className="item" key={item.id}>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              );
            })}
          </div>
            <div className="total">Total = {price}</div>
        </div>
      </div>
    </div>
  );
}
