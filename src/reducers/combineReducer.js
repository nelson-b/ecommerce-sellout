import { combineReducers } from "redux";
import sellOutReducer from "./sellOutReducer";
import partnerReducer from "./partnerReducer";
import staticDataReducer from "./staticDataReducer";

export default combineReducers({
    sellOutReducer, partnerReducer, staticDataReducer
});