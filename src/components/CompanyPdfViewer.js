import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import Nav from "./Nav";
import { BiSolidPencil } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { AiFillDelete } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { GrPrevious, GrNext } from "react-icons/gr";
import { FaUserLarge } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import "./PdfViewer.css";
import NoteDialog from "./NoteDialog";
import { PiNoteThin } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { PDFDocument, MissingPDFHeaderError } from "pdf-lib";
import Cookies from "js-cookie";
import { API_URL } from "../ConfigApi";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumbs from "./Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useSelector } from "react-redux";
import { DataTable } from "./ReviewData";

import {
  MdOutlinePictureAsPdf,
  MdOutlineDelete,
  MdReviews,
} from "react-icons/md";
import { Breadcrumb } from "antd";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const DialogBox = ({ onClose, onAddNote }) => {
  return (
    <div className="pdfview-show-icon-container">
      <div className="pdfview-icon-tooltip"></div>
      <button
        style={{
          background: "none",
          outline: "none",
          border: "none",
          cursor: "pointer",
          whiteSpace: "nowrap",
          marginRight: "15px",
          fontSize: "15px",
        }}
        onClick={onAddNote}
      >
        <PiNoteThin
          style={{
            fontSize: "20px",
            marginBottom: "-4px",
            marginRight: "4px",
            marginLeft: "4px",
          }}
        />
        Add Comments
      </button>

      <button
        style={{
          background: "none",
          outline: "none",
          border: "none",
          cursor: "pointer",
          whiteSpace: "nowrap",
          position: "relative",
          top: "-5px",
          right: "2px",
        }}
        onClick={onClose}
      >
        <RxCross2 />
      </button>
    </div>
  );
};
function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [viewType, setViewType] = useState("pagination");
  const [scale, setScale] = useState(1.0);
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const userRole = userData?.role;
  console.log(userRole);
  const companyId = userData?.company?.id;

  useEffect(() => {
    console.log(companyId);

    return () => {};
  }, [companyId]);

  const { policyId, projectId } = useParams();
  const [policy, setPolicy] = useState(null);
  const [policyLogs, setPolicyLogs] = useState(null);
  const [policyDetails, setPolicyDetails] = useState([]);

  useEffect(() => {
    if (policyId && projectId) {
      fetchPolicy(policyId, projectId);
      fetchPolicyDetails(policyId, projectId);
      fetchPolicyLogs(policyId);
    }
  }, [policyId, projectId]);

  const fetchPolicy = async (policyId, projectId) => {
    try {
      const response = await fetch(
        `${API_URL}/main/projects/${projectId}/policy_posts/${policyId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        const policyData = await response.json();
        setPolicy(policyData);
      } else {
        console.error("Failed to fetch policy data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchPolicyLogs = async (policyId) => {
    console.log("fetchpolicyLogs");
    try {
      const response = await fetch(
        `${API_URL}/main/policies/${policyId}/logs/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        const policyLogData = await response.json();
        console.log("Policy Log Data", policyLogData);
        const formattedJson = JSON.stringify(policyLogData, null, 3);
        setPolicyLogs(formattedJson);

        return policyLogData;
      } else {
        console.error("Failed to fetch policy data. Status:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };


  const fetchPolicyDetails = async (policyId, projectId) => {
    try {
      const response = await fetch(
        `${API_URL}/main/projects/${projectId}/policy_posts/${policyId}/`
      );
      if (response.ok) {
        const data = await response.json();
        const {
          policy_name,
          policytype,
          description,
          created_at,
          updated_at,
          document,
          assigned_to,
        } = data;

        const details = [
          { label: "Policy Name", value: policy_name },
          { label: "Policy Type", value: policytype },
          { label: "Policy Description", value: description },
          { label: "Policy Created At", value: formatDateTime(created_at) },
          { label: "Policy Updated At", value: formatDateTime(updated_at) },
          { label: "Policy Consulted By", value: assigned_to },
        ];

        setPolicyDetails(details);
      } else {
        console.error(
          "Failed to fetch policy details. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching policy details:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `${API_URL}/main/policy_posts/${policyId}/reviews/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Reviews", data);

        setReviews(data);
      } else {
        console.error("Failed to fetch data. Status:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        `${API_URL}/main/policy_posts/${policyId}/reviews/${reviewId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        fetchReviews();
        Swal.fire({
          icon: "success",
          title: "Review Deleted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Failed to delete review. Status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditReviews = async (editedreviewId) => {
    // setLoading(true);
    try {
      const editedFields = {};

      const originalReview = reviews.find(
        (review) => review.id === editedreviewId
      );

      if (editedPolicy.rating !== originalReview.rating) {
        editedFields.rating = editedPolicy.rating;
      }
      if (editedPolicy.comment !== originalReview.comment) {
        editedFields.comment = editedPolicy.comment;
      }
      if (editedPolicy.source !== originalReview.source) {
        editedFields.source = editedPolicy.source;
      }

      if (Object.keys(editedFields).length > 0) {
        const response = await fetch(
          `${API_URL}/main/policy_posts/${policyId}/reviews/${editedreviewId}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
            body: JSON.stringify(editedFields),
          }
        );

        if (response.ok) {
          const updatedReviewData = await response.json();
          console.log("Review updated:", updatedReviewData);

          fetchReviews();

          Swal.fire({
            icon: "success",
            title: "Review Updated Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          setIsModalOpen(false);
        } else {
          console.error("Failed to update review. Status:", response.status);
        }
      } else {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating review:", error);
    } finally {
    }
  };
  const [editedData, setEditedData] = useState([]);

  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString(undefined, options);
  }

  const [editedreviewId, seteditedreviewId] = useState(null);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPolicy((prevEditedPolicy) => ({
      ...prevEditedPolicy,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (policyId) {
      fetchReviews();
    }
  }, [policyId]);

  const [editedPolicy, setEditedPolicy] = useState({
    source: "",
    rating: "",
    comment: "",
  });

  const handleEditButtonClick = (reviewId) => {
    console.log("Review ID:", reviewId);
    seteditedreviewId(reviewId);
    console.log("Review ID selected for editing:", editedreviewId);

    const selectedReview = reviews.find((review) => review.id === reviewId);

    setEditedPolicy({
      source: selectedReview.source,
      rating: selectedReview.rating,
      comment: selectedReview.comment,
    });

    setIsModalOpen(true);
  };

  const [addedData, setAddedData] = useState([]);
  const [addedReview, setAddedReview] = useState({
    source: "",
    rating: "",
    comment: "",
  });
  const [reviews, setReviews] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddedReview((prevPolicy) => ({
      ...prevPolicy,
      [name]: value,
    }));
  };

  const handleSubmitReviews = async () => {
    try {
      const response = await fetch(
        `${API_URL}/main/policy_posts/${policyId}/reviews/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify({
            source: addedReview.source,
            rating: addedReview.rating,
            comment: addedReview.comment,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Review created:", responseData);
        fetchReviews();

        Swal.fire({
          icon: "success",
          title: "Review Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setisAddModalOpen(false);
      } else {
        console.error("Failed to create review. Status:", response.status);
      }
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  const toggleView = (type) => {
    setViewType(type);
  };
  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 10));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.1));
  };
  function changePage(offset) {
    const newPageNumber = pageNumber + offset;
    if (newPageNumber > 0 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
    }
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const [userNotesList, setUserNotesList] = useState([]);

  const [isExtended, setIsExtended] = useState(false);
  const handleNotesIconClick = () => {
    setIsExtended(!isExtended);
  };

  const CustomTooltip = ({ children, tooltipText }) => {
    return (
      <div className="custom-tooltip">
        {children}
        <span className="tooltip-text">{tooltipText}</span>
      </div>
    );
  };

  const [selectedText, setSelectedText] = useState("");
  const [selectedTextTransform, setSelectedTextTransform] = useState(null);
  const [showNoteDialog, setShowNoteDialog] = useState(false);

  function closeDialogBox() {
    setShowDialogBox(false);
  }

  function handleTextSelection() {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString();
      if (selectedText) {
        setSelectedText(selectedText);
        const transform = selection.getRangeAt(0).getBoundingClientRect();
        setSelectedTextTransform({
          top: transform.top,
          bottom: transform.bottom,
        });

        setShowDialogBox(true);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);

    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);

  const [showDialogBox, setShowDialogBox] = useState(false);

  const handleSaveNotes = ({ selectedText, userNotes }) => {
    setUserNotesList((prevNotesList) => [
      ...prevNotesList,
      { selectedText, userNotes },
    ]);
    setShowNoteDialog(false);
  };

  const addNote = () => {
    setShowNoteDialog(true);
    closeDialogBox();
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogBoxOpen, setIsDialogBoxOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setisAddModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const openAddModal = () => {
    setisAddModalOpen(true);
    setIsDialogOpen(true);
    setIsDialogBoxOpen(true);
  };

  const closeAddModal = () => {
    setisAddModalOpen(false);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const popup = document.querySelector(".pdf_edit_table_popup");

    if (popup) {
      const numColumns = Object.keys(selectedPolicy || {}).length;
      const newWidth = 500 + numColumns * 50;
      popup.style.width = `${newWidth}px`;
    }
  }, [selectedPolicy]);

  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmitClick = () => {
    const index = editedData.findIndex((policy) => policy === selectedPolicy);

    if (index !== -1) {
      const updatedData = [...editedData];
      updatedData[index] = { ...selectedPolicy, ...editedPolicy };
      setEditedData(updatedData);
      console.log("Updated Data:", updatedData);
      setIsEditOpen(false);
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotesList = [...userNotesList];
    updatedNotesList.splice(index, 1);
    setUserNotesList(updatedNotesList);
  };
  const handleGoBack = () => {
    navigate(-1); 
  };

  const { documentUrl } = useParams();
  const location = useLocation();
  console.log("dourl", documentUrl);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const decodedDocumentUrl = searchParams.get("document");
    console.log("Doc Url:", decodedDocumentUrl);
  }, [location.search]);

  console.log("Location search:", location.search);

  const onDocumentLoadError = (error) => {
    console.error("Error loading document:", error.message);
  };

  const [activeTab, setActiveTab] = useState('workspace');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Nav />
      <div className="pdfview-container">
        {showDialogBox && (
          <DialogBox onClose={closeDialogBox} onAddNote={addNote} />
        )}

        {showNoteDialog && (
          <NoteDialog
            isOpen={showNoteDialog}
            onClose={() => setShowNoteDialog(false)}
            onSave={handleSaveNotes}
            selectedText={selectedText}
          />
        )}

        <div className="pdfview-toolbar">
          {/* <div className="pdfview_toggler"> */}
          {/* <label
              className="pdfview_icon_label"
              onClick={() => toggleView("pagination")}
            >
              <FaRegFilePdf
                className={`pdfview_icon pdfview_card_icon ${
                  viewType === "pagination" ? "pdfview_selected_icon" : ""
                }`}
              />
            </label> */}
          {/* <label
              className="pdfview_icon_label"
              onClick={() => toggleView("scrollbar")}
            >
              <MdOutlinePictureAsPdf
                className={`pdfview_icon pdfview_grid_icon ${
                  viewType === "scrollbar" ? "pdfview_selected_icon" : ""
                }`}
              />
            </label> */}

          {/* </div> */}

          {/* <button className="pdf-viewer-back-button" onClick={handleGoBack}>
            <FaArrowLeft className="arrow-icon" />
          </button> */}

          <div style={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs />
          </div>
          <div class="pdf_zoom_buttons_container">
            <button
              className={`pdf_zoom_icon ${
                viewType === "zoomIn" ? "pdf_selected_icon" : ""
              }`}
              onClick={() => handleZoomIn()}
            >
              <FaCirclePlus
                className="pdf-icon pdf_zoom_in_icon"
                style={{
                  fontWeight: "normal",
                }}
              />
            </button>
            <button
              className={`pdf_zoom_icon ${
                viewType === "zoomOut" ? "pdf_selected_icon" : ""
              }`}
              onClick={() => handleZoomOut()}
            >
              <FaCircleMinus className="pdf-icon pdf_zoom_out_icon" />
            </button>
          </div>
          <div className="pdfview-divider"></div>

          <div style={{ marginRight: 20, cursor: "default", marginTop: "5px" }}>
            <span style={{ whiteSpace: "nowrap" }}>
              Page {pageNumber} of {numPages}
            </span>
          </div>
        </div>

        <div
          className={`pdfview_container_sidebar ${
            isExtended ? "extended" : ""
          }`}
        >
          <CustomTooltip tooltipText="Comments">
            <PiNoteThin
              className="pdfview_note_icon"
              onClick={handleNotesIconClick}
            />
          </CustomTooltip>

          {isExtended && (
            <div className="extended-content">
              {userNotesList.length > 0 ? (
                <ul>
                  {userNotesList.map((note, index) => (
                    <li key={`note_${index}`} className="pdfview_note-item">
                      <div>
                        <strong>Comment {index + 1}:</strong> {note.userNotes}
                      </div>
                      <div>
                        <strong>Selected Text:</strong> {note.selectedText}
                        <button
                          className="pdfview_delete-note-button"
                          onClick={() => handleDeleteNote(index)}
                        >
                          <MdOutlineDelete />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No Comments</p>
              )}
            </div>
          )}
        </div>

        <div className="pdfview_content_container">
          

          {viewType === "pagination" && (
            <div className="pdfview_pagination"
            style={{ marginLeft: isExtended ? "160px" : "0px" }}
            >
              <Document
                file={policy && policy.document}
                
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
              >
                <Page
                  pageNumber={pageNumber}
                  height={0}
                  width={919}
                  scale={scale}
                />
              </Document>
            </div>
          )}

          {viewType === "pagination" && (
            <>
              {pageNumber > 1 && (
                <button
                  className="pdfview_previous_icon"
                  onClick={() => changePage(-1)}
                >
                  <GrPrevious />
                </button>
              )}
              {pageNumber < numPages && (
                <button
                  className="pdfview_next_icon"
                  onClick={() => changePage(1)}
                >
                  <GrNext />
                </button>
              )}
            </>
          )}

        </div>

        <div className={`pdf_sidebar${isDialogOpen ? " dialog-open" : ""}`}>
          {/* <div className="pdf-content-container"> */}
          <div className="pdf-viewer-tabs-container">
              <div
                className={`pdf-view-tab ${activeTab === "workspace" ? "active" : ""}`}
                onClick={() => handleTabClick("workspace")}
              >
                Workspace
              </div>
              <div
                className={`pdf-view-tab ${activeTab === "logs" ? "active" : ""}`}
                onClick={() => handleTabClick("logs")}
              >
                Logs
              </div>
            </div>
          {/* </div> */}
          {activeTab === 'workspace' ? (
          <div className="pdf_sidebar_content">
           
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
                  { policyDetails.map((detail, index) => (
                    <tr key={index}>
                      <td
                        className={
                          detail.label === "Policy Title"
                            ? "policy-title-cell"
                            : ""
                        }
                      >
                        <strong>{detail.label}:</strong>
                      </td>
                      <td>{detail.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pdf_table">
              <h2>
                Policy Fulfillment
                {userRole !== "Company" && (
                  <button className="pdf_edit_button" onClick={openAddModal}>
                    <FiPlus />
                  </button>
                )}
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
                            <h2 className="pdf_table_pop_heading">
                              Add Reviews
                            </h2>
                            <button
                              className="pdf-close-button"
                              onClick={closeAddModal}
                            >
                              <RxCross2 />
                            </button>

                            <label>Source:</label>
                            <input
                              type="text"
                              name="source"
                              value={addedReview.source}
                              onChange={handleInputChange}
                            />

                            <label>Score:</label>
                            <input
                              type="text"
                              name="rating"
                              value={addedReview.rating}
                              onChange={handleInputChange}
                            />

                            <label>Comments:</label>
                            <input
                              type="text"
                              name="comment"
                              value={addedReview.comment}
                              onChange={handleInputChange}
                            />
                            <div className="company-profile-rating-popup__buttons">
                              <button
                                type="submit"
                                onClick={handleSubmitReviews}
                              >
                                Submit
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
                            <h2 className="pdf_table_pop_heading">
                              Edit Policy
                            </h2>

                            <button
                              className="pdf-close-button"
                              onClick={closeModal}
                            >
                              <RxCross2 />
                            </button>

                            <label>Source:</label>
                            <input
                              type="text"
                              name="source"
                              value={editedPolicy.source}
                              onChange={handleEditInputChange}
                            />

                            <label>Score:</label>
                            <input
                              type="text"
                              name="rating"
                              value={editedPolicy.rating}
                              onChange={handleEditInputChange}
                            />

                            <label>Comments:</label>
                            <input
                              type="text"
                              name="comment"
                              value={editedPolicy.comment}
                              onChange={handleEditInputChange}
                            />
                            <div className="company-profile-rating-popup__buttons">
                              <button
                                type="submit"
                                onClick={() =>
                                  handleEditReviews(editedreviewId)
                                }
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

            <div>
              {reviews.length > 0 ? (
                <DataTable
                  data={reviews}
                  handleDeleteReview={handleDeleteReview}
                  handleEditButtonClick={handleEditButtonClick}
                />
              ) : (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  No reviews created
                </div>
              )}
            </div>
          </div>
           ) : (<div className="pdf-viewer-logs-container"><pre>{policyLogs}</pre></div>)}
        </div>
      </div>
    </>
  );
}

export default PdfViewer;
