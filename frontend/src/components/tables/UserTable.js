import React, { useMemo } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { USER_TABLE_COLUMNS } from '../../constants/table_columns/userTableColumns';

export const UserTable = ({ users, deleteHandler }) => {
  const columns = useMemo(() => USER_TABLE_COLUMNS, []);
  const data = useMemo(() => users, [users]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters, useSortBy);

  return (
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
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
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
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
              <td>
                <LinkContainer to={`/admin/user/${row.original._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                    <i className='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(row.original._id)}
                >
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
