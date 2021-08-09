import axios from 'axios';

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
  ACCOMODATION_UPDATE_REQUEST,
  ACCOMODATION_UPDATE_SUCCESS,
  ACCOMODATION_UPDATE_FAIL,
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

export const deleteAccomodation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOMODATION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/accomodations/${id}`, config);

    dispatch({ type: ACCOMODATION_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ACCOMODATION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createAccomodation = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOMODATION_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/accomodations`, {}, config);

    dispatch({ type: ACCOMODATION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACCOMODATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAccomodation =
  (accomodation) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ACCOMODATION_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/accomodations/${accomodation._id}`,
        accomodation,
        config
      );

      dispatch({ type: ACCOMODATION_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACCOMODATION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
