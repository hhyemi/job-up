import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_MEMO_FAILURE,
  ADD_MEMO_REQUEST,
  ADD_MEMO_SUCCESS,
  BK_MARK_MEMO_FAILURE,
  BK_MARK_MEMO_REQUEST,
  BK_MARK_MEMO_SUCCESS,
  DEL_MEMO_FAILURE,
  DEL_MEMO_REQUEST,
  DEL_MEMO_SUCCESS,
  LOAD_MEMO_FAILURE,
  LOAD_MEMO_REQUEST,
  LOAD_MEMO_SUCCESS,
  UPT_MEMO_FAILURE,
  UPT_MEMO_REQUEST,
  UPT_MEMO_SUCCESS
} from '../reducers/memo';

// 메모 가져오기
function loadMemoAPI() {
  return axios.get('/memo');
}

function* loadMemo() {
  try {
    const result = yield call(loadMemoAPI);
    yield put({
      type: LOAD_MEMO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MEMO_FAILURE,
      error: err.response.data
    });
  }
}

// 메모 추가
function addMemoAPI(data) {
  console.log(data);
  return axios.post('/memo/add', data);
}

function* addMemo(action) {
  try {
    console.log(action);
    const result = yield call(addMemoAPI, action.data);
    yield put({
      type: ADD_MEMO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_MEMO_FAILURE,
      error: err.response.data
    });
  }
}

// 메모 삭제
function delMemoAPI(data) {
  return axios.delete(`/memo/del/${data}`);
}

function* delMemo(action) {
  try {
    const result = yield call(delMemoAPI, action.data);
    yield put({
      type: DEL_MEMO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEL_MEMO_FAILURE,
      error: err.response.data
    });
  }
}

// 메모 수정
function uptMemoAPI(data) {
  return axios.patch('/memo/upt/', data);
}

function* uptMemo(action) {
  try {
    const result = yield call(uptMemoAPI, action.data);
    yield put({
      type: UPT_MEMO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPT_MEMO_FAILURE,
      error: err.response.data
    });
  }
}

// 메모 즐겨찾기
function bkMarkMemoAPI(data) {
  return axios.patch('/memo/bkmark/', data);
}

function* bkMarkMemo(action) {
  try {
    const result = yield call(bkMarkMemoAPI, action.data);
    yield put({
      type: BK_MARK_MEMO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BK_MARK_MEMO_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLoadMemo() {
  yield takeLatest(LOAD_MEMO_REQUEST, loadMemo);
}

function* watchAddMemo() {
  yield takeLatest(ADD_MEMO_REQUEST, addMemo);
}

function* watchDelMemo() {
  yield takeLatest(DEL_MEMO_REQUEST, delMemo);
}

function* watchUptMemo() {
  yield takeLatest(UPT_MEMO_REQUEST, uptMemo);
}

function* watchBkMarkMemo() {
  yield takeLatest(BK_MARK_MEMO_REQUEST, bkMarkMemo);
}

export default function* userSaga() {
  yield all([fork(watchLoadMemo), fork(watchAddMemo), fork(watchDelMemo), fork(watchUptMemo), fork(watchBkMarkMemo)]);
}
