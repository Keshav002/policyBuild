import React, { useState } from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import { API_URL } from "../ConfigApi";
import { useNavigate, useLocation } from "react-router-dom";
import {logoutUser} from '../store/userSlice';
import {useDispatch} from 'react-redux';

function Nav() {
    const currentLocation = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUserPopupVisible, setUserPopupVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const toggleUserPopup = () => {
    setUserPopupVisible(!isUserPopupVisible);
  };
  const handleLogout = () => {
  dispatch(logoutUser(navigate));
  
  };

  return (
    <div className="navbar">
     <div className="navbar-header">
        <div className="navbar-logo">
          <a href="/consultant">Policy Check</a>
        </div>
        <div
          className={`navbar-hamburger ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <ul className={`navbar-nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        <li>
        <NavLink to="/company-list" className={currentLocation.pathname === '/company-list' ? 'active-link' : ''}>
            Companies
          </NavLink>
        </li>
        <li>
        <NavLink to="/notifications" className={currentLocation.pathname === '/notifications' ? 'active-link' : ''}>
            Notifications
          </NavLink>
        </li>
        <li>
        <NavLink to="/repository" className={currentLocation.pathname === '/repositories' ? 'active-link' : ''}>
            Repository
          </NavLink>
        </li>
      </ul>
      <div className={`navbar-user-photo ${isMobileMenuOpen ? "active" : ""}`} onClick={toggleUserPopup}>
        
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          alt="User"
        />
        {isUserPopupVisible && (
          <div className="user-popup">
            <div className="user-info">
              <a href="/profile" className="profile-navlink">
                <div className="user-profile">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                    alt="User Profile"
                    className="user-profile-image"
                  />
                  <span className="user-name">Keshav Tayal</span>
                  <br />
                </div>
              </a>
              <div className="user-description">keshavtayal002@gmail.com</div>
            </div>
            <div className="user-options">
              <a href="/profile">
                <div className="user-option">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/9195/9195970.png"
                    alt="Profile"
                    className="option-icon"
                  />
                  My Profile
                </div>
              </a>
              <hr />
              <a href="/dashboard">
                <div className="user-option">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6820/6820955.png"
                    alt="Dashboard"
                    className="option-icon"
                  />
                  Dashboard
                </div>
              </a>
              <hr />
              <div className="user-option" onClick={handleLogout}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9068/9068818.png"
                  alt="logout"
                  className="option-icon"
                />
                Sign Out
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
