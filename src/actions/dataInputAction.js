import {
  RETRIEVE_ALL_DATA_INPUT,
  CREATE_DATA_INPUT,
  UPDATE_DATA_INPUT,
  UPDATE_DATA_REVIEW_INPUT,
  RETRIEVE_PREVIOUS_QUARTER_DATA,
  RETRIEVE_NOTIFICATION_DATA,
} from "./type";
import dataInputServices from "../services/dataInputServices";

export const createData = (data) => async (dispatch) => {
  try {
    const res = await dataInputServices.create(data);

    dispatch({
      type: CREATE_DATA_INPUT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveAllData = (user, year, role, monthArray) => async (dispatch) => {
  try {
    const res = await dataInputServices.getAll(user, year, role, monthArray);

    dispatch({
      type: RETRIEVE_ALL_DATA_INPUT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const updateSellOutData = (data) => async (dispatch) => {
  try {
    const res = await dataInputServices.update(data);

    dispatch({
      type: UPDATE_DATA_INPUT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateSellOutReviewData = (data) => async (dispatch) => {
  try {
    const res = await dataInputServices.updateReviewData(data);

    dispatch({
      type: UPDATE_DATA_REVIEW_INPUT,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getQuarterData = (user, role, year, month) => async (dispatch) => {
  try {
    const res = await dataInputServices.getQuarter(user, role, year, month);

    dispatch({
      type: RETRIEVE_PREVIOUS_QUARTER_DATA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const getNotificationsByRoleAndEmail =
  (email, role) => async (dispatch) => {
    try {
      const res = await dataInputServices.getNotifications(email, role);
      dispatch({
        type: RETRIEVE_NOTIFICATION_DATA,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  };
