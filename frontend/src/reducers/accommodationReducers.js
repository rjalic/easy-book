import {
  ACCOMMODATION_LIST_REQUEST,
  ACCOMMODATION_LIST_SUCCESS,
  ACCOMMODATION_LIST_FAIL,
  ACCOMMODATION_DETAILS_REQUEST,
  ACCOMMODATION_DETAILS_SUCCESS,
  ACCOMMODATION_DETAILS_FAIL,
  ACCOMMODATION_DELETE_REQUEST,
  ACCOMMODATION_DELETE_SUCCESS,
  ACCOMMODATION_DELETE_FAIL,
  ACCOMMODATION_CREATE_REQUEST,
  ACCOMMODATION_CREATE_SUCCESS,
  ACCOMMODATION_CREATE_FAIL,
  ACCOMMODATION_CREATE_RESET,
  ACCOMMODATION_UPDATE_REQUEST,
  ACCOMMODATION_UPDATE_SUCCESS,
  ACCOMMODATION_UPDATE_FAIL,
  ACCOMMODATION_UPDATE_RESET,
  ACCOMMODATION_DETAILS_RESET,
  ACCOMMODATION_CREATE_REVIEW_REQUEST,
  ACCOMMODATION_CREATE_REVIEW_SUCCESS,
  ACCOMMODATION_CREATE_REVIEW_FAIL,
  ACCOMMODATION_CREATE_REVIEW_RESET,
  ACCOMMODATION_DELETE_RESET,
  ACCOMMODATION_MY_LIST_REQUEST,
  ACCOMMODATION_MY_LIST_SUCCESS,
  ACCOMMODATION_MY_LIST_FAIL,
  ACCOMMODATION_TAKEN_REQUEST,
  ACCOMMODATION_TAKEN_SUCCESS,
  ACCOMMODATION_TAKEN_FAIL,
} from '../constants/accommodationConstants';

export const accommodationListReducer = (
  state = { accommodations: [] },
  action
) => {
  switch (action.type) {
    case ACCOMMODATION_LIST_REQUEST:
      return { loading: true, accommodations: [] };
    case ACCOMMODATION_LIST_SUCCESS:
      return {
        loading: false,
        accommodations: action.payload.accommodations,
        pages: action.payload.pages,
        page: action.payload.page,
        locations: action.payload.locations,
      };
    case ACCOMMODATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const accommodationMyListReducer = (
  state = { accommodations: [] },
  action
) => {
  switch (action.type) {
    case ACCOMMODATION_MY_LIST_REQUEST:
      return { loading: true, accommodations: [] };
    case ACCOMMODATION_MY_LIST_SUCCESS:
      return {
        loading: false,
        accommodations: action.payload.accommodations,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case ACCOMMODATION_MY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const accommodationDetailsReducer = (
  state = { accommodation: { location: {}, reviews: [], amenities: [] } },
  action
) => {
  switch (action.type) {
    case ACCOMMODATION_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ACCOMMODATION_DETAILS_SUCCESS:
      return { loading: false, accommodation: action.payload };
    case ACCOMMODATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ACCOMMODATION_DETAILS_RESET:
      return { accommodation: {} };
    default:
      return state;
  }
};

export const accommodationDeleteReducer = (
  state = { accommodation: { location: {}, reviews: [] } },
  action
) => {
  switch (action.type) {
    case ACCOMMODATION_DELETE_REQUEST:
      return { loading: true };
    case ACCOMMODATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ACCOMMODATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ACCOMMODATION_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const accommodationCreateReducer = (
  state = { accommodation: { location: {}, reviews: [] } },
  action
) => {
  switch (action.type) {
    case ACCOMMODATION_CREATE_REQUEST:
      return { loading: true };
    case ACCOMMODATION_CREATE_SUCCESS:
      return { loading: false, success: true, accommodation: action.payload };
    case ACCOMMODATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ACCOMMODATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const accommodationUpdateReducer = (
  state = { accommodation: { location: {}, reviews: [] } },
  action
) => {
  switch (action.type) {
    case ACCOMMODATION_UPDATE_REQUEST:
      return { loading: true };
    case ACCOMMODATION_UPDATE_SUCCESS:
      return { loading: false, success: true, accommodation: action.payload };
    case ACCOMMODATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ACCOMMODATION_UPDATE_RESET:
      return { accommodation: {} };
    default:
      return state;
  }
};

export const accommodationCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOMMODATION_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case ACCOMMODATION_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case ACCOMMODATION_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case ACCOMMODATION_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const accommodationTakenReducer = (state = { taken: [] }, action) => {
  switch (action.type) {
    case ACCOMMODATION_TAKEN_REQUEST:
      return { loading: true, taken: [] };
    case ACCOMMODATION_TAKEN_SUCCESS:
      return { loading: false, taken: action.payload };
    case ACCOMMODATION_TAKEN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
