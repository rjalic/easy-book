import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import DatePicker from 'react-datepicker';
import { listAccomodationDetails } from '../actions/accomodationActions';
import { DateHelper } from '../utils/dateUtils';
import { LinkContainer } from 'react-router-bootstrap';

const AccomodationScreen = ({ match }) => {
  const [fromDate, setFromDate] = useState(new Date(DateHelper.today()));
  const [toDate, setToDate] = useState(new Date(DateHelper.tomorrow()));

  const dispatch = useDispatch();

  const accomodationDetails = useSelector((state) => state.accomodationDetails);
  const { loading, error, accomodation } = accomodationDetails;

  useEffect(() => {
    dispatch(listAccomodationDetails(match.params.id));
  }, [dispatch, match, fromDate, toDate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <ListGroup variant='flush' className='pt-0'>
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
                          onChange={(date) =>
                            setFromDate(
                              new Date(DateHelper.normalizeDate(date))
                            )
                          }
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
                          onChange={(date) =>
                            setToDate(new Date(DateHelper.normalizeDate(date)))
                          }
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
                  <LinkContainer
                    to={`/accomodations/${
                      accomodation._id
                    }/book?from=${DateHelper.toIsoDate(
                      fromDate
                    )}&to=${DateHelper.toIsoDate(toDate)}`}
                  >
                    <div className='d-grid gap-2'>
                      <Button variant='primary'>Reserve</Button>
                    </div>
                  </LinkContainer>
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
