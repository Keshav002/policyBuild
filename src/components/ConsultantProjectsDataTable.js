import React, { useMemo, useState } from "react";
import { BsGrid } from "react-icons/bs";
import { FaTableList } from "react-icons/fa6";
import { useTable } from "react-table";
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
import { AiOutlineFilter } from "react-icons/ai";


export const DataTable = ({ data,
  setViewType,
  viewType,
  isConsultantRole


}) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  // const TableContainerStyle = {
  //   // marginLeft: isSidebarOpen ? "310px" : "60px",
  // };
  const TableContainerStyle = {
    marginLeft: isSidebarOpen ? "310px" : "60px",
    marginTop: isConsultantRole ? "165px" : (tags.length > 0 ? "-25px" : "-65px"),
  };
  

  return (
    <>
    <TableNav/>
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

      <TableContainer
        className="table-container"
        component={Paper}
        style={TableContainerStyle}
      >
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-header">
              <TableCell className="table-header" align="center">
                Project Name
              </TableCell>
              <TableCell className="table-header" align="center">Description</TableCell>
              <TableCell className="table-header" align="center">
                Project Type
              </TableCell>
              <TableCell className="table-header" align="center">
                Assigned To
              </TableCell>
              <TableCell className="table-header" align="center">
                Start Date
              </TableCell>
              <TableCell className="table-header" align="center">
                End Date
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
                    navigate(`/consultant-projects/${row.id}/policy-list`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <TableCell className="table-cell" component="th" scope="row" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    {row.description}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    {row.project_type}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    {row.assigned_to}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    {row.start_date}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    {row.end_date}
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
        // onClick={toggleSidebar}
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
      {/* <div className="company-content-container">
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
      </div> */}
    </>
  );
};
