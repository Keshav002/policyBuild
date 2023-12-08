import React, { useState } from "react";
import "./ConsultantProfile.css"; // Import your CSS file for styling
import Nav from ".././components/Nav";
import {
  IoMdMail,
  IoMdCheckmarkCircleOutline,
  IoMdCalendar,
  IoMdPhonePortrait,
  IoMdSend,
  IoIosSync,
  IoMdDownload,
} from "react-icons/io";
import { BiSolidBriefcaseAlt2 } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineStar } from "react-icons/ai";
import { RxDownload } from "react-icons/rx";
import { RxPencil1 } from "react-icons/rx";

function ConsultantProfile() {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const handleStarClick = (starNumber) => {
    setRating(starNumber);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };
  const keySkills = [
    "Communication",
    "Problem Solving",
    "Teamwork",
    "JavaScript",
    "Data Analysis",
  ];

  const handleCancelClick = () => {
    setIsRatingOpen(false);
    setRating(0);
    setReview("");
  };

  const handleSubmitClick = () => {
    setIsRatingOpen(false);
    setRating(0);
    setReview("");
  };
  return (
    <div className="consultant_profile_page">
      <Nav />
      <div className="consultant_profile_banner">
        <div className="consultant_profile_picture">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            alt="User Profile"
          />
        </div>
        <div className="consultant_profile_details">
          <h2 style={{ marginBottom: "5px" }}>Keshav Tayal</h2>
          {/* <p style={{marginBottom:"5px"}}>Profile last updated - 13Sep , 2023</p> */}
          <hr />
          <div className="consultant_profile_banner_data">
            <div className="consultant_profile_banner_data_c1">
              <p className="constultant_profile_banner_personal_detail">
                <IoLocationSharp className="constultant_profile_banner_personal_detail_icon" />{" "}
                Jind, INDIA
              </p>
              <p className="constultant_profile_banner_personal_detail">
                <BiSolidBriefcaseAlt2 className="constultant_profile_banner_personal_detail_icon" />{" "}
                2 Years
              </p>
            </div>
            <div className="consultant_profile_banner_data_c2">
              <p className="constultant_profile_banner_personal_detail">
                <IoMdPhonePortrait className="constultant_profile_banner_personal_detail_icon" />{" "}
                7082345655
              </p>
              <p className="constultant_profile_banner_personal_detail">
                <IoMdMail className="constultant_profile_banner_personal_detail_icon" />{" "}
                keshavtayal002@gmail.com
              </p>
            </div>
          </div>
          {/* <hr/> */}
          <div className="company-profile-tags">
            <span className="company-profile-tag">Businees Analyst</span>
            <span className="company-profile-tag">Consultant</span>
            <span className="company-profile-tag">Engineer</span>
            <span className="company-profile-tag">Document Reviewer</span>
          </div>
          <div className="company-profile-buttons">
            <button
              className="company-profile-button company-profile-rate-button"
              onClick={() => setIsRatingOpen(true)}
            >
              <AiOutlineStar /> Rate me
            </button>
            <button className="company-profile-button company-profile-apply-button">
              Connect <IoMdSend />
            </button>
          </div>
        </div>
        {isRatingOpen && (
          <div className="company-profile-rating-popup-overlay">
            <div className="company-profile-rating-popup">
              <div className="company-profile-rating-popup__stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`company-profile-rating-popup__star ${
                      star <= rating ? "filled" : ""
                    }`}
                    onClick={() => handleStarClick(star)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <textarea
                className="company-profile-rating-popup__textarea"
                placeholder="Write your review..."
                value={review}
                onChange={handleReviewChange}
              />
              <div className="company-profile-rating-popup__buttons">
                <button onClick={handleSubmitClick}>Submit</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="consultant_profile_professional_summary">
        <h3>Professional Summary</h3>
        <p>
          Experienced and results-oriented Business Analyst and Consultant with
          a proven track record of success in various projects. Specialized in
          document review and analysis. Dedicated to delivering high-quality
          solutions that meet client needs and exceed expectations.
          Detail-oriented and effective communicator with strong analytical and
          problem-solving skills.
        </p>
      </div>

      <div className="consultant_profile_resume_section">
        <h3>Resume</h3>
        <div className="resume_box">
          <p>Resume: Keshav_Tayal_Resume.pdf</p>
          <div className="resume_buttons">
            <button className="download_button">
              <RxDownload />
            </button>

            <button className="update_button">
              <RxPencil1 />
            </button>
          </div>
        </div>
      </div>

      <div className="consultant_profile_key_skills_section">
        <h3>Key Skills</h3>
        <div className="consultant_profile_key_skills_tags">
          {keySkills.map((skill, index) => (
            <span key={index} className="consultant_profile_key_skill_tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
      {/* You can add a similar set of buttons for DOC file if needed */}

      {/* ... (existing code below) */}
    </div>
  );
}

export default ConsultantProfile;
