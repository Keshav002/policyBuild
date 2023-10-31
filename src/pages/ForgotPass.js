import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./ForgotPass.css";
import mail_icon from "../assets/email.png";
import { Link } from "react-router-dom";
import { API_URL } from '../ConfigApi';


function ForgotPass() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handlesendmail = () => {
    fetch(`${API_URL}/users/users/password_reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.emailSent) {
        navigate('/reset-password');
      } else {
        alert("Failed to send reset email. Please check your email address.");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("An error occurred. Please try again.");
    });
  };
  return (
    <div className="forgot-password-page">
    <div className="forgot-password-container">
      <div className="forgot-password-header">Forgot Password</div>
      <div className="forgot-password-instructions">
        Enter your email address, and we'll send you instructions to reset your password.
      </div>
      <div className="forgot-password-input">
          <img src={mail_icon} alt="Email" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
      </div>
      <button className="forgot-password-submit" onClick={handlesendmail}>
          Send Mail
        </button>
      <div className="forgot-password-login-link">
        Remember your password?{' '}
        <Link className="forgot-password-login-option" to="/login">
          Log In
        </Link>
      </div>
      </div>
    </div>
  );
}

export default ForgotPass;
