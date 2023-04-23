import React from 'react'
import "./Modal.css";
import logo from './11zon_cropped.png'
import {useForm} from 'react-hook-form'


export default function Modal({ setOpenModal , setModal2 }) {
  const {register,handleSubmit,formState:{errors} ,} = useForm();

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
        setOpenModal(false)
        setModal2(true)
      }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Login</h1>
        </div>
        <div className="body">

        {/* onChange={(e)=>setUsername(e.target.value)}
        onChange={(e)=>setEmail(e.target.value)} */}
  {/* <img src = "C:/Users/VARUN GIRI/Downloads/11zon_cropped.png"> */}
  <img alt = "" src = {logo}/>
  <form onSubmit = {handleSubmit(onSubmit)} id="login-form">
    <p>
    <input  type="text" id="username" name="username" placeholder="username" {... register("username" ,{required:"Username is required"})}/><br/>
    {errors.username && (<small>{errors.username.message}</small>)}
    </p>
    
    {/* <label>Please Enter the Username</label> */}
    <p>
    <input type="text" id="email" name="email" placeholder="Email Address" {... register("email" ,{required:"Email id required" ,
    pattern:{value:/^[A-Z0-9+_.-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message:"Invalid Email id"}})}/><br/>
    {errors.email && (<small>{errors.email.message}</small>)}
    </p>
    
    {/* <label>Please enter E-mail in thre correct format</label> */}
    <p>
      <input type="password" id="pass" name="pass" placeholder="Your Password" {... register("pass" ,{required:"Password is required"})}/><br/>
      {errors.pass && (<small>{errors.pass.message}</small>)}
    </p>
    
    {/* <p className="forgot"></p> */}
    <p>
    <input type="submit" id="login" value="Login"/>
    <a href = "/">Forgot password?</a>
    </p>
  </form>
  
  <div id = "create-account-wrap">
    <p>Don't have an Account? <button id = "my-button" onClick = {change} >Create Account</button></p>
  </div>
  <div className = "specLog">
    <div id = "or">--------------- OR ----------------</div>
    Login With
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
