import { RETRIEVE_BU_SPLIT_DATA, UPDATE_BU_SPLIT_DATA } from "./type";
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