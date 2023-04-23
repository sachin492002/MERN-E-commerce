import React , { useState } from 'react'
import "./Modal.css";
import logo from './11zon_cropped.png'
import {useForm} from 'react-hook-form'



export default function Modal({ setModal2 ,setOpenModal }) {
  const {register,handleSubmit,formState:{errors}} = useForm();

  const onSubmit = ()=>{

  }
      // const [username , setUsername] = useState('')
      // const [email , setEmail] = useState('')
      //   // const[info,setInfo] = useState([])
      //   const handleInfo = (e) => {
      //     e.preventDefault()
      //     // const Entry = {Name:username , Mail: email}
      //     // setInfo([...info,Entry])
      //     // console.log(info)

      // function handleChange(event){
      //   if(!event.includes('@'))
      //   alert('hk');
      //  }


      // }
      const change = ()=>{
        setOpenModal(true)
        setModal2(false)
      }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
        <button id = "back" onClick={change}>Back To Login</button>
          <button onClick={() => {setModal2(false);}}>X</button>
        </div>
        <div className="title">
          <h1>Register</h1>
        </div>
        <div className="body">

        {/* onChange={(e)=>setUsername(e.target.value)}
        onChange={(e)=>setEmail(e.target.value)} */}
  {/* <img src = "C:/Users/VARUN GIRI/Downloads/11zon_cropped.png"> */}
  <img alt = "" src = {logo}/>
  <form onSubmit = {handleSubmit(onSubmit)} id="login-form">
    <p>
    <input  type="text" id="username" name="username" placeholder="Enter a username you would like to have" {... register("username" ,{required:"Choosing Username is mandatory"})}/><br/>
    {errors.username && (<small>{errors.username.message}</small>)}
    </p>
    
    <p>
    <input type="email" id="email" name="email" placeholder="Enter your e-mail id to receive daily updates" {... register("email" ,{required:"Please fill this field" ,
       pattern:{value:/^[A-Z0-9+_.-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
       message:"Invalid Email id"}
    })}/><br/>
    {errors.email && (<small>{errors.email.message}</small>)}
    </p>
    {/* <label>Please Enter the Username</label> */}
    <p>
    <input type="password" id="pass" name="pass" placeholder="Choose a strong Password" {... register("password" ,{required:"A valid Password is necessary"})}/><br/>
    {errors.password && (<small>{errors.password.message}</small>)}
    </p>
    
    {/* <label>Please enter E-mail in thre correct format</label> */}
    <p>
      <input type="password" id="conf" name="conf" placeholder="Confirm Password" {... register("pass" ,{required:"Please confirm your Password"})}/><br/>
      {errors.pass && (<small>{errors.pass.message}</small>)}
    </p>
    
    {/* <p className="forgot"></p> */}
    <p>
    <input type="submit" id="login" value="SUBMIT"/>
    {/* <a href = "/">Forgot password?</a> */}
    </p>
  </form>
  <div className = "specLog">
    <div id = "or">--------------- OR ----------------</div>
    Register With
    </div>
        </div>
        {/* <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div> */}
      </div>
    </div>
  );
}
