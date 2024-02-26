
import React, { useMemo } from "react";
import { useTable } from "react-table";
import "./ReviewData.css";

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

  return (
    <div className="table-container">
      <table {...getTableProps()} className="custom-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
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









