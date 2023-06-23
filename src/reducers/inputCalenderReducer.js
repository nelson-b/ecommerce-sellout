import {
  GET_PREVIOUS_QUARTER_DATA,
  CREATE_CURRENT_QUARTER_DATA,
} from "../actions/type";

const initialState = [];

function inputCalenderReducer(quarterDataList = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CURRENT_QUARTER_DATA:
      return [...quarterDataList, payload];

    case GET_PREVIOUS_QUARTER_DATA:
      return payload;

    default:
      return quarterDataList;
  }
}

export default inputCalenderReducer;
