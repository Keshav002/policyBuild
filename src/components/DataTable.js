import React, { useMemo } from "react";
import { useTable } from "react-table";
import MOCK_DATA from "../assets/MOCK_DATAA.json";
import "./DataTable.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";

export const DataTable = ({ data }) => {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "username",
      }, 
      {
        Header: "No. of Employees",
        accessor: "numofemploy",
      }, 
      {
        Header: "Founded",
        accessor: "companyregyear",
      },
      {
        Header: "Ratings",
        accessor: "average_rating",
      },
      {
        Header: "Tags",
        accessor: "tags",
      },
    ],
    []
  );
  // const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="table-container">
      <table {...getTableProps()} className="custom-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}
              onClick={() => navigate(`/company-profile/${row.original.id}`)}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
