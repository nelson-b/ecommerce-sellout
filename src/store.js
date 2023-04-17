// import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from 'redux-thunk';
import rootReducer from './reducers/combineReducer.js';

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

export default configureStore({
    reducer: {rootReducer}
})

// export default store;