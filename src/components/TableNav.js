import React, { useEffect, useRef, useState } from "react";
import "./TableNav.css";
import { NavLink } from "react-router-dom";
import { API_URL } from "../ConfigApi";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from './Breadcrumbs';
function TableNav() {
  const userState = useSelector((state) => state.user);
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
      : "/";

      const policyCheckLink =
      userRole === "Company"
        ? "/company-projects"
        : userRole === "Consultant"
        ? "/consultant-projects"
        : "/";

        const userPopupRef = useRef(null);

        useEffect(() => {
          const handleOutsideClick = (event) => {
            if (
              userPopupRef.current &&
              !userPopupRef.current.contains(event.target)
              && !document.querySelector(".navbar-user-photo").contains(event.target)
            ) {
              setUserPopupVisible(false);
            }
          };
      
          window.addEventListener("mousedown", handleOutsideClick);
      
          return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
          };
        }, [isUserPopupVisible]);

  return (
    <div className="table-navbar">
      <div className="table-navbar-header">
        <div className="table-navbar-logo">
        <Link to={policyCheckLink}>Policy Lens</Link>
        </div>
        <div
          className={`table-navbar-hamburger ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
        > 
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <ul className={`table-navbar-nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        <li>
          <NavLink
            to={policyCheckLink}
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
        {userState.userData.role === "Company" && (
          <li>
            <NavLink
              to="/consultant-list"
              className={
                currentLocation.pathname === "/consultant-list"
                  ? "active-link"
                  : ""
              }
            >
              Consultants
            </NavLink>
          </li>
        )}
        {userState.userData.role === "Consultant" && (
          <li>
            <NavLink
              to="/company-list"
              className={
                currentLocation.pathname === "/company-list"
                  ? "active-link"
                  : ""
              }
            >
              Companies
            </NavLink>
          </li>
        )}

        {/* Show both "Companies" and "Consultants" if the user role is "Admin" */}
        {userState.userData.role === "Admin" && (
          <>
            <li>
              <NavLink
                to="/company-list"
                className={
                  currentLocation.pathname === "/company-list"
                    ? "active-link"
                    : ""
                }
              >
                Companies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/consultant-list"
                className={
                  currentLocation.pathname === "/consultant-list"
                    ? "active-link"
                    : ""
                }
              >
                Consultants
              </NavLink>
            </li>
          </>
        )}

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
              currentLocation.pathname === "/repository" ? "active-link" : ""
            }
          >
            Repository
          </NavLink>
        </li>
      </ul>
      <div
        className={`table-navbar-user-photo ${isMobileMenuOpen ? "active" : ""}`}
        onClick={toggleUserPopup}
      >
        <img
          src={
            userState.userData.profilePic ||
            "https://cdn-icons-png.flaticon.com/128/848/848006.png"
          }
          alt="User"
        />
        {isUserPopupVisible && (
          <div className="table-user-popup" ref={userPopupRef}>
            <div className="table-user-info">
              <Link to={profileLink} className="table-profile-navlink">
                <div className="table-user-profile">
                  <img
                    src={
                      userState.userData.profilePic ||
                      "https://cdn-icons-png.flaticon.com/128/848/848006.png"
                    }
                    alt="User Profile"
                    className="table-user-profile-image"
                  />
                  <span className="table-user-name">
                    {userState.userData.username}
                  </span>
                  <br />
                </div>
              </Link>
              <div className="table-user-description">{userState.userData.email}</div>
            </div>
            <div className="table-user-options">
              <Link to={profileLink} className="table-profile-navlink">
                <div className="table-user-option">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/9308/9308008.png"
                    alt="Profile"
                    className="table-option-icon"
                  />
                  My Profile
                </div>
              </Link>
              <hr />
              <Link to='/dashboard'>
                <div className="table-user-option">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2329/2329087.png"
                    alt="Dashboard"
                    className="table-option-icon"
                  />
                  Dashboard
                </div>
              </Link>
              <hr />
              <Link to='/meetings'>
                <div className="table-user-option">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/9662/9662347.png"
                    alt="Meetings"
                    className="table-option-icon"
                  />
                  Chats and Meetings
                </div>
              </Link>
              <hr />
              <div className="table-user-option" onClick={handleLogout}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2529/2529508.png"
                  alt="logout"
                  className="table-option-icon"
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

export default TableNav;
