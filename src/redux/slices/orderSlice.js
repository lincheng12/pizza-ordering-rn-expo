import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import moment from "moment";

export const getAllOrdersById = createAsyncThunk(
  "order/getAllOrdersById",
  async (userId, { rejectWithValue }) => {
    try {
      const queryOrders = await getDocs(
        collection(db, "users", userId, "orders")
      );
      const queryLastOrder = await getDoc(
        doc(db, "users", userId, "last-order", "last")
      );

      if (queryLastOrder.exists()) {
        const orders = queryOrders.docs.map((doc) => ({
          ...doc.data(),
          timePlaced: moment(doc.data().timePlaced.toDate()).format(),
        }));
        const lastOrder = {
          ...queryLastOrder.data(),
          timePlaced: moment(
            queryLastOrder.data().timePlaced.toDate()
          ).format(),
        };
        return [orders, lastOrder];
      } else return [[], {}];
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const storeOrdersById = createAsyncThunk(
  "order/storeOrdersById",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { id } = getState().user.profile;
      const date = moment.utc().format();
      await setDoc(doc(db, "users", id, "orders", payload.id), payload);
      await setDoc(doc(db, "users", id, "last-order", "last"), payload);
      return {
        ...payload,
        timePlaced: moment.utc(date).local().format(),
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    allOrders: [],
    lastOrder: {},
    processing: false,
  },
  reducers: {},
  extraReducers: {
    [getAllOrdersById.fulfilled]: (state, action) => {
      state.allOrders = action.payload[0];
      state.lastOrder = action.payload[1];
    },
    [getAllOrdersById.rejected]: (_, action) => {
      console.log(action.payload);
    },
    [storeOrdersById.pending]: (state) => {
      state.processing = true;
    },
    [storeOrdersById.fulfilled]: (state, action) => {
      state.processing = false;
      state.allOrders = [...state.allOrders, action.payload];
      state.lastOrder = action.payload;
    },
    [storeOrdersById.rejected]: (state, action) => {
      state.processing = false;
      console.log(action.payload);
    },
  },
});

export const selectAllOrders = (state) =>
  [...state.order.allOrders].sort((a, b) =>
    a.timePlaced < b.timePlaced ? 1 : a.timePlaced > b.timePlaced ? -1 : 0
  );
export const selectLastOrder = (state) => state.order.lastOrder;
export const selectProcessing = (state) => state.order.processing;

export default orderSlice.reducer;
