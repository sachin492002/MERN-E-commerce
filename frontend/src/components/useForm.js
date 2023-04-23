import { useState } from "react";
import { omit } from "lodash";
import { useHistory } from "react-router-dom";

let pass;

const useForm = (callback) => {
  const [valuesss, setVals] = useState([]);
  //Form values
  const [values, setValues] = useState({});
  //Errors
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const validate = (event, name, value) => {
    //A function to validate each input values

    switch (name) {
      case "name":
        if (!value) {
          // we will set the error state

          setErrors({
            ...errors,
            name: "*Name is required",
          });
        } else {
          // set the error state empty or remove the error for username input

          //omit function removes/omits the value from given object and returns a new object
          let newObj = omit(errors, "name");
          setErrors(newObj);
        }
        break;
      case "mobile":
        if (value.length < 10) {
          // we will set the error state

          setErrors({
            ...errors,
            mobile: "*Enter valid phone no.",
          });
        } else {
          // set the error state empty or remove the error for username input

          //omit function removes/omits the value from given object and returns a new object
          let newObj = omit(errors, "mobile");
          setErrors(newObj);
        }
        break;

      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "*Enter a valid email address",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;

      case "password":
        pass = value;
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          setErrors({
            ...errors,
            password:
              "*Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers",
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;
      case "address":
        if (!value) {
          // we will set the error state

          setErrors({
            ...errors,
            address: "*Address is required",
          });
        } else {
          // set the error state empty or remove the error for username input

          //omit function removes/omits the value from given object and returns a new object
          let newObj = omit(errors, "address");
          setErrors(newObj);
        }
        break;

      case "pincode":
        if (!value) {
          // we will set the error state

          setErrors({
            ...errors,
            pincode: "*Pincode is required",
          });
        } else {
          // set the error state empty or remove the error for username input

          //omit function removes/omits the value from given object and returns a new object
          let newObj = omit(errors, "pincode");
          setErrors(newObj);
        }
        break;

      case "confirmPassword":
        if (value !== pass) {
          // we will set the error state

          setErrors({
            ...errors,
            confirmPassword: "Password does not match",
          });
        } else {
          // set the error state empty or remove the error for username input

          //omit function removes/omits the value from given object and returns a new object
          let newObj = omit(errors, "confirmPassword");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (event) => {
    event.persist();
    if (event.target.files) {
      return setValues({ ...values, "profile-pic": event.target.files[0] });
    }
    let name = event.target.name;
    let val = event.target.value;

    validate(event, name, val);

    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setVals([values, ...valuesss]);
    console.log(valuesss);

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } else {
      alert("Please Enter all details correctly!");
    }

    const formData = new FormData();

    for (const key in values) {
      formData.append(key.toString(), values[key]);
    }

    fetch("http://localhost:3001/users", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    history.push("/");
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    valuesss,
  };
};

export default useForm;
