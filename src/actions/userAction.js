import { RETRIEVE_USERSDATA} from "./type";
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