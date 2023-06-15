import { RETRIEVE_USERSDATA, CREATE_USR_PARTNER_ROLE_CONFIG, RETRIEVE_USER_PROFILE_BY_ID} from "./type";

import UserService from "../services/userServices";

export const retrieveAllUserListData = (id) => async (dispatch) => {
  try {
    const res = await UserService.getAll(id);
    dispatch({
      type: RETRIEVE_USERSDATA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createUserPartnerRoleConfig = (data) => async(dispatch) => {
  try{
      console.log('createUserPartnerRoleConfig', data);
      const res = await UserService.createUserPartnerRoleConfig(data);

      dispatch({
          type: CREATE_USR_PARTNER_ROLE_CONFIG,
          payload: res.data,
        });
      
        return Promise.resolve(res.data); 
  } catch (err){
      return Promise.reject(err);
  }
}

export const getUserProfileById = (id) => async(dispatch) => {
  try {
    const res = await UserService.get(id);

    dispatch({
      type: RETRIEVE_USER_PROFILE_BY_ID,
      payload: res.data,
    });
  }catch (err) {
    console.log(err);
  }
}