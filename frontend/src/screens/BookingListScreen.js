import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listBookings } from '../actions/bookingActions';
import { DateHelper } from '../utils/dateUtils';
import NotFound from '../components/NotFound';

const BookingListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const bookingList = useSelector((state) => state.bookingList);
  const { loading, error, bookings } = bookingList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listBookings());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Bookings</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : bookings.length === 0 ? (
        <NotFound message={`Looks like there's no bookings yet...`} />
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>ACCOMMODATION</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
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
                  <a
                    href={`mailto:${booking.user.email}`}
                    className='btn btn-primary btn-sm m-1'
                  >
                    <i className='fas fa-envelope' />
                  </a>
                  <Link
                    to={`/bookings/${booking._id}`}
                    className='btn btn-primary btn-sm'
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default BookingListScreen;
