import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  const [value, setValue] = useState(filterValue);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value);
  }, 400);

  return (
    <span>
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        onFocus={(e) => e.preventDefault()}
      />
    </span>
  );
};
