import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_COMMTY_FAILURE,
  ADD_COMMTY_REQUEST,
  ADD_COMMTY_SUCCESS,
  DEL_COMMTY_FAILURE,
  DEL_COMMTY_REQUEST,
  DEL_COMMTY_SUCCESS,
  LIKE_COMMTY_FAILURE,
  LIKE_COMMTY_REQUEST,
  LIKE_COMMTY_SUCCESS,
  LOAD_COMMTIES_FAILURE,
  LOAD_COMMTIES_REQUEST,
  LOAD_COMMTIES_SUCCESS,
  LOAD_COMMTY_FAILURE,
  LOAD_COMMTY_REQUEST,
  LOAD_COMMTY_SUCCESS,
  UNLIKE_COMMTY_FAILURE,
  UNLIKE_COMMTY_REQUEST,
  UNLIKE_COMMTY_SUCCESS,
  UPT_COMMTY_FAILURE,
  UPT_COMMTY_REQUEST,
  UPT_COMMTY_SUCCESS
} from '../reducers/commty';

// 커뮤니티 가져오기
function loadCommtiesAPI(data) {
  return axios.post('/commty', data);
}

function* loadCommties(action) {
  try {
    const result = yield call(loadCommtiesAPI, action.data);
    yield put({
      type: LOAD_COMMTIES_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_COMMTIES_FAILURE,
      error: err.response.data
    });
  }
}

// 커뮤니티 상세보기
function loadCommtyAPI(data) {
  return axios.get(`/commty/${data}`);
}

function* loadCommty(action) {
  try {
    const result = yield call(loadCommtyAPI, action.data);
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
  return axios.delete(`/commty/del/${data}`);
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
  return axios.patch('/commty/upt/', data);
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

function likeCommtyAPI(data) {
  return axios.patch(`/commty/${data}/like`);
}

function* likeCommty(action) {
  try {
    const result = yield call(likeCommtyAPI, action.data);
    yield put({
      type: LIKE_COMMTY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_COMMTY_FAILURE,
      error: err.response.data
    });
  }
}

function unlikeCommtyAPI(data) {
  return axios.delete(`/commty/${data}/unlike`);
}

function* unlikeCommty(action) {
  try {
    const result = yield call(unlikeCommtyAPI, action.data);
    yield put({
      type: UNLIKE_COMMTY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_COMMTY_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLoadCommties() {
  yield takeLatest(LOAD_COMMTIES_REQUEST, loadCommties);
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

function* watchLikeCommty() {
  yield takeLatest(LIKE_COMMTY_REQUEST, likeCommty);
}

function* watchUnLikeCommty() {
  yield takeLatest(UNLIKE_COMMTY_REQUEST, unlikeCommty);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadCommties),
    fork(watchLoadCommty),
    fork(watchAddCommty),
    fork(watchDelCommty),
    fork(watchUptCommty),
    fork(watchLikeCommty),
    fork(watchUnLikeCommty)
  ]);
}
