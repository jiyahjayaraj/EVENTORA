import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
  getProfileRequest,
  getProfileSuccess,
  getProfileFail
} from "./slice";


/* ---------------- REGISTER ---------------- */

function* registerUserSaga(action) {
  try {

    const response = yield call(
      axios.get,
      "http://localhost:5000/api/my-orders",
      {
      //   params: {
      //     userId: "69fc202b6083e235c3593e8d"
      //   },
        withCredentials: true
      }
    );

    yield put(registerUserSuccess(response.data));

  } catch (error) {

    yield put(
      registerUserFail(
        error.response?.data?.message || "Registration failed"
      )
    );

  }
}


/* ---------------- GET PROFILE ---------------- */

function* getProfileSaga() {
  try {

    const response = yield call(
      axios.get,
      "http://localhost:5000/api/profile",
      { withCredentials: true }
    );

    console.log("PROFILE RESPONSE:", response.data);

    yield put(getProfileSuccess(response.data.user));

  } catch (error) {

    console.log("PROFILE ERROR:", error.response);

    yield put(getProfileFail());

  }
}


/* ---------------- WATCHER ---------------- */

export default function* userSaga() {

  yield takeLatest(registerUserRequest.type, registerUserSaga);

  yield takeLatest(getProfileRequest.type, getProfileSaga);

}