import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { getBookingDetails, payBooking } from '../actions/bookingActions';
import { createAccommodationReview } from '../actions/accommodationActions';
import { ACCOMMODATION_CREATE_REVIEW_RESET } from '../constants/accommodationConstants';
import Accommodation from '../components/Accommodation';
import Loader from '../components/Loader';
import { DateHelper } from '../utils/dateUtils';
import { BOOKING_PAY_RESET } from '../constants/bookingConstants';
import Message from '../components/Message';

const PaymentScreen = ({ match, history }) => {
  const bookingId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const bookingDetails = useSelector((state) => state.bookingDetails);
  const { loading, booking } = bookingDetails;

  const bookingPay = useSelector((state) => state.bookingPay);
  const { loading: loadingPay, success: successPay } = bookingPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const accommodationCreateReview = useSelector(
    (state) => state.accommodationCreateReview
  );
  const {
    error: errorAccommodationReview,
    success: successAccommodationReview,
  } = accommodationCreateReview;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!userInfo) {
      history.push('/login');
    } else if (successAccommodationReview) {
      alert('Review submitted');
      setRating(0);
      setComment('');
      dispatch({ type: ACCOMMODATION_CREATE_REVIEW_RESET });
      booking.isReviewed = true;
    } else if (!booking || successPay || booking._id !== match.params.id) {
      dispatch({ type: BOOKING_PAY_RESET });
      dispatch(getBookingDetails(bookingId));
    } else if (
      booking &&
      booking.user &&
      booking.user._id !== userInfo._id &&
      !userInfo.isAdmin &&
      userInfo._id !== booking.accommodation.host
    ) {
      history.push('/');
    } else if (!booking.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    bookingId,
    booking,
    successPay,
    successAccommodationReview,
    match,
    userInfo,
    history,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payBooking(bookingId, paymentResult));
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      createAccommodationReview(booking._id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <h3>Payment Overview</h3>
          </Row>
          <Row>
            <Col md={4} className='mb-2'>
              <Row>
                <h5>Trip Details:</h5>
              </Row>
              <Row>
                <h6>Dates</h6>
              </Row>
              <Row>
                <span>
                  {DateHelper.toDateString(booking.bookedFrom)} -{' '}
                  {DateHelper.toDateString(booking.bookedTo)}
                </span>
              </Row>
              <Row className='mt-2'>
                <h6>Capacity</h6>
              </Row>
              <Row>
                <span>
                  {booking.accommodation.capacity === 1
                    ? `${booking.accommodation.capacity} guest`
                    : `${booking.accommodation.capacity} guests`}
                </span>
              </Row>
              <Row className='mt-2'>
                <h6>Price</h6>
              </Row>
              <Row>
                <span>
                  <strong>${booking.accommodation.price}</strong> / night
                </span>
              </Row>
              <Row className='mt-2'>
                <h6>Total Price</h6>
              </Row>
              <Row>
                <span>
                  <strong>${booking.totalPrice.toFixed(2)}</strong>
                </span>
              </Row>
              <Row className='mt-2'>
                <h6>Payment Method</h6>
              </Row>
              <Row>
                <span>{booking.paymentMethod}</span>
              </Row>
              {!booking.isPaid && userInfo._id === booking.user._id ? (
                <>
                  <Row className='mt-2'>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={booking.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </Row>
                </>
              ) : booking.isPaid ? (
                <>
                  <Row className='mt-2'>
                    <h6>Paid At</h6>
                  </Row>
                  <Row>
                    <span>{new Date(booking.paidAt).toDateString()}</span>
                  </Row>
                </>
              ) : (
                <>
                  <Row className='mt-2'>
                    <h6>Payment Status</h6>
                  </Row>
                  <Row>
                    <span>Not Paid</span>
                  </Row>
                </>
              )}
              {booking.isReviewed && userInfo._id === booking.user._id ? (
                <Row className='mt-2 mx-1'>
                  <Message variant='info'>
                    You already submitted a review.
                  </Message>
                </Row>
              ) : booking.isPaid && userInfo._id === booking.user._id ? (
                <Row className='mt-2'>
                  <strong className='fs-4'>Write A Review</strong>
                  {errorAccommodationReview && (
                    <Message variant='danger'>
                      {errorAccommodationReview}
                    </Message>
                  )}
                  <Form onSubmit={submitReviewHandler}>
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
                      disabled={rating === 0 || comment.trim() === ''}
                      className='mt-2'
                    >
                      Submit
                    </Button>
                  </Form>
                </Row>
              ) : null}
            </Col>
            <Col md={8}>
              <Accommodation accommodation={booking.accommodation} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PaymentScreen;
