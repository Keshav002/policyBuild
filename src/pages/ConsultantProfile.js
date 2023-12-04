import React from 'react';
import './ConsultantProfile.css'; // Import your CSS file for styling
import Nav from ".././components/Nav";
import { IoMdMail, IoMdCheckmarkCircleOutline, IoMdCalendar, IoMdPhonePortrait } from 'react-icons/io';
import { BiSolidBriefcaseAlt2 } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
function ConsultantProfile() {
  return (
    <div className='consultant_profile_page'>
        <Nav/>
      <div className='consultant_profile_banner'>
        <div className='consultant_profile_picture'>
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            alt="User Profile"
          />
        </div>
        <div className='consultant_profile_details'>
          <h2>Keshav</h2>
          <p>Profile last updated - 13Sep , 2023</p>
          <hr/>
          <p className='locationOneTheme'>
            <IoLocationSharp /> Jind, INDIA
          </p>
          <p className='experienceOneTheme'>
          <BiSolidBriefcaseAlt2 /> 2 Years
          </p>
          <p className='phoneOneTheme'>
            <IoMdPhonePortrait /> 7082345655
          </p>
          <p className='verifiedOneTheme'>
            <IoMdMail /> keshavtayal002@gmail.com
          </p>
          <hr/> 
        </div>
      </div>
      {/* Rest of the consultant profile content goes here */}
    </div>
  );
}

export default ConsultantProfile;
