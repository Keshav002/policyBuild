import React from "react";
import "./CompanyCard.css";

function CompanyCard({ company }) {
  const tagsArray = company.tags.split(",");
  return (
    <div className="cc_container_wrapper">
      <div className="cc_container">
        <div className="cc_id">
          <span>ID : {company.id}</span>
        </div>
        <div className="cc_logo">
          <img
            className="cc_logo_image"
            src={
              company.profilepic
                ? company.profilepic
                : "https://cdn-icons-png.flaticon.com/128/717/717940.png"
            }
          />
        </div>
        <div className="cc_content">
          <div className="cc_name">{company.username}</div>
          <div className="cc_info">
            <div className="cc_rating">
              <span className="cc_star">&#9733;</span>
              <span className="cc_rating_number">{company.average_rating}</span>
            </div>
            <div className="cc_employees">
              <span className="cc_icon">👨🏻‍💼</span> {company.numofemploy}+ Emp.
            </div>
            <div className="cc_founded">
              <span className="cc_icon">&#x1F4C5;</span> Founded:{" "}
              {company.companyregyear}
            </div>
          </div>
          <div className="cc_tags">
            {tagsArray &&
              tagsArray.length >= 1 &&
              tagsArray.map(
                (tag, index) =>
                  tag.trim() && (
                    <span key={index} className="cc_tag">
                      {tag.trim()}
                    </span>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
