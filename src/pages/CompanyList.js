import React, { useState } from "react";
import CompanyCard from ".././components/CompanyCard";
import Nav from ".././components/Nav";
import "./CompanyList.css";
import { BsCardText, BsGrid } from "react-icons/bs";
import { CiBoxList } from "react-icons/ci";
import { AiOutlineFilter } from "react-icons/ai";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { FaSave, FaEye } from "react-icons/fa";
import { PiClipboardTextDuotone } from "react-icons/pi";
function CompanyList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);
  // const [companyType, setCompanyType] = useState("");
  const [viewType, setViewType] = useState("card"); // 'card' or 'table'
  // const [department, setDepartment] = useState("");
  const [reportName, setReportName] = useState("");
  const [currentReportName, setCurrentReportName] = useState("All Companies");
  const [isSaveReportPopup, setIsSaveReportPopup] = useState(false);
  const [ratingsFrom, setRatingsFrom] = useState("");
  const [ratingsTo, setRatingsTo] = useState("");
  const [foundedDateFrom, setFoundedDateFrom] = useState("");
  const [foundedDateTo, setFoundedDateTo] = useState("");
  const [numEmployeesFrom, setNumEmployeesFrom] = useState("");
  const [numEmployeesTo, setNumEmployeesTo] = useState("");
  const [idfrom, setIdFrom] = useState("");
  const [idto, setIdTo] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setTags([...tags, searchTerm]);
      setSearchTerm("");
    }
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleTagRemove = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };
  const [isReportsPanelOpen, setIsReportsPanelOpen] = useState(false);

  const toggleReportsPanel = () => {
    setIsReportsPanelOpen(!isReportsPanelOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCompanyTypeChange = (value) => {
    const updatedSelectedCompanyTypes = selectedCompanyTypes.includes(value)
      ? selectedCompanyTypes.filter((type) => type !== value)
      : [...selectedCompanyTypes, value];

    setSelectedCompanyTypes(updatedSelectedCompanyTypes);
  };

  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] =
    useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const toggleDepartmentDropdown = () => {
    setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen);
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
    // Extract filter values from the 'report' object and apply them
    const {
      tags,
      selectedLogic,
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
    } = report;

    // Apply tags filter
    setTags(tags);

    // Apply company type filter
    setSelectedCompanyTypes(selectedCompanyTypes);

    // Apply department filter
    setSelectedDepartments(selectedDepartments);

    // Apply other filters
    setIdFrom(idfrom || "");
    setIdTo(idto || "");
    setRatingsFrom(ratingsFrom || "");
    setRatingsTo(ratingsTo || "");
    setFoundedDateFrom(foundedDateFrom || "");
    setFoundedDateTo(foundedDateTo || "");
    setNumEmployeesFrom(numEmployeesFrom || "");
    setNumEmployeesTo(numEmployeesTo || "");
    setSelectedLogic(selectedLogic || "");
  };

  const saveReport = () => {
    const existingFilters =
      JSON.parse(localStorage.getItem("personalFilters")) || {};

    const reportData = {
      tags,
      viewType,
      selectedLogic,
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
    };

    existingFilters[reportName] = reportData;

    localStorage.setItem("personalFilters", JSON.stringify(existingFilters));

    setIsSaveReportPopup(false);
    setReportName("");
  };

  const commonReports = [
    { name: "Highly Rated", filter1: "some value", filter2: "another value" },
    { name: "Green Companies", filter1: "different value", filter3: "yet another value" },
  ];

  const personalReports =
    JSON.parse(localStorage.getItem("personalFilters")) || {};

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
          <button onClick={saveReport}>Save</button>
          <button onClick={() => setIsSaveReportPopup(false)}>Cancel</button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="company-list-page">
        <Nav />
        <div className="cp_company_top_bar">
          <div
            className={`cp_filter_icon ${isSidebarOpen ? "active" : ""}`}
            onClick={toggleSidebar}
          >
            <AiOutlineFilter className="cp_icon" />
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
              onClick={() => setViewType("card")}
            >
              <CiBoxList
                className={`cp_icon cp_card_icon ${
                  viewType === "card" ? "cp_selected_icon" : ""
                }`}
              />
            </label>
            <label
              className="cp_icon_label"
              onClick={() => setViewType("table")}
            >
              <BsGrid
                className={`cp_icon cp_grid_icon ${
                  viewType === "table" ? "cp_selected_icon" : ""
                }`}
              />
            </label>
          </div>
        </div>
        {isSaveReportPopup && saveReportPopup}
        <div className="company-content-container">
          {isSidebarOpen && (
            <div className="cp_sidebar_filter">
              <div className="save-view-section">
                <button onClick={() => setIsSaveReportPopup(true)}>
                  <FaSave /> Save Report
                </button>
                <button onClick={toggleReportsPanel}>
                  <FaEye /> View Reports
                </button>
              </div>
              <p style={{ paddingLeft: "12px" }}>
                For multiple filters responce will be :{" "}
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
              </div>
              <div className="cp_filter_section">
                <h3 className="cp_filter_title">ID Range</h3>
                <div className="cp_filter_input">
                  <input
                    type="number"
                    placeholder="From"
                    value={idfrom}
                    onChange={(e) => setIdFrom(e.target.value)}
                  />
                  <span className="cp_filter_separator">to</span>
                  <input
                    type="number"
                    placeholder="To"
                    value={idto}
                    onChange={(e) => setIdTo(e.target.value)}
                  />
                </div>
              </div>

              <div className="cp_filter_section">
                <h3 className="cp_filter_title">Founded Date Range</h3>
                <div className="cp_filter_input">
                  <input
                    type="date"
                    value={foundedDateFrom}
                    onChange={(e) => setFoundedDateFrom(e.target.value)}
                  />
                  <span className="cp_filter_separator">to</span>
                  <input
                    type="date"
                    value={foundedDateTo}
                    onChange={(e) => setFoundedDateTo(e.target.value)}
                  />
                </div>
              </div>

              <div className="cp_filter_section">
                <h3 className="cp_filter_title">Ratings Range</h3>
                <div className="cp_filter_input">
                  <input
                    type="number"
                    placeholder="From"
                    value={ratingsFrom}
                    onChange={(e) => setRatingsFrom(e.target.value)}
                  />
                  <span className="cp_filter_separator">to</span>
                  <input
                    type="number"
                    placeholder="To"
                    value={ratingsTo}
                    onChange={(e) => setRatingsTo(e.target.value)}
                  />
                </div>
              </div>

              <div className="cp_filter_section">
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
              </div>

              <div className="cp_filter_section">
                <h3 className="cp_filter_title">
                  Company Type{" "}
                  <span
                    className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`}
                    onClick={toggleDropdown}
                  >
                    {isDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
                  </span>
                </h3>
                {isDropdownOpen && (
                  <div className="dropdown-options">
                    <label>
                      <input
                        type="checkbox"
                        value="Corporate"
                        checked={selectedCompanyTypes.includes("Corporate")}
                        onChange={() => handleCompanyTypeChange("Corporate")}
                      />
                      Corporate
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Startup"
                        checked={selectedCompanyTypes.includes("Startup")}
                        onChange={() => handleCompanyTypeChange("Startup")}
                      />
                      Startup
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="MNC"
                        checked={selectedCompanyTypes.includes("MNC")}
                        onChange={() => handleCompanyTypeChange("MNC")}
                      />
                      MNC
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Other"
                        checked={selectedCompanyTypes.includes("Other")}
                        onChange={() => handleCompanyTypeChange("Other")}
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
                    className="dropdown-icon"
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
                        onChange={() =>
                          handleDepartmentCheckboxChange("Healthcare")
                        }
                        checked={selectedDepartments.includes("Healthcare")}
                      />
                      Healthcare
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Education"
                        onChange={() =>
                          handleDepartmentCheckboxChange("Education")
                        }
                        checked={selectedDepartments.includes("Education")}
                      />
                      Education
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="IT"
                        onChange={() => handleDepartmentCheckboxChange("IT")}
                        checked={selectedDepartments.includes("IT")}
                      />
                      IT
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Retail"
                        onChange={() =>
                          handleDepartmentCheckboxChange("Retail")
                        }
                        checked={selectedDepartments.includes("Retail")}
                      />
                      Retail
                    </label>
                    {/* Add more options as needed */}
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
                    <h3>Common Reports</h3>
                    <ul>
                      {commonReports.map((report) => (
                        <li
                          key={report.name}
                          onClick={() => applyFilter(report)}
                        >
                          <PiClipboardTextDuotone style={{ padding: "10px" }} />
                          {report.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="vertical-line"></div>
                  <div className="reports-section">
                    <h3>Personal Reports</h3>
                    <ul>
                      {Object.keys(personalReports).map((reportName) => (
                        <li
                          key={reportName}
                          onClick={() =>{
                            setCurrentReportName(reportName);
                            applyFilter(personalReports[reportName])
                          }}
                        >
                          <PiClipboardTextDuotone style={{ padding: "10px" }} />
                          {reportName}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            <CompanyCard />
            {/* <CompanyCard/>   */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyList;
