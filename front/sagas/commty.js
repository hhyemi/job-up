import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_COMMTY_FAILURE,
  ADD_COMMTY_REQUEST,
  ADD_COMMTY_SUCCESS,
  DEL_COMMTY_FAILURE,
  DEL_COMMTY_REQUEST,
  DEL_COMMTY_SUCCESS,
  LOAD_COMMTY_FAILURE,
  LOAD_COMMTY_REQUEST,
  LOAD_COMMTY_SUCCESS,
  UPT_COMMTY_FAILURE,
  UPT_COMMTY_REQUEST,
  UPT_COMMTY_SUCCESS
} from '../reducers/commty';

// 커뮤니티 가져오기
function loadCommtyAPI(lastId) {
  return axios.get(`/Commty?lastId=${lastId || 0}`);
}

function* loadCommty(action) {
  try {
    const result = yield call(loadCommtyAPI, action.lastId);
    yield put({
      type: LOAD_COMMTY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_COMMTY_FAILURE,
      error: err.response.data
    });
  }
}

// 커뮤니티 추가
function addCommtyAPI(data) {
  return axios.post('/commty/add', data);
}

function* addCommty(action) {
  try {
    const result = yield call(addCommtyAPI, action.data);
    yield put({
      type: ADD_COMMTY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMTY_FAILURE,
      error: err.response.data
    });
  }
}

// 커뮤니티 삭제
function delCommtyAPI(data) {
  return axios.delete(`/Commty/del/${data}`);
}

function* delCommty(action) {
  try {
    const result = yield call(delCommtyAPI, action.data);
    yield put({
      type: DEL_COMMTY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEL_COMMTY_FAILURE,
      error: err.response.data
    });
  }
}

// 커뮤니티 수정
function uptCommtyAPI(data) {
  return axios.patch('/Commty/upt/', data);
}

function* uptCommty(action) {
  try {
    const result = yield call(uptCommtyAPI, action.data);
    yield put({
      type: UPT_COMMTY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPT_COMMTY_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLoadCommty() {
  yield takeLatest(LOAD_COMMTY_REQUEST, loadCommty);
}

function* watchAddCommty() {
  yield takeLatest(ADD_COMMTY_REQUEST, addCommty);
}

function* watchDelCommty() {
  yield takeLatest(DEL_COMMTY_REQUEST, delCommty);
}

function* watchUptCommty() {
  yield takeLatest(UPT_COMMTY_REQUEST, uptCommty);
}

export default function* userSaga() {
  yield all([fork(watchLoadCommty), fork(watchAddCommty), fork(watchDelCommty), fork(watchUptCommty)]);
}
