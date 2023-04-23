import {React,useContext,createContext,useState,useEffect} from 'react';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignInAdmin from './components/SignInAdmin';

import { Update,SellerItems,Registered,SupportAdmin,Home, SingleProduct, Cart, Checkout, Error, About, Products, PrivateRoute, AuthWrapper,Dashboard,Profile,Orders,Support ,Admin,ProfileAdmin,Users} from './pages';
import AddProduct from "./pages/AddProduct";

export const UserContext = createContext(null);
function App() {
  const [user, setUser] = useState({Type:localStorage.getItem('Type'),
  Email:localStorage.getItem('Email'),
  Name:localStorage.getItem('Name'),
  ProfilePicUrl:localStorage.getItem('ProfilePicUrl'),
  loggedIn:localStorage.getItem('loggedIn'),
  Phone:localStorage.getItem('Phone'),
  Address:localStorage.getItem("Address")
});
useEffect(() => {
}, [user]);
const handleDataUser = (newuser) => {
  setUser(newuser);
};


  return (
    <UserContext.Provider value={user}>
    <div>
       <Router>
        
        <Navbar />
          <Sidebar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/registered'>
            <Registered />
          </Route>
          <Route exact path='/update'>
            <Update handleDataUser={handleDataUser}/>
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
            <SignIn handleDataUser={handleDataUser}/>
          </Route>
          <Route exact path='/signin'>
            <SignUp  />
          </Route>
          {/* <Route exact path='/profile'>
            <Profile/>
          </Route> */}
          <Route exact path='/profileAdmin'>
            <ProfileAdmin/>
          </Route>
          <Route exact path='/orders'>
            <Orders/>
          </Route>
          {/* <Route exact path='/support'>
            <Support/>
          </Route> */}
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
          
        <Footer />
      </Router>
    </div>
    </UserContext.Provider>
  );
}

export default App;
