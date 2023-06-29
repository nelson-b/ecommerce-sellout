import {
    CREATE_PARTNERDATA, 
    RETRIEVE_ALL_USERROLE_CONFIG, 
    RETRIEVE_PARTNERDATA,
    RETRIEVE_USERROLE_CONFIG_BY_AUTHCODE,
    RETRIEVE_USERROLE_CONFIG_BY_EMAILIDROLEID,
    RETRIEVE_USERROLE_CONFIG_BY_PARTNERID,
    UPDATE_PARTNERDATA
} from "../actions/type";

const initialState = [];

function partnerReducer(data = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_PARTNERDATA:
            return payload;
        case UPDATE_PARTNERDATA:
            return payload;
        case RETRIEVE_PARTNERDATA:
            return payload;
        case RETRIEVE_USERROLE_CONFIG_BY_PARTNERID:
            return payload;
        case RETRIEVE_USERROLE_CONFIG_BY_EMAILIDROLEID:
            return payload;
        case RETRIEVE_USERROLE_CONFIG_BY_AUTHCODE:
            return payload;
        case RETRIEVE_ALL_USERROLE_CONFIG:
            return payload;
        default:
            return data;
    }
}

export default partnerReducer;