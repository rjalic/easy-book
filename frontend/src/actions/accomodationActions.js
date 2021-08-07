import axios from 'axios';

import {
  ACCOMODATION_LIST_REQUEST,
  ACCOMODATION_LIST_SUCCESS,
  ACCOMODATION_LIST_FAIL,
  ACCOMODATION_DETAILS_REQUEST,
  ACCOMODATION_DETAILS_SUCCESS,
  ACCOMODATION_DETAILS_FAIL,
} from '../constants/accomodationConstants';

export const listAccomodations = () => async (dispatch) => {
  try {
    dispatch({ type: ACCOMODATION_LIST_REQUEST });

    const { data } = await axios.get('/api/accomodations');

    dispatch({
      type: ACCOMODATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACCOMODATION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAccomodationDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACCOMODATION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/accomodations/${id}`);

    dispatch({
      type: ACCOMODATION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACCOMODATION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
