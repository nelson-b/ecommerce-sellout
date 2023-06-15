import { RETRIEVE_USERSDATA} from "./type";
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
    const res = await UserService.getByRole(id);
    dispatch({
      type: RETRIEVE_USERSDATA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};