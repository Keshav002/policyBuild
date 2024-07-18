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
import './styles.css';
import TablePagination from "@mui/material/TablePagination";
function createData(name, description, type, assigned_to, start_date, end_date) {
    return { name, description, type, assigned_to, start_date,end_date };
  }
  
  const rows = [
    createData(
      "Project 1",
      "Description 1",
      "Type 1",
      "Consultant 1",
      "2024-03-21",
      "2025-02-12"
    ),
    createData(
      "Project 2",
      "Description 2",
      "Type 2",
      "Consultant 2",
      "2024-03-21",
      "2025-02-12"
    ),
    createData(
      "Project 3",
      "Description 3",
      "Type 3",
      "Consultant 3",
      "2024-03-21",
      "2025-02-12"
    ),
    createData(
      "Project 4",
      "Description 4",
      "Type 4",
      "Consultant 4",
      "2024-03-21",
      "2025-02-12"
    ),
    createData(
      "Project 5",
      "Description 5",
      "Type 5",
      "Consultant 5",
      "2024-03-21",
      "2025-02-12"
    ),
    createData(
        "Project 1",
        "Description 1",
        "Type 1",
        "Consultant 1",
        "2024-03-21",
        "2025-02-12"
      ),
      createData(
        "Project 2",
        "Description 2",
        "Type 2",
        "Consultant 2",
        "2024-03-21",
        "2025-02-12"
      ),
      createData(
        "Project 3",
        "Description 3",
        "Type 3",
        "Consultant 3",
        "2024-03-21",
        "2025-02-12"
      ),
      createData(
        "Project 4",
        "Description 4",
        "Type 4",
        "Consultant 4",
        "2024-03-21",
        "2025-02-12"
      ),
      createData(
        "Project 5",
        "Description 5",
        "Type 5",
        "Consultant 5",
        "2024-03-21",
        "2025-02-12" 
      ),
     
  ];

      

  
export default function TableComponent({ style }) {

    const [selectedRows, setSelectedRows] = useState([]);
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
        <TableContainer className="table-container" component={Paper} style={style} >
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
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell className="table-cell">
                  <Checkbox />
                </TableCell>
                <TableCell className="table-cell" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell className="table-cell" align="left">
                  {row.description}
                </TableCell>
                <TableCell className="table-cell" align="left">
                  {row.type}
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
            ))}
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
  )
}
