import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ForgotPass.css";
import mail_icon from "../assets/email.png";
import { Link } from "react-router-dom";
import { API_URL } from "../ConfigApi";
import Swal from 'sweetalert2';
import HashLoader from "react-spinners/HashLoader";
import ClipLoader from "react-spinners/ClipLoader";
// import { BookLoader } from "react-awesome-loaders";
function ForgotPass() {
  const override = {
    marginLeft : "10px",
  };
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handlesendmail = () => {
    setLoading(true);
    fetch(`${API_URL}/users/users/password_reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
      setLoading(false);
        if ('email' in data && data.email[0]) {
          // Error response from the backend
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.email[0],
          });
        } else if (data.status === 'OK') {
          // Success response from the backend
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Password reset email sent successfully.',
          });
        } else {
          // Unexpected response from the backend
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An unexpected error occurred. Please try again.',
          });
        }
      })
      .catch((error) => {
      setLoading(false);
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred. Please try again.',
        });
      });
  };
  return (
    <div className="forgot-password-page">
       {/* {loading && (
        <div className="overlay"></div>
      )}
       <HashLoader
        color='#e3e3e3'
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
      <div className="forgot-password-container">
        <div className="forgot-password-header">Forgot Password</div>
        <div className="forgot-password-instructions">
          Enter your email address, and we'll send you instructions to reset
          your password.
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
          <ClipLoader
                  color='white'
                  loading={loading}
                  cssOverride={override}
                  size={16}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
        </button>
        <div className="forgot-password-login-link">
          Remember your password?{" "}
          <Link className="forgot-password-login-option" to="/login">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
