import {
    CREATE_PARTNERDATA, RETRIEVE_PARTNERDATA
} from "../actions/type";

const initialState = [];

function partnerReducer(sellOutData = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_PARTNERDATA:
            return [...sellOutData, payload];
        case RETRIEVE_PARTNERDATA:
            return payload;

        default:
            return sellOutData;
    }
}

export default partnerReducer;