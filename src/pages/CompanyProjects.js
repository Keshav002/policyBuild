import React, { useState, useEffect } from "react";
import PolicyCard from ".././components/PolicyCard";
import Nav from ".././components/Nav";
import "./CompanyList.css";
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

import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

function CompanyProjects() {
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

  const [viewType, setViewType] = useState("card");

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
  const [isAddProjectOpen, setisAddProjectOpen] = useState(false);
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
    tags: "",
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

  const handleCancelClick = () => {
    setisAddProjectOpen(false);
    setisEditProjectOpen(false);
  };
  const handleAddProjectClick = async () => {
    setisAddProjectOpen(true);
  };

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
          company: "",
          project_type: "",
          website: "",
          banner: "",
          employee_type: "",
          salaryrange: "",
          location: "",
          contactinfo: "",
          companyregyear: "",
          tags: "",
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
    tags: "",
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    assigned_to: [],
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

      // console.log("editedProjectId:", editedProjectId);
      // console.log("editformData:", editformData);

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

  return (
    <>
      <div className="company-list-page">
        <Nav />
        <div className="cp_company_top_bar">
          <div
            className={`cp_filter_icon ${isSidebarOpen ? "active" : ""}`}
            // onClick={toggleSidebar}
          >
            <CustomTooltip tooltipText="Will Update Soon..">
              <AiOutlineFilter className="cp_icon" />
            </CustomTooltip>
          </div>

          {/* <div className="cp_current_report_name">{currentReportName}</div> */}
          <div className="cp_search_container">
            <input
              type="text"
              placeholder="Search by tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
            />
          </div>
          <div className="cp_tag_container">
            {tags.map((tag) => (
              <div key={tag} className="cp_tag">
                {tag}
                <button onClick={() => handleTagRemove(tag)}>&times;</button>
              </div>
            ))}
          </div>

          <div className="cp_view_toggler">
            <label
              className="cp_icon_label"
              onClick={() => setViewType("table")}
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
        </div>
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

              <div className="cp_filter_section">
                <h3 className="cp_filter_title">Created Date Range</h3>
                <div className="cp_filter_input">
                  <DatePicker
                    onChange={(date) => {
                      setFoundedDateFrom(
                        date ? dayjs(date).format("DD-MM-YYYY") : ""
                      );
                    }}
                    open={isDatePicker1Open}
                    onOpenChange={(visible) => setDatePicker1Open(visible)}
                    value={
                      foundedDateFrom
                        ? dayjs(foundedDateFrom, "DD-MM-YYYY")
                        : null
                    }
                    format="DD-MM-YYYY"
                  />

                  <span className="cp_filter_separator">to</span>
                  <DatePicker
                    onChange={(date) => {
                      setFoundedDateTo(
                        date ? dayjs(date).format("DD-MM-YYYY") : ""
                      );
                    }}
                    open={isDatePicker2Open}
                    onOpenChange={(visible) => setDatePicker2Open(visible)}
                    value={
                      foundedDateTo ? dayjs(foundedDateTo, "DD-MM-YYYY") : null
                    }
                    format="DD-MM-YYYY"
                  />
                </div>
              </div>

              {/* <div className="cp_filter_section">
                <h3 className="cp_filter_title">Ratings Range</h3>
                <div className="cp_filter_input">
                  <input
                    type="number"
                    placeholder="From"
                    value={ratingsFrom}
                    onChange={(e) => {
                      setRatingsFrom(e.target.value);
                    }}
                  />
                  <span className="cp_filter_separator">to</span>
                  <input
                    type="number"
                    placeholder="To"
                    value={ratingsTo}
                    onChange={(e) => {
                      setRatingsTo(e.target.value);
                    }}
                  />
                </div>
              </div> */}

              {/* <div className="cp_filter_section">
                <h3 className="cp_filter_title">Number of Employees</h3>
                <div className="cp_filter_input">
                  <input
                    type="number"
                    placeholder="From"
                    value={numEmployeesFrom}
                    onChange={(e) => setNumEmployeesFrom(e.target.value)}
                  />
                  <span className="cp_filter_separator">to</span>
                  <input
                    type="number"
                    placeholder="To"
                    value={numEmployeesTo}
                    onChange={(e) => setNumEmployeesTo(e.target.value)}
                  />
                </div>
              </div> */}

              <div className="cp_filter_section">
                <h3 className="cp_filter_title">
                  Company Type{" "}
                  <span
                    className={`dropdown-icon ${
                      isCompanyTypeDropdownOpen ? "open" : ""
                    }`}
                    onClick={toggleDropdown}
                  >
                    {isCompanyTypeDropdownOpen ? (
                      <FaCaretUp />
                    ) : (
                      <FaCaretDown />
                    )}
                  </span>
                </h3>
                {isCompanyTypeDropdownOpen && (
                  <div className="dropdown-options">
                    <label>
                      <input
                        type="checkbox"
                        value="Corporate"
                        checked={selectedCompanyTypes.includes("1")}
                        onChange={() => handleCompanyTypeChange("1")}
                      />
                      Corporate
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Startup"
                        checked={selectedCompanyTypes.includes("2")}
                        onChange={() => handleCompanyTypeChange("2")}
                      />
                      Startup
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="MNC"
                        checked={selectedCompanyTypes.includes("3")}
                        onChange={() => handleCompanyTypeChange("3")}
                      />
                      MNC
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Other"
                        checked={selectedCompanyTypes.includes("4")}
                        onChange={() => handleCompanyTypeChange("4")}
                      />
                      Other
                    </label>
                  </div>
                )}
              </div>

              <div className="cp_filter_section">
                <h3 className="cp_filter_title">
                  Department
                  <span
                    className={`dropdown-icon ${
                      isDepartmentDropdownOpen ? "open" : ""
                    }`}
                    onClick={toggleDepartmentDropdown}
                  >
                    {isDepartmentDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
                  </span>
                </h3>
                {isDepartmentDropdownOpen && (
                  <div className="dropdown-options">
                    <label>
                      <input
                        type="checkbox"
                        value="Healthcare"
                        onChange={() => handleDepartmentCheckboxChange("1")}
                        checked={selectedDepartments.includes("1")}
                      />
                      Healthcare
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Education"
                        onChange={() => handleDepartmentCheckboxChange("2")}
                        checked={selectedDepartments.includes("2")}
                      />
                      Education
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="IT"
                        onChange={() => handleDepartmentCheckboxChange("3")}
                        checked={selectedDepartments.includes("3")}
                      />
                      IT
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Retail"
                        onChange={() => handleDepartmentCheckboxChange("4")}
                        checked={selectedDepartments.includes("4")}
                      />
                      Retail
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}
          <div
            className={`company_lists ${isSidebarOpen ? "with-sidebar" : ""}`}
          >
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
                              selectedFilter == report.id
                                ? "selected-filter"
                                : ""
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
                                onClick={() =>
                                  handleOptionsMenuClick(report.id)
                                }
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

            <div className="company-list-heading">
              <h1>
                Projects
                <button
                  className="company_project_add_edit_button"
                  onClick={handleAddProjectClick}
                >
                  Create Project
                </button>
              </h1>
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
                  <div style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
                  <label>
                    Project Name
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Project Type
                    <input
                      type="text"
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label>
                    Description
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      style={{ height: "30px", marginTop: "0px" }}
                    />
                  </label>
                  <label>
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
                              onClick={() =>
                                handleConsultantSelect(consultant.id)
                              }
                            >
                              {consultant.user.username}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </label>

                  <label>
                      Contact
                      <input
                        type="text"
                        name="contactinfo"
                        value={formData.contactinfo}
                        onChange={handleInputChange}
                      />
                    </label>

                    <label>
                      Registered Date
                      <input
                        type="text"
                        name="companyregyear"
                        value={formData.companyregyear}
                        onChange={handleInputChange}
                      />
                    </label>


                    <label>
                      Location
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </label>


                    <label>
                      Website
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </label>


                    <label>
                      Job Title
                      <input
                        type="text"
                        name="jobtitle"
                        value={formData.jobtitle}
                        onChange={handleInputChange}
                      />
                    </label>


                    <label>
                      Banner
                      <input
                        type="text"
                        name="banner"
                        value={formData.banner}
                        onChange={handleInputChange}
                      />
                    </label>


                    <label>
                      Salary Range
                      <input
                        type="text"
                        name="salaryrange"
                        value={formData.salaryrange}
                        onChange={handleInputChange}
                      />
                    </label>

                    <label>
                      Experties Required
                      <input
                        type="text"
                        name="expertiesreq"
                        value={formData.expertiesreq}
                        onChange={handleInputChange}
                      />
                    </label>


                    <label>
                      Employee Type
                      <input
                        type="text"
                        name="employee_type"
                        value={formData.employee_type}
                        onChange={handleInputChange}
                      />
                    </label>


                  <label>
                    Start Date
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label>
                    End Date
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleInputChange}
                    />
                  </label>

                  <div className="company-profile-rating-popup__buttons">
                    <button onClick={handleAddProject}>Submit</button>
                  </div>
                </div>
              </div>
              </div>
            )}

            {isEditProjectOpen && (
              <div className="company-profile-rating-popup-overlay">
                <div className="consultant_profile_edit_popup">
                  <h2 className="project_table_pop_heading">Edit Project</h2>
                  <button
                    className="project-close-button"
                    onClick={handleCancelClick}
                  >
                    <RxCross2 />
                  </button>
                  <div style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
                  <label>
                    Project Name
                    <input
                      type="text"
                      name="name"
                      value={editformData.name}
                      onChange={handleEditInputChange}
                    />
                  </label>

                  <label>
                    Project Type
                    <input
                      type="text"
                      name="project_type"
                      value={editformData.project_type}
                      onChange={handleEditInputChange}
                    />
                  </label>

                  <label>
                    Description
                    <textarea
                      name="description"
                      value={editformData.description}
                      onChange={handleEditInputChange}
                      style={{ height: "30px", marginTop: "0px" }}
                    />
                  </label>
                  <label>
                    Assigned To
                    <div className="custom-dropdown">
                      <div
                        className="selected-consultants"
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                      >
                        {editformData.assigned_to.length > 0
                          ? editformData.assigned_to.map((consultantId) => {
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
                              onClick={() =>
                                handleConsultantSelect(consultant.id)
                              }
                            >
                              {consultant.user.username}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </label>

                  <label>
                      Contact
                      <input
                        type="text"
                        name="contactinfo"
                        value={editformData.contactinfo}
                        onChange={handleEditInputChange}
                      />
                    </label>

                    <label>
                      Registered Date
                      <input
                        type="text"
                        name="companyregyear"
                        value={editformData.companyregyear}
                        onChange={handleEditInputChange}
                      />
                    </label>


                    <label>
                      Location
                      <input
                        type="text"
                        name="location"
                        value={editformData.location}
                        onChange={handleEditInputChange}
                      />
                    </label>


                    <label>
                      Website
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </label>


                    <label>
                      Job Title
                      <input
                        type="text"
                        name="jobtitle"
                        value={editformData.jobtitle}
                        onChange={handleEditInputChange}
                      />
                    </label>


                    <label>
                      Banner
                      <input
                        type="text"
                        name="banner"
                        value={editformData.banner}
                        onChange={handleEditInputChange}
                      />
                    </label>


                    <label>
                      Salary Range
                      <input
                        type="text"
                        name="salaryrange"
                        value={editformData.salaryrange}
                        onChange={handleEditInputChange}
                      />
                    </label>

                    <label>
                      Experties Required
                      <input
                        type="text"
                        name="expertiesreq"
                        value={editformData.expertiesreq}
                        onChange={handleEditInputChange}
                      />
                    </label>


                    {/* <label>
                      Employee Type
                      <input
                        type="text"
                        name="employee_type"
                        value={editformData.employee_type}
                        onChange={handleEditInputChange}
                      />
                    </label> */}


                  <label>
                    Start Date
                    <input
                      type="date"
                      name="start_date"
                      value={editformData.start_date}
                      onChange={handleEditInputChange}
                    />
                  </label>

                  <label>
                    End Date
                    <input
                      type="date"
                      name="end_date"
                      value={editformData.end_date}
                      onChange={handleEditInputChange}
                    />
                  </label>

                  <div className="company-profile-rating-popup__buttons">
                    <button onClick={handleEditFormClick}>Submit</button>
                  </div>
                </div>
              </div>
              </div>
            )}

            <div className="company-list-container">
              {viewType === "table" && (
                <div className="table-container">
                  {projects && projects.length > 0 ? (
                    <DataTable
                      data={projects}
                      handleDeleteProjectClick={handleDeleteProjectClick}
                      openEditForm={openEditForm}
                      isEditFormOpen={isEditFormOpen}
                    />
                  ) : (
                    <p>No projects available.</p>
                  )}
                </div>
              )}

              {viewType !== "table" && (
                <div className="company_lists_cards">
                  {projects &&
                    projects.map((project) => (
                      <PolicyCard
                        {...project}
                        projectId={project.id}
                        handleEditFormClick={handleEditFormClick}
                        openEditForm={openEditForm}
                        handleDeleteProjectClick={() => {
                          handleDeleteProjectClick(project.id);
                        }}
                        isEditFormOpen={isEditFormOpen}
                      />
                    ))}

                  {/* {companies &&
                    companies.paginated_results?.map((company, index) => (
                      <CompanyCard key={index} company={company} />
                    ))} */}
                </div>
              )}
              <hr />
              <div className="company_list_pagination_container">
                <>
                  {/* <Pagination
                    total={companies.company_total_hits}
                    current={currentPage}
                    pageSize={pageSize}
                    onChange={handleChangePage}
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`
                    }
                    showSizeChanger
                    onShowSizeChange={handleChangePageSize}
                    pageSizeOptions={[2, 4, 6, 8]}
                  /> */}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyProjects;
