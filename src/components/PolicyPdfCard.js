import React, { useState, useRef, useEffect } from "react";
import { BsFileEarmarkTextFill, BsThreeDotsVertical } from "react-icons/bs";
import "./PolicyPdfCard.css";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
function PolicyPdfCard({
  policy,
  userRole,
  handleDelete,
  openEditForm,
  documentUrl,
  projectId,
}) {
  const handleCardClick = () => {
    setIsMenuOpen(false);
    if (userRole === "Company") {
      navigate(`/company-projects/${projectId}/policy-list/${policy.id}/pdf`);
    } else if (userRole === "Consultant") {
      navigate(
        `/consultant-projects/${projectId}/policy-list/${policy.id}/pdf`
      );
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString(undefined, options);
  }
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const handleMenuToggle = (event) => {
    event.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const menuStyle = {
     top: "35%",
     right: "14%",
     fontWeight: "700",
 
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    setIsMenuOpen(false);
    openEditForm(policy.id);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setIsMenuOpen(false);
    handleDelete(policy.id);
  };

  const isCompanyRole = userRole === "Company";

  const listing = {
    imageUrl:
      "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1687866128/catalog/1673638354082381824/glwp0wyjvfu1bfggvazk.jpg", // Replace with your image URL
    featured: true,
    beds: 2,
    baths: 1,
    title: "Modern 2 Bedroom Apartment",
    address: "123 Main Street, Anytown, CA 12345",
    type: "Apartment",
    furnishing: "Unfurnished",
    price: 2500,
    sqft: 1000,
    pricePerSqft: 2.5,
    realtor: "John Doe",
    rent: null,
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="ppc_card" onClick={handleCardClick} ref={cardRef}>
      <img className="card-image" src={listing.imageUrl} alt={listing.title} />
      <div className="card-header">
        <div className="card-id-container">ID:{policy.id}</div>
        <p className="featured project-name-span">{policy.policy_name}</p>
        {isCompanyRole && (
          <BsThreeDotsVertical
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "45%",
              right: "8%",
            }}
            onClick={handleMenuToggle}
          />
        )}
        {isMenuOpen && (
          <div className="pc_menu" style={menuStyle}>
            <div
              onClick={(event) => {
                handleEditClick(event);
              }}
            >
              <BiSolidEdit
                style={{
                  marginRight: "10px",
                }}
              />
              Edit
            </div>
            <div
              onClick={(event) => {
                handleDeleteClick(event);
              }}
            >
              <AiFillDelete
                style={{
                  marginRight: "10px",
                }}
              />
              Delete
            </div>
          </div>
        )}
        <div className="card-info">
          <p className="beds">{policy.description}</p>
        </div>
      </div>
      <div className="policy-card-body">
        <div className="card-flex-1">
          <span className="cons-pro-card-heading">Policy Type:</span>
          <p className="project-name-span">{policy.policytype}</p>
        </div>
        <div className="card-flex-2">
          <span className="cons-pro-card-heading">Total Rating:</span>
          <p className="project-name-span">{policy.total_ratings} out of 10</p>
        </div>
      </div>
      <div className="policy-card-body">
        <div className="card-flex-1">
          <span className="cons-pro-card-heading">Created on:</span>
          <p className="project-name-span">
            {new Date(policy.created_at).toISOString().split("T")[0]}
          </p>
        </div>
        <div className="card-flex-2">
          <span className="cons-pro-card-heading">Updated on:</span>
          <p className="project-name-span">
            {new Date(policy.updated_at).toISOString().split("T")[0]}
          </p>
        </div>
      </div>
      {isCompanyRole && (
        <>
          <hr />
          <div className="policy-card-body" style={{ marginTop: "8px", marginBottom:"0px" }}>
            <div className="card-flex-1">
              <span className="cons-pro-card-heading">Consultants</span>
              <p className="project-name-span">
                {policy.assigned_to.join(", ")}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PolicyPdfCard;
