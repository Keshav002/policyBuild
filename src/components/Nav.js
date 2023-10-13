import React, { useState } from 'react';
import './Nav.css';
import { NavLink } from "react-router-dom";

function Nav() {
    const [isUserPopupVisible, setUserPopupVisible] = useState(false);

    const toggleUserPopup = () => {
        setUserPopupVisible(!isUserPopupVisible);
    };
    return (
        <div className="navbar">
            <div className="navbar_logo">
                <a href='/'>Policy Check</a>
            </div>
            <ul className="navbar_nav-links">
                <li><a href="#">Companies</a></li>
                <li><a href="#">Notifications</a></li>
                <li><a href="#">Repository</a></li>
            </ul>
            <div className="navbar_user-photo"  onClick={toggleUserPopup}>
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="User" />
                {isUserPopupVisible && (
                    <div className="user-popup">
                        <div className="user-info">
                            <a href='/profile' className="profile-navlink">
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
                            <div className="user-description">
                                keshavtayal002@gmail.com
                            </div>
                        </div>
                        <div className="user-options">
                            <a href='/dashboard'>
                                <div className="user-option">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/128/6820/6820955.png"
                                        alt="Dashboard"
                                        className="option-icon"
                                    />
                                    Dashboard
                                </div>
                            </a>
                            <a href='/login'>
                                <div className="user-option" href="/login">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/128/9068/9068818.png"
                                        alt="logout"
                                        className="option-icon"
                                    />
                                    <a href="/login">
                                        Sign Out
                                    </a>
                                </div>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Nav;
