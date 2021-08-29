import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getTakenDates,
  listAccomodationDetails,
} from '../actions/accomodationActions';
import { DateHelper } from '../utils/dateUtils';
import { LinkContainer } from 'react-router-bootstrap';
import { DateRange } from 'react-date-range';

const AccomodationScreen = ({ match }) => {
  const [isValidRange, setValidRange] = useState(false);
  const [value, setValue] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const dispatch = useDispatch();

  const accomodationDetails = useSelector((state) => state.accomodationDetails);
  const { loading, error, accomodation } = accomodationDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const accommodationTaken = useSelector((state) => state.accommodationTaken);
  const { taken } = accommodationTaken;

  useEffect(() => {
    if (!accomodation.name) {
      dispatch(listAccomodationDetails(match.params.id, true));
      dispatch(getTakenDates(match.params.id));
    }
    if (
      new Date(value[0].startDate).getFullYear() ===
        new Date(value[0].endDate).getFullYear() &&
      new Date(value[0].startDate).getMonth() ===
        new Date(value[0].endDate).getMonth() &&
      new Date(value[0].startDate).getDate() ===
        new Date(value[0].endDate).getDate()
    ) {
      setValidRange(false);
    } else {
      setValidRange(true);
    }
  }, [dispatch, match, value, accomodation.name]);

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
                      <h6 className='px-0 mt-1'>Date range</h6>
                    </Col>
                    <Col>
                      <DateRange
                        // editableDateInputs={true}
                        onChange={(item) => setValue([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={value}
                        minDate={new Date()}
                        disabledDates={taken.map(
                          (d) => new Date(Date.parse(d))
                        )}
                        weekStartsOn={1}
                        // months={2}
                        // direction={'horizontal'}
                      />
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
                  {!isValidRange ||
                  !userInfo ||
                  accomodation.host === userInfo._id ? (
                    <div className='d-grid gap-2 mt-2'>
                      <Button variant='primary' disabled>
                        Reserve
                      </Button>
                    </div>
                  ) : (
                    <LinkContainer
                      to={`/accomodations/${
                        accomodation._id
                      }/book?from=${DateHelper.toIsoDate(
                        value[0].startDate
                      )}&to=${DateHelper.toIsoDate(value[0].endDate)}`}
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
