import React, { useState } from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import { API_URL } from "../ConfigApi";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
function Nav() {
  const userState = useSelector(state => state.user);
  console.log("userstate", userState);
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
  const userRole = userState.userData.role;
  const profileLink =
    userRole === "Company"
      ? `/company-profile/${userState.userData.company.id}`
      : userRole === "Consultant"
      ? `/consultant-profile/${userState.userData.consultant.id}`
      : "/default-profile";

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
          <NavLink
            to="/consultant-projects"
            className={
              currentLocation.pathname === "/consultant-projects" ||
              currentLocation.pathname === "/company-projects"
                ? "active-link"
                : ""
            }
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/company-list"
            className={
              currentLocation.pathname === "/company-list" ? "active-link" : ""
            }
          >
            Companies
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notifications"
            className={
              currentLocation.pathname === "/notifications" ? "active-link" : ""
            }
          >
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/repository"
            className={
              currentLocation.pathname === "/repositories" ? "active-link" : ""
            }
          >
            Repository
          </NavLink>
        </li>
      </ul>
      <div
        className={`navbar-user-photo ${isMobileMenuOpen ? "active" : ""}`}
        onClick={toggleUserPopup}
      >
        <img
          src={userState.userData.profilePic || "https://cdn-icons-png.flaticon.com/128/848/848006.png"}
          alt="User"
        />
        {isUserPopupVisible && (
          <div className="user-popup">
            <div className="user-info">
            <Link to={profileLink} className="profile-navlink">
                <div className="user-profile">
                  <img
                    src={userState.userData.profilePic || "https://cdn-icons-png.flaticon.com/128/848/848006.png"}
                    alt="User Profile"
                    className="user-profile-image"
                  />
                  <span className="user-name">{userState.userData.username}</span>
                  <br />
                </div>
              </Link>
              <div className="user-description">{userState.userData.email}</div>
            </div>
            <div className="user-options">
            <Link to={profileLink} className="profile-navlink">

                <div className="user-option">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/9308/9308008.png"
                    alt="Profile"
                    className="option-icon"
                  />
                  My Profile
                </div>
              </Link>
              <hr />
              <a href="/dashboard">
                <div className="user-option">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2329/2329087.png"
                    alt="Dashboard"
                    className="option-icon"
                  />
                  Dashboard
                </div>
              </a>
              <hr />
              <div className="user-option" onClick={handleLogout}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2529/2529508.png"
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
