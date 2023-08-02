import React, { useState } from 'react';
import styled from 'styled-components';
import {useSelector} from "react-redux";






const Feed = ({handlefeeds}) => {
    const {user,loggedin} = useSelector(state=>state.user);
    const [inputs, setInputs] = useState({mail:user.email});

    const [submitted,setSubmitted]= useState(false);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
      handlefeeds()
        setSubmitted(true)
        return fetch(`${process.env.REACT_APP_API}/api/feeds`, {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => console.log('f'));


    };
    if(submitted===false && loggedin &&(user.type==='Buyer' || user.type==='Seller')) {
        return (
            <Wrapper>
                <div className='flex flex-col justify-center items-center'>
                  <h3 className='he'>Let's Have a feedback</h3>
                <form onSubmit={handleSubmit} className="">
                    <div className='form-item'>
                        <label>Name</label>
                        <input name="id" value={inputs.id} required onChange={handleChange}/>
                    </div>
                    <div className='form-item'>
                        <label>E-mail</label>
                        <input name="mail" type='email' value= {user.email} required onChange={handleChange}/>
                    </div>

                    <div className='form-item'>
                        <label>Message </label>
                        <input
                            name="msg"
                            value={inputs.msg}
                            onChange={handleChange}
                        />
                    </div>
                    <input type="submit" value="Send Message" className='submit ml-4'/>
                </form>
                </div>
            </Wrapper>
        );
    }
    else if(loggedin)
    return (
    null
    )
    else
    return (null)

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
    border-radius: 10px;
    
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
