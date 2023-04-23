import * as React from "react";
import { useState ,useContext} from "react";
import useForm from "./useForm";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik, Formik } from "formik";
import "./Signup.css";
import axios from "axios";
import { useEffect } from "react";
import Redux from "react-redux";
import { useHistory } from "react-router-dom";
import { truncate } from "lodash";
import { UserContext } from '../App.js';
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Shopper
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
let userState = {};
//const {userState,changeUserstate}=useState({})

export default function SignIn({handleDataUser}) {
  const [inputs, setInputs] = useState({});
  const user = useContext(UserContext);
  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.name === "price" || event.target.name === "stock"
        ? parseInt(event.target.value)
        : event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  


  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = inputs.email;
    const password = inputs.password;
    console.log(username);
    console.log(password);

    fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((resData) => {
        if(resData.user.blocked===true)
        {
          alert("You are Blocked")
          history.push("/login");
          return;
        }
        console.log(resData);
          let newuser={
            Name:resData.user.name,
            Email:resData.user.email,
            Address:resData.user.address,
            Phone:resData.user.phone,
            Type:resData.user.type,
            ProfilePicUrl:resData.user.profilePicUrl,
            loggedIn:true
          }
          handleDataUser(newuser);
          localStorage.setItem("Name", resData.user.name);
          localStorage.setItem("Email", resData.user.email);
          localStorage.setItem("Address", resData.user.address);
          localStorage.setItem("Phone", resData.user.mobile);
          localStorage.setItem("Type", resData.user.type);
          localStorage.setItem("ProfilePicUrl", `http://localhost:3001/${resData.user.profilePicUrl}`)
          localStorage.setItem("loggedIn", "true");

          alert("Logged In Successfully");
          history.push("/dashboard");
          return;
      })
      .catch((error) => {
        // Handle authentication error
        console.log(error.message);
        console.log("Error in Authentication");
      });

  };

  return (
    <div className="login-root">
      <div className="box-root flex-flex flex-direction--column fi">
        {/*style="min-height: 100vh;flex-grow: 1;*/}

        <div className="box-root padding-top--24 flex-flex flex-direction--column fi1">
          {/*style="flex-grow: 1; z-index: 9;"*/}
          <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
            <h1>
              <a href="http://blog.stackfindover.com/" rel="dofollow">
                Sign In
              </a>
            </h1>
          </div>
          <div className="formbg-outer">
            <div className="formbg">
              <div className="formbg-inner padding-horizontal--48">
                <span className="padding-bottom--15">
                  Login into your Account
                </span>
                <form id="stripe-login" onSubmit={handleSubmit}>
                  <div className="field padding-bottom--24">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={inputs.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field padding-bottom--24">
                    <div className="grid--50-50">
                      <label htmlFor="password">Password</label>
                      <div className="reset-pass">
                        <a href="#">Forgot your password?</a>
                      </div>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={inputs.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                    <label htmlFor="checkbox">
                      <input type="checkbox" name="checkbox" /> Stay signed in
                      for a week
                    </label>
                  </div>
                  <div className="field padding-bottom--24">
                    <input type="submit" name="submit" value="Continue" />
                  </div>
                  <div>
                    <Link id="foot" href="/signin" variant="body2">
                      {"Don't have an account?"}
                    </Link>
                    <br />
                    <Link id="foot" href="/signadmin" variant="body2">
                      {"Sign In as Admin"}
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="footer-link padding-top--24">
              <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                <span>
                  <a href="#">©Shopper</a>
                </span>
                <span>
                  <a href="#">Contact</a>
                </span>
                <span>
                  <a href="#">Privacy & terms</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { userState };
// export {changeUserstate};
