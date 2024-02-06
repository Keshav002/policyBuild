import React from 'react';
import { MdPolicy } from 'react-icons/md';
import './PolicyCard.css';

function ConsultantPolicyCard({ project }) {
  return (
    <div className="pc_policy-card">
      <div className="pc_header">
        <div className="pc_icon">
          <MdPolicy size={24} />
        </div>
        <div className="pc_policy-name">{project.name}</div>
      </div>
      <div className="pc_info">
        <div className="pc_detail">Company  : {project.company}</div>
        <div className="pc_detail">Description: {project.description}</div>
        <div className="pc_detail">Start Date: {project.start_date}</div>
        <div className="pc_detail">End Date: {project.end_date}</div>
      </div>
    </div>
  );
}

export default ConsultantPolicyCard;
