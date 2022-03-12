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
    accessor: 'user.name',
    Filter: ColumnFilter,
  },
  {
    Header: 'ACCOMMODATION',
    accessor: 'accommodation.name',
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
      return format(new Date(row.bookedFrom), 'dd/MM/yyyy');
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'TO',
    accessor: (row) => {
      return format(new Date(row.bookedTo), 'dd/MM/yyyy');
    },
    Filter: ColumnFilter,
  },
];
