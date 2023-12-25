import React, { useState } from "react";
import "./ConsultantProfile.css"; // Import your CSS file for styling
import Nav from ".././components/Nav";
import { API_URL } from '../ConfigApi';
import { useParams } from "react-router-dom";
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
import { FaStar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineStar } from "react-icons/ai";
import { RxDownload } from "react-icons/rx";
import { RxPencil1 } from "react-icons/rx";
import { BiSolidPencil } from "react-icons/bi";
const keySkills = [
  "Communication",
  "Problem Solving",
  "Teamwork",
  "JavaScript",
  "Data Analysis",
];
function ConsultantProfile() {
  const { id } = useParams();
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const handleStarClick = (starNumber) => {
    setRating(starNumber);
  };
  const [isEditOpen, setIsEditOpen] = useState(false); // New state for the edit popup
  const [editedLocation, setEditedLocation] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedExperience, setEditedExperience] = useState("");
  const [tags, setTags] = useState([]); 
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [editedTags, setEditedTags] = useState([]);
  const [professionalSummary, setProfessionalSummary] =
  useState("");
  const [isEditSummaryOpen, setIsEditSummaryOpen] = useState(false);
  const [editedProfessionalSummary, setEditedProfessionalSummary] =
    useState("");
  const [isEditSkillsOpen, setIsEditSkillsOpen] = useState(false);
  const [editedKeySkills, setEditedKeySkills] = useState([...keySkills]);
  const [newSkill, setNewSkill] = useState("");

  const handleEditSkillsClick = () => {
    setIsEditSkillsOpen(true);
  };

  const handleCancelEditSkillsClick = () => {
    setIsEditSkillsOpen(false);
    setEditedKeySkills([...keySkills]);
    setNewSkill("");
  };

  const handleEditSkillsSubmitClick = async () => {
    try {
      const response = await fetch(`${API_URL}/main/consultants/id/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          keySkills: editedKeySkills.join(', '), 
        }),
      });
  
      if (response.ok) {
        console.log('Key skills updated successfully');
      } else {
        if (response.status === 401) {
          console.error('Unauthorized - Please check your authentication token');
        } else if (response.status === 400) {
          console.error('Bad Request - Check your request payload');
        } else {
          console.error('Failed to update key skills. Status:', response.status);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setIsEditSkillsOpen(false);
  };
  

  const handleSkillRemove = (skill) => {
    const updatedSkills = editedKeySkills.filter((s) => s !== skill);
    setEditedKeySkills(updatedSkills);
  };

  const handleSkillsInputChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleSkillAdd = () => {
    if (newSkill.trim() !== "") {
      setEditedKeySkills([...editedKeySkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleSummaryEditClick = () => {
    setIsEditSummaryOpen(true);
    setEditedProfessionalSummary("");
  };

  const handleCancelSummaryEditClick = () => {
    setIsEditSummaryOpen(false);
    setEditedProfessionalSummary("");
  };
  const handleEditSummarySubmitClick = async () => {
    try {
      const response = await fetch(`${API_URL}/main/consulatans/id/`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${authToken}`, 
        },
        body: JSON.stringify({
          bio: editedProfessionalSummary,
        }),
      });
      if (response.ok) {
        console.log('Summary updated successfully');
      } else {
        console.error('Failed to update summary');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setIsEditSummaryOpen(false);
  };
  

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleCancelEditClick = () => {
    setIsEditOpen(false);
    setEditedLocation("");
    setEditedPhone("");
    setTags([]);
    setEditedExperience("");
  };
  const handleEditSubmitClick = async () => {
    try {
      const response = await fetch(`${API_URL}/main/consultants/id/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${authToken}`,
        },
          body: JSON.stringify({
          location: editedLocation,
          phone: editedPhone,
          tags: tags, // Assuming you want to send the array of tags as-is
          experience: editedExperience,
        }),
      });
      if (response.ok) {
        console.log('Profile updated successfully');
      } else {
        if (response.status === 401) {
          console.error('Unauthorized - Please check your authentication token');
        } else if (response.status === 400) {
          console.error('Bad Request - Check your request payload');
        } else {
          console.error('Failed to update profile. Status:', response.status);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setIsEditOpen(false);
  };
  

  const handleTagRemove = (tag) => {
    // Remove the tag
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  const handleTagsInputChange = (e) => {
    // Handle tag input change, add tag if Enter is pressed
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

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
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const closePhotoDialog = () => {
    setIsPhotoDialogOpen(false);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image before uploading.");
      return;
    }
    const base64Image = selectedImage.split(",")[1];
    try {
      const response = await fetch(`${API_URL}/main/consultants/id/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Upload response:', data);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error('Error uploading image:', error);
      alert("Error uploading image. Please try again.");
    }
  };
  
  return (
    <div className="consultant_profile_page">
      <Nav />
      <div className="consultant_profile_banner">
        <div className="consultant_profile_edit_button">
          <BiSolidPencil onClick={handleEditClick} />
        </div>
        <div class="consultant_profile_picture">
          <div class="image-container">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              alt="User Profile"
            />
            <div
              class="consultant_profile_overlay"
              onClick={() => setIsPhotoDialogOpen(true)}
            >
              <span class="change-text">Change</span>
            </div>
          </div>
        </div>

        <div className="consultant_profile_details">
          <h2 style={{ marginBottom: "5px" }}>Keshav Tayal</h2>
          {/* <p style={{marginBottom:"5px"}}>Profile last updated - 13Sep , 2023</p> */}
          <hr />
          <div className="consultant_profile_banner_data">
            <div className="consultant_profile_banner_data_c1">
              <p className="constultant_profile_banner_personal_detail">
                <FaStar className="constultant_profile_banner_personal_detail_icon" />{" "}
                4.5
              </p>
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
        {isPhotoDialogOpen && (
          <div
            className="company-profile-photo-upload-dialog"
            style={{ fontFamily: "Santoshi" }}
          >
            <div className="company-profile-photo-upload-dialog-content">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  className="company-profile-close-dialog"
                  onClick={closePhotoDialog}
                  style={{ fontSize: "24px" }}
                >
                  &times;
                </span>
                <h2 style={{ marginLeft: "0px" }}>Add Photo </h2>
              </div>
              <hr
                style={{
                  marginTop: "10px",
                  marginBottom: "15px",
                  width: "100%",
                  border: "0.1px solid #ddd",
                }}
              />
              <h4 style={{ fontSize: "20px", marginTop: "14px" }}>
                Elevate your presence with a polished profile picture.
              </h4>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15px",
                }}
              >
                <img
                  src={
                    selectedImage ||
                    "https://static.licdn.com/aero-v1/sc/h/c5ybm82ti04zuasz2a0ubx7bu"
                  }
                  alt="Profile"
                  style={{
                    width: "438px",
                    height: "104px",
                    borderRadius: "8px",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                />
              </div>

              <hr
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  width: "100%",
                  border: "0.1px solid #ddd",
                  marginLeft: "0px",
                }}
              />

              <div className="company-profile-rating-popup__buttons">
                {/* <div> */}
                <button>
                  <label
                    htmlFor="uploadButton"
                    // className="company-profile-upload-button"
                    // style={{ marginLeft: "10px", marginTop: "2px" }}
                  >
                    Select Photo
                    </label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    onChange={handlePhotoUpload}
                    className="company-profile-upload-input"
                    id="uploadButton"
                    />
                    </button>
                {/* </div> */}

                {selectedImage && (
                  <button
                    // className="company-profile-upload-button"
                    onClick={handleUpload}
                  >
                    Upload Photo
                  </button>
                )}

                <button
                  // className="company-profile-clear-button"
                  onClick={() => {
                    setSelectedImage(null);
                    const inputElement =
                      document.getElementById("uploadButton");
                    if (inputElement) {
                      inputElement.value = "";
                    }
                  }}
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}
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
        {isEditOpen && (
          <div className="company-profile-rating-popup-overlay">
            <div className="consultant_profile_edit_popup">
              <label htmlFor="editedPhone">Phone Number:</label>
              <input
                type="tel"
                id="editedPhone"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
              />
              <label htmlFor="editedLocation">Location:</label>
              <input
                type="text"
                id="editedLocation"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
              />
              <label htmlFor="editedTags">Tags:</label>
              <div className="tags-container">
                {tags.map((tag) => (
                  <div key={tag} className="cp_tag">
                    {tag}
                    <button onClick={() => handleTagRemove(tag)}>
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                id="editedTags"
                placeholder="Add a tag"
                onKeyPress={handleTagsInputChange}
              />

              <label htmlFor="editedExperience">Years of Experience:</label>
              <input
                type="number"
                id="editedExperience"
                value={editedExperience}
                onChange={(e) => setEditedExperience(e.target.value)}
              />

              <div className="company-profile-rating-popup__buttons">
                <button onClick={handleEditSubmitClick}>Submit</button>
                <button onClick={handleCancelEditClick}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="consultant_profile_professional_summary">
        <div className="consultant_profile_edit_button">
          <BiSolidPencil onClick={handleSummaryEditClick} />
        </div>
        <h3>Professional Summary</h3>
        <p>
          Experienced and results-oriented Business Analyst and Consultant with
          a proven track record of success in various projects. Specialized in
          document review and analysis. Dedicated to delivering high-quality
          solutions that meet client needs and exceed expectations.
          Detail-oriented and effective communicator with strong analytical and
          problem-solving skills.
        </p>
        {isEditSummaryOpen && (
          <div className="company-profile-rating-popup-overlay">
            <div className="consultant_profile_edit_popup">
              <label htmlFor="editedProfessionalSummary">
                Professional Summary:
              </label>
              <textarea
                id="editedProfessionalSummary"
                value={editedProfessionalSummary}
                onChange={(e) => setEditedProfessionalSummary(e.target.value)}
              />
              <div className="company-profile-rating-popup__buttons">
                <button onClick={handleEditSummarySubmitClick}>Submit</button>
                <button onClick={handleCancelSummaryEditClick}>Cancel</button>
              </div>
            </div>
          </div>
        )}
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
        <div className="consultant_profile_edit_button">
          <BiSolidPencil onClick={handleEditSkillsClick} />
        </div>
        <h3>Key Skills</h3>
        <div className="consultant_profile_key_skills_tags">
          {keySkills.map((skill, index) => (
            <span key={index} className="consultant_profile_key_skill_tag">
              {skill}
            </span>
          ))}
        </div>
        {isEditSkillsOpen && (
          <div className="company-profile-rating-popup-overlay">
            <div className="consultant_profile_edit_popup">
              <label htmlFor="editedKeySkills">Key Skills:</label>
              <div className="tags-container">
                {editedKeySkills.map((skill) => (
                  <div key={skill} className="cp_tag">
                    {skill}
                    <button onClick={() => handleSkillRemove(skill)}>×</button>
                  </div>
                ))}
              </div>
              <input
                style={{ marginTop: "15px", padding: "10px" }}
                type="text"
                id="editedKeySkills"
                placeholder="Add a skill"
                value={newSkill}
                onChange={handleSkillsInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleSkillAdd()}
              />
              <div className="company-profile-rating-popup__buttons">
                <button onClick={handleEditSkillsSubmitClick}>Submit</button>
                <button onClick={handleCancelEditSkillsClick}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* You can add a similar set of buttons for DOC file if needed */}

      {/* ... (existing code below) */}
    </div>
  );
}

export default ConsultantProfile;
