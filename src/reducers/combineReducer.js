import { combineReducers } from "redux";
import sellOutReducer from "./sellOutReducer";
import partnerReducer from "./partnerReducer";
import staticDataReducer from "./staticDataReducer";
import userReducer from "./userReducer";

export default combineReducers({
    sellOutReducer, partnerReducer, userReducer, staticDataReducer
});