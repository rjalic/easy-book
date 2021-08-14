import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import DatePicker from 'react-datepicker';
import {
  listAccomodationDetails,
  createAccomodationReview,
} from '../actions/accomodationActions';
import { DateHelper } from '../utils/dateUtils';
import { LinkContainer } from 'react-router-bootstrap';
import { ACCOMODATION_CREATE_REVIEW_RESET } from '../constants/accomodationConstants';

const AccomodationScreen = ({ match }) => {
  const [fromDate, setFromDate] = useState(new Date(DateHelper.today()));
  const [toDate, setToDate] = useState(new Date(DateHelper.tomorrow()));
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const accomodationDetails = useSelector((state) => state.accomodationDetails);
  const { loading, error, accomodation } = accomodationDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const accomodationCreateReview = useSelector(
    (state) => state.accomodationCreateReview
  );
  const { error: errorAccomodationReview, success: successAccomodationReview } =
    accomodationCreateReview;

  useEffect(() => {
    if (successAccomodationReview) {
      alert('Review submitted');
      setRating(0);
      setComment('');
      dispatch({ type: ACCOMODATION_CREATE_REVIEW_RESET });
    }

    dispatch(listAccomodationDetails(match.params.id));
  }, [dispatch, match, fromDate, toDate, successAccomodationReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createAccomodationReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

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
                  {toDate < fromDate ? (
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
                      <div className='d-grid gap-2'>
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
                {accomodation.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.user.name}</strong>
                    <Rating value={review.rating} />
                    <p>{DateHelper.toDateString(review.createdAt)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <strong className='fs-4'>Write A Review</strong>
                  {errorAccomodationReview && (
                    <Message variant='danger'>
                      {errorAccomodationReview}
                    </Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value='0'>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='primary'
                        disabled={rating === 0}
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>Sign In</Link> to write a review{' '}
                    </Message>
                  )}
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
