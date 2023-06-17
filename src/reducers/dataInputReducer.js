import { CREATE_DATA_INPUT, UPDATE_DATA_INPUT, RETRIEVE_ALL_DATA_INPUT } from "../actions/type";

const initialState = [];

function dataInputReducer(data = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_DATA_INPUT:
            return [...data, payload];

        case UPDATE_DATA_INPUT:
            return [...data, payload];

        case RETRIEVE_ALL_DATA_INPUT:
            return payload;

        default:
            return data;
    }
}

export default dataInputReducer;