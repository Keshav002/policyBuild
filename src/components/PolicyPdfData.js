import React, { useMemo } from "react";
import { useTable } from "react-table";
import "./DataTable.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

export const DataTable = ({ data, handleDelete, openEditForm, userRole }) => {
  const navigate = useNavigate();
  const isCompanyRole = userRole === "Company";

  const columns = useMemo(
    () => [
      {
        Header: "Policy Name",
        accessor: "policytype",
      },
      {
        Header: "Contact",
        accessor: "contactinfo",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Website",
        accessor: "website",
      },
      {
        Header: "Score",
        accessor: "average_rating",
      },
      {
        Header: "Document",
        accessor: "document",
      },
      {
        Header: "Created",
        accessor: "created_at",
        Cell: ({ value }) => {
          const date = new Date(value);
          return date.toLocaleDateString(); 
        },
      },
      {
        Header: "Updated",
        accessor: "updated_at",
        Cell: ({ value }) => {
          const date = new Date(value);
          return date.toLocaleDateString(); 
        },
      },
      isCompanyRole && { 
        Header: "Actions",
        id: "actions", 
        accessor: "policy_posts_id",
        Cell: ({ row }) => (
          <td>
            <BiSolidEdit
              className="project-table-edit-button"
              style={{ cursor: "pointer", marginRight: "10px" }}
              onClick={(e) => {
                e.stopPropagation(); 
                openEditForm(row.original.id);
              }}
            />
            <AiFillDelete
              className="project-table-delete-button"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation(); 
                handleDelete(row.original.id); 
              }}
            />
          </td>
        ),
      },
    ].filter(Boolean), // Filter out undefined elements
    [isCompanyRole, handleDelete, openEditForm]
  );
  

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
              <tr
                {...row.getRowProps()}
                onClick={() => navigate("/pdf")}
                style={{ cursor: "pointer" }}
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
