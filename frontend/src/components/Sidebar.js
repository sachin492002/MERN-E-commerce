import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { links } from '../utils/constants';
import styled from 'styled-components';
import CartButtons from './CartButtons';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useProductsContext();
  const NavLinks = () => (
      <div className="  mt-10">
        {links.map(({ id, text, url }) => (
            <Link
                key={id}
                to={url}
                className="capitalize flex flex-row justify-start items-center my-8 text-sm font-medium text-[color:var(--clr-grey-1)] hover:text-dark-2"
            >
              {text}
            </Link>
        ))}
      </div>
  );

  return (
    <SidebarContainer>
      {/*<div className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>*/}

        <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[primary-1] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition transition-[var(--transition)] ${isSidebarOpen ? 'left-0' : '-left-full'}`}>
          <div className="flex justify-center items-center">
            <div className='sidebar-header'>
              <img src={logo} className='logo' alt='shopper' />

            </div>
          </div>
          <NavLinks/>
          <CartButtons />
        </div>
        {/*<ul className='links'>*/}
        {/*  {links.map(({ id, text, url }) => {*/}
        {/*    return (*/}
        {/*      <li key={id}>*/}
        {/*        <Link to={url} onClick={closeSidebar}>*/}
        {/*          {text}*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*    );*/}
        {/*  })}*/}
        {/*  {(*/}
        {/*    <li>*/}
        {/*      <Link to='/checkout' onClick={closeSidebar}>*/}
        {/*        checkout*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*  )}*/}
        {/*</ul>*/}

      {/*</div>*/}
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }

  //.sidebar {
  //  position: absolute;
  //  top: 0;
  //  left: 0;
  //  width: 50%;
  //  height: 100%;
  //  background: var(--clr-white);
  //  transition: var(--transition);
  //  transform: translate(-120%);
  //  //z-index: -1;
  //}
  //.show-sidebar {
  //  transform: translate(0);
  //  z-index: 999;
  //}
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`;

export default Sidebar;
