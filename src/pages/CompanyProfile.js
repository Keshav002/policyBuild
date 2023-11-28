// CompanyProfile.jsx

import React, { useState } from "react";
import "./CompanyProfile.css";
import Nav from ".././components/Nav";
import { AiOutlineStar } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaUserFriends,
  FaRegCalendarAlt,
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
      icon: <FaRegCalendarAlt className="info-icon" />,
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

  return (
    <div className="company-profile-page">
      <Nav />
      <div className="company-profile-banner">
        <div className="company-profile-logo">
          <img
            src="https://mergerlinks-production.s3.eu-west-2.amazonaws.com/files/company/65710/logo/ENVERUS.jpg"
            alt="Company Logo"
            className="company-profile-logo-img"
          />
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
            {/* Add more tags as needed */}
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
        <h2 className="company-details-heading">Company Details</h2>
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
