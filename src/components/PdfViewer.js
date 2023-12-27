import React, { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Nav from "./Nav";
import { BsGrid } from "react-icons/bs";
import { CiBoxList } from "react-icons/ci";
import { BiSolidPencil } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { AiFillDelete } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { GrPrevious, GrNext } from "react-icons/gr";

import { FaUserLarge } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";

import "./PdfViewer.css";

function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [viewType, setViewType] = useState("pagination");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setisAddModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [scale, setScale] = useState(1.0);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const [activeButton, setActiveButton] = useState(null);
  const [editedPolicy, setEditedPolicy] = useState({
    policyName: "",
    policyScore: "",
    policyComments: "",
  });

  const [editedData, setEditedData] = useState([
    { Name: "Policy 1", Score: "9/10", Comments: "Good" },
    // { name: "Policy 2", score: "6/10", comments: "Needs improvement" },
    // { name: "Policy 3", score: "5/10", comments: "Needs improvement" },
    // { name: "Policy 4", score: "7/10", comments: "Fine" },
  ]);

  const policyDetails = [
    { label: "Policy Title", value: "Equal Opportunity Policy" },
    { label: "Policy Company", value: "TATA" },
    { label: "Policy Version", value: "1" },
    { label: "Policy Created At", value: "11/10/2023" },
    { label: "Policy Updated At", value: "01/12/2023" },
    { label: "Policy Scope", value: "IT Sector" },
    { label: "Policy Consulted by", value: "Consultant 1" },
  ];

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    const newPageNumber = pageNumber + offset;
    if (newPageNumber > 0 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
    }
  }

  const toggleView = (type) => {
    setViewType(type);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
    setActiveButton("zoomIn");
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(0.1, prevScale - 0.1));
    setActiveButton("zoomOut");
  };

  const onClickDeleteRow = (policyToDelete) => {
    const updatedData = editedData.filter(
      (policy) => policy !== policyToDelete
    );
    setEditedData(updatedData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openEditPopup = () => {
    setIsEditOpen(true);
  };

  const handleEdittSubmitClick = () => {
    console.log("Submit button clicked");

    const index = editedData.findIndex((policy) => policy === selectedPolicy);

    if (index !== -1) {
      const updatedData = [...editedData];
      updatedData[index] = { ...selectedPolicy, ...editedPolicy };
      setEditedData(updatedData);

      // Log the updated data for verification
      console.log("Updated Data:", updatedData);
    }

    setIsEditOpen(false);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPolicy((prevPolicy) => ({
      ...prevPolicy,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPolicy((prevPolicy) => ({
      ...prevPolicy,
      [name]: value,
    }));
  };

  const handleEditClick = (policy) => {
    setIsModalOpen(true);
    setSelectedPolicy(policy);

    // Set the editedPolicy state with the values of the selected policy
    setEditedPolicy({
      policyName: policy.Name,
      policyScore: policy.Score,
      policyComments: policy.Comments,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
    setEditedData((prevData) => [
      ...prevData,
      { Name: "", Score: "", Comments: "" },
    ]);
  };

  const openAddModal = () => {
    setisAddModalOpen(true);
    setIsDialogOpen(true);
    setEditedData((prevData) => [
      ...prevData,
      { Name: "", Score: "", Comments: "" },
    ]);
  };

  const closeAddModal = () => {
    setisAddModalOpen(false);
    setIsDialogOpen(false);
  };

  const getViewContainerStyle = (viewType) => {
    if (viewType === "pagination") {
      return {
        width: 850,
        height: 800,
        overflow: "auto",
        marginLeft: "100px",
        overflowX: "auto",
      };
    } else if (viewType === "scrollbar") {
      return {
        width: 850,
        height: 800,
        marginLeft: "100px",
        overflow: "auto",
      };
    }

    return {};
  };

  useEffect(() => {
    const popup = document.querySelector(".pdf_edit_table_popup");

    if (popup) {
      const numColumns = Object.keys(selectedPolicy || {}).length;
      const newWidth = 500 + numColumns * 50;
      popup.style.width = `${newWidth}px`;
    }
  }, [selectedPolicy]);

  const containerRef = useRef(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollTop = container.scrollTop;
      const pageHeight = container.scrollHeight / numPages;
      const newPageNumber = Math.ceil(scrollTop / pageHeight) + 1;
      setPageNumber(newPageNumber);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [numPages]);

  return (
    <>
      <Nav />

      <div className="pdf_container">
        <div className="pdf_content">
          {/* <div className="pdf_top_bar"> */}

          <div
            className="pdf-viewer-container"
            style={getViewContainerStyle(viewType)}
          >
            {viewType === "pagination" && (
              <div className="pdf-header">
                <div className="pdf-toolbar">
                  <div className="pdf-toolbar-content">
                    <div className="pdf_view_toggler">
                      <label
                        className="pdf_icon_label"
                        onClick={() => toggleView("pagination")}
                      >
                        <BsGrid
                          className={`pdf_icon pdf_card_icon ${
                            viewType === "pagination" ? "pdf_selected_icon" : ""
                          }`}
                        />
                      </label>
                      <label
                        className="pdf_icon_label"
                        onClick={() => toggleView("scrollbar")}
                      >
                        <CiBoxList
                          className={`pdf_icon pdf_grid_icon ${
                            viewType === "scrollbar" ? "pdf_selected_icon" : ""
                          }`}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="pdf-zoom-icon">
                    <button
                      className={`pdf-zoom-icon ${
                        viewType === "zoomIn" ? "pdf-selected-icon" : ""
                      }`}
                      onClick={() => handleZoomIn()}
                    >
                      <FaCirclePlus
                        className="pdf_icon pdf-zoom-in-icon"
                        style={{
                          fontWeight: "normal",
                        }}
                      />
                    </button>
                    <button
                      className={`pdf-zoom-icon ${
                        viewType === "zoomOut" ? "pdf-selected-icon" : ""
                      }`}
                      onClick={() => handleZoomOut()}
                    >
                      <FaCircleMinus className="pdf_icon pdf-zoom-out-icon" />
                    </button>
                  </div>
                  <div className="pdf-divider"></div>

                  <p
                    style={{
                      margin: 10,
                      cursor: "default",
                    }}
                  >
                    Page {pageNumber} of {numPages}
                  </p>
                </div>

                <Document
                  file="/Sample.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page
                    pageNumber={pageNumber}
                    height={800}
                    width={850}
                    scale={scale}
                  />
                </Document>

                {pageNumber > 1 && (
                  <button
                    className="pdf_previous_icon"
                    onClick={() => changePage(-1)}
                  >
                    <GrPrevious />
                  </button>
                )}
                {pageNumber < numPages && (
                  <button
                    className="pdf_next_icon"
                    onClick={() => changePage(1)}
                  >
                    <GrNext />
                  </button>
                )}
              </div>
            )}

            {viewType === "scrollbar" && (
              <div
                className="pdf-container"
                style={{ width: "100%", position: "relative" }}
                ref={containerRef}
              >
                <Document
                  file="/Sample.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      height={800}
                      width={850}
                      scale={scale}
                    />
                  ))}
                </Document>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="pdf_sidebar"> */}
      <div className={`pdf_sidebar${isDialogOpen ? " dialog-open" : ""}`}>
        <div className="pdf-content-container">
          <FaUserLarge
            className="pdf_sidebar_heading_icon"
            style={{ marginRight: "5px" }}
          />
          <p className="pdf_sidebar_heading" style={{ marginRight: "175px" }}>
            Consultant Workspace
          </p>
        </div>
        <div className="pdf_sidebar_content">
          {/* <div className="pdf_policy_details"> */}

          <h2
            style={{
              position: "relative",
              top: 80,
              fontWeight: "normal",
              marginBottom: "10px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <BiDetail
              className="pdf_sidebar_heading_icon"
              style={{
                marginRight: "10px",
                color: "black",
                fontSize: "20px",
              }}
            />
            Policy Details
          </h2>
          <div className="policy-details-container">
            <table className="policy-details-container-table">
              <tbody>
                {policyDetails.map((detail, index) => (
                  <tr key={index}>
                    <td
                      className={
                        detail.label === "Policy Title"
                          ? "policy-title-cell"
                          : ""
                      }
                    >
                      {/* <td className="policy-details-container-td"> */}
                      <strong>{detail.label}:</strong>
                    </td>
                    <td>{detail.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* </div> */}

            {/* <p>
              <strong>Policy Title:</strong> Equal Opportunity Policy
            </p>
            <p>
              <strong>Policy Company:</strong> TATA
            </p>
            <p>
              <strong>Policy Version:</strong> 1
            </p>
            <p>
              <strong>Policy Created At:</strong> 11/10/2023
            </p>
            <p>
              <strong>Policy Updated At:</strong> 01/12/2023
            </p>
            <p>
              <strong>Policy Scope:</strong> IT Sector
            </p>
            <p>
              <strong>Policy Consulted by:</strong> Consultant 1
            </p> */}
          </div>

          <div className="pdf_table">
            <h2>
              Policy Fulfillment
              <button className="pdf_edit_button" onClick={openAddModal}>
                <FiPlus />
              </button>
            </h2>
          </div>

          {isAddModalOpen && (
            <div className="pdf-popup-table-overlay">
              <div className="pdf_edit_table_popup">
                <div className="custom-modal-overlay" onClick={closeModal}>
                  <div
                    className="custom-modal"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="pdf-table-container">
                      <div className="pdf-popup-overlay">
                        <div className="pdf_edit_popup">
                          <h2 className="pdf_table_pop_heading">Add Policy</h2>
                          <button
                            className="pdf-close-button"
                            onClick={closeAddModal}
                          >
                            <RxCross2 />
                          </button>

                          <label htmlFor="editedTitle">Policy Name:</label>
                          <input
                            type="text"
                            id="editedTitle"
                            name="policyName"
                            value={editedPolicy.policyName}
                            onChange={handleAddInputChange}
                          />

                          <label htmlFor="editedCompany">Score:</label>
                          <input
                            type="text"
                            id="editedCompany"
                            name="policyScore"
                            value={editedPolicy.policyScore}
                            onChange={handleAddInputChange}
                          />

                          <label htmlFor="editedVersion">Comments:</label>
                          <input
                            type="text"
                            id="editedVersion"
                            name="policyComments"
                            value={editedPolicy.policyComments}
                            onChange={handleAddInputChange}
                          />
                          <div className="company-profile-rating-popup__buttons">
                            <button
                              type="submit"
                              onClick={handleEdittSubmitClick}
                            >
                              Add Policy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isModalOpen && (
            <div className="pdf-popup-table-overlay">
              <div className="pdf_edit_table_popup">
                <div className="custom-modal-overlay" onClick={closeModal}>
                  <div
                    className="custom-modal"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="pdf-table-container">
                      <div className="pdf-popup-overlay">
                        <div className="pdf_edit_popup">
                          <h2 className="pdf_table_pop_heading">Edit Policy</h2>

                          <button
                            className="pdf-close-button"
                            onClick={closeModal}
                          >
                            <RxCross2 />
                          </button>

                          <label htmlFor="editedTitle">Policy Name:</label>
                          <input
                            type="text"
                            id="editedTitle"
                            name="policyName"
                            value={editedPolicy.policyName}
                            onChange={handleInputChange}
                          />

                          <label htmlFor="editedCompany">Score:</label>
                          <input
                            type="text"
                            id="editedCompany"
                            name="policyScore"
                            value={editedPolicy.policyScore}
                            onChange={handleInputChange}
                          />

                          <label htmlFor="editedVersion">Comments:</label>
                          <input
                            type="text"
                            id="editedVersion"
                            name="policyComments"
                            value={editedPolicy.policyComments}
                            onChange={handleInputChange}
                          />
                          <div className="company-profile-rating-popup__buttons">
                            <button
                              type="submit"
                              onClick={handleEdittSubmitClick}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <table>
            <thead>
              <tr>
                <th>Policy Name</th>
                <th>Score</th>
                <th>Comments</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {editedData.map((policy, index) => (
                <tr key={index}>
                  <td>{policy.Name}</td>
                  <td>{policy.Score}</td>
                  <td>{policy.Comments}</td>
                  <td>
                    <BiSolidPencil
                      onClick={() => handleEditClick(policy)}
                      style={{
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                    />
                    <AiFillDelete
                      onClick={() => onClickDeleteRow(policy)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PdfViewer;
