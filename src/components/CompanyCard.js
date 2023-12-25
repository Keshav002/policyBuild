import React from 'react';
import "./CompanyCard.css";

function CompanyCard({ company }) {
  return (
    <div className="cc_container_wrapper">
      <div className="cc_container">
      <div className="cc_id">
          <span>ID : {company.id}</span>
        </div>
      <div className="cc_logo">
        <img className="cc_logo_image" src={company.profilepic ? company.profilepic : "https://cdn-icons-png.flaticon.com/128/717/717940.png"}/>
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
              <span className="cc_icon">&#x1F4C5;</span> Founded: {company.companyregyear}
            </div> 
          </div>
          <div className="cc_tags">
            <span className="cc_tag">Oil and Gas</span>
            <span className="cc_tag">Energy</span>
            <span className="cc_tag">Analytics</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
