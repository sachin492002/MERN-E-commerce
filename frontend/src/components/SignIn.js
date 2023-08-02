import * as React from "react";
import {useState} from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {createTheme} from "@mui/material/styles";
import "./Signup.css";
import {useHistory} from "react-router-dom";
import Cookies from 'js-cookie'
import {useDispatch} from 'react-redux';
import {setLoggedIn, setUser} from "../context/userSlice";
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


export default function SignIn() {
  const [inputs, setInputs] = useState({});
  const setCookie = (name, value, daysToExpire) => {
    Cookies.set(name, value, { expires: daysToExpire });
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.name === "price" || event.target.name === "stock"
        ? parseInt(event.target.value)
        : event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };


  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = inputs.email;
    const password = inputs.password;


    fetch(`${process.env.REACT_APP_API}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((resData) => {
        if(resData.message==="Invalid password")
        {
          alert("Invalid Password");
          history.push("/login");
        }
        if(resData.user.blocked===true)
        {
          alert("You are Blocked")
          history.push("/login");
          return;
        }

        dispatch(setUser(resData?.user));
        dispatch(setLoggedIn(true));

          setCookie('userid',resData.user._id,7);
          history.push("/dashboard");
          return;
      })
      .catch((error) => {
        console.log(error.message);
        alert("Error in Authentication");
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

