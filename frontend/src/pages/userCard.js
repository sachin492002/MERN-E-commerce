import React from 'react';
import './Card.css'
export default function UserCard(props) {

  function block(item){
    return fetch('http://localhost:3001/blocked', {
        method: 'POST',
        body: JSON.stringify(props.item),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((res) => res.json())
        .then((data) => console.log(props.item));
  }

  return (    
        <div className='main'>
            <h3>{props.item.email}</h3>
            <button onClick={block(props.item)}>Block</button>
                
        </div>
     
  );
}
