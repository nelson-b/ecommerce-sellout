import { RETRIEVE_COUNTRIES, RETRIEVE_STATIC_DATA_BY_ATTRNAME } from "./type";

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

  export const retrieveStaticDataByAttrName = (attr_name) => async (dispatch) => {
    try {
      const res = await StaticDataServices.getStaticDataByAttrName(attr_name);
  
      dispatch({
        type: RETRIEVE_STATIC_DATA_BY_ATTRNAME,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }