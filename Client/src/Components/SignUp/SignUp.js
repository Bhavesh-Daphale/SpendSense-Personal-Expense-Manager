import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";


import "./SignUp.css";
import axios from "axios";

const SignUp = () => {
  const [comment, setComment] = useState(false);
  const [message, setMessage] = useState("");
  const [textColor, setTextColor] = useState('#f00');
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      const response = await axios.post("http://localhost:3001/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      if (response.data.success) {
        setComment(true)
        setTextColor('#0f0')
        setMessage(response.data.message)

        setTimeout(() => {
          navigate('/signin');
        }, 2000);
        // Registration successful
        // You can redirect to the login page or any other desired page
      } else {
        setComment(true);
        setTextColor('#f00');
        setMessage(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      setComment(true);
      setTextColor("#f00");
      setMessage(error);
      console.log(error);
      
    }
  };
  return (
    <div className="background-signup-container container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area min-vh-90">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
          <img
            src="signup-img.svg"
            alt=""
            className="img-fluid "
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-md-6 right-box p-lg-5 p-sm-3">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Create An Account</h2>
              <p>Enter your Personal Details and start your Journey with Us</p>
            </div>

            <form onSubmit={handleSignUp}>
              <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="First Name"
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              </div>
              

              <div className="input-group mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Email"
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Password"
                />
              </div>
              {comment ? (
                <div className="w-100 mt-2 d-flex justify-content-center " style={{color : textColor}}>
                {message}
                </div>
              ):(null)}

              <div className="input-group mb-3 mt-5">
                <button type="submit" className="btn btn-lg w-100 fs-6 btn-signin">
                  Sign Up
                </button>
              </div>
            </form>

            <div className="row">
              <small>
                Already have an account? <Link to="/signin">Sign In</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
