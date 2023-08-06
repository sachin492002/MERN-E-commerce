import React, {useState} from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import {FaBars, FaSearch, FaTimes} from 'react-icons/fa';
import {Link} from 'react-router-dom';

import CartButtons from './CartButtons';
import {useProductsContext} from '../context/products_context';
import Sidebar from './Sidebar';
import {useSelector} from "react-redux";
import Search from "./Search";
import {useFilterContext} from "../context/filter_context";


const Nav = () => {
    const {
        filters: {
            text,
        },
        updateFilters,
    } = useFilterContext();
    const { isSidebarOpen,openSidebar ,closeSidebar} = useProductsContext();
    const {user,loggedin} = useSelector(state => state.user)
    const links_hk = [
        {
            id: 1,
            text: 'home',
            url: '/',
        },
        {
            id: 2,
            text: 'products',
            url: '/products',

        },
        {
            id: 3,
            text: 'about',
            url: '/about',

        },
        {
            id:4,
            text:'add product',
            url:'/addproduct',
        }
    ]
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const toggleSearchBar = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    return (
         <NavContainer>
            <Sidebar/>
            <div className='flex justify-between items-center mx-auto max-w-screen-xl pl-4 pt-4 pb-4'>
                <div className='flex items-center'>
                    <Link to='/'>
                        <img src={logo} alt='shopper' className={!isSearchVisible ? 'w-28':'hidden'}/>
                    </Link>
                    {isSearchVisible && <div className='w-full block'><Search updateFilters={updateFilters} text={text}/></div>}
                </div>
                <div className='flex items-center'>
                <ul className={!isSearchVisible ? 'nav-links':'hidden'}>
                    <li>
                        <Link to='/'>home</Link>
                    </li>
                    <li>
                        <Link to='/products'>products</Link>
                    </li>

                    <li>
                        <Link to='/about'>about</Link>
                    </li>

                    {loggedin && user.type==="Seller" ?
                        (
                            <li>
                                <Link to='/addproduct'>add product</Link>
                            </li>
                        ):(null)}

                </ul>
                </div>
                <div className='flex justify-end'>
                    <button type='button' className='search-icon mr-4' onClick={toggleSearchBar}>
                        <FaSearch className='text-2xl'/>
                    </button>
                    { !isSidebarOpen ?
                        <button type='button' className='nav-toggle' onClick={openSidebar}>
                            <FaBars />
                        </button>:<button className='nav-toggle' type='button' onClick={closeSidebar}>
                            <FaTimes />
                        </button>
                    }
                <CartButtons />
                </div>
            </div>
        </NavContainer>
    );
};




const NavContainer = styled.nav`
  height: 5rem;
  //display: flex;
  //align-items: center;
  //justify-content: center;
  .nav-center {
    //width: 90vw;
    display: flex;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }

  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .cartbutton{
      display:flex;
      width:6vw;
      color:black;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 1px solid var(--clr-primary-7);
          border-top: 1px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Nav;
