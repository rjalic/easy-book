import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, path, query = '' }) => {
  query = query.replaceAll(/\??&?page=\d/gi, '');

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={`${path}${query ? query + '&' : '?'}page=${x + 1}`}
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
