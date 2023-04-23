import React, { useEffect, useState, useContext } from 'react';
import './Dashboard.css';
import { SideData, sellerSideData } from './SideData';
import axios from 'axios';
import {Link} from 'react-router-dom';

import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import CardColumns from './CardColumns';
import EditIcon from '@mui/icons-material/Edit';
import { UserContext } from '../App.js';
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [prod, setProd] = useState([]);
  const user = useContext(UserContext);
  const [selectedItem, setSelectedItem] = useState('/profile');
  useEffect(() => {
    if (localStorage.getItem('Type') === 'Seller') {
      axios
        .get(
          `http://localhost:3001/orders/sell/${localStorage.getItem('Email')}`
        )
        .then((response) => {
          setData(response.data);
        });
      axios
        .get(
          `http://localhost:3001/products/seller/${localStorage.getItem(
            'Email'
          )}`
        )
        .then((response) => {
          setProd(response.data);
        });
    }
  }, []);
  const handleItemClick = (link) => {
    setSelectedItem(link);
  };
  function handleDelete(id) {
    setProd(prod.filter((prod) => prod._id !== id));
    console.log(prod);
    fetch('http://localhost:3001/products/seller/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    alert('deleted');
  }

  useEffect(() => {
    if (localStorage.getItem('Type') === 'Buyer') {
      axios
        .get(`http://localhost:3001/orders/${localStorage.getItem('Email')}`)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        });
    }
  }, []);

  const handleStatusChange = (oid, pid, newStatus) => {
    const updatedData = data.map((product) => {
      if (product.oid === oid && product._id === pid) {
        return { ...product, status: newStatus };
      }
      return product;
    });
    setData(updatedData);
    axios
      .put(`http://localhost:3001/orders/${oid}/items/${pid}/status/`, {
        status: newStatus,
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  };

  if (localStorage.getItem('Type') === 'Seller') {
    return (
      <div className="divid">
        <div className="sidebar">
          <div className="image">
            <div className="imghk">
              <img
                src={localStorage.getItem('ProfilePicUrl')}
               
                alt="Profile Pic"
                className="imghk"
              />
            </div>
            <div className="top-heading">
              {localStorage.getItem('loggedIn') === null
                ? 'new user'
                : localStorage.getItem('Name')}
            </div>
          </div>
          <hr className="hr" />
          <ul className="sidebar-list">
            {sellerSideData.map((val, key) => (
              <li
                id={
                  window.location.pathname === val.link ? 'active row' : 'row'
                }
                className="row"
                key={key}
                onClick={() => handleItemClick(val.link)}
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="orders">
          {selectedItem === '/profile' && (
            <div className="/profile">
              <div>
              <h1 className="upperhk">{localStorage.getItem('Name')}  <Link to="/update"><EditIcon/></Link></h1>
                <i>({localStorage.getItem('Type')})</i>
              </div>
             
              <div className="hk">
                <div>
                  <img
                    src={localStorage.getItem('ProfilePicUrl')}
                    alt="profile-Pic-Admin"
                    className="imagehk"
                  />
                </div>

                <div className="divhk">
                  <h3 className="nhk">Details:</h3>
                  <h5 className="uphk">Email :</h5>
                  <h5 className="downhk">{localStorage.getItem('Email')}</h5>
                  <h5 className="uphk">Contact :</h5>
                  <h5 className="downhk">{localStorage.getItem('Phone')}</h5>

                  <h5 className="uphk">Address :</h5>
                  <h5 className="downhk">{localStorage.getItem('Address')}</h5>

                  <div className="iconhk"></div>
                </div>
              </div>
            </div>
          )}
          {selectedItem === '/myProducts' && (
            <>
              <div className="order-content">
                <h5>item</h5>
                <h5>price</h5>
                <h5>Stocks</h5>
                <span></span>
              </div>

              {prod.map((prod) => (
                <Wrapper>
                  <div className="title">
                    <a href={`/products/${prod._id}`}>
                      <img src={prod.image} className="img-order" alt="" />
                    </a>
                    <div>
                      <h5 className="name">{prod.name}</h5>
                    </div>
                  </div>
                  <h5 className="price">{prod.price}</h5>
                  <h5 className="price">{prod.stock}</h5>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleDelete(prod._id)}
                  >
                    <FaTrash />
                  </button>
                </Wrapper>
              ))}
            </>
          )}

          {selectedItem === '/ordersAll' && (
            <div>
              <h1>Your Orders</h1>
              <div className="product-list-container">
                <table className="product-list">
                  <thead>
                    <tr>
                      <th></th>
                      <th>product</th>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>User</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((product) => (
                      <tr key={product._id} className="product-list-item">
                        <td>
                          <div className="product-image-container">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="product-image"
                            />
                          </div>
                        </td>
                        <td>{product.name}</td>
                        <td>Rs.{product.price}</td>
                        <td>{product.amount}</td>
                        <td>{product.buyerEmail}</td>
                        <select
                          value={product.status}
                          onChange={(e) => {
                            product.status = e.target.value;
                            handleStatusChange(
                              product.oid,
                              product._id,
                              e.target.value
                            );
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedItem === '/support' && (
            <div className="orders ">
              <Support>
                <header>
                  <h1>Support Center</h1>
                </header>
                <main>
                  <section>
                    <h2>How can we help?</h2>
                    <p>
                      Our support team is available to assist you with any
                      questions or issues you may have.
                    </p>
                    <p>
                      Please email us at{' '}
                      <a href="mailto:support@mycompany.com">
                        support@mycompany.com
                      </a>{' '}
                      and we'll get back to you as soon as possible.
                    </p>
                  </section>
                  <section>
                    <h2>FAQs</h2>
                    <h3>How do I create an account?</h3>
                    <p>
                      To create an account, click the "Sign Up" button at the
                      top of the page and follow the prompts to enter your
                      information.
                    </p>
                    <h3>How do I reset my password?</h3>
                    <p>
                      To reset your password, click the "Forgot Password" link
                      on the login page and follow the prompts to reset your
                      password.
                    </p>
                    <h3>What payment methods do you accept?</h3>
                    <p>We accept all major credit cards as well as PayPal.</p>
                  </section>
                  <section>
                    <h2>Contact Us</h2>
                    <p>
                      If you have any questions or concerns, please do not
                      hesitate to reach out to us. Our support team is available
                      24/7 to assist you.
                    </p>
                    <ul>
                    <li>
                        Email:{' '}
                        <a href="mailto:support@mycompany.com">
                          varun.g20@iiits.in
                        </a>
                      </li>
                      <li>Phone: +918824094063</li>
                      
                    </ul>
                  </section>
                </main>
                
            </Support>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="divid">
        <div className="sidebar">
          <div className="image">
            <div className="imghk">
              <img
                src={localStorage.getItem('ProfilePicUrl')}
                alt="Profile Pic"
                className="imghk"
              />
            </div>
            <div className="top-heading">
              {localStorage.getItem('loggedIn') === null
                ? 'new user'
                : localStorage.getItem('Name')}
            </div>
          </div>
          <hr className="hr" />
          <ul className="sidebar-list">
            {SideData.map((val, key) => (
              <li
                id={
                  window.location.pathname === val.link ? 'active row' : 'row'
                }
                className="row"
                key={key}
                onClick={() => handleItemClick(val.link)}
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="orders">
          {selectedItem === '/profile' && (
            <div className="/profile">
              <div>
              <h1 className="upperhk">{localStorage.getItem('Name')}  <Link to="/update"><EditIcon/></Link></h1>                <i>({localStorage.getItem('Type')})</i>
              </div>

              <div className="hk">
                <div>
                  <img
                    src={localStorage.getItem('ProfilePicUrl')}
                    alt="profile-Pic-Admin"
                    className="imagehk"
                  />
                </div>

                <div className="divhk">
                  <h3 className="nhk">Details:</h3>
                  <h5 className="uphk">Email :</h5>
                  <h5 className="downhk">{localStorage.getItem('Email')}</h5>
                  <h5 className="uphk">Contact :</h5>
                  <h5 className="downhk">{localStorage.getItem('Phone')}</h5>

                  <h5 className="uphk">Address :</h5>
                  <h5 className="downhk">{localStorage.getItem('Address')}</h5>

                  <div className="iconhk"></div>
                </div>
              </div>
            </div>
          )}
          {selectedItem === '/orders' && (
            <>
              <div className="order-content">
                <h5>product</h5>
                <h5>price</h5>
                <h5>quantity</h5>
                <h5>status</h5>
              </div>

              {data.map((prod) => (
                <Wrapper>
                  <div className="title">
                    <a href={`/products/${prod._id}`}>
                      <img src={prod.image} className="img-order" alt="" />
                    </a>
                    <div>
                      <h5 className="name">{prod.name}</h5>
                    </div>
                  </div>

                  <h5 className="price">{prod.price}</h5>
                  <h5 className="price">{prod.amount}</h5>
                  <h5 className="price">{prod.status}</h5>
                </Wrapper>
              ))}
            </>
            // <div>
            //   <h1>Your Orders</h1>
            //   <div className="product-list-container">
            //     <table className="product-list">
            //       <thead>
            //         <tr>
            //           <th></th>
            //           <th>product</th>
            //           <th>Price</th>
            //           <th>Amount</th>
            //           <th>User</th>
            //           <th>Status</th>
            //         </tr>
            //       </thead>
            //       <tbody>
            //         {data.map((product) => (
            //           <tr key={product._id} className="product-list-item">
            //             <td>
            //               <div className="product-image-container">
            //                 <img
            //                   src={product.image}
            //                   alt={product.name}
            //                   className="product-image"
            //                 />
            //               </div>
            //             </td>
            //             <td>{product.name}</td>
            //             <td>Rs.{product.price}</td>
            //             <td>{product.amount}</td>
            //             <td>{product.buyerEmail}</td>
            //             <td>{product.status}</td>
            //           </tr>
            //         ))}
            //       </tbody>
            //     </table>
            //   </div>
            // </div>
          )}

          {selectedItem === '/support' && (
            <div className="orders">
              <Support>
                <header>
                  <h1>Support Center</h1>
                </header>
                <main>
                  <section>
                    <h2>How can we help?</h2>
                    <p>
                      Our support team is available to assist you with any
                      questions or issues you may have.
                    </p>
                    <p>
                      Please email us at{' '}
                      <a href="mailto:support@mycompany.com">
                        support@mycompany.com
                      </a>{' '}
                      and we'll get back to you as soon as possible.
                    </p>
                  </section>
                  <section>
                    <h2>FAQs</h2>
                    <h3>How do I create an account?</h3>
                    <p>
                      To create an account, click the "Sign Up" button at the
                      top of the page and follow the prompts to enter your
                      information.
                    </p>
                    <h3>How do I reset my password?</h3>
                    <p>
                      To reset your password, click the "Forgot Password" link
                      on the login page and follow the prompts to reset your
                      password.
                    </p>
                    <h3>What payment methods do you accept?</h3>
                    <p>We accept all major credit cards.</p>
                  </section>
                  <section>
                    <h2>Contact Us</h2>
                    <p>
                      If you have any questions or concerns, please do not
                      hesitate to reach out to us. Our support team is available
                      24/7 to assist you.
                    </p>
                    <ul>
                      <li>
                        Email:{' '}
                        <a href="mailto:support@mycompany.com">
                          varun.g20@iiits.in
                        </a>
                      </li>
                      <li>Phone: +918824094063</li>
                      
                    </ul>
                  </section>
                </main>
                
              </Support>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const Wrapper = styled.article`
  .content {
    display: grid;
    grid-template-columns: 316px 1fr 1fr 1fr auto;
    justify-items: center;
    column-gap: 1rem;
  }
  .content h5 {
    color: #211b1b;
    font-weight: 400;
  }
  .content span {
    width: 2rem;
    height: 2rem;
  }
  .content hr {
    margin-top: 1rem;
    margin-bottom: 3rem;
  }
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: contain;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .color {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  .price-small {
    color: var(--clr-primary-5);
  }
  .amount-btns {
    width: 75px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-5);
      font-weight: 400;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
      object-fit: contain;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`;


const Support = styled.article`

width:150%;

h1 {
  font-size: 2rem;
  margin: 0;
}

main {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

section {
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1rem;
}

a {
  color: #333;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

ul {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}


`