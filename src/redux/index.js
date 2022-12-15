import { combineReducers } from "@reduxjs/toolkit";
import AppReducer from "./AppReducer";
import DataReducer from "./DataReducer";

export default combineReducers({
  data: DataReducer,
  app: AppReducer,
});
