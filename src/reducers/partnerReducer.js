import {
    CREATE_PARTNERDATA, 
    RETRIEVE_PARTNERDATA
} from "../actions/type";

const initialState = [];

function partnerReducer(data = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_PARTNERDATA:
            return [...data, payload];
        case RETRIEVE_PARTNERDATA:
            return payload;

        default:
            return data;
    }
}

export default partnerReducer;