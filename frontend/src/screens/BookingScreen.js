import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Accomodation from '../components/Accomodation';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createBooking } from '../actions/bookingActions';
import { DateHelper } from '../utils/dateUtils';

const BookingScreen = ({ history, match, location }) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [bookedFrom, setBookedFrom] = useState(new Date());
  const [bookedTo, setBookedTo] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBooking({
        accomodation,
        paymentMethod,
        totalPrice,
        bookedFrom,
        bookedTo,
      })
    );
  };

  const bookingCreate = useSelector((state) => state.bookingCreate);
  const {
    booking,
    error: bookingError,
    success: bookingSuccess,
  } = bookingCreate;

  const accomodationDetails = useSelector((state) => state.accomodationDetails);
  const { loading, error, accomodation } = accomodationDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (bookingSuccess) {
      history.push(`/bookings/${booking._id}`);
    } else if (totalPrice === 0) {
      let query = location.search.slice(1).split('&');
      setBookedFrom(
        new Date(DateHelper.normalizeDate(new Date(query[0].split('=')[1])))
      );
      setBookedTo(
        new Date(DateHelper.normalizeDate(new Date(query[1].split('=')[1])))
      );
      setTotalPrice(
        accomodation.price * DateHelper.daysBetween(bookedFrom, bookedTo)
      );
    }
  }, [
    accomodation,
    bookedFrom,
    bookedTo,
    totalPrice,
    booking,
    history,
    bookingSuccess,
    location.search,
    userInfo,
  ]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <h3>Booking Overview</h3>
          </Row>
          {bookingSuccess ? (
            <Message variant='info'>Booking successfully created.</Message>
          ) : bookingError && !bookingSuccess ? (
            <Message variant='danger'>{bookingError}</Message>
          ) : null}
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
                  {bookedFrom.toDateString()} - {bookedTo.toDateString()}
                </span>
              </Row>
              <Row className='mt-2'>
                <h6>Capacity</h6>
              </Row>
              <Row>
                <span>
                  {accomodation.capacity === 1
                    ? `${accomodation.capacity} guest`
                    : `${accomodation.capacity} guests`}
                </span>
              </Row>
              <Row className='mt-2'>
                <h6>Price</h6>
              </Row>
              <Row>
                <span>
                  <strong>${accomodation.price}</strong> / night
                </span>
              </Row>
              <Row className='mt-2'>
                <h6>Total Price</h6>
              </Row>
              <Row>
                <span>
                  <strong>${totalPrice.toFixed(2)}</strong>
                </span>
              </Row>
              {bookingSuccess ? (
                <>
                  <Row className='mt-2'>
                    <h6>Payment Method</h6>
                  </Row>
                  <Row>
                    <span>{booking.paymentMethod}</span>
                  </Row>
                  <Link to='/payment' className='btn btn-primary mt-2'>
                    Pay Now <i className='fas fa-angle-right'></i>
                  </Link>
                </>
              ) : null}
            </Col>
            <Col md={8}>
              <Accomodation accomodation={accomodation} />
            </Col>
          </Row>
          {!bookingSuccess ? (
            <>
              <Row className='mt-2'>
                <h3>Pay With</h3>
                <Form onSubmit={submitHandler}>
                  <Form.Group className='mb-2'>
                    <Form.Label as='legend'>Select Payment Method</Form.Label>
                    <Col>
                      <Form.Check
                        type='radio'
                        label='PayPal or Credit Cart'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      ></Form.Check>
                      {/* <Form.Check
                    type='radio'
                    label='Other'
                    id='Other'
                    name='paymentMethod'
                    value='Other'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check> */}
                    </Col>
                  </Form.Group>
                  <Button type='submit' variant='primary'>
                    Confirm Reservation
                  </Button>
                </Form>
              </Row>
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default BookingScreen;
