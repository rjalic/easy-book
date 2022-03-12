import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listBookings } from '../../actions/bookingActions';
import NotFound from '../../components/NotFound';
import { BookingTable } from '../../components/tables/BookingTable';

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
        <BookingTable bookings={bookings} />
      )}
    </>
  );
};

export default BookingListScreen;
