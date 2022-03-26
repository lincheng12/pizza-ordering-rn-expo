import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    increaseItemCount: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload
      );
      state.items[index].quantity += 1;
    },
    decreaseItemCount: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload
      );
      state.items[index].quantity -= 1;
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        // The item exists in the basket... remove it...
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload}) as its not in the basket`
        );
      }
      state.items = newBasket;
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToBasket,
  increaseItemCount,
  decreaseItemCount,
  removeFromBasket,
  clearBasket,
} = basketSlice.actions;
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items
    .map(({ quantity, price }) => quantity * price)
    .reduce((total, cost) => total + cost, 0);
export const selectTotalCount = (state) =>
  state.basket.items.reduce((total, { quantity }) => total + quantity, 0);

export default basketSlice.reducer;
