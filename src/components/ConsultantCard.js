import React from 'react';
import "./CompanyCard.css";

function ConsultantCard({ consultant }) {
  const tagsArray = consultant.tags.split(",");

  return (
    <div className="cc_container_wrapper">
      <div className="cc_container">
      <div className="cc_id">
          <span>ID : {consultant.id}</span>
        </div>
      <div className="cc_logo">
        <img className="cc_logo_image" src={"https://cdn-icons-png.flaticon.com/128/2102/2102633.png"}/>
      </div>
        <div className="cc_content">
          <div className="cc_name">{consultant.username}</div>
          <div className="cc_info">
            <div className="cc_rating">
              <span className="cc_star">&#9733;</span>
              <span className="cc_rating_number">{consultant.average_rating}</span>
            </div> 
            <div className="cc_rating">
              <span className="cc_star"  style={{fontSize:"14px"}}>💼</span>
              <span className="cc_rating_number">Experience : {consultant.yearofexp}+ Years</span>
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

export default ConsultantCard;
