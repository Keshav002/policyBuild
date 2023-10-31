import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';
import "./ResetPassword.css"; // Include your custom CSS
import pass_icon from "../assets/password.png";

function ResetPassword() {
  //   const history = useHistory();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      // You should send the new password and token to the server for validation.
      // Implement the logic to send a reset request and redirect the user to a login page.
      // This is a simplified example.
      // ...
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <div className="reset-password-box">
          <h2 className="reset-password-header">Reset Your Password</h2>
          <p className="reset-password-instructions">
            Choose a strong, secure password to protect your account.
          </p>
          {error && <div className="reset-password-error">{error}</div>}
          <div className="reset-password-input">
            <img src={pass_icon} alt="Email" />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
          <button
            className="reset-password-submit"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
