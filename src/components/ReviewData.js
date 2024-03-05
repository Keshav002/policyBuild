
import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import "./ReviewData.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
export const DataTable = ({
  data,
  userRole,
}) => {
  const isCompanyRole = userRole === "Company";

  const columns = useMemo(
    () => [
      {
        Header: "Source",
        accessor: "source",
      },
      {
        Header: "Score",
        accessor: "rating",
      },
      {
        Header: "Comments",
        accessor: "comment",
      },
   
    ].filter(Boolean),
    [isCompanyRole]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
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
        </TableContainer>
    </>
  );
};



