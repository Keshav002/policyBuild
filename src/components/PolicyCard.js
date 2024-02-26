import React, { useState, useRef, useEffect } from "react";
import { MdPolicy } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./PolicyCard.css";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";

function PolicyCard({
  company,
  project_type,
  website,
  banner,
  employee_type,
  salaryrange,
  location,
  contactinfo,
  companyregyear,
  tags,
  name,
  description,
  start_date,
  end_date,
  assigned_to,

  isEditFormOpen,
  projectId,
  handleDeleteProjectClick,
  openEditForm,
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cardRef = useRef(null);

  const handleMenuToggle = (event) => {
    event.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleCardClick = (event) => {
    if (isEditFormOpen) {
      return;
    }

    if (event.target.closest(".consultant_profile_edit_popup")) {
      return;
    }

    navigate(`/company-projects/${projectId}/policy-list`);
  };

  const menuStyle = {
    position: "absolute",
    top: cardRef.current?.offsetTop - 10,
    left: cardRef.current?.offsetLeft + (cardRef.current?.clientWidth || 0),
    display: isMenuOpen ? "block" : "none",
  };

  const handleEditClick = (event) => {
    event.stopPropagation();

    setIsMenuOpen(false);

    console.log("projectId before openEditForm:", projectId);
    openEditForm(projectId);
  };
  const handleDeleteProject = (event) => {
    event.stopPropagation();
    setIsMenuOpen(false);
    handleDeleteProjectClick();
  };

  return (
    <div className="pc_policy-card" onClick={handleCardClick} ref={cardRef}>
      <div className="pc_header">
        <div className="pc_icon">
          <MdPolicy size={24} />
        </div>

        <div className="parent-container">
          <div className="pc_policy-name">{name}</div>
        </div>
        <BsThreeDotsVertical
          style={{
            cursor: "pointer",
            marginLeft: "110px",
          }}
          onClick={handleMenuToggle}
        />
      </div>

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
          <div onClick={(event) => handleDeleteProject(event)}>
            <AiFillDelete
              style={{
                marginRight: "10px",
              }}
            />
            Delete
          </div>
        </div>
      )}
     
      <div className="pc_info">
      {/* <div className="pc_detail">Project Type: {project_type}</div> */}
        <div className="pc_detail">Assigned To: {assigned_to.join(", ")}</div>
        <div className="pc_detail">Description: {description}</div>
        <div className="pc_detail">Start Date: {start_date}</div>
        <div className="pc_detail">End Date: {end_date}</div>
      </div>
    </div>
  );
}

export default PolicyCard;
