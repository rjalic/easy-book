import axios from 'axios';
import {
  AMENITY_CREATE_FAIL,
  AMENITY_CREATE_REQUEST,
  AMENITY_CREATE_SUCCESS,
  AMENITY_DELETE_FAIL,
  AMENITY_DELETE_REQUEST,
  AMENITY_DELETE_SUCCESS,
  AMENITY_LIST_FAIL,
  AMENITY_LIST_REQUEST,
  AMENITY_LIST_SUCCESS,
} from '../constants/amenityConstants';

export const listAmenities = () => async (dispatch) => {
  try {
    dispatch({
      type: AMENITY_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/amenities`);

    dispatch({
      type: AMENITY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AMENITY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createAmenity = (amenity) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AMENITY_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/amenities`, amenity, config);

    dispatch({ type: AMENITY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AMENITY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAmenity = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AMENITY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/amenities/${id}`, config);

    dispatch({ type: AMENITY_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: AMENITY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
