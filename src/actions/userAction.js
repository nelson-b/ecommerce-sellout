import { RETRIEVE_USERSDATA, CREATE_USR_PARTNER_ROLE_CONFIG, RETRIEVE_USER_PROFILE_BY_ID, CREATE_USER_PROFILE} from "./type";

import UserService from "../services/userServices";

export const retrieveAllUserListData = (id, user) => async (dispatch) => {
  try {
    const res = await UserService.getAll(id, user);
    dispatch({
      type: RETRIEVE_USERSDATA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveAllNewListByRole = (id) => async (dispatch) => {
  try {
    const res = await UserService.getByUserRole(id);
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
      const res = await UserService.createPartnerUserRoleConfig(data);

      dispatch({
          type: CREATE_USR_PARTNER_ROLE_CONFIG,
          payload: res.data,
        });
      
        return Promise.resolve(res.data); 
  } catch (err){
      return Promise.reject(err);
  }
}

export const createUserProfileConfig = (data) => async(dispatch) => {
  try{
      console.log('createUserPartnerRoleConfig', data);
      const res = await UserService.createUserProfile(data);

      dispatch({
          type: CREATE_USER_PROFILE,
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