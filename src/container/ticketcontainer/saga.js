import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  getEventTicketsRequest,
  getEventTicketsSuccess,
  getEventTicketsFail
} from "./slice";

/* API */
const fetchEventTickets = (eventId) =>
  axios.get(`http://localhost:5000/api/tickets/event/${eventId}`);

/* SAGA */
function* getEventTicketsSaga(action) {
  try {

    const res = yield call(fetchEventTickets, action.payload);

    yield put(getEventTicketsSuccess(res.data));

  } catch (error) {

    yield put(getEventTicketsFail(error.message));

  }
}

/* WATCHER */
export default function* ticketSaga() {
  yield takeLatest(getEventTicketsRequest.type, getEventTicketsSaga);
}