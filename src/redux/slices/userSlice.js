import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import moment from "moment";
import { getAllOrdersById } from "./orderSlice";

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getAllOrdersById(userId));
      const profileObj = await getDoc(doc(db, "users", userId));
      if (profileObj.exists()) {
        const res = profileObj.data();
        const createdAt = moment(res?.createdAt?.toDate()).toString();
        return { ...res, createdAt };
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { id } = getState().user.profile;
      await updateDoc(doc(db, "users", id), payload); //this updates the value stored on firebase
      return payload; //this will be used to update the values stored in local profile state
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    updating: false,
  },
  reducers: {
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
    [updateUserById.pending]: (state) => {
      state.updating = true;
    },
    [updateUserById.fulfilled]: (state, { payload }) => {
      state.updating = false;
      state.profile = { ...state.profile, ...payload };
    },
    [updateUserById.rejected]: (state, action) => {
      state.updating = false;
      console.log(action.payload);
    },
  },
});

export const { logout } = userSlice.actions;
export const selectUser = (state) => state.user.profile;
export const selectLoading = (state) => state.user.loading;
export const selectUpdating = (state) => state.user.updating;

export default userSlice.reducer;
