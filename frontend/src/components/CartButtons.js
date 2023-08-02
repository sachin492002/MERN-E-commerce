import React from "react";
import {
  FaShoppingCart,
  FaUserPlus,
  FaDoorOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useProductsContext } from "../context/products_context";
import { useCartContext } from "../context/cart_context";

import { Button } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../context/userSlice";
import Cookies from 'js-cookie'
const CartButtons = () => {
  const { closeSidebar } = useProductsContext();
  const { total_items, clearCart } = useCartContext();
  const {user,loggedin} = useSelector(state => state?.user)
  const dispatch = useDispatch();
  const deleteCookie = (name) => {
    Cookies.remove(name);
  };

  function logoutHandler() {
    dispatch(logoutUser())
    deleteCookie('userid');
  }

  return (
      <Wrapper className="cart-btn-wrapper">
        <div className="new-login flex-inline justify-center items-center">
          {loggedin === false ? (
              <Link to="/login" className="cart-btn-name">
                Login
                <span className="cart-container">
              <FaUserPlus />
            </span>
              </Link>
          ) : (
              <Link to={user?.type==="Admin" ?  "/admin" : "/dashboard"} className="cart-btn-name">
                {user.name}
                <span className="cart-container-login">
            </span>
              </Link>
          )}

          {loggedin && user.type==="Buyer" ?
              <Link to="/cart" onClick={closeSidebar} className="cart-btn">
          <span className="cart-container">
            <FaShoppingCart />
            <span className="cart-value">{total_items}</span>
          </span>
              </Link>:(null)
          }
          <div className="logout-div">
            <Link to="/login">
              <Button onClick={logoutHandler}>
              <span className="cart-container">
                <FaDoorOpen />
              </span>
              </Button>
            </Link>
          </div>
        </div>
      </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  ${'' /* grid-template-columns: 1fr 1fr; */}
  align-items: center;
  ${'' /* width: 225px; */}
  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;

    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
    margin-right: 1.5px;
    margin-left: 6px;
  }

  .cart-btn-name {
    display: flex;
    align-items: center;
    justify-content: center;
      letter-spacing: 0.1px;
      font-weight: 700;
      margin-right: 10px;
      color: black;
      font-size: 1.2rem;
  }
  .cart-container {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    ${'' /* position: relative; */}
    ${'' /* svg {
      height: 1.6rem;
      margin-left: 5px;
    } */}
  }

  .cart-container-login {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
  }
  .cart-value {
    ${'' /* position: absolute; */}
    margin-bottom: 15px;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    ${'' /* padding: 12px; */}
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
  .cart-btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    ${'' /* width: 225px; */}
    float:right;
  }

  .logout-div {
    display: flex;
    align-items: center;
    justify-content: center;
    ${'' /* margin-left: 1.px; */}
    padding-left: 0px;
    padding-right: 0px;
  }

  .new-login {
    display: flex;
    margin-left: 6px;
  }
`;
export default CartButtons;
