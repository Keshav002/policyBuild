import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import "./DataTable.css";

export const DataTable = ({
  data,
  handleDeleteProjectClick,
  openEditForm,
  handleAddProjectClick,
}) => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRowSelection = (id) => {
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

 

  const columns = useMemo(
    () => [
      {
        Header: () => (
          <Checkbox
            checked={data.length > 0 && selectedRows.length === data.length}
            onChange={() => {
              if (data.length > 0 && selectedRows.length === data.length) {
                setSelectedRows([]);
              } else {
                setSelectedRows(data.map((row) => row.id));
              }
            }}
          />
        ),
        accessor: "checkbox",
        Cell: ({ row }) => (
          <Checkbox
            checked={selectedRows.includes(row.original.id)}
            onChange={() => toggleRowSelection(row.original.id)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        ),
      },
      {
        Header: "Project Name",
        accessor: "name",
      },
      {
        Header: "Project Type",
        accessor: "project_type",
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ value }) => (
          <div
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {value.length > 50 ? `${value.slice(0, 50)}...` : value}
            {value.length > 50 && (
              <span
                style={{
                  marginLeft: "4px",
                  color: "#007bff",
                  cursor: "pointer",
                }}
                title={value}
              >
                +
              </span>
            )}
          </div>
        ),
      },
      {
        Header: "Assigned To",
        accessor: "assigned_to",
      },
      {
        Header: "Start date",
        accessor: "start_date",
      },
      {
        Header: "End Date",
        accessor: "end_date",
      },
    ],
    [selectedRows]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
    <div className="company-list-heading">
    <h1 style={{ display: "flex", marginRight: "auto" }}>
      {isAnyRowSelected ? (
        <span style={{ width: "180px", display: "inline-block", whiteSpace: "nowrap", marginLeft: "110px"  }}>
          {selectedRows.length} Project selected
        </span>
      ) : (
        <span style={{ width: "180px", display: "inline-block", marginLeft: "110px" }}>Projects</span>
      )}
    </h1>
    <div>
      {isAnyRowSelected && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteProjects}
          style={{ backgroundColor: "#4d4d4d", marginLeft: "8px" }}
        >
          Delete
        </Button>
      )}
      {isAnyRowSelected && selectedRows.length === 1 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateProject}
          style={{
            backgroundColor: "#4d4d4d",
            marginLeft: "8px",
            cursor: "pointer",
          }}
        >
          Update
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        style={{ backgroundColor: "#4d4d4d", marginLeft: "8px", marginRight: "120px" }}
        onClick={handleAddProjectClick}
      >
        Create Project
      </Button>
    </div>
  </div>     
      <TableContainer className="table-container">
        <Table {...getTableProps()} size="medium" className="table">
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
                      navigate(`${row.original.id}/policy-list`);
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
      </TableContainer>
    </>
  );
};
