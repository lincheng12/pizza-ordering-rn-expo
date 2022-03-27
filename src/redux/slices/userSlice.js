import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
  },
  reducers: {
    login: (state, action) => (state.profile = action.payload),
    logout: (state) => (state.profile = null),
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.profile;

export default userSlice.reducer;
