import { ColumnFilter } from '../../components/tables/ColumnFilter';

export const HOST_ACCOMMODATION_TABLE_COLUMNS = [
  {
    Header: 'ID',
    accessor: '_id',
    Filter: ColumnFilter,
  },
  {
    Header: 'NAME',
    accessor: 'name',
    Filter: ColumnFilter,
  },
  {
    Header: 'PRICE',
    accessor: (row) => {
      return `$${row.price}`;
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'CAPACITY',
    accessor: 'capacity',
    Filter: ColumnFilter,
  },
  {
    Header: 'RATING',
    accessor: 'rating',
    Filter: ColumnFilter,
  },
];
