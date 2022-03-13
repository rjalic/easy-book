import { format } from 'date-fns';
import { ColumnFilter } from '../../components/tables/ColumnFilter';

export const MY_BOOKINGS_TABLE_COLUMNS = [
  {
    Header: 'NAME',
    accessor: (row) => {
      return row.accommodation === null ? 'UNKNOWN' : row.accommodation?.name;
    },
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
  {
    Header: 'TOTAL PRICE',
    accessor: (row) => {
      return `$${row.totalPrice}`;
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'STATUS',
    accessor: (row) => {
      return row.isPaid
        ? 'Paid'
        : row.status === 'PENDING'
        ? 'Not Paid'
        : 'Cancelled';
    },
    Filter: ColumnFilter,
  },
];
