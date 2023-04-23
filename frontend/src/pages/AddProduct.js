import React, { useState } from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import { Link } from "react-router-dom";
import Confirm from "./Confirm";

const AddProduct = () => {
  const [inputs, setInputs] = useState({company:localStorage.getItem("Name"),seller:localStorage.getItem("Email")});

  const [submitted, setSubmitted] = useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    if (name === "image") {
      console.log(name)
      return setInputs((prevState) => ({ ...prevState, [name]: event.target.files[0] }));
    }
    const value =
      event.target.name === "price" || event.target.name === "stock"
        ? parseInt(event.target.value)
        : event.target.value;

    setInputs((prevState) => ({ ...prevState, [name]: value }));
    console.log(inputs)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    const formData = new FormData();

    for (const key in inputs) {
      formData.append(key.toString(), inputs[key]);
    }
    fetch("http://localhost:3001/product", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmitted(true);
        console.log(data);
      }).catch((err) => {
        setSubmitted(false);
        console.log(err.message)
      });
  };
  if (submitted === false) {
    return (
      <Wrapper>
        <PageHero title="add product" />
        <form onSubmit={handleSubmit} className="add">
          <div className="headingid">
            <h2>Let's Add a new Product</h2>
          </div>
          
          <div className="form-item">
            <label className="labelid">Name</label>
            <input
              name="name"
              value={inputs.name}
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <label className="labelid">Price</label>
            <input
              name="price"
              value={inputs.price}
              type="number"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <label className="labelid">Description</label>
            <input
              name="description"
              value={inputs.description}
              required
              onChange={handleChange}
              aria-expanded
            />
          </div>
          {/* <div className="form-item">
            <label className="labelid">Image</label>
            <input
              name="image"
              value={inputs.image}
              required
              onChange={handleChange}
            />
          </div> */}

          <div onChange={handleChange} className="field padding-bottom--24">
          <label>Upload Product Image</label>
          <input 
          type="file"
          name="image" 
          required
          
          />
          </div>

          {/* <div
            className="field padding-bottom--24"
            onChange={handleChange}
          >
            <label>Upload profile picture</label>
            <input type="file" name="profile-pic" required />
          </div> */}
          
          <div className="form-item">
        <label className="labelid">Category</label>
        <select name="category" value={inputs.category} onChange={handleChange}>
          <option value="">Select a category</option>
          <option value="Dairy">Dairy</option>
          <option value="Fruits">Fruits</option>
          <option value="Staples">Staples</option>
          <option value="Cloth">Cloth</option>
          <option value="Electronics">Electronics</option>
          </select>
         </div>

          <div className="form-item">
            <label className="labelid">Company</label>
            <input
              name="company"
              value={localStorage.getItem("Name")}
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <label className="labelid">Stocks</label>
            <input
              name="stock"
              value={inputs.stock}
              type="number"
              onChange={handleChange}
            />
          </div>
          <input type="submit" value="Upload Product" className="submit" />
        </form>
      </Wrapper>
    );
  } else {
    return <Confirm comp="product" />;
  }
};

const Wrapper = styled.section`
  .headingid {
    color: black;
    align-items: center;
    justify-content: space-between;
    padding: 25px;
    margin: 20px 50px;
  }
  .add {
    margin-left: 25%;
    width: 50%;
  }
  .form-item input {
    position: relative;
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: var(--clr-primary-5);
    margin-bottom: 30px;
    //border: none;
    border: 2px solid #daddec;
    border-radius: 10px;
    //border-bottom: 1px solid var(--clr-primary-8);
    outline: none;
    background: transparent;
    box-sizing: border-box;
    box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
  }
  .form-item label {
    position: relative;
    left: 0;
    box-sizing: border-box;
    padding: 10px 0;
    font-size: 16px;
    color: var(--clr-primary-5);
    pointer-events: none;
    transition: 0.5s;
  }
  .submit {
    color: var(--clr-primary-10);
    background: var(--clr-primary-5);
    padding: 10px 0;
    border-radius: 10px;
    margin: 0 0 10% 40%;
    width: 150px;
    border-color: white;
  }
`;
export default AddProduct;