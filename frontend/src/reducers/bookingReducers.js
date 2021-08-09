import {
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_SAVE_PAYMENT_METHOD,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_PAY_REQUEST,
  BOOKING_PAY_SUCCESS,
  BOOKING_PAY_FAIL,
  BOOKING_PAY_RESET,
  BOOKING_MY_LIST_REQUEST,
  BOOKING_MY_LIST_SUCCESS,
  BOOKING_MY_LIST_FAIL,
  BOOKING_MY_LIST_RESET,
} from '../constants/bookingConstants';

export const bookingPaymentMethodReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};

export const bookingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_CREATE_REQUEST:
      return { loading: true };
    case BOOKING_CREATE_SUCCESS:
      return { loading: false, success: true, booking: action.payload };
    case BOOKING_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookingDetailsReducer = (
  state = { loading: true, user: {}, accomodation: {} },
  action
) => {
  switch (action.type) {
    case BOOKING_DETAILS_REQUEST:
      return { ...state, loading: true };
    case BOOKING_DETAILS_SUCCESS:
      return { loading: false, booking: action.payload };
    case BOOKING_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookingPayReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_PAY_REQUEST:
      return { loading: true };
    case BOOKING_PAY_SUCCESS:
      return { loading: false, success: true };
    case BOOKING_PAY_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const bookingMyListReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case BOOKING_MY_LIST_REQUEST:
      return { loading: true };
    case BOOKING_MY_LIST_SUCCESS:
      return { loading: false, bookings: action.payload };
    case BOOKING_MY_LIST_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_MY_LIST_RESET:
      return { bookings: [] };
    default:
      return state;
  }
};
