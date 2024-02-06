import React, { useMemo } from "react";
import { useTable } from "react-table";
import MOCK_DATA from "../assets/MOCK_DATAA.json";
import "./DataTable.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";

export const DataTable = ({ data }) => {
  const navigate = useNavigate();

  data = [
    {
      id: 1,
      username: "Diversity and Inclusion",
      company: "XYZ Corp",
      department: "HR",
      revision: 2,
      status: "Active",
      created: "2023-01-01",
      updated: "2023-01-02",
    },
    {
      id: 2,
      username: "Diversity and Inclusion",
      company: "XYZ Corp",
      department: "HR",
      revision: 2,
      status: "Active",
      created: "2023-01-01",
      updated: "2023-01-02",
    },
    {
      id: 3,
      username: "Diversity and Inclusion",
      company: "XYZ Corp",
      department: "HR",
      revision: 2,
      status: "Active",
      created: "2023-01-01",
      updated: "2023-01-02",
    },
    {
      id: 4,
      username: "Diversity and Inclusion",
      company: "XYZ Corp",
      department: "HR",
      revision: 2,
      status: "Active",
      created: "2023-01-01",
      updated: "2023-01-02",
    },
    {
      id: 5,
      username: "Diversity and Inclusion",
      company: "XYZ Corp",
      department: "HR",
      revision: 2,
      status: "Active",
      created: "2023-01-01",
      updated: "2023-01-02",
    },
    {
      id: 6,
      username: "Diversity and Inclusion",
      company: "XYZ Corp",
      department: "HR",
      revision: 2,
      status: "Active",
      created: "2023-01-01",
      updated: "2023-01-02",
    },
  ];
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Project Name",
        accessor: "username",
      }, 
      {
        Header: "Company",
        accessor: "company",
      }, 
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Revision No.",
        accessor: "revision",
      },
       {
        Header: "Status",
        accessor: "status",
      },
       {
        Header: "Created",
        accessor: "created",
      },
     {
        Header: "Updated",
        accessor: "updated",
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
              onClick={() => navigate("/policy-list")}
              
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
