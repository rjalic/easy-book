import React, { useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOwnerBookings, unlockDates } from '../actions/bookingActions';
import { DateHelper } from '../utils/dateUtils';
import NotFound from '../components/NotFound';

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
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>ACCOMMODATION</th>
              <th>TOTAL PRICE</th>
              <th>STATUS</th>
              <th>FROM</th>
              <th>TO</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.user === null ? 'UNKNOWN' : booking.user.name}</td>
                <td>
                  {booking.accommodation === null
                    ? 'UNKNOWN'
                    : booking.accommodation.name}
                </td>
                <td>${booking.totalPrice}</td>
                <td>{booking.status}</td>
                <td>{DateHelper.toDateString(booking.bookedFrom)}</td>
                <td>{DateHelper.toDateString(booking.bookedTo)}</td>
                <td>
                  {booking.status === 'LOCKED' ? (
                    <Button
                      className='btn-sm'
                      onClick={(e) => unlockHandler(e, booking._id)}
                    >
                      <i className='fas fa-unlock-alt'></i>
                    </Button>
                  ) : (
                    <>
                      <a
                        href={`mailto:${booking.user.email}`}
                        className='btn btn-primary btn-sm m-1'
                      >
                        <i className='fas fa-envelope' />
                      </a>
                      <Link
                        to={`/bookings/${booking._id}`}
                        className='btn btn-primary btn-sm m-1'
                      >
                        <i
                          className='fas fa-angle-right'
                          style={{
                            fontSize: '14px',
                            width: '11px',
                            height: '11px',
                          }}
                        />
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default BookingOwnerListScreen;
