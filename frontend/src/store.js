import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  accomodationListReducer,
  accomodationDetailsReducer,
} from './reducers/accomodationReducers.js';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';
import {
  bookingPaymentMethodReducer,
  bookingCreateReducer,
  bookingDetailsReducer,
  bookingPayReducer,
  bookingMyListReducer,
} from './reducers/bookingReducers';

const reducer = combineReducers({
  accomodationList: accomodationListReducer,
  accomodationDetails: accomodationDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  bookingPaymentMethod: bookingPaymentMethodReducer,
  bookingCreate: bookingCreateReducer,
  bookingDetails: bookingDetailsReducer,
  bookingPay: bookingPayReducer,
  bookingMyList: bookingMyListReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  bookingPaymentMethod: { paymentMethod: paymentMethodFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
