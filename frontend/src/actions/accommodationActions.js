import axios from 'axios';

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
  ACCOMMODATION_UPDATE_REQUEST,
  ACCOMMODATION_UPDATE_SUCCESS,
  ACCOMMODATION_UPDATE_FAIL,
  ACCOMMODATION_CREATE_REVIEW_REQUEST,
  ACCOMMODATION_CREATE_REVIEW_SUCCESS,
  ACCOMMODATION_CREATE_REVIEW_FAIL,
  ACCOMMODATION_MY_LIST_REQUEST,
  ACCOMMODATION_MY_LIST_SUCCESS,
  ACCOMMODATION_MY_LIST_FAIL,
  ACCOMMODATION_TAKEN_REQUEST,
  ACCOMMODATION_TAKEN_SUCCESS,
  ACCOMMODATION_TAKEN_FAIL,
} from '../constants/accommodationConstants';

export const listAccommodations =
  (query = '', pageNumber = '1') =>
  async (dispatch) => {
    try {
      dispatch({ type: ACCOMMODATION_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/accommodations${query}${
          query === '' ? '?' : '&'
        }pageNumber=${pageNumber}`
      );

      dispatch({
        type: ACCOMMODATION_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACCOMMODATION_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyAccommodations =
  (query = '', pageNumber = '1') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ACCOMMODATION_MY_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/accommodations/myaccommodations?pageNumber=${pageNumber}`,
        config
      );

      dispatch({
        type: ACCOMMODATION_MY_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACCOMMODATION_MY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listAccommodationDetails =
  (id, populateAmenities = false) =>
  async (dispatch) => {
    try {
      dispatch({ type: ACCOMMODATION_DETAILS_REQUEST });

      const { data } = await axios.get(
        `/api/accommodations/${id}?populateAmenities=${populateAmenities}`
      );

      dispatch({
        type: ACCOMMODATION_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACCOMMODATION_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteAccommodation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOMMODATION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/accommodations/${id}`, config);

    dispatch({ type: ACCOMMODATION_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ACCOMMODATION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createAccommodation = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOMMODATION_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/accommodations`, {}, config);

    dispatch({ type: ACCOMMODATION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACCOMMODATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAccommodation =
  (accommodation) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ACCOMMODATION_UPDATE_REQUEST,
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
        `/api/accommodations/${accommodation._id}`,
        accommodation,
        config
      );

      dispatch({ type: ACCOMMODATION_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ACCOMMODATION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createAccommodationReview =
  (bookingId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ACCOMMODATION_CREATE_REVIEW_REQUEST,
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

      await axios.post(`/api/bookings/${bookingId}/review`, review, config);

      dispatch({ type: ACCOMMODATION_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      dispatch({
        type: ACCOMMODATION_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getTakenDates = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACCOMMODATION_TAKEN_REQUEST });

    const { data } = await axios.get(`/api/accommodations/${id}/taken`);

    dispatch({ type: ACCOMMODATION_TAKEN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACCOMMODATION_TAKEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
