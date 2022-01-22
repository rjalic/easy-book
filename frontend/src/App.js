import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import AccommodationScreen from './screens/AccommodationScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import BookingScreen from './screens/BookingScreen';
import PaymentScreen from './screens/PaymentScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import AccommodationListScreen from './screens/AccommodationListScreen';
import AccommodationEditScreen from './screens/AccommodationEditScreen';
import AccommodationCreateScreen from './screens/AccommodationCreateScreen';
import BookingListScreen from './screens/BookingListScreen';
import AmenityListScreen from './screens/AmenityListScreen';
import AccommodationMyListScreen from './screens/AccommodationMyListScreen';
import BookingOwnerListScreen from './screens/BookingMyListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route
            path='/createAccommodation'
            component={AccommodationCreateScreen}
            exact
          />
          <Route
            path='/accommodations/:id'
            component={AccommodationScreen}
            exact
          />
          <Route path='/accommodations/:id/book' component={BookingScreen} />
          <Route path='/bookings/:id' component={PaymentScreen} />
          <Route path='/admin/userList' component={UserListScreen} />
          <Route path='/admin/bookingList' component={BookingListScreen} />
          <Route path='/myBookings' component={BookingOwnerListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/accommodations/:id/edit'
            component={AccommodationEditScreen}
          />
          <Route
            path='/admin/accommodationList'
            component={AccommodationListScreen}
            exact
          />
          <Route
            path='/myAccommodations'
            component={AccommodationMyListScreen}
            exact
          />
          <Route path='/admin/amenityList' component={AmenityListScreen} />
          <Route path='/home' component={HomeScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
