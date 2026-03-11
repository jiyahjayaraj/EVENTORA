import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import eventReducer from "../container/eventcontainer/slice";
import ticketReducer from "../container/ticketcontainer/slice";
import userReducer from "../container/usercontainer/slice";
import orderReducer from "../container/ordercontainer/slice";
import rootSaga from "./rootsaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    events: eventReducer,
    tickets: ticketReducer,
    user:userReducer,
    orders: orderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;