import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import TablePagination from "@mui/material/TablePagination";
import { MdChargingStation } from "react-icons/md";
function createData(
  name,
  description,
  type,
  assigned_to,
  start_date,
  end_date
) {
  return { name, description, type, assigned_to, start_date, end_date };
}

export default function PolicyTableComponent({
  data,
  openEditForm,
  handleAddPolicyClick,

  userRole,
  handleDelete,
  isSidebarOpen,
  tags,
}) {
  console.log("Data in tablecomponet: ", data);
  console.log(userRole);
  const isConsultantRole = userRole === "Consultant";
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

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
  //   const toggleRowSelection = (id) => {
  //     console.log("Toggling selection for row with id:", id);
  //     if (selectedRows.includes(id)) {
  //       setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
  //     } else {
  //       setSelectedRows([...selectedRows, id]);
  //     }
  //   };
  const toggleRowSelection = (id) => {
    console.log("Toggling selection for row with id:", id);
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  React.useEffect(() => {
    console.log("Selected Rows:", selectedRows);
  }, [selectedRows]);

  const isAnyRowSelected = selectedRows.length > 0;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // const TableContainerStyle = {
  //   // marginLeft: isSidebarOpen ? "310px" : "60px",
  //   marginLeft: "100px",
  //   // marginTop: tags.length > 0 ? "-25px" : "-65px",
  //   marginTop: "5px",
  // };
  // const tableSettingIconStyle = {
  //   // marginLeft: isSidebarOpen ? "310px" : "60px",
  //   // marginTop: tags.length > 0 ? "0px" : "60px",
  //   fontSize: "25px",
  //   marginTop: "35px",
  //   color: "black",
  // };

  const pTagStyle = {
    marginTop: "37px",
    color: "black",
    // // position: "absolute",
    marginLeft: "12px",
  };


  // const TableContainerStyle = {
   
  //   marginLeft: isSidebarOpen ? "310px" : "60px",
    
  //   marginTop: tags.length > 0 ? "-25px" : "-65px",
  //   // marginTop: "5px",
  // };

  const TableContainerStyle = {
    marginLeft: isSidebarOpen ? "310px" : "60px",
    marginTop: isConsultantRole ? "165px" : (tags.length > 0 ? "-25px" : "-65px"),
  };
  

  const tableSettingIconStyle = {
    marginLeft: isSidebarOpen ? "310px" : "60px",
    // marginTop: tags.length > 0 ? "0px" : "60px",
    fontSize: "25px",
    marginTop: "110px"
    // marginTop: "35px",
    // color: "black",
  };

  // const pTagStyle = {
  //   marginTop: "37px",
  //   color: "black",
  //   // // position: "absolute",
  //   marginLeft: "12px",
  // };

  return (
    <>
      {!isConsultantRole && (
        <div className="company-list-heading">
          <h3
            style={{ display: "flex", marginRight: "auto", marginTop: "140px" }}
          >
            <IoMdSettings
              style={tableSettingIconStyle}
              className="table_settings_icon"
            />

            <p style={pTagStyle}>Policies </p>
            {isAnyRowSelected && (
              <span
                style={{
                  width: "180px",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  marginLeft: "2px",
                  color: "black",
                  marginTop: "37px",
                  //   position: "absolute",
                }}
              >
                : {selectedRows.length} selected
              </span>
            )}
          </h3>
          <div>
            {isAnyRowSelected && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDeletePolicies}
                style={{
                  backgroundColor: "black",
                  marginLeft: "8px",
                  marginTop: "30px",
                    position: "absolute",
                }}
              >
                Delete
              </Button>
            )}
            {isAnyRowSelected && selectedRows.length === 1 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdatePolicy}
                style={{
                  backgroundColor: "black",
                  marginLeft: "-88px",
                  cursor: "pointer",
                  marginTop: "30px",
                  position: "absolute",
                }}
              >
                Update
              </Button>
            )}
          </div>
        </div>
      )}

      <TableContainer
        className="table-container"
        component={Paper}
        style={TableContainerStyle}
      >
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-header">
            {!isConsultantRole && (
              <TableCell className="table-header" align="center">
                Select
              </TableCell>
            )}
              <TableCell className="table-header" align="center">
                Policy Name
              </TableCell>
              <TableCell className="table-header" align="center">
                Description
              </TableCell>
              <TableCell className="table-header" align="center">
                Policy Type
              </TableCell>
              <TableCell className="table-header" align="center">
                Assigned To
              </TableCell>

              <TableCell className="table-header" align="center">
                Created on
              </TableCell>
              <TableCell className="table-header" align="center">
                Updated on
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
                // <TableRow key={row.id}>
                <TableRow
                  key={row.id}
                  // onClick={() =>
                  //   navigate(`/company-projects/${row.id}/policy-list/${row.id}/pdf`)
                  // }
                  onClick={() => {
                    if (userRole === 'Consultant') {
                      navigate(`/consultant-projects/${row.id}/policy-list/${row.id}/pdf`);
                    } else {
                      navigate(`/company-projects/${row.id}/policy-list/${row.id}/pdf`);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {!isConsultantRole && (
                  <TableCell className="table-cell">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                   
                  </TableCell>
                   )}
                  <TableCell className="table-cell" component="th" scope="row" align="center">
                    {row.policy_name}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    {row.description}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    {row.policytype}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    {row.assigned_to}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    {row.created_at}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    {row.updated_at}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* <TablePagination
          rowsPerPageOptions={[3, 5, 7]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="table-pagination"
        /> */}
      </TableContainer>
    </>
  );
}
