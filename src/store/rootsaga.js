import { all } from "redux-saga/effects";
import eventSaga from "../container/eventcontainer/saga";
import ticketSaga from "../container/ticketcontainer/saga";
import userSaga from "../container/usercontainer/saga";
import orderSaga from "../container/ordercontainer/saga";

export default function* rootSaga() {
  yield all([
    eventSaga(),
    ticketSaga(),
    userSaga(),
    orderSaga()
  ]);
}