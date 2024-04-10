import { combineReducers } from "@reduxjs/toolkit";
import { fireStoreApi } from "./services/apiSlice";
// import  featuresReducer  from "./features/appSlice";
import routinesReducer from "./features/routinesSlice";
import userReducer from './features/userSlice'

export const rootReducer = combineReducers({
  //add the featuresReducer here
  userReducer: userReducer,
  routinesReducer : routinesReducer,
  // [fireStoreApi.reducerPath]: fireStoreApi.reducer,
});
