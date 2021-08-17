import {
  AMENITY_LIST_REQUEST,
  AMENITY_LIST_SUCCESS,
  AMENITY_LIST_FAIL,
  AMENITY_CREATE_REQUEST,
  AMENITY_CREATE_SUCCESS,
  AMENITY_CREATE_FAIL,
  AMENITY_CREATE_RESET,
  AMENITY_DELETE_REQUEST,
  AMENITY_DELETE_SUCCESS,
  AMENITY_DELETE_FAIL,
} from '../constants/amenityConstants';

export const amenityListReducer = (state = { amenities: [] }, action) => {
  switch (action.type) {
    case AMENITY_LIST_REQUEST:
      return { loading: true };
    case AMENITY_LIST_SUCCESS:
      return { loading: false, amenities: action.payload };
    case AMENITY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const amenityCreateReducer = (state = { amenity: {} }, action) => {
  switch (action.type) {
    case AMENITY_CREATE_REQUEST:
      return { loading: true };
    case AMENITY_CREATE_SUCCESS:
      return { loading: false, success: true };
    case AMENITY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case AMENITY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const amenityDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AMENITY_DELETE_REQUEST:
      return { loading: true };
    case AMENITY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case AMENITY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
