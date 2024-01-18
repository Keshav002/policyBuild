import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import "./Login.css";
import user_icon from "../assets/person.png";
import mail_icon from "../assets/email.png";
import pass_icon from "../assets/password.png";
import { Link } from "react-router-dom";
import { API_URL } from '../ConfigApi';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import {handleSignIn} from '../store/userSlice';
import {useDispatch} from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";

const SignUp = () => {
  const dispatch = useDispatch();
  const override = {
    marginLeft: "10px",
  };
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false);


  const handlelogin = () => {
    try {
      console.log("loading started")
      setLoading(true);
      dispatch(handleSignIn(userDetails, navigate));
      // setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.',
      });
    }
  };
  
  return (
    <>
      <div className="signup-page">
        <div className="signup-container">
          <div className="signup-header">
            <div className="signup-tab">SIGN IN</div>
          </div>
          {/* <div className="signup-social-buttons">
            <GoogleOAuthProvider clientId="720055077366-672hd22rdp8sv2obcfcmp0puqbm8hrs0.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const details = jwt_decode(credentialResponse.credential);
                  console.log(details);
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </div> */}
          {/* <div className="signup-line">or</div> */}
          <div className="signup-input-fields">
            <div className="login-input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Username"
                value={userDetails.email}
                name="username"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="login-input">
              <img src={pass_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={userDetails.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="signup-login-link">
            <div className="forgot-password-link">
              <Link className="signup-forgot-option" to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
            <div className="dont-have-acc-option">
              Don't have an account? <Link className="signup-signup-option" to="/signup">Sign Up here</Link>
            </div>
          </div>
          <div className="signup-submit-container">
            <div className="signup-submit" onClick={handlelogin}>
              Sign In
              <ClipLoader
                color="white"
                loading={loading}
                cssOverride={override}
                size={16}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
