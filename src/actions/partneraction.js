import {
  CREATE_PARTNERDATA,
  RETRIEVE_PARTNERDATA,
  RETRIEVE_PARTNERDATA_BY_ID,
  UPDATE_PARTNER_REQUEST_DATA,
  UPDATE_PARTNERDATA,
  RETRIEVE_PARTNER_ROLE,
  RETRIEVE_USERROLE_CONFIG_BY_PARTNERID,
  RETRIEVE_USERROLE_CONFIG_BY_EMAILIDROLEID,
  RETRIEVE_ALL_USERROLE_CONFIG,
  RETRIEVE_USERROLE_CONFIG_BY_AUTHCODE,
} from "./type";
import PartnerService from "../services/partnerServices";

export const createPartnerData = (data) => async (dispatch) => {
  try {
    const res = await PartnerService.create(data);

    dispatch({
      type: CREATE_PARTNERDATA,
      payload: res.data,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveAllPartnerData = () => async (dispatch) => {
  try {
    const res = await PartnerService.getAll();

    dispatch({
      type: RETRIEVE_PARTNERDATA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrievePartnerByRole = (email, role) => async (dispatch) => {
  try {
    const res = await PartnerService.getByRole(email, role);

    dispatch({
      type: RETRIEVE_PARTNER_ROLE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveAllUserRoleConfig = () => async (dispatch) => {
  try {
    const res = await PartnerService.getAllUserRoleConfig();

    dispatch({
      type: RETRIEVE_ALL_USERROLE_CONFIG,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveUserRoleConfigByPartnerId = (id) => async (dispatch) => {
  try {
    const res = await PartnerService.getUserRoleConfigByPartnerId(id);

    dispatch({
      type: RETRIEVE_USERROLE_CONFIG_BY_PARTNERID,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveUserRoleConfigByEmailIdRoleId =
  (emailId, roleId) => async (dispatch) => {
    try {
      const res = await PartnerService.getUserRoleConfigByEmailRole(
        emailId,
        roleId
      );

      dispatch({
        type: RETRIEVE_USERROLE_CONFIG_BY_EMAILIDROLEID,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const retrieveById = (id) => async (dispatch) => {
  try {
    const res = await PartnerService.get(id);

    dispatch({
      type: RETRIEVE_PARTNERDATA_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const retrieveUserRoleConfigByAuthCode = (code, emailid) => async(dispatch) => {
  try {
    const res = await PartnerService.getUserRoleConfigByAuthCode(code, emailid);

    dispatch({
      type: RETRIEVE_USERROLE_CONFIG_BY_AUTHCODE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  }catch (err) {
    return Promise.reject(err);
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

export const updatePendingRequestPartners = (data) => async (dispatch) => {
  try {
    const res = await PartnerService.updatePendingPartner(data);

    dispatch({
      type: UPDATE_PARTNER_REQUEST_DATA,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrievePartnerByPartnerID = (parterID) => async (dispatch) => {
  try {
    const res = await PartnerService.getPartnerByPartnerID(parterID);

    dispatch({
      type: RETRIEVE_PARTNERDATA,

      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
