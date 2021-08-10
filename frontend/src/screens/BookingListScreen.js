import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listBookings } from '../actions/bookingActions';
import { DateHelper } from '../utils/dateUtils';

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
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>ACCOMODATION</th>
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
                <td>{booking.user.name}</td>
                <td>{booking.accomodation.name}</td>
                <td>${booking.totalPrice}</td>
                <td>
                  {booking.isPaid ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>{DateHelper.toDateString(booking.bookedFrom)}</td>
                <td>{DateHelper.toDateString(booking.bookedTo)}</td>
                <td>
                  <Link
                    to={`/bookings/${booking._id}`}
                    className='btn btn-primary btn-sm'
                  >
                    <i className='fas fa-angle-right'></i>
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
