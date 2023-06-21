import { RETRIEVE_ALL_DATA_INPUT, CREATE_DATA_INPUT, UPDATE_DATA_INPUT , UPDATE_DATA_REVIEW_INPUT} from "./type";

import dataInputServices from "../services/dataInputServices";

export const createData = (data) => async(dispatch) => {
    try{
        const res = await dataInputServices.create(data);

        dispatch({
            type: CREATE_DATA_INPUT,
            payload: res.data,
          });
        
          return Promise.resolve(res.data); 

    } catch (err){
        return Promise.reject(err);
    }
  }

  export const retrieveAllData = (user, year, role) => async (dispatch) => {
    try {
      const res = await dataInputServices.getAll(user, year, role);
      
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
      console.log('res in aa', res);
  
      return Promise.resolve(res.data);
      
    } catch (err) {
      return Promise.reject(err);
    }
  };