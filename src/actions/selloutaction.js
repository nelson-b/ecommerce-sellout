import {
  CREATE_SELLOUTDATA,
  RETRIEVE_SELLOUTDATA,
  UPDATE_SELLOUTDATA,
  DELETE_SELLOUTDATA,
  DELETE_ALL_SELLOUTDATA,
  RETRIEVE_HISTORICAL_DATA,
  RETRIEVE_DASHBOARD_DATA
} from "./type";

import SellOutDataService from "../services/selloutdata";

export const createSellOutData = (data) => async (dispatch) => {
  try {
    const res = await SellOutDataService.create(data);
    dispatch({
      type: CREATE_SELLOUTDATA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveSellOutData = () => async (dispatch) => {
  try {
    const res = await SellOutDataService.getAll();

    dispatch({
      type: RETRIEVE_SELLOUTDATA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const retrieveById = (id) => async (dispatch) => {
  try {
    const res = await SellOutDataService.get(id);

    dispatch({
      type: RETRIEVE_SELLOUTDATA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteSellOutData = (id) => async (dispatch) => {
  try {
    await SellOutDataService.delete(id);

    dispatch({
      type: DELETE_SELLOUTDATA,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllSellOutData = () => async (dispatch) => {
  try {
    const res = await SellOutDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_SELLOUTDATA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveHistoricalData = (user, year, id) => async (dispatch) => {
  try {
    const res = await SellOutDataService.getHistoricalData(user, year, id);

    dispatch({
      type: RETRIEVE_HISTORICAL_DATA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveDashoboardData =
  (mail, role, year, month) => async (dispatch) => {
    try {
      const res = await SellOutDataService.getDashboardData(
        mail,
        role,
        year,
        month
      );

      dispatch({
        type: RETRIEVE_DASHBOARD_DATA,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
