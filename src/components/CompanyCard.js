import React from 'react';
import "./CompanyCard.css";

function CompanyCard() {
  return (
    <div className="cc_container_wrapper">
      <div className="cc_container">
      <div className="cc_id">
          <span>ID : 8</span>
        </div>
      <div className="cc_logo">
        <img className="cc_logo_image" src="https://mergerlinks-production.s3.eu-west-2.amazonaws.com/files/company/65710/logo/ENVERUS.jpg"/>
      </div>
        <div className="cc_content">
          <div className="cc_name">Enverus</div>
          <div className="cc_info">
            <div className="cc_rating">
              <span className="cc_star">&#9733;</span>
              <span className="cc_rating_number">4.5</span>
            </div>
            <div className="cc_employees">
              <span className="cc_icon">👨🏻‍💼</span> 1000+ Employees
            </div>
            <div className="cc_founded">
              <span className="cc_icon">&#x1F4C5;</span> Founded: 1999
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
