import { configureStore, combineReducers } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";
import userReducer from "./slices/userSlice";

const reducers = combineReducers({
  user: userReducer,
  basket: basketReducer,
});

export default store = configureStore({
  reducer: reducers,
});
