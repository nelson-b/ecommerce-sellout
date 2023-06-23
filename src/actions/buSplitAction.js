import { RETRIEVE_BU_SPLIT_DATA, UPDATE_BU_SPLIT_DATA, GET_PARTNER_NAME } from "./type";
import BuSplitServices from "../services/buSplitServices";
  
  export const retrieveBuSplitData = (user, id, year) => async (dispatch) => {
    try {
      const res = await BuSplitServices.getBuSplit(user, id, year);
  
      dispatch({
        type: RETRIEVE_BU_SPLIT_DATA,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  export const retrivePartnerAccountName = (partnerId, countyCode) => async (dispatch) => {
    try {
      const res = await BuSplitServices.getPartnerName(partnerId, countyCode);
  
      dispatch({
        type: GET_PARTNER_NAME,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  export const updateBuSplitData = (data) => async (dispatch) => {
      try {
        const res = await BuSplitServices.updateBuSplit(data);
        dispatch({
          type: UPDATE_BU_SPLIT_DATA,
          payload: data,
        });

        return Promise.resolve(res.data);
      } catch (err) {
        return Promise.reject(err);
      }
  };