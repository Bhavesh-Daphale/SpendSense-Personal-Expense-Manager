import React from 'react';
import './HomePage.css';
import { Link } from "react-router-dom";


function Navbar() {

    return (
        <div className="nav-bar ">
          <nav className="navbar navbar-expand-md ">
            <div className="container-fluid mx-lg-5">
              <a className="navbar-brand" href="/">$pend$ense</a>
              <div  id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-lg-0">
                  <li className="nav-item mb-sm-2">
                    <a className="nav-link m-0 p-0 " aria-current="page" href="#">
                      <button className="outline rounded-pill btn btn-home-signin mx-2 p-1 px-3">
                      <Link className='link' to="/signin">Sign In</Link>
                    </button></a>
                  </li>          
                </ul>   
              </div>
            </div>
          </nav> 
        </div>);
}

export default Navbar;