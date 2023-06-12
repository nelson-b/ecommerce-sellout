import { RETRIEVE_USERSDATA} from "./type";
import UserService from "../services/userServices";

export const RetrieveAllUserListData = () => async (dispatch) => {
  try {
    const res = await UserService.getAll();
    dispatch({
      type: RETRIEVE_USERSDATA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};