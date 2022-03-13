import React from 'react';
import { Button } from 'react-bootstrap';

export const Paginate = ({
  pageIndex,
  pageOptions,
  pageCount,
  gotoPage,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
}) => {
  return (
    <div className='d-flex justify-content-center'>
      <div className='mt-1'>
        <span className='fs-6 mt-1'>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span className='fs-6'>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '50px', display: 'inline-block' }}
            className='form-control form-control-sm'
          />
        </span>
      </div>
      <Button
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
        className='mx-1'
      >
        {'<<'}
      </Button>
      <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </Button>
      <Button
        onClick={() => nextPage()}
        disabled={!canNextPage}
        className='mx-1'
      >
        {'>'}
      </Button>
      <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </Button>
    </div>
  );
};
