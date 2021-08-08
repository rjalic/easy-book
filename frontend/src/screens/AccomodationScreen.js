import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import DatePicker from 'react-datepicker';
import { listAccomodationDetails } from '../actions/accomodationActions';

const AccomodationScreen = ({ match }) => {
  const [fromDate, setFromDate] = useState(Date.now());
  const [toDate, setToDate] = useState(Date.now() + 24 * 60 * 60 * 1000);

  const dispatch = useDispatch();

  const accomodationDetails = useSelector((state) => state.accomodationDetails);
  const { loading, error, accomodation } = accomodationDetails;

  useEffect(() => {
    dispatch(listAccomodationDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <strong className='fs-4'>{accomodation.name}</strong>
                <br />
                <span className='mb-3'>
                  <i className='fas fa-map-marker-alt'></i>{' '}
                  {accomodation.location.city}, {accomodation.location.country}
                </span>
              </ListGroup.Item>
            </ListGroup>
          </Row>
          <Row>
            <Col md={6}>
              <Image src={accomodation.image} alt={accomodation.name} fluid />
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col
                      style={{
                        margin: '0',
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <strong className='fs-5'>
                        ${accomodation.price} / night
                      </strong>
                    </Col>
                    <Col className='m-auto text-end'>
                      <Rating
                        value={accomodation.rating}
                        text={`${accomodation.numReviews} reviews`}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Row className='px-3 pb-1'>From</Row>
                      <Row>
                        <DatePicker
                          selected={fromDate}
                          onChange={(date) => setFromDate(date)}
                          selectsStart
                          startDate={fromDate}
                          endDate={toDate}
                          minDate={Date.now()}
                        />
                      </Row>
                    </Col>
                    <Col>
                      <Row className='px-3 pb-1'>To</Row>
                      <Row>
                        <DatePicker
                          selected={toDate}
                          onChange={(date) => setToDate(date)}
                          selectsEnd
                          startDate={fromDate}
                          endDate={toDate}
                          minDate={fromDate}
                        />
                      </Row>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Capacity:</Col>
                    <Col>
                      {accomodation.capacity === 1
                        ? `${accomodation.capacity} guest`
                        : `${accomodation.capacity} guests`}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid gap-2'>
                    <Button
                      variant='primary'
                      disabled={accomodation.countInStock === 0}
                    >
                      Reserve
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default AccomodationScreen;
