import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";

export default store = configureStore({
  reducer: { basket: basketReducer },
});
