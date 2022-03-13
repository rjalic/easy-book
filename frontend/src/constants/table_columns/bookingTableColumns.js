import { format } from 'date-fns';
import { ColumnFilter } from '../../components/tables/ColumnFilter';

export const BOOKING_TABLE_COLUMNS = [
  {
    Header: 'ID',
    accessor: '_id',
    Filter: ColumnFilter,
  },
  {
    Header: 'USER',
    accessor: (row) => {
      return row.user === null ? 'UNKNOWN' : row.user?.name;
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'ACCOMMODATION',
    accessor: (row) => {
      return row.accommodation === null ? 'UNKNOWN' : row.accommodation?.name;
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'TOTAL PRICE',
    accessor: (row) => {
      return `$${row.totalPrice}`;
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'STATUS',
    accessor: 'status',
    Filter: ColumnFilter,
  },
  {
    Header: 'FROM',
    accessor: (row) => {
      return format(new Date(row.bookedFrom), 'MM/dd/yyyy');
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'TO',
    accessor: (row) => {
      return format(new Date(row.bookedTo), 'MM/dd/yyyy');
    },
    Filter: ColumnFilter,
  },
];
