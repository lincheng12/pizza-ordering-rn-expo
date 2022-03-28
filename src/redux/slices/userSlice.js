import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import moment from "moment";

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const profileObj = await getDoc(doc(db, "users", userId));
      if (profileObj.exists()) {
        //console.log(profileObj.data());
        const res = profileObj.data();
        const createdAt = moment(res?.createdAt?.toDate()).toString();
        return { ...res, createdAt };
      }
    } catch (err) {
      console.log(err);
      return rejectWithValue("User does not exist with that userId ", err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      //kind of useless
      state.profile = action.payload;
    },
    logout: (state) => {
      state.profile = null;
    },
  },
  extraReducers: {
    [getUserById.pending]: (state) => {
      state.loading = true;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    },
    [getUserById.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.profile;
export const selectLoading = (state) => state.user.loading;

export default userSlice.reducer;
