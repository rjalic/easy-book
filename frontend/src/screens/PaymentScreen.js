import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { getBookingDetails, payBooking } from '../actions/bookingActions';
import Accomodation from '../components/Accomodation';
import Loader from '../components/Loader';
import { DateHelper } from '../utils/dateUtils';
import { BOOKING_PAY_RESET } from '../constants/bookingConstants';

const PaymentScreen = ({ history, match, location }) => {
  const bookingId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const bookingDetails = useSelector((state) => state.bookingDetails);
  const { loading, booking } = bookingDetails;

  const bookingPay = useSelector((state) => state.bookingPay);
  const { loading: loadingPay, success: successPay } = bookingPay;

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

    if (!booking || successPay) {
      dispatch({ type: BOOKING_PAY_RESET });
      dispatch(getBookingDetails(bookingId));
    } else if (!booking.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, bookingId, booking, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payBooking(bookingId, paymentResult));
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
                  {booking.accomodation.capacity === 1
                    ? `${booking.accomodation.capacity} guest`
                    : `${booking.accomodation.capacity} guests`}
                </span>
              </Row>
              <Row className='mt-2'>
                <h6>Price</h6>
              </Row>
              <Row>
                <span>
                  <strong>${booking.accomodation.price}</strong> / night
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
              <Row className='mt-2'>
                {!booking.isPaid && (
                  <>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={booking.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </>
                )}
              </Row>
            </Col>
            <Col md={8}>
              <Accomodation accomodation={booking.accomodation} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PaymentScreen;
