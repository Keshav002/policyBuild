import React, { useState, useEffect, useCallback } from "react";

import Nav from ".././components/Nav";
import "./CompanyList.css";
import { BsGrid } from "react-icons/bs";
import { CiBoxList } from "react-icons/ci";
import { AiOutlineFilter } from "react-icons/ai";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { FaSave, FaEye } from "react-icons/fa";
import { PiClipboardTextDuotone } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { DataTable } from "../components/PolicyPdfData";
import PolicyPdfCard from ".././components/PolicyPdfCard";
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
import { useSelector } from "react-redux";
import { VscKebabVertical } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDebounceCallback } from "@react-pdf-viewer/core";
import PdfViewer from "../components/PdfViewer";

function PolicyList() {
  const loggedInUserId = useSelector((state) => state.user.userData.user_id);
  console.log(loggedInUserId);

  const userData = useSelector((state) => state.user.userData);
  const userRole = userData?.role;
  console.log(userRole);
  const companyId = userData?.company?.id;

  useEffect(() => {
    setFormData({
      ...formData,
      company: companyId,
    });
  }, [companyId]);
  console.log(companyId);

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
  const navigate = useNavigate();

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
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
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

  const [projectId, setProjectId] = useState(null);
  const location = useLocation();
  const [isEditPolicyOpen, setisEditPolicyOpen] = useState(false);
  const [editedPolicyId, setEditedPolicyId] = useState(null);
  const [policies, setPolicies] = useState([]);

  const handleEditPolicyClick = () => {
    setisEditPolicyOpen(true);
  };

  const openEditForm = (policyId) => {
    const selectedPolicy = policies.find((policy) => policy.id === policyId);

    if (selectedPolicy) {
      setEditFormData(selectedPolicy);
      setEditedPolicyId(policyId);
      handleEditPolicyClick();
    }
  };

  const [isAddPolicyOpen, setisAddPolicyOpen] = useState(false);
  const handleAddPolicyClick = () => {
    setisAddPolicyOpen(true);
  };

  const [formData, setFormData] = useState({
    jobtitle: "",
    policytype: "",
    description: "",
    website: "",
    expertiesreq: "",
    banner: "",
    salaryrange: "",
    location: "",
    emploeType: "",
    policydeadline: "",
    contactinfo: "",
    companyregyear: "",
    created_at: "",
    updated_at: "",
    average_rating: "",
    total_ratings: "",
    document: null,
    assigned_to: [],
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prevData) => ({
        ...prevData,
        document: file,
      }));
    } else {
      // Handle invalid file type
      alert("Please select a PDF file.");
    }
  };

  const [editformData, setEditFormData] = useState({
    jobtitle: "",
    policytype: "",
    description: "",
    website: "",
    expertiesreq: "",
    banner: "",
    salaryrange: "",
    location: "",
    emploeType: "",
    policydeadline: "",
    contactinfo: "",
    companyregyear: "",
    created_at: "",
    updated_at: "",
    average_rating: "",
    total_ratings: "",
    document: null,
    assigned_to: [],
  });

  const handleInputChange = useCallback(
    (e) => {
      const { name, value, type, selectedOptions } = e.target;

      const updatedValue =
        type === "select-multiple"
          ? Array.from(selectedOptions, (option) => option.value)
          : value;

      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }));
    },
    [setFormData]
  );

  const handleEditInputChange = useCallback(
    (e) => {
      const { name, value, type, options } = e.target;

      const updatedValue =
        type === "select-multiple"
          ? Array.from(options)
              .filter((option) => option.selected)
              .map((option) => option.value)
          : value;

      setEditFormData((prevData) => ({
        ...prevData,
        [name]:
          name === "assigned_to" ? updatedValue.map(Number) : updatedValue,
      }));
    },
    [setEditFormData]
  );
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("projectId");
    if (!id) {
      const storedProjectId = localStorage.getItem("projectId");
      if (storedProjectId) {
        setProjectId(storedProjectId);
      } else {
        console.error("Project ID is missing.");
      }
    } else {
      setProjectId(id);
    }
  }, [location.search]);

  useEffect(() => {
    if (projectId) {
      fetchPolicies(projectId);
    }
  }, [projectId]);

  const fetchPolicies = async (projectId) => {
    try {
      const response = await fetch(
        `${API_URL}/main/projects/${projectId}/policy_posts/`,
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
        setPolicies(data);
        localStorage.setItem("policies", JSON.stringify(data));
      } else {
        console.error("Failed to fetch policies. Status:", response.status);
        setPolicies([]);
        localStorage.setItem("policies", "[]");
      }
    } catch (error) {
      console.error("Error fetching policies:", error);
      setPolicies([]);
      localStorage.setItem("policies", "[]");
    }
  };

  console.log("Policies in PolicyList:", policies);

  const policyIds = policies ? policies.map((policy) => policy.id) : [];
  console.log("Policy IDs:", policyIds);

  useEffect(() => {
    localStorage.setItem("policies", JSON.stringify(policies));
  }, [policies]);
  useEffect(() => {
    const storedPolicies = localStorage.getItem("policies");
    if (storedPolicies) {
      try {
        const parsedPolicies = JSON.parse(storedPolicies);
        setPolicies(parsedPolicies);
      } catch (error) {
        console.error("Error parsing stored policies:", error);
        setPolicies([]);
      }
    } else {
      setPolicies([]);
    }
  }, []);

  const handleAddPolicy = async () => {
    console.log("Current projectId in handleAddPolicy:", projectId);
    if (!projectId) {
      console.error("Project ID is missing.");
      return;
    }

    const formDataWithFile = new FormData();
    for (const key in formData) {
      formDataWithFile.append(key, formData[key]);
    }
    formDataWithFile.append("document", formData.document);

    try {
      const response = await fetch(
        `${API_URL}/main/projects/${projectId}/policy_posts/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: formDataWithFile,
        }
      );

      if (response.ok) {
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const newPolicy = await response.json();
          console.log("Policy created successfully!", newPolicy);
          setPolicies((prevPolicies) => [...prevPolicies, newPolicy]);
        } else {
          console.log("Policy created successfully!");
          // Handle the response based on the content type
          // For example, if it's a PDF, you can download it using response.blob()
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "policy.pdf";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        }

        Swal.fire({
          icon: "success",
          title: "Policy Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Failed to create policy. Status:", response.status);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to create policy. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error creating policy:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  const handleCancelClick = () => {
    setisAddPolicyOpen(false);
    setisEditPolicyOpen(false);
  };

  const [editedPolicy, setEditedPolicy] = useState(null);
  useEffect(() => {
    if (editedPolicy) {
      setEditFormData((prevData) => ({
        ...prevData,
        assigned_to: editedPolicy.assigned_to,
      }));
    }
  }, [editedPolicy]);

  const handleDelete = async (policyId) => {
    try {
      const response = await fetch(
        `${API_URL}/main/projects/${projectId}/policy_posts/${policyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        console.log("Policy deleted successfully!");

        const updatedPolicies = policies.filter(
          (policy) => policy.id !== policyId
        );
        setPolicies(updatedPolicies);
        localStorage.setItem("policies", JSON.stringify(updatedPolicies));

        Swal.fire({
          icon: "success",
          title: "Policy Deleted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Failed to delete policy. Status:", response.status);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete policy. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error deleting policy:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  const handleEdit = async () => {
    try {
      if (!editedPolicyId) {
        console.error("Invalid editedPolicyId");
        return;
      }

      const originalPolicy = policies.find(
        (policy) => policy.id === editedPolicyId
      );

      if (!originalPolicy) {
        console.error("Original policy not found");
        return;
      }

      const formDataWithFile = new FormData();
      for (const key in editformData) {
        if (key === "document" && editformData[key] instanceof File) {
          formDataWithFile.append(key, editformData[key]);
        } else {
          formDataWithFile.append(key, editformData[key]);
        }
      }

      const response = await fetch(
        `${API_URL}/main/projects/${projectId}/policy_posts/${editedPolicyId}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: formDataWithFile,
        }
      );

      if (response.ok) {
        console.log("Policy updated successfully!");

        // Retrieve the updated policy from the response
        const updatedPolicy = await response.json();

        // Update the state with the updated policy
        setPolicies((prevPolicies) =>
          prevPolicies.map((policy) =>
            policy.id === editedPolicyId ? updatedPolicy : policy
          )
        );

        setisEditPolicyOpen(false);

        Swal.fire({
          icon: "success",
          title: "Policy Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Failed to update policy. Status:", response.status);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update policy. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error updating policy:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
    }
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setEditFormData((prevData) => ({
        ...prevData,
        document: file,
      }));
    } else {
      
      alert("Please select a PDF file.");
    }
  };

  const [consultants, setConsultants] = useState([]);
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
  useEffect(() => {
    fetchConsultants();
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

  const urlParams = new URLSearchParams(window.location.search);

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

            {userRole === "Company" && (
              <div className="company-list-heading">
                <h1>
                  Policy Lists
                  <button
                    className="company_project_add_edit_button"
                    onClick={handleAddPolicyClick}
                  >
                    Create Policy
                  </button>
                </h1>
              </div>
            )}

            {isAddPolicyOpen && (
              <div className="company-profile-rating-popup-overlay">
                <div className="consultant_profile_edit_popup">
                  <h2 className="project_table_pop_heading">Add Policy</h2>
                  <button
                    className="project-close-button"
                    onClick={handleCancelClick}
                  >
                    <RxCross2 />
                  </button>
                  <form encType="multipart/form-data">
                    <label>
                      Policy Type
                      <input
                        type="text"
                        name="policytype"
                        value={formData.policytype}
                        onChange={handleInputChange}
                      />
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
                      Document
                      <input
                        type="file"
                        name="document"
                        accept=".pdf"
                        onChange={handleFileChange}
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
                      Average Rating
                      <input
                        type="number"
                        name="average_rating"
                        value={formData.average_rating}
                        onChange={handleInputChange}
                      />
                    </label>

                    <label>
                      Total Ratings
                      <input
                        type="number"
                        name="total_ratings"
                        value={formData.total_ratings}
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
                        name="emploeType"
                        value={formData.emploeType}
                        onChange={handleInputChange}
                      />
                    </label>

                    <label>
                      Policy Deadline
                      <input
                        type="text"
                        name="policydeadline"
                        value={formData.policydeadline}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Assigned To
                      <div className="custom-dropdown">
                        <div
                          className="selected-consultants"
                          onClick={() => setDropdownOpen(!isDropdownOpen)}
                        >
                          {Array.isArray(formData.assigned_to) &&
                          formData.assigned_to.length > 0
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
                      Description
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        style={{ height: "40px", marginTop: "0px" }}
                      />
                    </label>
                  </form>
                  <div className="company-profile-rating-popup__buttons">
                    <button onClick={() => handleAddPolicy(projectId)}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isEditPolicyOpen && (
              <div className="company-profile-rating-popup-overlay">
                <div className="consultant_profile_edit_popup">
                  <h2 className="project_table_pop_heading">Edit Policy</h2>
                  <button
                    className="project-close-button"
                    onClick={handleCancelClick}
                  >
                    <RxCross2 />
                  </button>
                  <form encType="multipart/form-data">
                    <label>
                      Policy Type
                      <input
                        type="text"
                        name="policytype"
                        
                        value={editedPolicy?.policytype || ""}
                        onChange={handleEditInputChange}
                      />
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
                      Document
                      <input
                        type="file"
                        name="document"
                        accept=".pdf"
                        onChange={(e) => handleEditFileChange(e)}
                      />
                      {editformData && editformData.document && (
                        <span>{editformData.document.name}</span>
                      )}
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
                        value={editformData.website}
                        onChange={handleEditInputChange}
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
                      Average Rating
                      <input
                        type="number"
                        name="average_rating"
                        value={editformData.average_rating}
                        onChange={handleEditInputChange}
                      />
                    </label>

                    <label>
                      Total Ratings
                      <input
                        type="number"
                        name="total_ratings"
                        value={editformData.total_ratings}
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

                    <label>
                      Employee Type
                      <input
                        type="text"
                        name="emploeType"
                        value={editformData.emploeType}
                        onChange={handleEditInputChange}
                      />
                    </label>

                    <label>
                      Policy Deadline
                      <input
                        type="text"
                        name="policydeadline"
                        value={editformData.policydeadline}
                        onChange={handleEditInputChange}
                      />
                    </label>

                    <label>
                      Description
                      <textarea
                        name="description"
                        value={editformData.description}
                        onChange={handleEditInputChange}
                        style={{ height: "40px", marginTop: "0px" }}
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
                  </form>
                  <div className="company-profile-rating-popup__buttons">
                    <button onClick={() => handleEdit(projectId)}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="company-list-container">
              {viewType === "table" && (
                <div className="table-container">
                  {policies && policies.length > 0 ? (
                    <DataTable
                      data={policies}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      openEditForm={openEditForm}
                      projectId={projectId}
                      policyId={policyIds}
                      editFormData={editformData}
                      userRole={userRole}
                      editedPolicyId={editedPolicyId}
                    />
                  ) : (
                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                      No policies found
                    </div>
                  )}
                </div>
              )}

              {viewType !== "table" && (
                <div className="company_lists_cards">
                  {policies &&
                    policies.map((policy, index) => (
                      <div key={index} style={{ textDecoration: "none" }}>
                        <PolicyPdfCard
                          policy={policy}
                          projectId={projectId}
                          policyId={policyIds}
                          userRole={userRole}
                          handleDelete={() => handleDelete(policy.id)}
                          handleEdit={handleEdit}
                          openEditForm={openEditForm}
                          fetchPolicies={fetchPolicies}
                        />
                      </div>
                    ))}
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

export default PolicyList;
