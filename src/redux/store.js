import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/basketSlice";

export default store = configureStore({
  reducer: { counter: counterReducer },
});
