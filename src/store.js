import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/combineReducer.js';

export default configureStore({
    reducer: {rootReducer}
});