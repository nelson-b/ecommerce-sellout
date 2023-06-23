import { RETRIEVE_USERSDATA, CREATE_USR_PARTNER_ROLE_CONFIG, CREATE_USER_PROFILE, RETRIEVE_USERDATA_BY_EMAIL, RETRIEVE_AUTH_CLIENTID_INPUT } from "../actions/type";

const initialState = [];

function userReducer(data = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_USR_PARTNER_ROLE_CONFIG:
            return [...data, payload];
        case CREATE_USER_PROFILE:
            return [...data, payload];
        case RETRIEVE_USERSDATA:
            return payload;
        case RETRIEVE_USERDATA_BY_EMAIL:
            return payload;
        case RETRIEVE_AUTH_CLIENTID_INPUT:
            return payload;

        default:
            return data;
    }
}

export default userReducer;

