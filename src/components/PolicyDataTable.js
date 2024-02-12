import React, { useMemo } from "react";
import { useTable } from "react-table";
import MOCK_DATA from "../assets/MOCK_DATAA.json";
import "./DataTable.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

export const DataTable = ({ data, handleDeleteProjectClick, openEditForm }) => {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "Project Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
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
      {
        Header: "Action",
        accessor: "policy_posts_id",
        Cell: ({ row }) => (
          <td>
            <BiSolidEdit
              className="project-table-edit-button"
              style={{ cursor: "pointer", marginRight: "10px" }}
              onClick={(e) => {
                e.stopPropagation(); // Prevents the row click event from triggering
                openEditForm(row.original.id);
              }}
            />
            <AiFillDelete
              className="project-table-delete-button"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation(); // Prevents the row click event from triggering
                handleDeleteProjectClick(row.original.id);
              }}
            />
          </td>
        ),
      },
    ],
    [handleDeleteProjectClick, openEditForm]
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
                onClick={() => navigate(`/policy-list/${row.original.id}`)}
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
