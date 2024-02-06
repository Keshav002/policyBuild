import React, { useState, useCallback, useEffect } from "react";
import "./CompanyProfile.css";
import Nav from ".././components/Nav";
import { AiOutlineStar } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { LuPen } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL } from "../ConfigApi";
import { IoIosBusiness } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaUserFriends,
  FaRegCalendarAlt,
  FaPlusCircle,
} from "react-icons/fa";
import CompanyProjects from "./CompanyProjects";

function CompanyProfile() {
  const { id } = useParams();
  const loggedInUserId = useSelector((state) => state.user.userData.user_id);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [companyData, setCompanyData] = useState({});
  const [tags, setTags] = useState([]);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedTags, setEditedTags] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
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

  const DEPARTMENT_CHOICES = [
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "it", label: "IT" },
    { value: "retail", label: "Retail" },
  ];

  const COMPANY_CHOICES = [
    { value: "corporate", label: "Corporate" },
    { value: "startup", label: "Startup" },
    { value: "mnc", label: "MNC" },
    { value: "other", label: "Other" },
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

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    console.log("Mouse entered");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    console.log("Mouse left");
    setIsHovered(false);
  };

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const handleEditClick = () => {
    setEditedDescription(companyData.description);
    setEditedTags(tags);
    setIsEditPopupOpen(true);
  };
  const handleEditDetailPopupOpen = () => {
    editedDetails.headquarters = companyData.address;
    editedDetails.contactNumber = companyData.phoneno;
    editedDetails.website = companyData.website;
    editedDetails.employees = companyData.numofemploy;
    editedDetails.founded = companyData.companyregyear;
    setIsDetailsEditPopupOpen(true);
  };

  const handleCancelEditClick = () => {
    setEditedDescription("");
    setEditedTags([]);
    setIsEditPopupOpen(false);
  };

  const handleTagRemove = (tag) => {
    // Remove the tag
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  const handleTagsInputChange = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setEditedTags([...editedTags, e.target.value.trim()]);
      e.target.value = "";
    }
  };
  const handleEditSubmitClick = async () => {
    {
      try {
        const response = await fetch(`${API_URL}/main/companies/${id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify({
            description: editedDescription,
            tags: editedTags.join(", "),
          }),
        });
        if (response.ok) {
          fetchData();
        } else {
          console.error("Failed to update review");
        }
      } catch (error) {
        console.error("Error:", error);
      }
      setIsEditPopupOpen(false);
    }
  };

  const handleDetailsSubmitClick = async () => {
    try {
      const requestBody = {
        ...(editedDetails.headquarters && { address: editedDetails.headquarters }),
        ...(editedDetails.contactNumber && { phoneno: editedDetails.contactNumber }),
        ...(editedDetails.website && { website: editedDetails.website }),
        ...(editedDetails.employees && { numofemploy: editedDetails.employees }),
        ...(editedDetails.founded && { companyregyear: editedDetails.founded }),
        ...(editedDetails.companyType && { company_type: editedDetails.companyType }),
        ...(editedDetails.department && { department_type: editedDetails.department }),
      };
      const response = await fetch(`${API_URL}/main/companies/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error("Failed to update company details");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setIsDetailsEditPopupOpen(false);
  };

  const [isDetailsEditPopupOpen, setIsDetailsEditPopupOpen] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    headquarters: "",
    contactNumber: "",
    website: "",
    employees: "",
    founded: "",
    companyType: "",
    department: "",
  });

  const handlePhotoClick = () => {
    setIsPhotoDialogOpen(true);
  };
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const closePhotoDialog = () => {
    setIsPhotoDialogOpen(false);
  };

  const convertAndSetProfilePic = (base64String) => {
    const blob = base64ToBlob(base64String);
    const imageUrl = URL.createObjectURL(blob);
    setProfilePicture(imageUrl);
  };
  const base64ToBlob = (base64String, contentType = "image/png") => {
    const byteCharacters = atob(base64String);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([byteArray], { type: contentType });
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
      const response = await fetch(`${API_URL}/main/companies/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify({
          profilepic: base64Image,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      alert("Image uploaded successfully!");
      fetchData();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    }
  };

  const handleCompanyTypeChange = (e) => {
    setEditedDetails({
      ...editedDetails,
      companyType: e.target.value,
    });
  };

  const handleDepartmentChange = (e) => {
    setEditedDetails({
      ...editedDetails,
      department: e.target.value,
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/main/companies/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        setIsOwnProfile(data.user.id === loggedInUserId);
        const tagsArray = data.tags
          ? data.tags.split(",").map((tag) => tag.trim())
          : [];
        setTags(tagsArray);
        setCompanyData(data);
        if (data.profilepic !== null) {
          convertAndSetProfilePic(data.profilepic);
        }
      } else {
        console.error("Failed to fetch data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitClick = async () => {
    {
      try {
        const response = await fetch(
          `${API_URL}/main/companies/${id}/reviews/create/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
            body: JSON.stringify({
              rating: rating,
              comment: review,
              company: id,
              user: loggedInUserId,
            }),
          }
        );
        if (response.ok) {
          fetchData();
        } else {
          console.error("Failed to update review");
        }
      } catch (error) {
        console.error("Error:", error);
      }
      setIsRatingOpen(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, loggedInUserId]);

  return (
    <div
      // className={`company-profile-page ${
      //   isPhotoDialogOpen ? "with-overlay" : ""
      // }`}
      className="company-profile-page"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPhotoDialogOpen && (
        <div className="company-profile-rating-popup-overlay">
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
              {selectedImage ? (
                <div>
                  {/* Render selected image */}
                  <img
                    src={selectedImage}
                    alt="Selected Profile"
                    style={{
                      height: "180px",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              ) : (
                <div>
                  {/* Render text and default image */}
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
                      src="https://static.licdn.com/aero-v1/sc/h/c5ybm82ti04zuasz2a0ubx7bu"
                      alt="Default Profile"
                      style={{
                        height: "104px",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
              )}
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
                <button>
                  <label htmlFor="uploadButton">Select Photo</label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    onChange={handlePhotoUpload}
                    className="company-profile-upload-input"
                    id="uploadButton"
                  />
                </button>
                {selectedImage && (
                  <button onClick={handleUpload}>Upload Photo</button>
                )}
                <button
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
        </div>
      )}

      <Nav />
      <div className="company-profile-banner">
        {isOwnProfile && (
          <button className="edit-button" onClick={handleEditClick}>
            <LuPen />
          </button>
        )}
        <div class="consultant_profile_picture">
          <div class="image-container">
            <img
              src={
                profilePicture !== null
                  ? profilePicture
                  : "https://cdn-icons-png.flaticon.com/128/8013/8013505.png"
              }
              alt="User Profile"
            />
            {isOwnProfile && (
              <div
                class="consultant_profile_overlay"
                onClick={() => setIsPhotoDialogOpen(true)}
              >
                <span class="change-text">Change</span>
              </div>
            )}
          </div>
        </div>
        {companyData && companyData.user && (
          <div className="company-profile-info">
            <h1 className="company-profile-name">
              {companyData.user.username}
            </h1>
            <p className="company-profile-description">
              {companyData.description}
            </p>
            <div className="company-profile-tags">
              {tags.map((tag, index) => (
                <span key={index} className="company-profile-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

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
        <div className="company-profile-rating-popup-overlay">
          <div className="consultant_profile_edit_popup">
            <label htmlFor="editedDescription">Company Description</label>
            <input
              type="text"
              id="editedDescription"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />

            <label htmlFor="editedTags">Tags:</label>
            <div className="tags-container">
              {editedTags.map((tag) => (
                <div key={tag} className="cp_tag">
                  {tag}
                  <button onClick={() => handleTagRemove(tag)}>&times;</button>
                </div>
              ))}
            </div>
            <input
              type="text"
              id="editedTags"
              placeholder="Add a tag"
              onKeyPress={handleTagsInputChange}
            />

            <div className="company-profile-rating-popup__buttons">
              <button onClick={handleEditSubmitClick}>Submit</button>
              <button onClick={handleCancelEditClick}>Cancel</button>
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
          {isOwnProfile && (
            <button
              className="company-details-edit-button"
              onClick={handleEditDetailPopupOpen}
            >
              <LuPen />
            </button>
          )}
        </h2>
      </div>
      {companyData && companyData.user && (
        <div className="company-profile-remaining-info">
          <div className="company-profile-info-item">
            <div className="info-icon">
              <FaMapMarkerAlt className="info-icon" />
            </div>
            <div className="info-details">
              <span className="info-label">Headquaters</span>
              <span className="info-value">{companyData.address}</span>
            </div>
          </div>
          <div className="company-profile-info-item">
            <div className="info-icon">
              <FaPhone className="info-icon" />
            </div>
            <div className="info-details">
              <span className="info-label">Contact No.:</span>
              <span className="info-value">{companyData.phoneno}</span>
            </div>
          </div>
          <div className="company-profile-info-item">
            <div className="info-icon">
              <FaGlobe className="info-icon" />
            </div>
            <div className="info-details">
              <span className="info-label">Website</span>
              <span className="info-value">{companyData.website}</span>
            </div>
          </div>
          <div className="company-profile-info-item">
            <div className="info-icon">
              <FaUserFriends className="info-icon" />
            </div>
            <div className="info-details">
              <span className="info-label">Employees</span>
              <span className="info-value">{companyData.numofemploy}</span>
            </div>
          </div>
          <div className="company-profile-info-item">
            <div className="info-icon">
              <FaRegCalendarAlt className="info-icon" />
            </div>
            <div className="info-details">
              <span className="info-label">Founded</span>
              <span className="info-value">{companyData.companyregyear}</span>
            </div>
          </div>
          <div className="company-profile-info-item">
            <div className="info-icon">
              <MdEmail className="info-icon" />
            </div>
            <div className="info-details">
              <span className="info-label">Email</span>
              <span className="info-value">{companyData.user.email}</span>
            </div>
          </div>
          <div className="company-profile-info-item">
            <div className="info-icon">
              <FaBuilding className="info-icon" />
            </div>
            <div className="info-details">
              <span className="info-label">Company Type</span>
              <span className="info-value">{companyData.company_type}</span>
            </div>
          </div>
          <div className="company-profile-info-item">
            <div className="info-icon">
              <FaToolbox className="info-icon" />
            </div>
            <div className="info-details">
              <span className="info-label">Company Department</span>
              <span className="info-value">{companyData.department_type}</span>
            </div>
          </div>
        </div>
      )}

      {isDetailsEditPopupOpen && (
        <div className="company-profile-rating-popup-overlay">
          <div className="consultant_profile_edit_popup">
            <label htmlFor="editedHeadquarters">Headquarters</label>
            <input
              type="text"
              id="editedHeadquarters"
              value={editedDetails.headquarters}
              onChange={(e) =>
                setEditedDetails({
                  ...editedDetails,
                  headquarters: e.target.value,
                })
              }
            />

            <label htmlFor="editedContactNumber">Contact Number</label>
            <input
              type="text"
              id="editedContactNumber"
              value={editedDetails.contactNumber}
              onChange={(e) =>
                setEditedDetails({
                  ...editedDetails,
                  contactNumber: e.target.value,
                })
              }
            />
            <label htmlFor="editedWebsite">Website</label>
            <input
              type="text"
              id="editedWebsite"
              value={editedDetails.website}
              onChange={(e) =>
                setEditedDetails({ ...editedDetails, website: e.target.value })
              }
            />
            <label htmlFor="editedEmployees">Number of Employees</label>
            <input
              type="text"
              id="editedEmployees"
              value={editedDetails.employees}
              onChange={(e) =>
                setEditedDetails({
                  ...editedDetails,
                  employees: e.target.value,
                })
              }
            />
            <label htmlFor="editedFounded">Founded</label>
            <input
              type="text"
              id="editedFounded"
              value={editedDetails.founded}
              onChange={(e) =>
                setEditedDetails({ ...editedDetails, founded: e.target.value })
              }
            />
            <label htmlFor="editedCompanyType">Company Type</label>
            <select
              id="editedCompanyType"
              value={editedDetails.companyType}
              onChange={handleCompanyTypeChange}
              className="custom-select"
            >
              <option value="">Select Company Type</option>
              {COMPANY_CHOICES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <label htmlFor="editedDepartment">Department</label>
            <select
              id="editedDepartment"
              value={editedDetails.department}
              onChange={handleDepartmentChange}
              className="custom-select"
            >
              <option value="">Select Department</option>
              {DEPARTMENT_CHOICES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <div className="company-profile-rating-popup__buttons">
              <button type="submit" onClick={handleDetailsSubmitClick}>
                Submit
              </button>
              <button onClick={() => setIsDetailsEditPopupOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}



      {/* <div className="company-details-heading-div">
        <h2 className="company-details-heading">Reviews</h2>
      </div> */}
      {/* <div className="company-profile-reviews cpr_reviews">
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
      </div> */}
    </div>
  );
}

export default CompanyProfile;
