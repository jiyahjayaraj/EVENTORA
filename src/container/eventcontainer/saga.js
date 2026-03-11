import { takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  getEventsRequest,
  getEventsSuccess,
  getEventsFail
} from "./slice";


const fetchEventsApi = () => {
  return axios.get("http://localhost:5000/api/events");
};


function* getEventsSaga() {
  try {

    const response = yield call(fetchEventsApi);

    yield put(
      getEventsSuccess(response.data.events)
    );

  } catch (error) {

    yield put(
      getEventsFail(error.message)
    );

  }
}


export default function* eventSaga() {

  yield takeEvery(
    getEventsRequest.type,
    getEventsSaga
  );

}