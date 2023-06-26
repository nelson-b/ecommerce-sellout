import { RETRIEVE_All_STATIC_DATA, RETRIEVE_COUNTRIES, RETRIEVE_STATIC_DATA_BY_ATTRNAME } from "../actions/type";

const initialState = [];

function staticDataReducer(data = initialState, action){
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_COUNTRIES:
            return payload;
        case RETRIEVE_All_STATIC_DATA:
            return payload;
        case RETRIEVE_STATIC_DATA_BY_ATTRNAME:
            return payload;
        default:
            return data;
    }
}

export default staticDataReducer;