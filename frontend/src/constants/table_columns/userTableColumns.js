import { ColumnFilter } from '../../components/tables/ColumnFilter';

export const USER_TABLE_COLUMNS = [
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
    Header: 'EMAIL',
    accessor: 'email',
    Cell: ({ value: email }) => {
      return <a href={`mailto:${email}`}>{email}</a>;
    },
    Filter: ColumnFilter,
  },
  {
    Header: 'ADMIN',
    accessor: 'isAdmin',
    Cell: ({ value: isAdmin }) => {
      return isAdmin ? (
        <i className='fas fa-check' style={{ color: 'green' }} />
      ) : (
        <i className='fas fa-times' style={{ color: 'red' }} />
      );
    },
    Filter: '',
  },
];
