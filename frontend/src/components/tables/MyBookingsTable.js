import React, { useMemo } from 'react';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { MY_BOOKINGS_TABLE_COLUMNS } from '../../constants/table_columns/myBookingsTableColumns';
import { Paginate } from './Paginate';

export const MyBookingsTable = ({ bookings }) => {
  const columns = useMemo(() => MY_BOOKINGS_TABLE_COLUMNS, []);
  const data = useMemo(() => bookings, [bookings]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    prepareRow,
  } = useTable({ columns, data }, useFilters, useSortBy, usePagination);

  const { pageIndex } = state;

  return (
    <>
      <Table
        {...getTableProps()}
        striped
        bordered
        hover
        responsive
        className='table-sm'
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div className='table-header-extra'>
                    <span {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                    </span>
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </div>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
              <th>ACTIONS</th>
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
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
                <td>
                  <Link
                    to={`/bookings/${row.original._id}`}
                    className='btn btn-primary btn-sm'
                  >
                    <i className='fas fa-angle-right'></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Paginate
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageCount={pageCount}
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </>
  );
};
