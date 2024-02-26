

import React, { useMemo } from "react";
import { useTable } from "react-table";
import "./ReviewPolicyDataTable.css";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

export const DataTable = ({
  data,
  handleDeleteReview,
  handleEditButtonClick,
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
      userRole !== "Company" && {
        Header: "Actions",
        id: "actions",
        accessor: "id",
        Cell: ({ row }) => (
          <td>
            <BiSolidEdit
              className="project-table-edit-button"
              style={{ cursor: "pointer", marginRight: "10px" }}
              onClick={(e) => {
                e.stopPropagation();
                handleEditButtonClick(row.original.id);
              }}
            />
            <AiFillDelete
              className="project-table-delete-button"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteReview(row.original.id);
              }}
            />
          </td>
        ),
      },
    ].filter(Boolean),
    [isCompanyRole, handleDeleteReview, handleEditButtonClick]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="review-table-container">
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
              <tr {...row.getRowProps()}>
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












