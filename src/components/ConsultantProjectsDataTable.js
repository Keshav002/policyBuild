import React, { useMemo } from "react";
import { useTable } from "react-table";
import "./DataTable.css"; 
import { useNavigate } from "react-router-dom";

export const DataTable = ({ data }) => {
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
    ],
    []
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
              onClick={() => navigate(`${row.original.id}/policy-list`)}
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
