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
import TablePagination from "@mui/material/TablePagination";
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

// const rows = [
//   createData(
//     "Project 1",
//     "Description 1",
//     "Type 1",
//     "Consultant 1",
//     "2024-03-21",
//     "2025-02-12"
//   ),
//   createData(
//     "Project 2",
//     "Description 2",
//     "Type 2",
//     "Consultant 2",
//     "2024-03-21",
//     "2025-02-12"
//   ),
//   createData(
//     "Project 3",
//     "Description 3",
//     "Type 3",
//     "Consultant 3",
//     "2024-03-21",
//     "2025-02-12"
//   ),
//   createData(
//     "Project 4",
//     "Description 4",
//     "Type 4",
//     "Consultant 4",
//     "2024-03-21",
//     "2025-02-12"
//   ),
//   createData(
//     "Project 5",
//     "Description 5",
//     "Type 5",
//     "Consultant 5",
//     "2024-03-21",
//     "2025-02-12"
//   ),
//   createData(
//       "Project 1",
//       "Description 1",
//       "Type 1",
//       "Consultant 1",
//       "2024-03-21",
//       "2025-02-12"
//     ),
//     createData(
//       "Project 2",
//       "Description 2",
//       "Type 2",
//       "Consultant 2",
//       "2024-03-21",
//       "2025-02-12"
//     ),
//     createData(
//       "Project 3",
//       "Description 3",
//       "Type 3",
//       "Consultant 3",
//       "2024-03-21",
//       "2025-02-12"
//     ),
//     createData(
//       "Project 4",
//       "Description 4",
//       "Type 4",
//       "Consultant 4",
//       "2024-03-21",
//       "2025-02-12"
//     ),
//     createData(
//       "Project 5",
//       "Description 5",
//       "Type 5",
//       "Consultant 5",
//       "2024-03-21",
//       "2025-02-12"
//     ),

// ];

export default function TableComponent({
  style,
  data,
  handleDeleteProjectClick,
  openEditForm,
  
  
}) {
 
  console.log("Data in tablecomponet: ", data);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  
  const toggleRowSelection = (id) => {
    console.log("Toggling selection for row with id:", id);
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDeleteProjects = () => {
    selectedRows.forEach((projectId) => {
      handleDeleteProjectClick(projectId);
    });
    setSelectedRows([]);
  };
 

  const handleUpdateProject = () => {
    if (selectedRows.length === 1) {
      openEditForm(selectedRows[0]);
      setSelectedRows([]);
    }
  };
 
  
  console.log("handleupdate: ", handleUpdateProject);

  
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

  return (
    <>
      <div>
      {isAnyRowSelected && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteProjects}
          style={{ backgroundColor: "black", 
           
            position: "absolute",
            right: "40px", 
            marginTop:"-35px"
          
          }}
        >
          Delete
        </Button>
      )}
      {/* {isAnyRowSelected && selectedRows.length === 1 && (
        <Button
          variant="contained"
          color="primary"
         
          onClick={handleUpdateProject}
          style={{
            backgroundColor: "black",
            marginLeft: "15px",
            cursor: "pointer",
            position: "absolute",
            right: "140px",
            marginTop:"-35px"
          }}
        >
          Update
        </Button>
      )} */}
      {isAnyRowSelected && selectedRows.length === 1 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateProject}
                style={{
                  backgroundColor: "black",
                  marginLeft: "15px",
                  cursor: "pointer",
                  position: "absolute",
                  right: "140px",
                  marginTop:"-35px"
                }}
              >
                Update
              </Button>
            )}
     
    </div> 
     
      <TableContainer
        className="table-container"
        component={Paper}
        style={style}
      >
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-header">
              <TableCell className="table-header" align="left">
                Select
              </TableCell>
              <TableCell className="table-header" align="left">
                Project Name
              </TableCell>
              <TableCell className="table-header">Description</TableCell>
              <TableCell className="table-header" align="left">
                Project Type
              </TableCell>
              <TableCell className="table-header" align="left">
                Assigned To
              </TableCell>
              <TableCell className="table-header" align="left">
                Start Date
              </TableCell>
              <TableCell className="table-header" align="left">
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
                // <TableRow key={row.id}>
                <TableRow
                  key={row.id}
                  onClick={() => navigate(`/company-projects/${row.id}/policy-list`)}
                  style={{ cursor: 'pointer' }}
                >
                  
                
                  <TableCell className="table-cell">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </TableCell>
                  <TableCell className="table-cell" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell className="table-cell" align="left">
                    {row.description}
                  </TableCell>
                  <TableCell className="table-cell" align="left">
                    {row.project_type}
                  </TableCell>
                  <TableCell className="table-cell" align="left">
                    {row.assigned_to}
                  </TableCell>
                  <TableCell className="table-cell" align="left">
                    {row.start_date}
                  </TableCell>
                  <TableCell className="table-cell" align="left">
                    {row.end_date}
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
