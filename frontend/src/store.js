import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  accomodationListReducer,
  accomodationDetailsReducer,
  accomodationDeleteReducer,
  accomodationCreateReducer,
  accomodationUpdateReducer,
  accomodationCreateReviewReducer,
} from './reducers/accomodationReducers.js';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  bookingPaymentMethodReducer,
  bookingCreateReducer,
  bookingDetailsReducer,
  bookingPayReducer,
  bookingMyListReducer,
  bookingListReducer,
} from './reducers/bookingReducers';
import {
  amenityCreateReducer,
  amenityDeleteReducer,
  amenityListReducer,
} from './reducers/amenityReducer.js';

const reducer = combineReducers({
  accomodationList: accomodationListReducer,
  accomodationDetails: accomodationDetailsReducer,
  accomodationDelete: accomodationDeleteReducer,
  accomodationCreate: accomodationCreateReducer,
  accomodationUpdate: accomodationUpdateReducer,
  accomodationCreateReview: accomodationCreateReviewReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  bookingPaymentMethod: bookingPaymentMethodReducer,
  bookingCreate: bookingCreateReducer,
  bookingDetails: bookingDetailsReducer,
  bookingPay: bookingPayReducer,
  bookingMyList: bookingMyListReducer,
  bookingList: bookingListReducer,
  amenityList: amenityListReducer,
  amenityCreate: amenityCreateReducer,
  amenityDelete: amenityDeleteReducer,
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
