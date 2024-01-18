import React from 'react';
import { AiOutlineFileText } from 'react-icons/ai';
import "./PolicyPdfCard.css";
import { MdPolicy } from "react-icons/md";
import { BsFileEarmarkTextFill } from "react-icons/bs";
function PolicyPdfCard() {
  return (
    <div className="ppc_policy-card">
      <div className="ppc_header">
        <div className="ppc_icon">
          <BsFileEarmarkTextFill size={24} />
        </div>
        <div className="ppc_policy-name">Equal Opportunity Policy</div>
      </div>
      <div className="ppc_info">
        <div className="ppc_detail">Company  : XYZ Corp</div>
        <div className="ppc_detail">Scope: IT Sector</div>
        <div className="ppc_detail">Score: 8 out of 10</div>
        <div className="ppc_detail">Version: 1</div>
      </div>
      <div className="ppc_timestamps">
        <div className="ppc_created-at">Created At: 2023-01-01</div>
        <div className="ppc_updated-at">Updated At: 2023-01-02</div>
      </div>
    </div>
  );
}

export default PolicyPdfCard;
