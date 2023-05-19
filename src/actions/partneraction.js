import {
    CREATE_PARTNERDATA
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