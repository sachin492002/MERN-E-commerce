import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import {SideData} from './SideData';
import axios from 'axios';
import styled from 'styled-components';
import {FaTrash} from 'react-icons/fa';
import {useSelector} from "react-redux";
import {Loading} from "../components";
import logo from '../assets/logo.png'
import {useProductsContext} from "../context/products_context";
import {Link} from 'react-router-dom';
const Orders =({data})=>{
    return(
    <div className="order-profile-content">
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
                        <img src={prod.image} className="img-order" alt=""/>
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
    </div>)
}
const Sellerorders = ({data, handleStatusChange}) => {
    return (
        <div className='max-w-[100%] overflow-x-scroll'>
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
    )
}
const Profile = ({user,data,prod}) => {
    const [imageSrc,setImageSrc]=useState(`${process.env.REACT_APP_API}/${user.profilePicUrl}`)
    const handleImageError = () => {
        console.log("error occured",imageSrc)
        setImageSrc('https://filmfare.wwmindia.com/thumb/content/2016/May/paresh_1464614885.jpg?width=1200&height=900');
        console.log(user)
    };
    console.log(user)
    return (<>
        <main className="profile-page w-full" >
            <section className="relative py-16 bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div
                        className="relative flex flex-col break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="py-6 px-3 mt-32 sm:mt-0">
                                        <a href='https://museboxx.vercel.app'>
                                        <button
                                            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="button">
                                            Connect
                                        </button>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">

                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">

                                        <div className="mr-4 p-3 text-center">
                                            <span
                                                className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{ data.length}</span><span
                                            className="text-sm text-blueGray-400">{user.type==='Seller' ? 'Orders Got':'Ordered Items'}</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span
                                                className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{user.type==='Seller' ? prod.length:null}</span><span
                                            className="text-sm text-blueGray-400">{user.type==='Seller' ? 'Products':null}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center">
                                
                                    <img
                                        src={imageSrc}
                                        onError={()=>handleImageError}
                                        alt="..."
                                        className="shadow-lg rounded-full w-48 object-cover h-48 border-r-[50%] align-middle border-none"/>
                                
                            </div>
                            <div className="text-center mt-12">

                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                    {user.name}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                    {user.address}
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>{user.email}
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>{user.mobile}
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <Link to='/update'>
                                        <button
                                            className="bg-[var(--clr-primary-1)] active:bg-[var(--clr-grey-1)] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="button">
                                            Update Profile
                                        </button>
                                        </Link>
                                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                               Shopper Private Limited, Delhi,India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </main>
        </>
    )
}

