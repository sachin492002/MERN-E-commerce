import {React, useEffect} from 'react';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignInAdmin from './components/SignInAdmin';

import { Update,SellerItems,Registered,SupportAdmin,Home, SingleProduct, Cart, Error, About, Products, Dashboard,Orders,Admin,ProfileAdmin,Users} from './pages';
import AddProduct from "./pages/AddProduct";
import {useDispatch} from "react-redux";
import axios from "axios";
import {setLoggedIn, setUser,setToken} from "./context/userSlice";

import Cookies from 'js-cookie'
import Temp from "./pages/Users";

function App() {
  console.log(process.env.REACT_APP_API)
  const dispatch = useDispatch();
  useEffect(()=>{
    axios
        .get(`${process.env.REACT_APP_API}/api/user/${Cookies.get('userid')}`)
        .then((response) => {
          dispatch(setToken(Cookies.get('token')));
          dispatch(setUser(response.data));
          dispatch(setLoggedIn(true));
        })},[])


  return (

    <div>
       <Router>

        <Navbar />
          <Sidebar />
        <Switch>
          <Route exact path='/temp'>
            <Temp />
          </Route>

          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/registered'>
            <Registered />
          </Route>
          <Route exact path='/update'>
            <Update/>
          </Route>
          <Route exact path='/items'>
            <SellerItems />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/products'>
            <Products />
          </Route>
          <Route exact path='/addproduct'>
            <AddProduct/>
          </Route>
          <Route exact path='/login'>
            <SignIn/>
          </Route>
          <Route exact path='/signin'>
            <SignUp  />
          </Route>

          <Route exact path='/profileAdmin'>
            <ProfileAdmin/>
          </Route>
          <Route exact path='/orders'>
            <Orders/>
          </Route>
          
          <Route exact path='/supportAdmin'>
            <SupportAdmin/>
          </Route>
          <Route exact path='/admin'>
            <Admin/>
            </Route>
            <Route exact path='/signadmin'>
            <SignInAdmin />
            </Route>
          <Route exact path='/products/:id' children={<SingleProduct />} />
          <Route exact path='/dashboard'><Dashboard/></Route>
          <Route exact path='/allusers'><Users/></Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
