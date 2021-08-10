import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import AccomodationScreen from './screens/AccomodationScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import BookingScreen from './screens/BookingScreen';
import PaymentScreen from './screens/PaymentScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import AccomodationListScreen from './screens/AccomodationListScreen';
import AccomodationEditScreen from './screens/AccomodationEditScreen';
import BookingListScreen from './screens/BookingListScreen';

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
            path='/accomodations/:id'
            component={AccomodationScreen}
            exact
          />
          <Route path='/accomodations/:id/book' component={BookingScreen} />
          <Route path='/bookings/:id' component={PaymentScreen} />
          <Route path='/admin/userList' component={UserListScreen} />
          <Route path='/admin/bookingList' component={BookingListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/accomodation/:id/edit'
            component={AccomodationEditScreen}
          />
          <Route
            path='/admin/accomodationList'
            component={AccomodationListScreen}
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
