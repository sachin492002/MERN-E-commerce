import React, { useState } from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import Confirm from "./Confirm";






const Feed = ({handlefeeds}) => {
    const [inputs, setInputs] = useState({mail:localStorage.getItem('Email')});

    const [submitted,setSubmitted]= useState(false);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
      handlefeeds()
        setSubmitted(true)
        return fetch('http://localhost:3001/feeds', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    

    };
    if(submitted===false && localStorage.getItem('loggedIn')==='true' &&(localStorage.getItem('Type')==='Buyer' || localStorage.getItem('Type')==='Seller')) {
        return (
            <Wrapper>
                
                  <h3 className='head'>Let's Have a feedback</h3>
                <form onSubmit={handleSubmit} className="add">
                    <div className='form-item'>
                        <label>Name</label>
                        <input name="id" value={inputs.id} required onChange={handleChange}/>
                    </div>
                    <div className='form-item'>
                        <label>E-mail</label>
                        <input name="mail" type='email' value= {localStorage.getItem('Email')} required onChange={handleChange}/>
                    </div>

                    <div className='form-item'>
                        <label>Message </label>
                        <input
                            name="msg"
                            value={inputs.msg}
                            onChange={handleChange}
                        />
                    </div>
                    <input type="submit" value="Send Message" className='submit'
                    />
                </form>
            </Wrapper>
        );
    }
    else if(localStorage.getItem('loggedIn')==='true')
    return (
    null
    )
    else
    return (<Confirm comp='message'/>)
    
};


const Wrapper = styled.section`
  .divider{
    border-top: 3px solid #bbb;
  }
  .head{
    margin: 30px 580px;
    margin-top:100px;
    width: 50%;
  }
  .add{
    margin-left:  25%;
    width: 50%;
  }
  .form-item input{
    position: relative;
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: var(--clr-primary-5);
    margin-bottom: 30px;
    border: 2px solid #DADDEC;
    border-radius: 10px;
    
    outline: none;
    background: transparent;
    box-sizing: border-box;
    box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
    
  }
  .form-item label{
    position: relative;
    left: 0;
    box-sizing: border-box;
    padding: 10px 0;
    font-size: 16px;
    color: var(--clr-primary-1);
    pointer-events:none;
    transition: 0.5s;
  }
  .submit{
    color: var(--clr-primary-10);
    background: var(--clr-primary-5);
    padding: 10px 0;
    border-radius: 10px;
    margin: 0 0 10% 40%;
    width:150px;
    border-color:white;
  }
  textarea{
    width:100%;
    height: 100px;
    border: 2px solid #DADDEC;
    border-radius: 10px;

    outline: none;
    background: transparent;
    box-sizing: border-box;
    box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
  }
`;
export default Feed;
