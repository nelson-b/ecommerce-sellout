import {
    CREATE_PARTNERDATA,
    RETRIEVE_PARTNERDATA,
    RETRIEVE_PARTNERDATA_BY_ID,
    UPDATE_PARTNERDATA
} from "./type";

import PartnerService from "../services/partnerServices";

export const createPartnerData = (data) => async(dispatch) => {
    try{
        const res = await PartnerService.create(data);

        dispatch({
            type: CREATE_PARTNERDATA,
            payload: res.data,
        });
        
        return Promise.resolve(res.data);
    } 
    catch (err){
        return Promise.reject(err);
    }
}

export const retrieveAllPartnerData = () => async (dispatch) => {
    try {
      const res = await PartnerService.getAll();
      
      dispatch({
        type: RETRIEVE_PARTNERDATA,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveById = (id) => async(dispatch) => {
    try {
      const res = await PartnerService.get(id);
  
      dispatch({
        type: RETRIEVE_PARTNERDATA_BY_ID,
        payload: res.data,
      });
    }catch (err) {
      console.log(err);
    }
};

export const updatePartner = (data) => async (dispatch) => {
    try {
      const res = await PartnerService.update(data);
  
      dispatch({
        type: UPDATE_PARTNERDATA,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};