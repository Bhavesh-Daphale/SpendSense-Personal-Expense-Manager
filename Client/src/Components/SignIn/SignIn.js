import React , { useState } from "react";
import "./signIn.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const SignIn = ({ setUserId , setLoggedIn  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  // console.log(setLoggedIn)
  // console.log(setUserId)
  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      const response = await axios.post('http://localhost:3001/signin', { email, password });
      if (response.data.success) {
        setLoggedIn(true);
        setInvalid(false);
        setUserId(response.data.user_id);
        console.log("Signin Page user " + response.data.user_id);
        // Redirect to the welcome page or any other authorized page
        navigate('/category');

      } else {
        setInvalid(true);
        setMessage(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="background-signin-container container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area min-vh-90">
        <div className="col-md-6 order-md-2 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
          <img
            src="signin-img.svg"
            alt=""
            className="img-fluid"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-md-6 order-md-1 right-box p-lg-5 p-sm-3">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Hello,Again</h2>
              <p>We are happy to have you back.</p>
            </div>
            <form onSubmit={handleSignIn}>
            <div className="input-group mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Email address"
              />
            </div>
            <div className="input-group mb-1">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Password"
              />
            </div>
            <div className="input-group mb-4 d-flex justify-content-between">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="formCheck"
                />
                <label
                  for="formCheck"
                  className="form-check-label text-secondary"
                >
                  <small>Remember Me</small>
                </label>
              </div>
              <div className="forgot">
                <small>
                  <a href="/">Forgot Password?</a>
                </small>
              </div>
              {invalid ? (
                <div className="w-100 mt-2 d-flex justify-content-center " style={{color : "#f00"}}>
                {message}
                </div>
              ):(null)}
              
            </div>
            
            <div className="input-group mb-3">
              <button type="submit" className="btn btn-lg w-100 fs-6 btn-signin">
                Sign In
              </button>
            </div>
            <div className="input-group mb-3">
              <button className="btn btn-lg btn-light w-100 fs-6">
                <img
                  src="images/google.jpg"
                  style={{ width: "20px" }}
                  alt=""
                  className="me-2"
                />
                <small>Sign In with Google</small>
              </button>
            </div>
            </form>
            <div className="row">
              <small>
                Don't have account? <Link to="/signup">Sign Up</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
