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
  policyId,
  documentUrl,
  projectId,
}) {
  const handleCardClick = () => {
    setIsMenuOpen(false);
    if(userRole === 'Company'){
      navigate(
        `/company-projects/${projectId}/policy-list/${policy.id}/pdf`
      );
    }
    else if(userRole === 'Consultant'){
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

  console.log("Policy id", policyId);

  const handleMenuToggle = (event) => {
    event.stopPropagation();
    setIsMenuOpen((prev) => !prev);
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
    openEditForm(policy.id);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setIsMenuOpen(false);
    handleDelete(policy.id);
  };

  const isCompanyRole = userRole === "Company";

  return (
    <div className="ppc_policy-card" onClick={handleCardClick} ref={cardRef}>
      <div className="ppc_header">
        <div className="ppc_icon">
          <BsFileEarmarkTextFill size={24} />
        </div>

        <div className="ppc_policy-name">
          {policy && (
            <>
              {policy.policy_name}

              {isCompanyRole && (
                <BsThreeDotsVertical
                  style={{
                    cursor: "pointer",
                    marginLeft: "150px",
                  }}
                  onClick={handleMenuToggle}
                />
              )}
            </>
          )}
        </div>
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

      <div className="ppc_info">
        {policy && (
          <>
             <div className="ppc_detail">Policy Type: {policy.policytype}</div>
            <div className="ppc_detail">Description: {policy.description}</div>
            <div className="ppc_detail">Assigned To: {policy.assigned_to}</div>
            {/* <div className="ppc_detail">
              Score: {policy.average_rating} out of {policy.total_ratings}
            </div> */}
          </>
        )}
      </div>

      <div className="ppc_timestamps">
        {policy && (
          <>
            <div className="ppc_created-at">
              Created At: {formatDateTime(policy.created_at)}
            </div>
            <div className="ppc_updated-at">
              Updated At: {formatDateTime(policy.updated_at)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PolicyPdfCard;
