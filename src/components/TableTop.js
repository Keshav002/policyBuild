import React, { useState, useEffect } from "react";
import "./TableTop.css";
import { BsGrid } from "react-icons/bs";
import { CiBoxList } from "react-icons/ci";
import { AiOutlineFilter } from "react-icons/ai";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { FaSave, FaEye } from "react-icons/fa";
import { PiClipboardTextDuotone } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { DataTable } from "../components/PolicyDataTable";
import { Pagination } from "antd";
import { HiTableCells } from "react-icons/hi2";
import { FaTableList } from "react-icons/fa6";
import { BsTable } from "react-icons/bs";
import { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { API_URL } from "../ConfigApi";
import { useDispatch, useSelector } from "react-redux";
import { VscKebabVertical } from "react-icons/vsc";
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

function TableTop({
  handleAddProjectClick,
  setViewType,
  viewType,
  isAddProjectOpen,
  setisAddProjectOpen,
  handleCancelClick,
  isConsultantRole,
  userRole,
}) {
  const loggedInUserId = useSelector((state) => state.user.userData.user_id);
  const userData = useSelector((state) => state.user.userData);
  
  const companyId = userData?.company?.id;

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [personalReports, setpersonalReports] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);

  const handleOptionsMenuClick = (id) => {
    if (openMenu === id) {
      // Close the menu if it's already open
      setOpenMenu(null);
    } else {
      // Open the menu for the clicked item
      setOpenMenu(id);
    }
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleChangePageSize = (current, size) => {
    setPageSize(size);
  };

  const [reportName, setReportName] = useState("");
  const [newReportName, setNewReportName] = useState("");
  const [isSaveReportPopup, setIsSaveReportPopup] = useState(false);
  const [isRenamePopup, setIsRenamePopup] = useState(false);
  const [renameFilterId, setRenameFilterId] = useState("");

  // const [viewType, setViewType] = useState("card");

  const [idfrom, setIdFrom] = useState("");
  const [idto, setIdTo] = useState("");
  const [foundedDateFrom, setFoundedDateFrom] = useState("");
  const [foundedDateTo, setFoundedDateTo] = useState("");
  const [ratingsFrom, setRatingsFrom] = useState("");
  const [ratingsTo, setRatingsTo] = useState("");
  const [numEmployeesFrom, setNumEmployeesFrom] = useState("");
  const [numEmployeesTo, setNumEmployeesTo] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isCompanyTypeDropdownOpen, setIsCompanyTypeDropdownOpen] =
    useState(false);
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] =
    useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm && !tags.includes(searchTerm)) {
      setTags([...tags, searchTerm]);
      setSearchTerm("");
    }
  };

  //const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState([]);

  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDropdown = () => {
    const newDropdownState = !isCompanyTypeDropdownOpen;
    setIsCompanyTypeDropdownOpen(newDropdownState);
  };

  const toggleDepartmentDropdown = () => {
    const newDropdownState = !isDepartmentDropdownOpen;
    setIsDepartmentDropdownOpen(newDropdownState);
  };

  const [isReportsPanelOpen, setIsReportsPanelOpen] = useState(false);

  const toggleReportsPanel = () => {
    setIsReportsPanelOpen(!isReportsPanelOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const clearFilters = () => {
    setIdFrom("");
    setIdTo("");
    setFoundedDateFrom("");
    setFoundedDateTo("");
    setRatingsFrom("");
    setRatingsTo("");
    setNumEmployeesFrom("");
    setNumEmployeesTo("");
    setSelectedCompanyTypes([]);
    setSelectedDepartments([]);
    setSearchTerm("");
    setTags([]);
    setSelectedLogic("and");
    setIsCompanyTypeDropdownOpen(false);
    setIsDepartmentDropdownOpen(false);
    setSelectedFilter("");
  };
  const [isDatePicker1Open, setDatePicker1Open] = useState(false);
  const [isDatePicker2Open, setDatePicker2Open] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setDatePicker1Open(false);
      setDatePicker2Open(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTagRemove = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };
  const handleCompanyTypeChange = (value) => {
    const updatedSelectedCompanyTypes = selectedCompanyTypes.includes(value)
      ? selectedCompanyTypes.filter((type) => type !== value)
      : [...selectedCompanyTypes, value];

    setSelectedCompanyTypes(updatedSelectedCompanyTypes);
  };
  const handleDepartmentCheckboxChange = (value) => {
    if (selectedDepartments.includes(value)) {
      setSelectedDepartments(
        selectedDepartments.filter((dept) => dept !== value)
      );
    } else {
      setSelectedDepartments([...selectedDepartments, value]);
    }
  };
  const [selectedLogic, setSelectedLogic] = useState("and");

  const handleLogicChange = (e) => {
    setSelectedLogic(e.target.value);
  };

  const applyFilter = (report) => {
    console.log("Report object:", report);
    const {
      tags = [],
      selectedCompanyTypes = [],
      selectedDepartments = [],
      idfrom = "",
      idto = "",
      ratingsFrom = "",
      ratingsTo = "",
      foundedDateFrom = "",
      foundedDateTo = "",
      numEmployeesFrom = "",
      numEmployeesTo = "",
      pageSize = "",
      currentPage = "1",
    } = report;

    setTags(tags);
    setSelectedCompanyTypes(selectedCompanyTypes);
    setSelectedDepartments(selectedDepartments);
    setIdFrom(idfrom || "");
    setIdTo(idto || "");
    setRatingsFrom(ratingsFrom || "");
    setRatingsTo(ratingsTo || "");
    setFoundedDateFrom(foundedDateFrom || "");
    setFoundedDateTo(foundedDateTo || "");
    setNumEmployeesFrom(numEmployeesFrom || "");
    setNumEmployeesTo(numEmployeesTo || "");
    setPageSize(pageSize || "");
    setCurrentPage(currentPage || "1");
  };

  const [companies, setCompanies] = useState([]);

  const fetchAllReports = async () => {
    try {
      const response = await fetch(
        `${API_URL}/main/user-saved-filters/${loggedInUserId}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch reports. Status: ${response.status}`);
      }

      const reports = await response.json();
      const companyReports = reports.filter(
        (report) => report.filter_for === "Project"
      );
      setpersonalReports(companyReports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      return null;
    }
  };

  const createPersonalReport = async () => {
    const reportData = {
      tags,
      selectedCompanyTypes,
      selectedDepartments,
      idfrom,
      idto,
      ratingsFrom,
      ratingsTo,
      foundedDateFrom,
      foundedDateTo,
      numEmployeesFrom,
      numEmployeesTo,
      pageSize,
      currentPage,
    };
    try {
      const response = await fetch(`${API_URL}/main/saved-filters/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify({
          user: loggedInUserId,
          filter_name: reportName,
          filter_data: reportData,
          filter_for: "Project",
        }),
      });
      if (response.ok) {
        console.log("Personal report created successfully!");
        setIsSaveReportPopup(false);
        fetchAllReports();
      } else {
        console.error(
          "Failed to create personal report. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deletePersonalReport = async (reportId) => {
    try {
      const response = await fetch(
        `${API_URL}/main/saved-filters/${reportId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      if (response.ok) {
        console.log("Personal report deleted successfully!");
        fetchAllReports();
      } else {
        console.error(
          "Failed to delete personal report. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renamePersonalReport = async () => {
    try {
      const response = await fetch(
        `${API_URL}/main/saved-filters/${renameFilterId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify({
            filter_name: newReportName,
          }),
        }
      );
      if (response.ok) {
        fetchAllReports();
        setIsRenamePopup(false);
      } else {
        console.error(
          "Failed to rename personal report. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const saveReportPopup = (
    <>
      <div
        className="save-report-overlay"
        onClick={() => setIsSaveReportPopup(false)}
      ></div>
      <div className="save-report-popup">
        <label>
          <p>Report Name:</p>
          <input
            type="text"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
          />
        </label>
        <div className="popup-buttons">
          <button onClick={createPersonalReport}>Save</button>
          <button onClick={() => setIsSaveReportPopup(false)}>Cancel</button>
        </div>
      </div>
    </>
  );

  const reportRenamePopup = (
    <>
      <div
        className="save-report-overlay"
        onClick={() => setIsRenamePopup(false)}
      ></div>
      <div className="save-report-popup">
        <label>
          <p>New Name:</p>
          <input
            type="text"
            value={newReportName}
            onChange={(e) => setNewReportName(e.target.value)}
          />
        </label>
        <div className="popup-buttons">
          <button onClick={renamePersonalReport}>Save</button>
          <button onClick={() => setIsRenamePopup(false)}>Cancel</button>
        </div>
      </div>
    </>
  );

  const fetchCompaniesWithFilters = async () => {
    const filters = {
      id_from: idfrom,
      id_to: idto,
      founded_date_from: foundedDateFrom,
      founded_date_to: foundedDateTo,
      rating_from: ratingsFrom,
      rating_to: ratingsTo,
      num_employees_from: numEmployeesFrom,
      num_employees_to: numEmployeesTo,
      company_types: selectedCompanyTypes,
      department_types: selectedDepartments,
      q: tags,
      page_size: pageSize,
      page_number: currentPage,
    };

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
      if (value !== "" && (Array.isArray(value) ? value.length > 0 : true)) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      }
    }

    const queryString = params.toString();
    const url = `${API_URL}/main/search/companies/?${queryString}`;

    console.log("Constructed URL:", url);

    try {
      const response = [];
      // await fetch(url, {
      //   headers: {
      //     Authorization: `Bearer ${Cookies.get("accessToken")}`,
      //   },
      // });
      const data = await response.json();
      setCompanies(data);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCompaniesWithFilters();
  }, [
    idfrom,
    idto,
    foundedDateFrom,
    foundedDateTo,
    ratingsFrom,
    ratingsTo,
    numEmployeesFrom,
    numEmployeesTo,
    selectedCompanyTypes,
    selectedDepartments,
    tags,
    pageSize,
    currentPage,
  ]);

  useEffect(() => {
    if (loggedInUserId) {
      fetchAllReports();
    }
  }, [loggedInUserId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  const CustomTooltip = ({ children, tooltipText }) => {
    return (
      <div className="custom-tooltip">
        {children}
        <span className="tooltip-text">{tooltipText}</span>
      </div>
    );
  };

  const [projects, setProjects] = useState([]);
  const [consultants, setConsultants] = useState([]);
  // const [isAddProjectOpen, setisAddProjectOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    project_type: "",
    website: "",
    banner: "",
    employee_type: "",
    salaryrange: "",
    location: "",
    contactinfo: "",
    companyregyear: "",
    // tags: [],
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    assigned_to: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "select-multiple"
          ? Array.from(e.target.selectedOptions, (option) => option.value)
          : value,
    }));
  };

  // const handleCancelClick = () => {
  //   setisAddProjectOpen(false);
  //   setisEditProjectOpen(false);
  // };
  // const handleAddProjectClick = async () => {
  //   setisAddProjectOpen(true);
  //   console.log("Button clicked");
  //   console.log(setisAddProjectOpen);
  // };

  const handleAddProject = async () => {
    try {
      const response = await fetch(`${API_URL}/main/projects/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify({
          ...formData,
          company: companyId,
        }),
      });

      if (response.ok) {
        fetchProjects();
        setFormData({
          jobtitle: "",
          expertiesreq: "",
          company: "",
          project_type: "",
          website: "",
          banner: "",
          employee_type: "",
          salaryrange: "",
          location: "",
          contactinfo: "",
          companyregyear: "",
          // tags: [],
          name: "",
          description: "",
          start_date: "",
          end_date: "",
          assigned_to: [],
        });
        Swal.fire({
          icon: "success",
          title: "Project Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setisAddProjectOpen(false);
      } else {
        console.error("Failed to add project. Status:", response.status);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add project. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
      console.error("Error during handleAddProject:", error);
    }
  };

  const fetchConsultants = async () => {
    try {
      const response = await fetch(`${API_URL}/main/consultants/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setConsultants(data);
      } else {
        console.error("Failed to fetch consultants. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching consultants:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/main/projects/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchConsultants();
    fetchProjects();
  }, []);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleConsultantSelect = (consultantId) => {
    if (formData.assigned_to.includes(consultantId)) {
      setFormData((prevData) => ({
        ...prevData,
        assigned_to: prevData.assigned_to.filter((id) => id !== consultantId),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        assigned_to: [...prevData.assigned_to, consultantId],
      }));
    }

    setDropdownOpen(false);
  };

  const handleEditConsultantSelect = (consultantId) => {
    if (editformData.assigned_to.includes(consultantId)) {
      setEditFormData((prevData) => ({
        ...prevData,
        assigned_to: prevData.assigned_to.filter((id) => id !== consultantId),
      }));
    } else {
      setEditFormData((prevData) => ({
        ...prevData,
        assigned_to: [...prevData.assigned_to, consultantId],
      }));
    }
    setDropdownOpen(false);
  };

  const handleDeleteProjectClick = async (projectId) => {
    try {
      const response = await fetch(`${API_URL}/main/projects/${projectId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      if (response.ok) {
        console.log("Project deleted successfully!");
        fetchProjects();
        Swal.fire({
          icon: "success",
          title: "Project Deleted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Failed to delete project. Status:", response.status);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete project. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  const [editformData, setEditFormData] = useState({
    company: "",
    project_type: "",
    website: "",
    banner: "",
    employee_type: "",
    salaryrange: "",
    location: "",
    contactinfo: "",
    companyregyear: "",
    // tags: [],
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    assigned_to: [],
    jobtitle: "",
    expertiesreq: "",
  });

  const [editedProjectId, setEditedProjectId] = useState(null);

  const handleEditInputChange = (e) => {
    const { name, value, type } = e.target;

    setEditFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "select-multiple"
          ? Array.from(e.target.selectedOptions, (option) => option.value)
          : value,
    }));
  };

  const [editingProject, setEditingProject] = useState(null);

  const [isEditProjectOpen, setisEditProjectOpen] = useState(false);

  const handleEditFormClick = async () => {
    try {
      if (!editedProjectId) {
        console.error("Invalid editedProjectId");
        return;
      }

      const originalProject = projects.find(
        (project) => project.id === editedProjectId
      );
      if (!originalProject) {
        console.error("Original project not found");
        return;
      }
      const updatedFields = {};
      for (const key in editformData) {
        if (editformData[key] !== originalProject[key]) {
          updatedFields[key] = editformData[key];
        }
      }
      const response = await fetch(
        `${API_URL}/main/projects/${editedProjectId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify(updatedFields),
        }
      );
      if (response.ok) {
        fetchProjects();
        setisEditProjectOpen(false);
      } else {
        console.error("Failed to update project. Status:", response.status);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update project. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error updating project:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  const openEditForm = (projectId) => {
    const selectedProject = projects.find(
      (project) => project.id === projectId
    );

    if (selectedProject) {
      setisEditProjectOpen(true);
      setEditFormData(selectedProject);
      setEditedProjectId(projectId);
      setEditingProject(selectedProject);
    }
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const isAnyRowSelected = selectedRows.length > 0;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log("Current viewType:", viewType);
  useEffect(() => {
    console.log('viewType changed to:', viewType);
  }, [viewType]);

  


  return (
    <div>
      <div className="table_company_top_bar">
        

        
          <div className="cp_view_toggler">
            <label
              className="cp_icon_label"
              onClick={() => {
                console.log("Switching to table view");
                setViewType("table");
              }}
            >
              <FaTableList
                style={{ fontSize: "23px" }}
                className={`cp_icon cp_card_icon ${
                  viewType === "table" ? "cp_selected_icon" : ""
                }`}
              />
            </label>
            <label
              className="cp_icon_label"
              onClick={() => setViewType("card")}
            >
              <BsGrid
                className={`cp_icon cp_grid_icon ${
                  viewType === "card" ? "cp_selected_icon" : ""
                }`}
              />
            </label>
          </div>
       

        <div className="cp_view_toggler">
          <div>
            {isAnyRowSelected && (
              <Button
                variant="contained"
                color="secondary"
                //   onClick={handleDeleteProjects}
                style={{ backgroundColor: "#4d4d4d", marginLeft: "8px" }}
              >
                Delete
              </Button>
            )}
            {isAnyRowSelected && selectedRows.length === 1 && (
              <Button
                variant="contained"
                color="primary"
                //   onClick={handleUpdateProject}
                style={{
                  backgroundColor: "#4d4d4d",
                  marginLeft: "8px",
                  cursor: "pointer",
                }}
              >
                Update
              </Button>
            )}
            {!isConsultantRole && (
            <Button
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.87)",
                marginRight: "20px",
                color: "white",
              }}
              onClick={handleAddProjectClick}
            >
              Create Project
            </Button>
            )}
          </div>
         
        </div>
      </div>

      {isAddProjectOpen && (
        <div className="company-profile-rating-popup-overlay">
          <div className="consultant_profile_edit_popup">
            <h2 className="project_table_pop_heading">Add Project</h2>
            <button
              className="project-close-button"
              onClick={handleCancelClick}
            >
              <RxCross2 />
            </button>
            <div style={{ height: "600px" }}>
              <div className="form_under_input">
                <label className="form_under_input_label">
                  Project Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="form_under_input_label">
                  Project Type
                  <input
                    type="text"
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <label className="form_under_input_label_1">
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{ height: "30px", marginTop: "0px" }}
                />
              </label>
              <label className="form_under_input_label_1">
                Assigned To
                <div className="custom-dropdown">
                  <div
                    className="selected-consultants"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                  >
                    {formData.assigned_to.length > 0
                      ? formData.assigned_to.map((consultantId) => {
                          const consultant = consultants.find(
                            (c) => c.id === consultantId
                          );
                          return consultant
                            ? consultant.user.username + ", "
                            : "";
                        })
                      : "Select Consultants"}
                  </div>
                  {isDropdownOpen && (
                    <div className="dropdown-list">
                      {consultants.map((consultant) => (
                        <div
                          key={consultant.id}
                          onClick={() => handleConsultantSelect(consultant.id)}
                        >
                          {consultant.user.username}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </label>
              <div className="form_under_input">
                <label className="form_under_input_label">
                  Contact
                  <input
                    type="text"
                    name="contactinfo"
                    value={formData.contactinfo}
                    onChange={handleInputChange}
                  />
                </label>

                {/* <label>
                      Registered Date
                      <input
                        type="text"
                        name="companyregyear"
                        value={formData.companyregyear}
                        onChange={handleInputChange}
                      />
                    </label> */}

                <label className="form_under_input_label">
                  Location
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <div className="form_under_input">
                <label className="form_under_input_label">
                  Website
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </label>

                <label className="form_under_input_label">
                  Salary Range
                  <input
                    type="text"
                    name="salaryrange"
                    value={formData.salaryrange}
                    onChange={handleInputChange}
                  />
                </label>

                {/* <label className="form_under_input_label">
                        Job Title
                        <input
                          type="text"
                          name="jobtitle"
                          value={formData.jobtitle}
                          onChange={handleInputChange}
                        />
                      </label> */}
              </div>

              {/* <label>
                      Banner
                      <input
                        type="text"
                        name="banner"
                        value={formData.banner}
                        onChange={handleInputChange}
                      />
                    </label> */}

              {/* <div className="form_under_input">
                      <label className="form_under_input_label">
                        Salary Range
                        <input
                          type="text"
                          name="salaryrange"
                          value={formData.salaryrange}
                          onChange={handleInputChange}
                        />
                      </label>

                      <label className="form_under_input_label">
                        Experties Required
                        <input
                          type="text"
                          name="expertiesreq"
                          value={formData.expertiesreq}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div> */}
              <div className="form_under_input">
                <label className="form_under_input_label">
                  Banner
                  <input
                    type="text"
                    name="banner"
                    value={formData.banner}
                    onChange={handleInputChange}
                  />
                </label>

                <label className="form_under_input_label">
                  Employee Type
                  <input
                    type="text"
                    name="employee_type"
                    value={formData.employee_type}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              {/* <label>
                      Employee Type
                      <input
                        type="text"
                        name="employee_type"
                        value={formData.employee_type}
                        onChange={handleInputChange}
                      />
                    </label> */}

              <div className="form_under_input">
                <label className="form_under_input_label">
                  Start Date
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                  />
                </label>

                <label className="form_under_input_label">
                  End Date
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <div className="company-profile-rating-popup__buttons">
                <button onClick={handleAddProject}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSaveReportPopup && saveReportPopup}
      {isRenamePopup && reportRenamePopup}
      <div className="company-content-container">
        {isSidebarOpen && (
          <div className="cp_sidebar_filter">
            <div className="save-view-section">
              <button onClick={() => setIsSaveReportPopup(true)}>
                <FaSave className="save-view-section-icon" /> Save
              </button>
              <button
                onClick={toggleReportsPanel}
                className={isReportsPanelOpen ? "view-section-active" : ""}
              >
                <FaEye className="save-view-section-icon" /> View
              </button>
              <button onClick={clearFilters}>
                <MdDelete className="save-view-section-icon" /> Clear
              </button>
            </div>
            {/* <p style={{ paddingLeft: "12px" }}>
                  For multiple filters response will be :{" "}
                </p>
                <div className="cp_filter_logic">
                  <label>
                    <input
                      type="radio"
                      name="logic"
                      value="or"
                      checked={selectedLogic === "or"}
                      onChange={handleLogicChange}
                    />
                    Union
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="logic"
                      value="and"
                      checked={selectedLogic === "and"}
                      onChange={handleLogicChange}
                    />
                    Intersection
                  </label>
                </div> */}

            <div className="cp_filter_section">
              <h3 className="cp_filter_title">ID Range</h3>
              <div className="cp_filter_input">
                <input
                  type="number"
                  placeholder="From"
                  value={idfrom}
                  onChange={(e) => {
                    setIdFrom(e.target.value);
                  }}
                />
                <span className="cp_filter_separator">to</span>
                <input
                  type="number"
                  placeholder="To"
                  value={idto}
                  onChange={(e) => {
                    setIdTo(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Your other filter sections */}
          </div>
        )}
        <div className={`company_lists ${isSidebarOpen ? "with-sidebar" : ""}`}>
          {isReportsPanelOpen && (
            <div className="top-pannel">
              <div className="top-pannel-content">
                <div className="reports-section">
                  <h3>Personal Reports</h3>
                  <div className="company_list_flex_container">
                    {personalReports &&
                      personalReports.length > 0 &&
                      personalReports.map((report) => (
                        <div
                          className={`company_list_flex_item ${
                            selectedFilter == report.id ? "selected-filter" : ""
                          }`}
                          key={report.id}
                        >
                          <div
                            className="company_list_flex_content"
                            onClick={() => {
                              applyFilter(report.filter_data);
                              setSelectedFilter(report.id);
                            }}
                          >
                            <PiClipboardTextDuotone
                              style={{ padding: "10px" }}
                            />
                            {report.filter_name}
                          </div>
                          <div className="company_list_options_menu">
                            <div
                              className="company_list_options_button"
                              onClick={() => handleOptionsMenuClick(report.id)}
                            >
                              <VscKebabVertical />
                            </div>
                            {openMenu === report.id && (
                              <div className="company_list_options_dropdown">
                                <div
                                  className="company_list_options_dropdown_opt"
                                  onClick={() =>
                                    deletePersonalReport(report.id)
                                  }
                                >
                                  Delete
                                </div>
                                <div
                                  className="company_list_options_dropdown_opt"
                                  onClick={() => {
                                    setRenameFilterId(report.id);
                                    setIsRenamePopup(true);
                                  }}
                                >
                                  Rename
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default TableTop;
