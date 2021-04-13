import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  GIT_LOG_IN_FAILURE,
  GIT_LOG_IN_REQUEST,
  GIT_LOG_IN_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UPDATE_MY_INFO_FAILURE,
  UPDATE_MY_INFO_REQUEST,
  UPDATE_MY_INFO_SUCCESS
} from '../reducers/user';

// 로그인
function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data
    });
  }
}

// GIT 로그인
function gitLogInAPI(data) {
  return axios.post('/user/gitLogIn', data);
}

function* gitLogIn(action) {
  try {
    const result = yield call(gitLogInAPI, action.data);
    yield put({
      type: GIT_LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GIT_LOG_IN_FAILURE,
      error: err.response.data
    });
  }
}

// 로그아웃
function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data
    });
  }
}

// 회원가입
function signUpAPI(data) {
  return axios.post('/user/signUp', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data
    });
  }
}

// 내정보 가져오기
function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data
    });
  }
}

// 내정보 수정하기
function updateMyInfoAPI(data) {
  return axios.patch('/user/update', data);
}

function* updateMyInfo(action) {
  try {
    const result = yield call(updateMyInfoAPI, action.data);
    yield put({
      type: UPDATE_MY_INFO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_MY_INFO_FAILURE,
      error: err.response.data
    });
  }
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchGitLogIn() {
  yield takeLatest(GIT_LOG_IN_REQUEST, gitLogIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchUpdateMyInfo() {
  yield takeLatest(UPDATE_MY_INFO_REQUEST, updateMyInfo);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchGitLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchLoadMyInfo),
    fork(watchUpdateMyInfo)
  ]);
}
