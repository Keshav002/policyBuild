import React, { useState, useCallback } from "react";
import "./CompanyProfile.css";
import Nav from ".././components/Nav";
import { AiOutlineStar } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { LuPen } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { API_URL } from '../ConfigApi';

import {
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaUserFriends,
  FaRegCalendarAlt,
  FaPlusCircle,
} from "react-icons/fa";

function CompanyProfile() {
  const infoItems = [
    {
      icon: <FaMapMarkerAlt className="info-icon" />,
      label: "Headquaters",
      value: "2901 Via Fortuna, Building 6, Suite 200, Austin, TX 78746",
    },

    {
      icon: <FaPhone className="info-icon" />,
      label: "Contact No.",
      value: "9998887776665",
    },
    {
      icon: <FaGlobe className="info-icon" />,
      label: "Website",
      value: "www.enverus.com",
    },
    {
      icon: <FaUserFriends className="info-icon" />,
      label: "Employees",
      value: "1000+",
    },
    {
      icon: <FaRegCalendarAlt className="info-icon" />,
      label: "Founded",
      value: "Oct 22, 1999",
    },
    {
      icon: <MdEmail className="info-icon" />,
      label: "Email",
      value: "support@enverus.com",
    },
  ];

  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const reviews = [
    {
      stars: 5,
      text: "This company is fantastic!. I highly recommend their services to anyone in the energy industry",
      name: "Keshav",
    },
    {
      stars: 4,
      text: "Good service and products. I have been using their services for a while, and I am quite satisfied with the overall experience. The staff is friendly, and the products are of high quality.",
      name: "Amarjeet",
    },
    {
      stars: 3,
      text: "Average experience. The company provides decent services, but there is room for improvement. The customer support could be more responsive, and the website interface needs some updates.",
      name: "Keshav",
    },
    {
      stars: 5,
      text: "Exceptional! Enverus has exceeded my expectations. Their attention to detail and commitment to customer satisfaction are commendable. I highly recommend their services to anyone in the energy industry.",
      name: "Mohit",
    },
    {
      stars: 2,
      text: "Not impressed. I had a difficult time navigating their website, and the customer service was unhelpful. The quality of their products did not meet my expectations.",
      name: "Saurabh",
    },
    {
      stars: 4,
      text: "Great energy solutions! Enverus has been a reliable partner for our energy needs. Their innovative solutions have helped streamline our processes and improve efficiency. Looking forward to continued collaboration.",
      name: "Naveen",
    },
    // Add more reviews as needed
  ];

  const handleStarClick = (starNumber) => {
    setRating(starNumber);
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

  const [isHovered, setIsHovered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleMouseEnter = () => {
    console.log("Mouse entered");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    console.log("Mouse left");
    setIsHovered(false);
  };

  const handleClick = () => {
    console.log("Button clicked");
    setIsEditMode(!isEditMode);
  };

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditPopupOpen(!isEditPopupOpen);
  };

  const handleSubmitEditClick = () => {
    console.log("Form submitted");
    setIsEditPopupOpen(false);
  };

  const handleCancelEditClick = () => {
    console.log("Edit cancelled");
    setIsEditPopupOpen(false);
  };

 

  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleRemoveTag = (index) => {
    const updatedTags = [...selectedTags];
    updatedTags.splice(index, 1);
    setSelectedTags(updatedTags);
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setSelectedTags([...selectedTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const [isDetailsEditPopupOpen, setIsDetailsEditPopupOpen] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    headquarters: "",
    contactNumber: "",
    website: "",
    employees: "",
    founded: "",
    email: "",
  });

  const handleDetailsFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/main/companies/id/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedDetails),
      });
      if (response.ok) {
        setIsDetailsEditPopupOpen(false);
      } else {
        console.error('Failed to update details:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
    setIsDetailsEditPopupOpen(false);
  };

  const handlePhotoClick = () => {
    setIsPhotoDialogOpen(true);
  };
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(true);
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
    try {
      if (!selectedImage) {
        console.error('No image selected');
        return;
      }
      const response = await fetch(`${API_URL}/main/companies/id/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photo: selectedImage }),
      });
      if (response.ok) {
        setIsPhotoDialogOpen(false);
      } else {
        console.error('Failed to upload photo:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('your_backend_endpoint', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          companyDescription,
          companyTags: selectedTags,
        }),
      });
      if (response.ok) {
        setIsEditPopupOpen(false);
      } else {
        console.error('Failed to update company details:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };



  return (
    <div
      className={`company-profile-page ${
        isPhotoDialogOpen ? "with-overlay" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <label
                  htmlFor="uploadButton"
                  className="company-profile-upload-button"
                  style={{ marginLeft: "10px", marginTop: "2px" }}
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
              </div>

              {selectedImage && (
                <button
                  className="company-profile-upload-button"
                  onClick={handleUpload}
                >
                  Upload Photo
                </button>
              )}

              <button
                className="company-profile-clear-button"
                onClick={() => setSelectedImage(null)}
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      <Nav />
      <div className="company-profile-banner">
        <button className="edit-button" onClick={handleEditClick}>
          <LuPen />
        </button>

        <div
          className="company-profile-logo"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <img
            src="https://mergerlinks-production.s3.eu-west-2.amazonaws.com/files/company/65710/logo/ENVERUS.jpg"
            alt="Company Logo"
            className="company-profile-logo-img"
          />
          {isHovered && !isPhotoDialogOpen && (
            <div
              className="change-profile-button"
              onClick={handlePhotoClick}
              style={{
                position: "absolute",
                top: "4%",
                left: "4%",
                right: "34%",
                bottom: "8%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.5)",
                borderRadius: "8px",
                border: "2px solid white",
              }}
            >
              <FaPlusCircle
                className="add-photo-icon"
                style={{ fontSize: "24px" }}
              />
              <span
                className="add-photo-text"
                style={{ color: "white", fontSize: "16px" }}
              >
                Add Photo
              </span>
            </div>
          )}
        </div>

        <div className="company-profile-info">
          <h1 className="company-profile-name">Enverus</h1>
          <p className="company-profile-description">
            Enverus Source-To-Pay, built for the energy industry, empowers
            companies to manage and execute sourcing, contract management,
            ordering, dispatch, receiving and payables on a single platform.
          </p>
          <div className="company-profile-tags">
            <span className="company-profile-tag">Oil and Gas</span>
            <span className="company-profile-tag">Energy</span>
            <span className="company-profile-tag">Analytics</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="company-profile-buttons">
          <button
            className="company-profile-button company-profile-rate-button"
            onClick={() => setIsRatingOpen(true)}
          >
            <AiOutlineStar /> Rate Us
          </button>
          <button className="company-profile-button company-profile-apply-button">
            Apply <IoMdSend />
          </button>
        </div>
      </div>

      {isEditPopupOpen && (
        <div className="company-profile-edit-popup-overlay">
          <div className="company-profile-edit-popup-container">
            <div className="company-profile-edit-popup">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label
                    htmlFor="companyName"
                    className="company-profile-form-label"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="company-profile-form-control"
                    id="companyName"
                    placeholder="Enter company name..."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="companyName"
                    className="company-profile-form-label"
                  >
                    Company Description
                  </label>
                  <input
                    type="text"
                    className="company-profile-form-control"
                    id="companyName"
                    row="3"
                    placeholder="Enter company description..."
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="companyTags"
                    className="company-profile-form-label"
                  ></label>
                  <div className="selected-tags-container">
                    {selectedTags.map((tag, index) => (
                      <span key={index} className="selected-tag">
                        {tag}{" "}
                        <span onClick={() => handleRemoveTag(index)}>✕</span>
                      </span>
                    ))}
                  </div>
                  <div className="tag-input-container">
                    <input
                      type="text"
                      className="company-profile-form-control"
                      id="companyTags"
                      placeholder="Add tags (e.g., oil&gas, energy, analytics...)"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddTag();
                        }
                      }}
                    />
                  </div>
                </div>
              </form>

              <div className="company-profile-edit-popup__buttons">
                <button onClick={handleSubmitEditClick}>Submit</button>
                <button onClick={handleCancelEditClick}>Cancel</button>
              </div>
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

      <div className="company-details-heading-div">
        <h2 className="company-details-heading">
          Company Details
          <button
            className="company-details-edit-button"
            onClick={() => setIsDetailsEditPopupOpen(true)}
          >
            <LuPen />
          </button>
        </h2>
      </div>

      <div className="company-profile-remaining-info">
        {infoItems.map((item, index) => (
          <div className="company-profile-info-item" key={index}>
            <div className="info-icon">{item.icon}</div>
            <div className="info-details">
              <span className="info-label">{item.label}:</span>
              <span className="info-value">{item.value}</span>
            </div>
            {index < infoItems.length - 1 && <hr className="info-separator" />}
          </div>
        ))}
      </div>

      {isDetailsEditPopupOpen && (
        <div className="company-profile-edit-popup-overlay">
          <div className="company-profile-edit-popup">
            <form onSubmit={handleDetailsFormSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="headquarters"
                  className="company-profile-form-label"
                >
                  <FaMapMarkerAlt />
                  <span style={{ marginLeft: "5px" }}>Headquarters</span>
                </label>
                <input
                  type="text"
                  className="company-profile-form-control"
                  id="headquarters"
                  placeholder="Enter headquarters"
                  value={editedDetails.headquarters}
                  onChange={(e) =>
                    setEditedDetails({
                      ...editedDetails,
                      headquarters: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="contactNumber"
                  className="company-profile-form-label"
                >
                  <FaPhone />
                  <span style={{ marginLeft: "5px" }}>Contact Number</span>
                </label>
                <input
                  type="tel"
                  className="company-profile-form-control"
                  id="contactNumber"
                  placeholder="Enter contact number"
                  value={editedDetails.contactNumber}
                  onChange={(e) =>
                    setEditedDetails({
                      ...editedDetails,
                      contactNumber: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label htmlFor="website" className="company-profile-form-label">
                  <FaGlobe />
                  <span style={{ marginLeft: "5px" }}>Website</span>
                </label>
                <input
                  type="url"
                  className="company-profile-form-control"
                  id="website"
                  placeholder="www.example.com"
                  value={editedDetails.website}
                  onChange={(e) =>
                    setEditedDetails({
                      ...editedDetails,
                      website: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="employees"
                  className="company-profile-form-label"
                >
                  <FaUserFriends />
                  <span style={{ marginLeft: "5px" }}>Employees</span>
                </label>
                <input
                  type="text"
                  className="company-profile-form-control"
                  id="employees"
                  placeholder="Enter number of employees"
                  value={editedDetails.employees}
                  onChange={(e) =>
                    setEditedDetails({
                      ...editedDetails,
                      employees: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label htmlFor="founded" className="company-profile-form-label">
                  <FaRegCalendarAlt />
                  <span style={{ marginLeft: "5px" }}>Founded</span>
                </label>
                <input
                  type="date"
                  className="company-profile-form-control"
                  id="founded"
                  placeholder="Select founding date"
                  value={editedDetails.founded}
                  onChange={(e) =>
                    setEditedDetails({
                      ...editedDetails,
                      founded: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="company-profile-form-label">
                  <MdEmail />
                  <span style={{ marginLeft: "5px" }}>Email</span>
                </label>
                <input
                  type="email"
                  className="company-profile-form-control"
                  id="email"
                  placeholder="support@example.com"
                  value={editedDetails.email}
                  onChange={(e) =>
                    setEditedDetails({
                      ...editedDetails,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="company-profile-edit-popup__buttons">
                <button type="submit">Submit</button>
                <button onClick={() => setIsDetailsEditPopupOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="company-details-heading-div">
        <h2 className="company-details-heading">Reviews</h2>
      </div>
      <div className="company-profile-reviews cpr_reviews">
        {reviews.map((review, index) => (
          <div key={index} className="cpr_review">
            <div className="cpr_review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cpr_review_star ${
                    star <= review.stars ? "filled" : ""
                  }`}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <p className="cpr_review-card-text">{review.text}</p>
            <p className="cpr_reviews-card-name">{review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyProfile;