import { configureStore, combineReducers } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";

const reducers = combineReducers({
  user: userReducer,
  basket: basketReducer,
  order: orderReducer,
});

export default store = configureStore({
  reducer: reducers,
});
