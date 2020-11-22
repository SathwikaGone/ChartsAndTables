import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import MockData from "./MOCK_DATA.json";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import "./BasicTable.css";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";

export default function SortngTable() {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MockData, []);
  const defaultColumn = useMemo(() => ({ Filter: ColumnFilter }), []);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    pageOptions,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <React.Fragment>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {
          //   <tfoot>
          //   {footerGroups.map((footerGroup) => (
          //     <tr {...footerGroup.getFooterGroupProps()}>
          //       {footerGroup.headers.map((column) => (
          //         <td {...column.getFooterProps()}>{column.render("Footer")}</td>
          //       ))}
          //     </tr>
          //   ))}
          // </tfoot>
        }
      </table>
      <div>
        <span>
          page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          next
        </button>
      </div>
    </React.Fragment>
  );
}