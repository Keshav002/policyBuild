import React from "react";
import { MdPolicy } from "react-icons/md";
import "./ConsultantProjectCard.css";
import { FaGenderless } from "react-icons/fa";
import { MdOutlineCropSquare } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
function ConsultantPolicyCard({ project }) {

  
  return (

    <div className="cons-pro-card">
      <div className="cons-pro-card-header">
        <div>
          <span className="cons-pro-card-heading">Project Name:</span>
          <p className="project-name-span">{project.name}</p>
          <br />
          <span className="cons-pro-card-heading">Project Type:</span>
          <p className="project-name-span">{project.project_type}</p>
        </div>
        <div className="card-id-container">ID:{project.id}</div>
      </div>
      <div className="card-body-first">
        <div className="icon-container-newcard">
          <FaGenderless style={{ color: "#29AB87" }} className="icon" />
          <HiOutlineDotsVertical className="icon" />
          <MdOutlineCropSquare style={{ color: "#CD5C5C" }} className="icon" />
        </div>
        <div>
          <span style={{ color: "#29AB87" }} className="cons-pro-card-heading">
            Start Date:
          </span>
          <p className="project-name-span">{project.start_date}</p> 
          <br />
          <span
            className="cons-pro-card-heading"
            style={{ color: "#CD5C5C" }}
          >
            End Date:
          </span>
          <p className="project-name-span"> {project.end_date}</p>
        </div>
      </div>
      <div className="card-body-second">
        <div>
          <span className="cons-pro-card-heading">Company</span>
          <p className="project-name-span">{project.company}</p> 
        </div>
      </div>
      {/* <div className="card-body-third">
        <div>
          <span className="cons-pro-card-heading">Consultants</span>
          <p className="consultants-name-span">Keshav Tayal</p>
        </div>
      </div> */}
    </div>
  );
}

export default ConsultantPolicyCard;
