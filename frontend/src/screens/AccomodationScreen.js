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

  const excluded = [
    '2021-08-31',
    '2021-09-01',
    '2021-09-02',
    '2021-08-23',
    '2021-08-24',
    '2021-08-25',
    '2021-08-26',
  ];
  const dates = excluded.map((e) => Date.parse(e));

  const accomodationDetails = useSelector((state) => state.accomodationDetails);
  const { loading, error, accomodation } = accomodationDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listAccomodationDetails(match.params.id, true));
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
                <strong className='fs-3'>{accomodation.name}</strong>
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
              <Image
                src={accomodation.image}
                alt={accomodation.name}
                fluid
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = '/images/placeholder.png';
                }}
              />
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
                      <Row className='px-3 pb-1'>
                        <h6 className='px-0 mt-1 mb-0'>From</h6>
                      </Row>
                      <Row className='mb-2'>
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
                          excludeDates={dates}
                        />
                      </Row>
                    </Col>
                    <Col>
                      <Row className='px-3 pb-1'>
                        <h6 className='px-0 mt-1 mb-0'>To</h6>
                      </Row>
                      <Row>
                        <DatePicker
                          selected={toDate}
                          onChange={(date) =>
                            setToDate(new Date(DateHelper.normalizeDate(date)))
                          }
                          selectsEnd
                          startDate={fromDate}
                          endDate={toDate}
                          minDate={new Date(DateHelper.addDays(fromDate, 1))}
                          excludeDates={dates}
                        />
                      </Row>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6 className='px-0 mt-1'>Capacity</h6>
                    </Col>
                    <Col>
                      {accomodation.capacity === 1
                        ? `${accomodation.capacity} guest`
                        : `${accomodation.capacity} guests`}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6 className='px-0 mt-1'>Amenities</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {accomodation.amenities.length === 0 ? (
                        <span>
                          Looks like the host didn't specify any amenities...
                        </span>
                      ) : (
                        accomodation.amenities.map((amenity) => (
                          <span key={amenity._id} className='m-1'>
                            <i className={amenity.icon} key={amenity.id} />{' '}
                            {amenity.name}
                          </span>
                        ))
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6 className='px-0 mt-1'>Description</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col>{accomodation.description}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {toDate < fromDate ||
                  !userInfo ||
                  accomodation.host === userInfo._id ? (
                    <div className='d-grid gap-2'>
                      <Button variant='primary' disabled>
                        Reserve
                      </Button>
                    </div>
                  ) : (
                    <LinkContainer
                      to={`/accomodations/${
                        accomodation._id
                      }/book?from=${DateHelper.toIsoDate(
                        fromDate
                      )}&to=${DateHelper.toIsoDate(toDate)}`}
                    >
                      <div className='d-grid gap-2 mt-2'>
                        <Button variant='primary'>Reserve</Button>
                      </div>
                    </LinkContainer>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={6}>
              <strong className='fs-4'>Reviews</strong>
              {accomodation.reviews.length === 0 && (
                <Message>No Reviews</Message>
              )}
              <ListGroup variant='flush'>
                {accomodation.reviews.map(
                  (review) =>
                    review.user && (
                      <ListGroup.Item key={review._id}>
                        <strong>
                          {review.user ? review.user.name : 'UNKNOWN'}
                        </strong>
                        <Rating value={review.rating} />
                        <p>{DateHelper.toDateString(review.createdAt)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    )
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default AccomodationScreen;
