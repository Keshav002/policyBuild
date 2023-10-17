import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import "./Signup.css";
import user_icon from "../assets/person.png";
import mail_icon from "../assets/email.png";
import pass_icon from "../assets/password.png";



// Functional component for user signup and signin
const SignUp = () => {
  // State to manage current action (Sign Up or Sign In)
  const [action, setAction] = useState("Sign Up");

  // State to store user details entered in the form
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes in the form fields
  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Handle user signup
  const handleSignUp = () => {
    console.log("Password:", userDetails.password);
    console.log("Confirm Password:", userDetails.confirmPassword);

    // Check if password and confirm password match
    if (userDetails.password !== userDetails.confirmPassword) {
      alert("Password and Confirm Password do not match. Please try again.");
      return;
    }

    // Store user details in local storage
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Display success message
    alert("User registered successfully!");

    console.log("User details stored:", userDetails);
  };

  // Handle user signin
  const handleSignIn = () => {
    // Retrieve stored user details from local storage
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));

    // Display appropriate message based on whether user is found or not
    if (storedUserDetails) {
      alert(`Hi ${storedUserDetails.name}! You have successfully signed in.`);
    } else {
      alert("User not found. Please check your credentials and try again.");
    }
  };


  return (
    <>
      {/* Signup container */}
      <div className="signup-container">
        {/* Signup header with tabs for Sign Up and Sign In */}
        <div className="signup-header">
          <div className="signup-tabs">
            <div
              className={`signup-tab ${action === "Sign Up" ? "active" : ""}`}
              onClick={() => setAction("Sign Up")}
            >
              SIGN UP
            </div>
            <div
              className={`signup-tab ${action === "Sign In" ? "active" : ""}`}
              onClick={() => setAction("Sign In")}
            >
              SIGN IN
            </div>
          </div>
        </div>

        {/* Social login buttons using Google OAuth */}
        <div className="signup-social-buttons">
        <GoogleOAuthProvider clientId= "720055077366-672hd22rdp8sv2obcfcmp0puqbm8hrs0.apps.googleusercontent.com">
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

        </div>

        {/* Line separator */}
        <div className="signup-line">or</div>

        {/* Input fields for user details */}
        <div className="signup-input-fields">
          {action === "Sign Up" && (
            <div className="signup-input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Name"
                value={userDetails.name}
                name="name"
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="signup-input">
            <img src={mail_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              value={userDetails.email}
              name="email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="signup-input">
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
          {action === "Sign Up" && (
            <div className="signup-input">
              <img src={pass_icon} alt="" />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={userDetails.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
        </div>

        {/* Login and signup links */}
        <div className="signup-login-link">
          {action === "Sign Up" ? (
            <>
              Already registered?{" "}
              <span
                className="signup-login-option"
                onClick={() => setAction("Sign In")}
              >
                Login here
              </span>
            </>
          ) : (
            <>
              <div className="forgot-password-link">
                <span
                  className="signup-forgot-option"
                  onClick={() => console.log("Forgot Password clicked")}
                >
                  Forgot Password?
                </span>
              </div>
              Don't have an account?{" "}
              <span
                className="signup-signup-option"
                onClick={() => setAction("Sign Up")}
              >
                Sign Up here
              </span>
            </>
          )}
        </div>

        {/* Submit button */}
        <div className="signup-submit-container">
          {action === "Sign Up" && (
            <div className="signup-submit" onClick={handleSignUp}>
              {action}
            </div>
          )}
          {action === "Sign In" && (
            <div className="signup-submit" onClick={handleSignIn}>
              Sign In
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
