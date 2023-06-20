import { RETRIEVE_PREVIOUS_QUARTER_DATA } from "./type";
import dataReviewServices from "../services/dataReviewServices";

export const retrievePreviousQuarterData = (user, id, year, month) => async (dispatch) => {
  try {
    const res = await dataReviewServices.getQuarterData(user, id, year, month);

    dispatch({
      type: RETRIEVE_PREVIOUS_QUARTER_DATA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
