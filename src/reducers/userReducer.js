import { RETRIEVE_USERSDATA, CREATE_USR_PARTNER_ROLE_CONFIG } from "../actions/type";

const initialState = [];

function userReducer(data = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_USR_PARTNER_ROLE_CONFIG:
            return [...data, payload];
        case RETRIEVE_USERSDATA:
            return payload;

        default:
            return data;
    }
}

export default userReducer;