const Sellerproducts = ({prod, handleDelete}) => {
    console.log(prod)
    return (
        <div className='flex flex-col h-[100vh] overflow-y-scroll hide-scrollbar'>
            <div className="order-content">
                <h5>item</h5>
                <h5>price</h5>
                <h5>Stocks</h5>
                <span></span>
            </div>

            {prod?.map((prod) => (
                <Wrapper>
                    <div className="title">
                        <a href={`/products/${prod._id}`}>
                            <img src={prod.image} className="img-order" alt=""/>
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
                        <FaTrash/>
                    </button>
                </Wrapper>
            ))}
        </div>
    )
}
const SupportPage = () => {
    return (
        <div className="orders ">
            <Support>
                <main>
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

                </main>

            </Support>
        </div>
    )
}
const DasSideBar = ({handleItemClick, user}) => {
    const { isSidebarOpen,openSidebar ,closeSidebar} = useProductsContext();
    return (
        <aside id="logo-sidebar"
               className={isSidebarOpen? "hidden z-40 w-20 md:60 h-screen transition-transform ": "relative z-40 w-20 md:w-64 h-screen"}
               aria-label="Sidebar">
            <div className="h-full flex px-3 py-4 flex-col align-center bg-gray-50 ">
                <a href="/" className="flex items-center pl-2.5 mb-5">
                    <img src={logo} className="h-6 mr-3 hidden md:block"
                         alt="Logo"/>
                    <span
                        className="self-center text-xl font-semibold whitespace-nowrap hidden md:block ">Shopper</span>
                </a>
                <ul className="space-y-2 font-medium">
                    <li>
                        <div onClick={()=>handleItemClick('profile')}
                             className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-[var(--clr-primary-2)]  group">
                            <svg
                                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 22 21">
                                <path
                                    d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                <path
                                    d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                            </svg>
                            <span className="ml-3 hidden md:block">Dashboard</span>
                        </div>
                    </li>
                    <li>
                        <div onClick={()=>handleItemClick('profile')}
                             className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-[var(--clr-primary-2)]  group">
                            <svg
                                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 20 18">
                                <path
                                    d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap hidden md:block">Profile</span>
                        </div>
                    </li>
                    {user.type === 'Buyer' &&
                        <li>
                            <div onClick={()=>handleItemClick('orders')}
                               className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-[var(--clr-primary-2)]  group">
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 18 20">
                                    <path
                                        d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap hidden md:block">Orders</span>
                            </div>
                        </li>}
                    {user.type === 'Seller' &&
                        <li>
                            <div onClick={()=>handleItemClick('sellerorders')}
                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[var(--clr-primary-2)]  group">
                                <svg className="svg-icon" viewBox="0 0 20 20">
                                    <path fill="currentColor"
                                          d="M17.671,13.945l0.003,0.002l1.708-7.687l-0.008-0.002c0.008-0.033,0.021-0.065,0.021-0.102c0-0.236-0.191-0.428-0.427-0.428H5.276L4.67,3.472L4.665,3.473c-0.053-0.175-0.21-0.306-0.403-0.306H1.032c-0.236,0-0.427,0.191-0.427,0.427c0,0.236,0.191,0.428,0.427,0.428h2.902l2.667,9.945l0,0c0.037,0.119,0.125,0.217,0.239,0.268c-0.16,0.26-0.257,0.562-0.257,0.891c0,0.943,0.765,1.707,1.708,1.707S10,16.068,10,15.125c0-0.312-0.09-0.602-0.237-0.855h4.744c-0.146,0.254-0.237,0.543-0.237,0.855c0,0.943,0.766,1.707,1.708,1.707c0.944,0,1.709-0.764,1.709-1.707c0-0.328-0.097-0.631-0.257-0.891C17.55,14.182,17.639,14.074,17.671,13.945 M15.934,6.583h2.502l-0.38,1.709h-2.312L15.934,6.583zM5.505,6.583h2.832l0.189,1.709H5.963L5.505,6.583z M6.65,10.854L6.192,9.146h2.429l0.19,1.708H6.65z M6.879,11.707h2.027l0.189,1.709H7.338L6.879,11.707z M8.292,15.979c-0.472,0-0.854-0.383-0.854-0.854c0-0.473,0.382-0.855,0.854-0.855s0.854,0.383,0.854,0.855C9.146,15.596,8.763,15.979,8.292,15.979 M11.708,13.416H9.955l-0.189-1.709h1.943V13.416z M11.708,10.854H9.67L9.48,9.146h2.228V10.854z M11.708,8.292H9.386l-0.19-1.709h2.512V8.292z M14.315,13.416h-1.753v-1.709h1.942L14.315,13.416zM14.6,10.854h-2.037V9.146h2.227L14.6,10.854z M14.884,8.292h-2.321V6.583h2.512L14.884,8.292z M15.978,15.979c-0.471,0-0.854-0.383-0.854-0.854c0-0.473,0.383-0.855,0.854-0.855c0.473,0,0.854,0.383,0.854,0.855C16.832,15.596,16.45,15.979,15.978,15.979 M16.917,13.416h-1.743l0.189-1.709h1.934L16.917,13.416z M15.458,10.854l0.19-1.708h2.218l-0.38,1.708H15.458z"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap hidden md:block">Orders</span>
                            </div>
                        </li>}
                    {user.type === 'Seller' &&
                        <li>
                            <div onClick={()=>handleItemClick('products')}
                                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[var(--clr-primary-2)]  group">
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 18 20">
                                    <path
                                        d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap hidden md:block">Products</span>
                            </div>
                        </li>}
                    <li>
                        <div onClick={()=>handleItemClick('support')}
                             className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[var(--clr-primary-2)]  group">
                            <svg
                                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 18 20">
                                <path
                                    d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                            </svg>
                            <span  className="flex-1 ml-3 whitespace-nowrap hidden md:block" >Support</span>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
export default function Dashboard() {
    const [data, setData] = useState([]);
    const [prod, setProd] = useState(null);

    const [selectedItem, setSelectedItem] = useState('profile');
    const {user, loggedin} = useSelector(state => state.user);

    useEffect(() => {
        if (user.type === 'Buyer') {
            axios
                .get(`${process.env.REACT_APP_API}/api/orders/${user.email}`)
                .then((response) => {
                    console.log(response.data);
                    setData(response.data);
                });
        }
        if (user.type === 'Seller') {
            axios
                .get(
                    `${process.env.REACT_APP_API}/api/orders/sell/${user.email}`
                )
                .then((response) => {
                    setData(response.data);
                });
            axios
                .get(
                    `${process.env.REACT_APP_API}/api/products/seller/${user.email}`
                )
                .then((response) => {
                    console.log(response.data)
                    setProd(response.data);
                });
        }
    }, []);
    const handleItemClick = (link) => {
        console.log(link)
        setSelectedItem(link);
    };

    function handleDelete(id) {
        setProd(prod.filter((prod) => prod._id !== id));
        console.log(user.email);
        fetch(`${process.env.REACT_APP_API}/api/products/seller/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id}),
        });
        alert('deleted');
    }


    const handleStatusChange = (oid, pid, newStatus) => {
        const updatedData = data.map((product) => {
            if (product.oid === oid && product._id === pid) {
                return {...product, status: newStatus};
            }
            return product;
        });
        setData(updatedData);
        console.log(newStatus)
        axios
            .put(`${process.env.REACT_APP_API}/api/orders/${oid}/items/${pid}/status/`, {
                status: newStatus,
            })
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            });
    };
    const [imageSrc, setImageSrc] = useState(`${process.env.REACT_APP_API}/` + user.profilePicUrl);
    const [error, setError] = useState(false);

    const handleImageError = () => {
        console.log("error occured")
        setImageSrc('https://filmfare.wwmindia.com/thumb/content/2016/May/paresh_1464614885.jpg?width=1200&height=900');
        console.log(imageSrc)
        setError(true);
    };
    if(!prod && user.type==='Seller') return <Loading/>

        return (
            <div className='flex flex-row'>
                <DasSideBar handleItemClick={handleItemClick} user={user}/>
                {selectedItem === 'profile' && (
                    <Profile user={user} imageSrc={imageSrc} data={data} prod={prod} setImageSrc={setImageSrc} />
                )}
                {selectedItem === 'orders' && (
                    <Orders data={data}/>
                )}
                {selectedItem === 'sellerorders' && (
                    <Sellerorders data={data} handleStatusChange={handleStatusChange}/>
                )}
                {selectedItem === 'products' && (
                    <Sellerproducts prod={prod}  handleDelete={handleDelete} />
                )}
                {selectedItem === 'support' && (
                    <SupportPage/>
                )}
            </div>
        )
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

  width: 100%;
  top: 20rem;
  
  h1 {
    font-size: 4rem;
  }

  main {
    max-width: 800px;
    padding: 1rem;
  }

  section {
    background-color: #fff;
    padding: 1rem;
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
