import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {

    registerUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    registerUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getProfileRequest: (state) => {
      state.loading = true;
    },

    getProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    getProfileFail: (state) => {
      state.loading = false;
      state.user = null;
    }

  }
});

export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
  getProfileRequest,
  getProfileSuccess,
  getProfileFail
} = userSlice.actions;

export default userSlice.reducer;