import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import "./Signup.css";
import user_icon from "../assets/person.png";
import mail_icon from "../assets/email.png";
import pass_icon from "../assets/password.png";
import { Link } from "react-router-dom";
import { API_URL } from "../ConfigApi";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otp, setOTP] = useState("");
  const [selectedRole, setSelectedRole] = useState("consultant");
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    // role: selectedRole,
  });
  const closeOTPVerification = () => {
    setShowOTPVerification(false);
  };

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const location = useLocation();

  const handleOTPVerification = () => {
    const verificationData = {
      email: userDetails.email,
      otp,
    };

    fetch(`${API_URL}/users/users/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verificationData),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again.",
        });
      });
  };

  const handleSignUp = () => {
    if (userDetails.password !== userDetails.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password and Confirm Password do not match. Please try again.",
      });
      return;
    }
    // Determine the role number based on the selectedRole state
    let roleNumber;
    if (selectedRole === "consultant") {
      roleNumber = 3; // Replace with the appropriate role number for a consultant
    } else if (selectedRole === "company") {
      roleNumber = 2; // Replace with the appropriate role number for a company
    }

    const userData = {
      ...userDetails,
      role: roleNumber, // Include the role number in the user data
    };

    fetch(`${API_URL}/users/users/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setShowOTPVerification(true);
        } else if (data.email) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.email[0],
          });
        } else if (data.username) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.username[0],
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Registration failed. Please try again.",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again.",
        });
      });
  };

      const handleGoogleLogin = async (credentialResponse) => {
    try {
      let roleNumber;
      if (selectedRole === "consultant") {
        roleNumber = 3; // Replace with the appropriate role number for a consultant
      } else if (selectedRole === "company") {
        roleNumber = 2; // Replace with the appropriate role number for a company
      }
  
      const requestData = {
        role: roleNumber,
        idToken: credentialResponse.credential,
      };

      const response = await fetch(`${API_URL}/users/users/google-signin/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.access_token) {
          localStorage.setItem("jwtToken", responseData.token);

          navigate("/consultant");
        } else {
          console.log("Authentication failed");
        }
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleGoogleLoginError = () => {
    console.log("Login Failed");
  };

      

  return (
    <>
      <div className="signup-page">
        <div className="signup-container">
          <div className="signup-header">
            <div className="signup-tab">SIGN UP</div>
          </div>
          {/* <div className="role-selection">
            <label
              className={`role-option ${
                selectedRole === "consultant" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                value="consultant"
                checked={selectedRole === "consultant"}
                onChange={() => setSelectedRole("consultant")}
              />
              <img
                src="https://cdn-icons-png.flaticon.com/128/912/912316.png"
                alt="Consultant"
              />
              Consultant
            </label>
            <label
              className={`role-option ${
                selectedRole === "company" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                value="company"
                checked={selectedRole === "company"}
                onChange={() => setSelectedRole("company")}
              />
              <img
                src="https://cdn-icons-png.flaticon.com/128/11645/11645898.png"
                alt="Company"
              />
              Company
            </label>
          </div> */}
          <div className="role-selection">
            <p className="select-role-text">Sign Up as (Select Your Role)</p>
            <select
              className="role-dropdown"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="consultant">Consultant</option>
              <option value="company">Company</option>
            </select>
          </div>
          {showOTPVerification && (
            <div className="otp-verification-container">
              <div className="otp-verification-popup">
                <div className="otp-verification-header">
                  <span className="close-cross" onClick={closeOTPVerification}>
                    &#x2715;
                  </span>
                  <p>Enter OTP received on your email</p>
                </div>
                <div className="otp-input">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    required
                  />
                </div>
                <div className="verify-button" onClick={handleOTPVerification}>
                  Verify
                </div>
              </div>
            </div>
          )}

          <div className="signup-social-buttons">
            <GoogleOAuthProvider clientId="720055077366-672hd22rdp8sv2obcfcmp0puqbm8hrs0.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={handleGoogleLoginError}
              />
            </GoogleOAuthProvider>
          </div>
          <div className="signup-line">or</div>
          <div className="signup-input-fields">
            <div className="signup-input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Name"
                value={userDetails.username}
                name="username"
                onChange={handleInputChange}
                required
              />
            </div>

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
          </div>

          <div className="signup-login-link">
            Already registered?{" "}
            <Link className="signup-login-option" to="/login">
              Login here
            </Link>
          </div>
          <div className="signup-submit-container">
            <div className="signup-submit" onClick={handleSignUp}>
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
