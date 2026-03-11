import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "tickets",

  initialState: {
    tickets: [],
    loading: false,
    error: null
  },

  reducers: {

    /* REQUEST */
    getEventTicketsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    /* SUCCESS */
    getEventTicketsSuccess: (state, action) => {
      state.loading = false;
      state.tickets = action.payload;
    },

    /* FAIL */
    getEventTicketsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  getEventTicketsRequest,
  getEventTicketsSuccess,
  getEventTicketsFail
} = ticketSlice.actions;

export default ticketSlice.reducer;