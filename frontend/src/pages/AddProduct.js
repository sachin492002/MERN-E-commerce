import React, { useState } from "react";
import styled from "styled-components";
import Confirm from "./Confirm";
import {useSelector} from "react-redux";

const AddProduct = () => {
  const {user} = useSelector(state => state.user)
  const [inputs, setInputs] = useState({company:user.name,seller:user.email});

  const [submitted, setSubmitted] = useState(false);
  const [previewImage,setPreviewImage] = useState('');
  const handleChange = (event) => {
    const name = event.target.name;
    if (name === "image") {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setPreviewImage(imageUrl);
      console.log(imageUrl)
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
    fetch(`${process.env.REACT_APP_API}/api/product`, {
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

    <section className="max-w-4xl p-6 mx-auto bg-[var(--clr-white)] rounded-md shadow-md  mt-20">
      <h1 className="text-2xl font-bold text-[var(--clr-primary-5)] capitalize">Add a new prodect</h1>
      <form>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-[var(--clr-primary-5)] " htmlFor="name">Product Name</label>
            <input  name="name"
                value={inputs.name}
                required
                onChange={handleChange}
                   className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring"/>
          </div>

          <div>
            <label className="text-[var(--clr-primary-5)] " htmlFor="price">Price</label>
            <input name="price"
                 value={inputs.price}
                type="number"
                 required
                 onChange={handleChange}
                   className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring"/>
          </div>

          <div>
            <label className="text-[var(--clr-primary-5)] " htmlFor="description">Description</label>
            <input name="description"
                 value={inputs.description}
               required
                onChange={handleChange}
                aria-expanded
                   className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring"/>
          </div>

          <div>
            <label className="text-[var(--clr-primary-5)] " htmlFor="company">Brand</label>
            <input name="company"
                 value={user.name}
                   onChange={handleChange}
                   placeholder={user.name}
                   disabled
                   className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring"/>
          </div>
          <div>
            <label className="text-[var(--clr-primary-5)] " htmlFor="passwordConfirmation">
              Available Stocks</label>
            <input name="stock"
               value={inputs.stock} type="number"
                 onChange={handleChange}
                   className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring"/>
          </div>
          <div>
            <label className="text-[var(--clr-primary-5)] " htmlFor="passwordConfirmation">Select</label>
            <select
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none focus:ring" name="category" value={inputs.category} onChange={handleChange}>
              <option value="">Select a category</option>
              <option value="dairy">Dairy</option>
              <option value="fruits">Fruits</option>
              <option value="staples">Staples</option>
              <option value="cloth">Cloth</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--clr-primary-5)]">
              Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {previewImage ? (
                    <img src={previewImage} alt="Preview" className="h-24 mx-auto" />
                ) : (
                    <svg className="mx-auto h-12 w-12 text-[var(--clr-primary-5)]" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                )}

                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload"
                         className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span className="">Choose a file</span>
                    <input id="file-upload" name="image" type="file" className="sr-only" onChange={handleChange}/>
                  </label>

                </div>
                <p className="text-xs text-[var(--clr-primary-5)]">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
              className="px-6 py-2 leading-5 text-[var(--clr-primary-5)] transition-colors duration-200 transform bg-[var(--clr-grey-1)] rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600" onClick={handleSubmit}>Upload
          </button>
        </div>
      </form>
    </section>
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
      width: 100%;
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
