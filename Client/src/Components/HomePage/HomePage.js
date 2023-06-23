import React from 'react';
import './HomePage.css';
import Navbar from './Navbar';
// import LeftDiv from './LeftDiv';
// import RightDiv from './RightDiv';
import { Link } from "react-router-dom";



function HomePage() {

    return (
        <div className=" homepage-body container-fluid d-flex justify-content-center align-items-center min-vh-100 min-vw-100 m-0 p-0" >
            <div className="container transparent-container p-lg-3 ">
                <Navbar />
                <div className="row container-fluid d-flex justify-content-center align-items-center my-lg-5 w-100 m-sm-0 ">
                    <div className="image col-lg-6 order-lg-2">
                        <img className="w-100" alt="" src="homepage-img.svg"></img>
                    </div>
                    <div className="heading col-lg-6 order-lg-1">
                        <h1 >Spend with sense ,track your expense!</h1> 
                        <div className="tagline mt-5 mt-sm-3">
                        <ul>
                            <li className="my-2 fs-6 fs-lg-5  ">
                            Track expenses instantly
                            </li>
                            <li className="my-2 fs-6 fs-lg-5 ">
                            Set smart budgets
                            </li>
                            <li className="my-2 fs-6 fs-lg-5 ">
                            Achieve financial goals
                            </li>
                            <li className="my-2 fs-6 fs-lg-5 ">
                            Gain insightful analysis
                            </li>
                            
                        </ul>
                        <button className="btn btn-home-signup width-100 my-2 mx-4 px-lg-5 px-3"><Link className='link' to="/signup">Get Started!</Link></button>
                        </div>               
                    </div>
                            </div>
                        </div>
                    </div>
    );
}

export default HomePage;