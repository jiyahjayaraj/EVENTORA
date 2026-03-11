import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  loading: false,
  error: null
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {


    getEventsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    getEventsSuccess: (state, action) => {
      state.loading = false;
      state.events = action.payload;
    },

    getEventsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  getEventsRequest,
  getEventsSuccess,
  getEventsFail
} = eventSlice.actions;

export default eventSlice.reducer;