import {
  ACCOMODATION_LIST_REQUEST,
  ACCOMODATION_LIST_SUCCESS,
  ACCOMODATION_LIST_FAIL,
  ACCOMODATION_DETAILS_REQUEST,
  ACCOMODATION_DETAILS_SUCCESS,
  ACCOMODATION_DETAILS_FAIL,
  ACCOMODATION_DELETE_REQUEST,
  ACCOMODATION_DELETE_SUCCESS,
  ACCOMODATION_DELETE_FAIL,
  ACCOMODATION_CREATE_REQUEST,
  ACCOMODATION_CREATE_SUCCESS,
  ACCOMODATION_CREATE_FAIL,
  ACCOMODATION_CREATE_RESET,
  ACCOMODATION_UPDATE_REQUEST,
  ACCOMODATION_UPDATE_SUCCESS,
  ACCOMODATION_UPDATE_FAIL,
  ACCOMODATION_UPDATE_RESET,
  ACCOMODATION_DETAILS_RESET,
  ACCOMODATION_CREATE_REVIEW_REQUEST,
  ACCOMODATION_CREATE_REVIEW_SUCCESS,
  ACCOMODATION_CREATE_REVIEW_FAIL,
  ACCOMODATION_CREATE_REVIEW_RESET,
} from '../constants/accomodationConstants';

export const accomodationListReducer = (
  state = { accomodations: [] },
  action
) => {
  switch (action.type) {
    case ACCOMODATION_LIST_REQUEST:
      return { loading: true, accomodations: [] };
    case ACCOMODATION_LIST_SUCCESS:
      return {
        loading: false,
        accomodations: action.payload.accomodations,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case ACCOMODATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const accomodationDetailsReducer = (
  state = { accomodation: { location: {}, reviews: [], amenities: [] } },
  action
) => {
  switch (action.type) {
    case ACCOMODATION_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ACCOMODATION_DETAILS_SUCCESS:
      return { loading: false, accomodation: action.payload };
    case ACCOMODATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ACCOMODATION_DETAILS_RESET:
      return { accomodation: {} };
    default:
      return state;
  }
};

export const accomodationDeleteReducer = (
  state = { accomodation: { location: {}, reviews: [] } },
  action
) => {
  switch (action.type) {
    case ACCOMODATION_DELETE_REQUEST:
      return { loading: true };
    case ACCOMODATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ACCOMODATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const accomodationCreateReducer = (
  state = { accomodation: { location: {}, reviews: [] } },
  action
) => {
  switch (action.type) {
    case ACCOMODATION_CREATE_REQUEST:
      return { loading: true };
    case ACCOMODATION_CREATE_SUCCESS:
      return { loading: false, success: true, accomodation: action.payload };
    case ACCOMODATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ACCOMODATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const accomodationUpdateReducer = (
  state = { accomodation: { location: {}, reviews: [] } },
  action
) => {
  switch (action.type) {
    case ACCOMODATION_UPDATE_REQUEST:
      return { loading: true };
    case ACCOMODATION_UPDATE_SUCCESS:
      return { loading: false, success: true, accomodation: action.payload };
    case ACCOMODATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ACCOMODATION_UPDATE_RESET:
      return { accomodation: {} };
    default:
      return state;
  }
};

export const accomodationCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOMODATION_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case ACCOMODATION_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case ACCOMODATION_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case ACCOMODATION_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
