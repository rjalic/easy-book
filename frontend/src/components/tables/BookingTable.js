import React, { useMemo } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { BOOKING_TABLE_COLUMNS } from '../../constants/table_columns/bookingTableColumns';

export const BookingTable = ({ bookings }) => {
  const columns = useMemo(() => BOOKING_TABLE_COLUMNS, []);
  const data = useMemo(() => bookings, [bookings]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters, useSortBy);

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
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
              <th>ACTIONS</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
                <td>
                  <a
                    href={`mailto:${row.original.user.email}`}
                    className='btn btn-primary btn-sm m-1'
                  >
                    <i className='fas fa-envelope' />
                  </a>
                  <Link
                    to={`/bookings/${row.original._id}`}
                    className='btn btn-primary btn-sm'
                  >
                    <i
                      className='fas fa-angle-right'
                      style={{
                        fontSize: '14px',
                        width: '11px',
                        height: '11px',
                      }}
                    />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
