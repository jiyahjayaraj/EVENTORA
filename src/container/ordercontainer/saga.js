import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  getMyOrdersRequest,
  getMyOrdersSuccess,
  getMyOrdersFail
} from "./slice";

function* createOrderSaga(action) {

  try {

    const response = yield call(
      axios.post,
      "http://localhost:5000/api/order",
      action.payload,
      { withCredentials: true }
    );

    yield put(createOrderSuccess(response.data.order));

  } catch (error) {

    yield put(createOrderFail(error.response?.data?.message));

  }

}

function* getMyOrdersSaga(action) {

  console.log("==action", action);
  

  try {

    const response = yield call(
      axios.get,
      "http://localhost:5000/api/my-orders",
       action.payload,
      { withCredentials: true }
    );

    yield put(getMyOrdersSuccess(response.data.orders));

  } catch (error) {

    yield put(getMyOrdersFail());

  }

}

export default function* orderSaga() {

  yield takeLatest(createOrderRequest.type, createOrderSaga);
  yield takeLatest(getMyOrdersRequest.type, getMyOrdersSaga);

}