import { combineReducers } from "@reduxjs/toolkit";
import { fireStoreApi } from "./services/apiSlice";
// import  featuresReducer  from "./features/appSlice";
import routinesReducer from "./features/routinesSlice";

export const rootReducer = combineReducers({
  //add the featuresReducer here
  routines: routinesReducer,
  [fireStoreApi.reducerPath]: fireStoreApi.reducer,
});
