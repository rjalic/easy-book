import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Accomodation from '../components/Accomodation';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listAccomodations } from '../actions/accomodationActions.js';
import SearchBar from '../components/SearchBar';
import NotFound from '../components/NotFound';

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const accomodationList = useSelector((state) => state.accomodationList);
  const { loading, error, accomodations, page, pages } = accomodationList;

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const keyword = query.get('keyword') ? query.get('keyword') : '';
  const pageNumber = query.get('page') ? query.get('page') : 1;

  useEffect(() => {
    dispatch(listAccomodations(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>Stays</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col sm={3}>
              <SearchBar history={history} />
            </Col>
            <Col sm={9}>
              {!loading && pages === 0 ? (
                <NotFound />
              ) : (
                <Row>
                  <ul className='list-group'>
                    {accomodations.map((accomodation) => (
                      <Accomodation
                        key={accomodation._id}
                        accomodation={accomodation}
                      />
                    ))}
                  </ul>
                </Row>
              )}
              <Row className='mt-3'>
                <div className='d-flex justify-content-center'>
                  <Paginate
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ''}
                  />
                </div>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
