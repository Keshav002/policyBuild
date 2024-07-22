import React, { useMemo, useState, useEffect } from "react";
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
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import "./DataTable.css";
import TableNav from "./TableNav";
import { BsGrid } from "react-icons/bs";
import { FaTableList } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";
import { AiOutlineFilter } from "react-icons/ai";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { FaSave, FaEye } from "react-icons/fa";
import { PiClipboardTextDuotone } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { Pagination } from "antd";
import { HiTableCells } from "react-icons/hi2";
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
import { autoBatchEnhancer } from "@reduxjs/toolkit";
import "./DataTable.css";

export const ConsultantDataTable = ({ data, setViewType, viewType }) => {
  const navigate = useNavigate();
  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "ID",
  //       accessor: "id",
  //     },
  //     {
  //       Header: "Name",
  //       accessor: "username",
  //     },
  //     {
  //       Header: "Experience",
  //       accessor: "yearofexp",
  //     },
  //     {
  //       Header: "Ratings",
  //       accessor: "average_rating",
  //     },
  //     {
  //       Header: "Tags",
  //       accessor: "tags",
  //     },
  //   ],
  //   []
  // );

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  // } = useTable({ columns, data });
  const loggedInUserId = useSelector((state) => state.user.userData.user_id);
  const [yearOfExpFrom, setyearOfExpFrom] = useState("");
  const [yearOfExpTo, setyearOfExpTo] = useState("");
  const [page, setPage] = useState(0);
  const [tags, setTags] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [isSaveReportPopup, setIsSaveReportPopup] = useState(false);
  const [reportName, setReportName] = useState("");
  const [newReportName, setNewReportName] = useState("");

  const [isRenamePopup, setIsRenamePopup] = useState(false);
  const [renameFilterId, setRenameFilterId] = useState("");

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm && !tags.includes(searchTerm)) {
      setTags([...tags, searchTerm]);
      setSearchTerm("");
    }
  };

  const TableTagContainerStyle = {
    // marginLeft: isSidebarOpen ? "600px" : "350px",
    marginLeft: "350px",
  };

  const TableContainerStyle = {
    // marginLeft: "6px",
    marginTop: "150px",
    marginLeft: isSidebarOpen ? "310px" : "60px",

    // marginTop: tags.length > 0 ? "105px" : "130px",
  };
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
                    // marginLeft: "18px",
                    marginLeft: "198px",
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
                    <div
                      key={value}
                      className="table_cp_tag"
                      style={{
                        backgroundColor: "#eee",
                        color: "#000",
                        margin: "5px",
                        borderRadius: "10px",
                        /* border: 1px solid black; */
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                        /* max-height: fit-content; */
                        padding: "2px 10px",
                        whiteSpace: "nowrap",
                        fontSize: "16px",
                        display: "block",
                      }}
                    >
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

      <TableContainer
        className="table-container"
        component={Paper}
        style={TableContainerStyle}
      >
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-header">
              <TableCell className="table-header" align="center">
                ID
              </TableCell>
              <TableCell className="table-header" align="center">
                Name
              </TableCell>
              <TableCell className="table-header" align="center">
                Years of Experience
              </TableCell>
              <TableCell className="table-header" align="center">
                Ratings
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => {
              console.log("Rendering row:", row);

              if (!row || !row.id) {
                console.error("Row or row.id is undefined", row);
                return null;
              }

              return (
                <TableRow
                  key={row.id}
                  onClick={() =>
                    navigate(`/company-projects/${row.id}/policy-list`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <TableCell
                    className="table-cell"
                    component="th"
                    scope="row"
                    align="center"
                  >
                    {row.id}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    {row.username}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    {row.yearofexp}
                  </TableCell>

                  <TableCell className="table-cell" align="center">
                    {row.average_rating}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 5, 7]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
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
          marginTop: "90px",
        }}
      >
        <AiOutlineFilter className="cp_icon" />
      </div>

      <div className="company-content-container">
        {isSidebarOpen && (
         <div className="ttable_cp_sidebar_filter">
         <h2 className="compp-filter-title-section">
           <MdFilterAlt className="policyy_filter_cp_icon" onClick={toggleSidebar}
          
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
                <h3 class="cp_filter_title">Years of Experience</h3>
              </div>

              <div className="cp_filter_input">
                <input
                  type="number"
                  placeholder="From"
                  value={yearOfExpFrom}
                  onChange={(e) => setyearOfExpFrom(e.target.value)}
                />
                <span className="cp_filter_separator">to</span>
                <input
                  type="number"
                  placeholder="To"
                  value={yearOfExpTo}
                  onChange={(e) => setyearOfExpTo(e.target.value)}
                />
              </div>
            </div>

            <div className="table_cp_filter_section">
              <div classname="table_filter_heading">
                <span class="table-down-icon">
                  <IoChevronDownOutline />
                </span>
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

      {/* <h1 style={{ color: "#565656", marginTop: "30px", marginLeft: "14vh" }}>Consultant-List</h1>
      <TableContainer className="table-container" style={{ marginTop: "20px" }}>
        <Table {...getTableProps()} size="medium" className="table" >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    style={{
                      backgroundColor: "rgb(115,115,115)",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.slice(startIndex, endIndex).map((row, index) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  onClick={() => {
                    if (!row.cells[0].getCellProps().disabled) {
                      navigate(`/consultant-profile/${row.original.id}`)
                    }
                  }}
                  style={{ cursor: "pointer" }}
                  key={index}
                >
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 5, 7]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableContainer> */}
    </>
  );
};
