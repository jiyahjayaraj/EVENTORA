import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    latestOrder: null,
    loading: false,
    error: null
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {

        createOrderRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        createOrderSuccess: (state, action) => {
            state.loading = false;
            state.latestOrder = action.payload;
            state.orders.push(action.payload);
        },

        createOrderFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearLatestOrder: (state) => {
            state.latestOrder = null;
        },

        getMyOrdersRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        // ⭐ ADD THESE TWO
        getMyOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },

        getMyOrdersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    clearLatestOrder,
    getMyOrdersRequest,
    getMyOrdersSuccess,
    getMyOrdersFail
} = orderSlice.actions;

export default orderSlice.reducer;