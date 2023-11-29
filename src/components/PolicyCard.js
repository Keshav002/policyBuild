import React from 'react';
import { AiOutlineFileText } from 'react-icons/ai';
import "./PolicyCard.css";
import { MdPolicy } from "react-icons/md";
function PolicyCard() {
  return (
    <div className="pc_policy-card">
      <div className="pc_header">
        <div className="pc_icon">
          <MdPolicy size={24} />
        </div>
        <div className="pc_policy-name">Diversity and Inclusion</div>
      </div>
      <div className="pc_info">
        <div className="pc_detail">Company  : XYZ Corp</div>
        <div className="pc_detail">Department: HR</div>
        <div className="pc_detail">Revision No: 2</div>
        <div className="pc_detail">Status: Active</div>
      </div>
      <div className="pc_timestamps">
        <div className="pc_created-at">Created At: 2023-01-01</div>
        <div className="pc_updated-at">Updated At: 2023-01-02</div>
      </div>
    </div>
  );
}

export default PolicyCard;
