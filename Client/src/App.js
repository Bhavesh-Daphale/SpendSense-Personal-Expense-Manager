import React , {useEffect , useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { Link } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import Expenses from "./Components/ExpensePage/Expenses";
import Category from "./Components/CategoryPage/Category";
import Goals from "./Components/GoalsPage/Goals";
// import { useNavigate } from 'react-router-dom';
import axios from "axios";


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  console.log("AppUSER " + userId);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     // Redirect to sign-in page if not logged in
  //     return window.location.href = '/signin';
  //   }
  // }, [loggedIn]);


  // const [activeLink, setActiveLink] = useState('');

  // // Get the current location using react-router-dom's useLocation hook
  // const location = useLocation();

  // // Set the active link based on the current location
  // useEffect(() => {
  //   setActiveLink(location.pathname);
  // }, [location.pathname]);


  // const navigate = useNavigate();

  // const handleSignOut = () => {
  //   setLoggedIn(false);
  //   setUser(null);
  // };

  // const PrivateRoute = ({ component: Component, ...rest }) => {
  //   return (
  //     <Route
  //       {...rest}
  //       render={(props) =>
  //         loggedIn ? (
  //           <Component {...props} user={user} handleLogout={handleSignOut} />
  //         ) : (
  //           <Redirect to="/login" />
  //         )
  //       }
  //     />
  //   );
  // };

  // const handleSignIn = async (email, password) => {
  //   try {
  //     const response = await axios.post("http://localhost:3001/signin", { email, password });
  //     if (response.data.success) {
  //       setLoggedIn(true);
  //       setUser(response.data.user);
  //        //Redirect to the welcome page or any other authorized page
  //        navigate('/welcome');
  //     } else {
  //       console.log(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <Router>
      <div className="App " style= {{height: "100vh" , width : "100vw"}} >
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn setUserId = {setUserId} setLoggedIn = {setLoggedIn}/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard userId = {userId} loggedIn = {loggedIn}/>} />
          <Route path="/expenses" element={<Expenses userId = {userId} loggedIn = {loggedIn}/>} />
          <Route path="/category" element={<Category userId = {userId} loggedIn = {loggedIn}/>} />
          <Route path="/goals" element={<Goals userId = {userId} loggedIn = {loggedIn}/>} />
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;
