import { CREATE_CURRENT_QUARTER_DATA, GET_PREVIOUS_QUARTER_DATA } from "./type";
import InputCalenderService from "../services/inputCalenderServices";

export const createInputCalenderData = (data) => async (dispatch) => {
  try {
    const res = await InputCalenderService.createQuarterData(data);

    dispatch({
      type: CREATE_CURRENT_QUARTER_DATA,

      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveInputCalenderData =
  (par1, par2, par3) => async (dispatch) => {
    try {
      const res = await InputCalenderService.getPreviousQuarterDetails(
        par1,
        par2,
        par3
      );

      dispatch({
        type: GET_PREVIOUS_QUARTER_DATA,

        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);

      return Promise.reject(err);
    }
  };
