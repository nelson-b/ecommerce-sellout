import { combineReducers } from "redux";
import sellOutReducer from "./sellOutReducer";
import partnerReducer from "./partnerReducer";

export default combineReducers({
    sellOutReducer, partnerReducer
});