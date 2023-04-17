import {
    CREATE_SELLOUTDATA,
    RETRIEVE_SELLOUTDATA,
    UPDATE_SELLOUTDATA,
    DELETE_SELLOUTDATA,
    DELETE_ALL_SELLOUTDATA
  } from "../actions/type";

  const initialState = [];

  function sellOutReducer(sellOutDataList = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      case CREATE_SELLOUTDATA:
        return [...sellOutDataList, payload];
  
      case RETRIEVE_SELLOUTDATA:
        return payload;
  
      case UPDATE_SELLOUTDATA:
        return sellOutDataList.map((sellOutData) => {
          if (sellOutData.id === payload.id) {
            return {
              ...sellOutData,
              ...payload,
            };
          } else {
            return sellOutData;
          }
        });
  
      case DELETE_SELLOUTDATA:
        return sellOutDataList.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_SELLOUTDATA:
        return [];
  
      default:
        return sellOutDataList;
    }
  }

  export default sellOutReducer;