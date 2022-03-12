import { ColumnFilter } from '../../components/tables/ColumnFilter';

export const AMENITY_TABLE_COLUMNS = [
  {
    Header: 'ID',
    accessor: '_id',
    Filter: ColumnFilter,
  },
  {
    Header: 'ICON NAME',
    accessor: 'icon',
    Filter: ColumnFilter,
  },
  {
    Header: 'NAME',
    accessor: 'name',
    Filter: ColumnFilter,
  },
];
