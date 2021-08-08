import {
  ACCOMODATION_LIST_REQUEST,
  ACCOMODATION_LIST_SUCCESS,
  ACCOMODATION_LIST_FAIL,
  ACCOMODATION_DETAILS_REQUEST,
  ACCOMODATION_DETAILS_SUCCESS,
  ACCOMODATION_DETAILS_FAIL,
} from '../constants/accomodationConstants';

export const accomodationListReducer = (
  state = { accomodations: [] },
  action
) => {
  switch (action.type) {
    case ACCOMODATION_LIST_REQUEST:
      return { loading: true, accomodations: [] };
    case ACCOMODATION_LIST_SUCCESS:
      return { loading: false, accomodations: action.payload };
    case ACCOMODATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const accomodationDetailsReducer = (
  state = { accomodation: { location: {}, reviews: [] } },
  action
) => {
  switch (action.type) {
    case ACCOMODATION_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ACCOMODATION_DETAILS_SUCCESS:
      return { loading: false, accomodation: action.payload };
    case ACCOMODATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
