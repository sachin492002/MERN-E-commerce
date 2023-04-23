import * as React from "react";
import { useState,useEffect,useContext } from "react";
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
import { Radio } from "@mui/material";


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

export default function SignUp() {
  const formLogin = () => {
    console.log("Callback function when form is submitted!");
    console.log("Form Values ", values);
  };
  
  const { handleChange, values, errors, handleSubmit, valuesss } =
    useForm(formLogin);

  const [inputs, setInputs] = useState({});
  
  return (
    <div className="login-root">
      <div className="box-root flex-flex flex-direction--column fi">
        {/*style="min-height: 100vh;flex-grow: 1;*/}

        <div className="box-root padding-top--24 flex-flex flex-direction--column fi1">
          {/*style="flex-grow: 1; z-index: 9;"*/}
          <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
            <h1>
              <a href="http://blog.stackfindover.com/" rel="dofollow">
                Sign Up
              </a>
            </h1>
          </div>
          <div className="formbg-outer">
            <div className="formbg">
              <div className="formbg-inner padding-horizontal--48">
                {/* <span className="padding-bottom--15">Register an account</span> */}

                <form id="stripe-login" onSubmit={handleSubmit}>
                  <div className="field padding-bottom--24">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" onChange={handleChange} />
                  </div>
                  {errors.name && <h3 className="error">{errors.name}</h3>}
                  <div className="field padding-bottom--24">
                    <label htmlFor="phone">Mobile No</label>
                    <input type="phone" name="mobile" onChange={handleChange} />
                  </div>
                  {errors.mobile && <h3 className="error">{errors.mobile}</h3>}
                  <div className="field padding-bottom--24">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={handleChange} />
                  </div>
                  {errors.email && <h3 className="error">{errors.email}</h3>}
                  <div className="field padding-bottom--24">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" onChange={handleChange} />
                  </div>
                  {errors.address && (
                    <h3 className="error">{errors.address}</h3>
                  )}
                  <div className="field padding-bottom--24">
                    <label htmlFor="pincode">Pin-code</label>
                    <input type="text" name="pincode" onChange={handleChange} />
                  </div>
                  {errors.pincode && (
                    <h3 className="error">{errors.pincode}</h3>
                  )}
                  <div
                    className="field padding-bottom--24"
                    onChange={handleChange}
                    style = {{display:"flex"}}
                  >
                    <input
                      type="radio"
                      id="html"
                      name="type"
                      value="Seller"
                      
                    />
                    <label className ="radioLabel">Seller</label>
                    <br />
                    <input
                      type="radio"
                      id="css"
                      name="type"
                      value="Buyer"
                    />
                    <label className ="radioLabel">Buyer</label>
                  </div>

                  <div
                    className="field padding-bottom--24"
                    onChange={handleChange}
                  >
                    <label>Upload profile picture</label>
                    <input type="file" name="profile-pic" required />
                  </div>

                  <div className="field padding-bottom--24">
                    <div className="grid--50-50">
                      <label htmlFor="password">Password</label>
                      <div className="reset-pass">
                        {/* <a href="#">Forgot your password?</a> */}
                      </div>
                    </div>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.password && (
                    <h3 className="error">{errors.password}</h3>
                  )}
                  <div className="field padding-bottom--24">
                    <div className="grid--50-50">
                      <label htmlFor="password">Confirm Password</label>
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <h3 className="error">{errors.confirmPassword}</h3>
                  )}
                  <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                    <label htmlFor="checkbox">
                      <input type="checkbox" name="checkbox" /> Stay signed in
                      for a week
                    </label>
                  </div>
                  <div className="field padding-bottom--24">
                    <input type="submit" name="submit" value="Continue" />
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
