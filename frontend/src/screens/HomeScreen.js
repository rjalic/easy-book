import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Accomodation from '../components/Accomodation';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listAccomodations } from '../actions/accomodationActions.js';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const accomodationList = useSelector((state) => state.accomodationList);
  const { loading, error, accomodations } = accomodationList;

  useEffect(() => {
    dispatch(listAccomodations());
  }, [dispatch]);

  return (
    <>
      <h1>Properties</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col sm={3}>Search bar</Col>
          <Col sm={9}>
            <ul className='list-group'>
              {accomodations.map((accomodation) => (
                <Accomodation
                  key={accomodation._id}
                  accomodation={accomodation}
                />
              ))}
            </ul>
          </Col>
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
