import { RETRIEVE_COUNTRIES } from "./type";

import StaticDataServices from "../services/staticDataServices";

export const retrieveAllCountryData = () => async (dispatch) => {
    try {
      const res = await StaticDataServices.getAllCountries();
  
      dispatch({
        type: RETRIEVE_COUNTRIES,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  export const retrieveAllStaticData = () => async (dispatch) => {
    try {
      const res = await StaticDataServices.getAllStaticDataList();
  
      dispatch({
        type: RETRIEVE_COUNTRIES,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }