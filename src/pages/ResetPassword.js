import React, { useEffect, useState } from "react";
import "./ResetPassword.css"; 
import pass_icon from "../assets/password.png";
import { API_URL } from '../ConfigApi';
import HashLoader from "react-spinners/HashLoader";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2';
import { useNavigate, useLocation, Link } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const override = {
    marginLeft : "10px",
  };
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [tokenValid, setTokenValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setResetToken(token);
    } else {
      alert('Token is not present in the URL');
      return;
    }
    fetchTokenValidity(token);
  }, []);

  const fetchTokenValidity = async (token) => {
    try {
      const response = await fetch(`${API_URL}/users/users/password_reset/validate_token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.status === 200) {
        setTokenValid(true);
      } else {
        setTokenValid(false);
        // Set the error message based on the token status
        if (response.status === 404) {
          setErrorMessage("It seems that you have already reset your password or the Reset password link has expired.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      setTokenValid(false);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Password and Confirm Password do not match. Please try again.",
        });
        return;
      }
      setLoading(true);
      const response = await fetch(`${API_URL}/users/users/password_reset/confirm/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token: resetToken }),
      });
      setLoading(false);
      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        if (data.password) {
          Swal.fire({
            icon: 'error',
            title: 'Password reset failed',
            text: data.password[0], 
          });
        } else {
       
          Swal.fire({
            icon: 'error',
            title: 'Password reset failed',
            text: data.message, 
          });
      }
    }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="reset-password-page">
      {/* {loading && (
        <div className="overlay"></div>
      )} */}
      {/* <HashLoader
        color='#e3e3e3'
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
      <div className="reset-password-container">
        <div className="reset-password-box">
          <h2 className="reset-password-header">Reset Your Password</h2>
          {tokenValid ? (
            <>
              <p className="reset-password-instructions">
                Choose a strong, secure password to protect your account.
              </p>
              <div className="reset-password-input">
                <img src={pass_icon} alt="Email" />
                <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="reset-password-input">
                <img src={pass_icon} alt="Email" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button className="reset-password-submit" onClick={handleResetPassword}>
                Reset Password
                <ClipLoader
                  color='white'
                  loading={loading}
                  cssOverride={override}
                  size={16}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </button>
            </>
          ) : (
            <>
            <div className="alert alert-danger">{errorMessage}
            </div>
            <div className="signup-login-link">
            Password already reset?{" "}
            <Link className="signup-login-option" to="/login">
              Login here
            </Link>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
