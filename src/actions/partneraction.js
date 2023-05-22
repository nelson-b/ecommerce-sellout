import {
    CREATE_PARTNERDATA,
    RETRIEVE_PARTNERDATA
} from "./type";

import PartnerService from "../services/partnerServices";

export const CreatePartnerData = (data) => async(dispatch) => {
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

export const RetrieveAllPartnerData = () => async (dispatch) => {
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