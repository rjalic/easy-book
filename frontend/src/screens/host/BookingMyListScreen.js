import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listOwnerBookings, unlockDates } from '../../actions/bookingActions';
import NotFound from '../../components/NotFound';
import { HostBookingTable } from '../../components/tables/HostBookingTable';

const BookingOwnerListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const bookingOwnerList = useSelector((state) => state.bookingOwnerList);
  const { loading, error, bookings } = bookingOwnerList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listOwnerBookings());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const unlockHandler = (e, id) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to unlock booking ${id}?`)) {
      dispatch(unlockDates(id));
      dispatch(listOwnerBookings());
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Bookings</h1>
        </Col>
        <Col className='text-end'>
          <LinkContainer to='/myaccommodations' className='my-3'>
            <Button>
              <i className='fas fa-bed' /> Accommodations
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : bookings.length === 0 ? (
        <NotFound message={`Looks like you have no bookings yet...`} />
      ) : (
        <HostBookingTable bookings={bookings} unlockHandler={unlockHandler} />
      )}
    </>
  );
};

export default BookingOwnerListScreen;
