import React, { useMemo } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';
import { Table, Button } from 'react-bootstrap';
import { AMENITY_TABLE_COLUMNS } from '../../constants/table_columns/amenityTableColumns';

export const AmenityTable = ({ amenities, deleteHandler }) => {
  const columns = useMemo(() => AMENITY_TABLE_COLUMNS, []);
  const data = useMemo(() => amenities, [amenities]);

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
            <th>ICON</th>
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
                <i className={row.original.icon} />
              </td>
              <td>
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(row.original._id)}
                >
                  <i className='fas fa-trash' />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
