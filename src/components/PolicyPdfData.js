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
      username: "Policy 1",
      company: "Company A",
      department: "Finance",
      revision: 2,
      status: "Active",
      created: "2022-01-01",
      updated: "2022-01-15",
    },
    {
      id: 2,
      username: "Policy 2",
      company: "Company B",
      department: "Human Resources",
      revision: 1,
      status: "Inactive",
      created: "2022-02-01",
      updated: "2022-02-15",
    },
    {
      id: 3,
      username: "Policy 3",
      company: "Company C",
      department: "IT",
      revision: 3,
      status: "Active",
      created: "2022-03-01",
      updated: "2022-03-15",
    },
    {
      id: 4,
      username: "Policy 4",
      company: "Company A",
      department: "Marketing",
      revision: 1,
      status: "Active",
      created: "2022-04-01",
      updated: "2022-04-15",
    },
    {
      id: 5,
      username: "Policy 5",
      company: "Company B",
      department: "Legal",
      revision: 2,
      status: "Inactive",
      created: "2022-05-01",
      updated: "2022-05-15",
    },
  ];

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Policy Name",
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

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
                onClick={() => navigate("/pdf")}
                style={{cursor:"pointer"}}
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
