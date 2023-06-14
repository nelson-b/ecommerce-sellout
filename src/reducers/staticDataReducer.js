import { RETRIEVE_COUNTRIES } from "../actions/type";

const initialState = [];

function staticDataReducer(data = initialState, action){
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_COUNTRIES:
            return payload;
        default:
            return data;
    }
}

export default staticDataReducer;