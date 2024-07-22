import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Button,
} from "@mui/material";
import "./styles.css";

import TableNav from "./TableNav";
import TableTop from "./TableTop";
import TableComponent from "./TableComponent";
import { IoMdSettings } from "react-icons/io";
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

import { MdFilterAlt } from "react-icons/md";
import Breadcrumbs from "./Breadcrumbs";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import { Hidden } from "@mui/material";
import PolicyTableComponent from "./PolicyTableComponent";

const PolicyTable = ({
    data,
    handleDelete,
    handleEdit,
    openEditForm,
    projectId,
    editFormData,
    userRole,
    editedPolicyId,
    handleAddPolicyClick,
    isConsultantRole,
    viewType,
    setViewType
  }) => {
    console.log("Data in policy: ", data);

  
  const navigate = useNavigate();
  const loggedInUserId = useSelector((state) => state.user.userData.user_id);
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);

  const TableContainerStyle = {
    // marginLeft: isSidebarOpen ? "310px" : "60px",
    marginLeft: "60px",
    // marginTop: tags.length > 0 ? "-25px" : "-65px",
  };
  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
//   const tagContainerStyle = {
//     marginBottom: tags.length > 0 ? "-65px" : "-35px",
//     width: "150px",
//     marginLeft: isSidebarOpen ? "310px" : "60px",
//     overflow: "!hidden",
//   };
  const TableTagContainerStyle = {
    marginLeft: isSidebarOpen ? "600px" : "350px",
  };

  const handleDeletePolicies = () => {
    selectedRows.forEach((policyId) => {
      handleDelete(policyId);
    });
    setSelectedRows([]);
  };

  const handleUpdatePolicy = () => {
    if (selectedRows.length === 1) {
      openEditForm(selectedRows[0]);
      setSelectedRows([]);
    }
  };

  const isAnyRowSelected = selectedRows.length > 0;


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

  

  const handleChangePageSize = (current, size) => {
    setPageSize(size);
  };
  const [isSaveReportPopup, setIsSaveReportPopup] = useState(false);
  const [reportName, setReportName] = useState("");
  const [newReportName, setNewReportName] = useState("");

  const [isRenamePopup, setIsRenamePopup] = useState(false);
  const [renameFilterId, setRenameFilterId] = useState("");

  

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
  

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     let newTag;
  //     if (idfrom !== "" && idto !== "") {
  //       newTag = `ID RANGE: ${idfrom}-${idto}`;
  //     }
  //     setTags([...tags, newTag]);
  //     setIdFrom("");
  //     setIdTo("");
  //   }
  // };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      let newTag;

      // Handle ID range
      if (idfrom !== "" && idto !== "") {
        newTag = `ID RANGE: ${idfrom}-${idto}`;
      }

      // Handle Date range
      if (foundedDateFrom !== "" && foundedDateTo !== "") {
        newTag = `DATE RANGE: ${foundedDateFrom} to ${foundedDateTo}`;
      }

      // Add the tag if either ID range or Date range is provided
      if (newTag) {
        setTags([...tags, newTag]);
        setIdFrom("");
        setIdTo("");
        setFoundedDateFrom("");
        setFoundedDateTo("");
      }
    }
  };

  //const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState([]);

  const [selectedDepartments, setSelectedDepartments] = useState([]);

  



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

  // const handleTagRemove = (tag) => {
  //   const updatedTags = tags.filter((t) => t !== tag);
  //   setTags(updatedTags);

  //   const updatedSelectedCompanyTypes = selectedCompanyTypes.filter((type) => {
  //     switch (tag) {
  //       case "Corporate":
  //         return type !== "1";
  //       case "Startup":
  //         return type !== "2";
  //       case "MNC":
  //         return type !== "3";
  //       case "Other":
  //         return type !== "4";
  //       default:
  //         return true;
  //     }
  //   });

  //   setSelectedCompanyTypes(updatedSelectedCompanyTypes);

  //   const updatedSelectedDepartments = selectedDepartments.filter((dept) => {
  //     switch (tag) {
  //       case "Healthcare":
  //         return dept !== "1";
  //       case "Education":
  //         return dept !== "2";
  //       case "IT":
  //         return dept !== "3";
  //       case "Retail":
  //         return dept !== "4";
  //       default:
  //         return true;
  //     }
  //   });

  //   setSelectedDepartments(updatedSelectedDepartments);
  // };

  const handleTagRemove = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);

    // Splitting the tag to get category and value
    const [category, value] = tag.split(": ");

    if (category === "COMPANY TYPE") {
      const updatedSelectedCompanyTypes = selectedCompanyTypes.filter(
        (type) => type !== value
      );
      setSelectedCompanyTypes(updatedSelectedCompanyTypes);
    } else if (category === "DEPARTMENT") {
      const updatedSelectedDepartments = selectedDepartments.filter(
        (dept) => dept !== value
      );
      setSelectedDepartments(updatedSelectedDepartments);
    }
  };

  const handleCompanyTypeChange = (value) => {
    const updatedSelectedCompanyTypes = selectedCompanyTypes.includes(value)
      ? selectedCompanyTypes.filter((type) => type !== value)
      : [...selectedCompanyTypes, value];

    setSelectedCompanyTypes(updatedSelectedCompanyTypes);

    const companyTypeTags = updatedSelectedCompanyTypes.map((type) => {
      switch (type) {
        case "1":
          return "COMPANY TYPE: Corporate";
        case "2":
          return "COMPANY TYPE: Startup";
        case "3":
          return "COMPANY TYPE: MNC";
        case "4":
          return "COMPANY TYPE: Other";
        default:
          return "";
      }
    });

    const selectedDepartmentsTags = selectedDepartments.map((dept) => {
      switch (dept) {
        case "1":
          return "DEPARTMENT: Healthcare";
        case "2":
          return "DEPARTMENT: Education";
        case "3":
          return "DEPARTMENT: IT";
        case "4":
          return "DEPARTMENT: Retail";
        default:
          return "";
      }
    });

    const allTags = [...companyTypeTags, ...selectedDepartmentsTags];

    if (idfrom !== "" && idto !== "") {
      allTags.push(`ID RANGE: ${idfrom}-${idto}`);
    }

    setTags(allTags);
  };

  const handleDepartmentCheckboxChange = (value) => {
    const updatedSelectedDepartments = selectedDepartments.includes(value)
      ? selectedDepartments.filter((dept) => dept !== value)
      : [...selectedDepartments, value];

    setSelectedDepartments(updatedSelectedDepartments);

    const companyTypeTags = selectedCompanyTypes.map((type) => {
      switch (type) {
        case "1":
          return "COMPANY TYPE: Corporate";
        case "2":
          return "COMPANY TYPE: Startup";
        case "3":
          return "COMPANY TYPE: MNC";
        case "4":
          return "COMPANY TYPE: Other";
        default:
          return "";
      }
    });

    const selectedDepartmentsTags = updatedSelectedDepartments.map((dept) => {
      switch (dept) {
        case "1":
          return "DEPARTMENT: Healthcare";
        case "2":
          return "DEPARTMENT: Education";
        case "3":
          return "DEPARTMENT: IT";
        case "4":
          return "DEPARTMENT: Retail";
        default:
          return "";
      }
    });

    const allTags = [...companyTypeTags, ...selectedDepartmentsTags];
    if (idfrom !== "" && idto !== "") {
      allTags.push(`ID RANGE: ${idfrom}-${idto}`);
    }

    setTags(allTags);
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
  
  const tagContainerStyle = {
    marginBottom: tags.length > 0 ? "-65px" : "-35px",
    width: "150px",
    marginLeft: isSidebarOpen ? "310px" : "60px",
    overflow: "!hidden",
  };

 
  const groupByCategory = (tags) => {
    const groupedTags = {};
    tags.forEach((tag) => {
      const [category, value] = tag.split(": ");
      if (!groupedTags[category]) {
        groupedTags[category] = [];
      }
      if (value && !groupedTags[category].includes(value)) {
        groupedTags[category].push(value);
      }
    });
    return groupedTags;
  };


  return (
    <>
       <TableNav /> 
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

          <div style={{ left: "10%" }}>
            <Breadcrumbs />
          </div>

          <div className="cp_view_toggler">
            <div>
            {!isConsultantRole && (
              <Button
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.87)",
                  marginRight: "20px",
                  color: "white",
                }}
                onClick={handleAddPolicyClick}
              >
                Create Policy
              </Button>
            )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="table_cp_search_container" style={tagContainerStyle}>
          <input
            type="text"
            placeholder="Search by tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
          />
        </div>

        <div>
          {Object.entries(groupByCategory(tags)).map(([category, values]) => (
            <div key={category}>
              <div
                style={{
                  ...TableTagContainerStyle,
                  marginTop: "25px",
                  marginBottom: "-65px",
                }}
              >
                <h4
                  style={{
                    color: "black",
                    fontSize: "12px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    marginLeft: "18px",
                    marginBottom: "7px",
                    cursor: "pointer",
                    transition: "color 0.3s",
                    ":hover": { color: "#4da92b" },
                  }}
                >
                  {category}
                </h4>
                <div className="table_cp_tag_container">
                  {values.map((value) => (
                    <div key={value} className="table_cp_tag">
                      <div className="tag-item">
                        <p>{value}</p>
                        <button
                          onClick={() =>
                            handleTagRemove(`${category}: ${value}`)
                          }
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <>
        <PolicyTableComponent 
        data={data}
        handleAddPolicyClick={handleAddPolicyClick}
        
        userRole={userRole}
        handleDelete={handleDelete}
        openEditForm={openEditForm}
        isSidebarOpen={isSidebarOpen}
        tags={tags}
        
        />
        <div
        className={`cp_filter_icon ${isSidebarOpen ? "active" : ""}`}
        onClick={toggleSidebar}
        style={{
          backgroundColor: isSidebarOpen ? "" : "#ccc",
          display: "flex",
          flexDirection: "column",
          width: "25px",
          height: "100vh",
          borderRadius: "0px",
          top: "0px",
          position: "fixed",
          marginTop: "120px",
        }}
      >
        <AiOutlineFilter className="cp_icon" />
      </div>
      {isSaveReportPopup && saveReportPopup}
      {isRenamePopup && reportRenamePopup}
      <div className="company-content-container">
        {isSidebarOpen && (
          <div className="table_cp_sidebar_filter">
            <h2 className="policy-filter-title-section">
              <MdFilterAlt className="policy_filter_cp_icon" onClick={toggleSidebar}
             
              />
              FILTERS
            </h2>
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

            <div className="table_cp_filter_section">
              <div classname="table_filter_heading">
                <span class="table-down-icon">
                  <IoChevronDownOutline />
                </span>
                <h3 class="cp_filter_title">ID Range</h3>
              </div>

              <div className="cp_filter_input">
                <input
                  type="number"
                  placeholder="From"
                  value={idfrom}
                  onChange={(e) => {
                    setIdFrom(e.target.value);
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleKeyPress(e)}
                />
                <span className="cp_filter_separator">to</span>
                <input
                  type="number"
                  placeholder="To"
                  value={idto}
                  onChange={(e) => {
                    setIdTo(e.target.value);
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleKeyPress(e)}
                />
              </div>
            </div>

            <div className="table_cp_filter_section">
              <div classname="table_filter_heading">
                <span class="table-down-icon">
                  <IoChevronDownOutline />
                </span>
                <h3 class="cp_filter_title">Created Date Range</h3>
              </div>
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
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>

            <div className="table_cp_filter_section">
              <div classname="table_filter_heading">
                <span
                  className={`table-down-icon ${
                    isCompanyTypeDropdownOpen ? "open" : ""
                  }`}
                  onClick={toggleDropdown}
                >
                  {isCompanyTypeDropdownOpen ? (
                    <IoChevronUpOutline />
                  ) : (
                    <IoChevronDownOutline />
                  )}
                </span>
                <h3 className="cp_filter_title">Company Type </h3>

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
            </div>
            <div className="table_cp_filter_section">
              <div classname="table_filter_heading">
                <span
                  className={`table-down-icon ${
                    isDepartmentDropdownOpen ? "open" : ""
                  }`}
                  onClick={toggleDepartmentDropdown}
                >
                  {isDepartmentDropdownOpen ? (
                    <IoChevronUpOutline />
                  ) : (
                    <IoChevronDownOutline />
                  )}
                </span>
                <h3 class="cp_filter_title">Department</h3>

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

       
      </>
    </>
  );
};

export default PolicyTable;
