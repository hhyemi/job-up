import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_STUDY_FAILURE,
  ADD_STUDY_REQUEST,
  ADD_STUDY_SUCCESS,
  DEL_STUDY_FAILURE,
  DEL_STUDY_REQUEST,
  DEL_STUDY_SUCCESS,
  LOAD_STUDY_FAILURE,
  LOAD_STUDY_REQUEST,
  LOAD_STUDY_SUCCESS,
  LOAD_TODAY_STUDY_FAILURE,
  LOAD_TODAY_STUDY_REQUEST,
  LOAD_TODAY_STUDY_SUCCESS,
  LOAD_WEEK_STUDY_FAILURE,
  LOAD_WEEK_STUDY_REQUEST,
  LOAD_WEEK_STUDY_SUCCESS
} from '../reducers/study';

// 공부시간 가져오기
function loadStudyAPI(data) {
  return axios.post('/study', data);
}

function* loadStudy(action) {
  try {
    const result = yield call(loadStudyAPI, action.data);
    yield put({
      type: LOAD_STUDY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_STUDY_FAILURE,
      error: err.response.data
    });
  }
}

// 일간 공부시간 가져오기
function loadTodayStudyAPI() {
  return axios.get('/study/today');
}

function* loadTodayStudy() {
  try {
    const result = yield call(loadTodayStudyAPI);
    yield put({
      type: LOAD_TODAY_STUDY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_TODAY_STUDY_FAILURE,
      error: err.response.data
    });
  }
}

// 주간 공부시간 가져오기
function loadWeekStudyAPI() {
  return axios.get('/study/week');
}

function* loadWeekStudy() {
  try {
    const result = yield call(loadWeekStudyAPI);
    yield put({
      type: LOAD_WEEK_STUDY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_WEEK_STUDY_FAILURE,
      error: err.response.data
    });
  }
}

// 공부시간 추가
function addStudyAPI(data) {
  return axios.post('/study/add', data);
}

function* addStudy(action) {
  try {
    const result = yield call(addStudyAPI, action.data);
    yield put({
      type: ADD_STUDY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_STUDY_FAILURE,
      error: err.response.data
    });
  }
}

// 공부시간 삭제
function delStudyAPI(data) {
  return axios.delete(`/study/del/${data}`);
}

function* delStudy(action) {
  try {
    const result = yield call(delStudyAPI, action.data);
    yield put({
      type: DEL_STUDY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEL_STUDY_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLoadStudy() {
  yield takeLatest(LOAD_STUDY_REQUEST, loadStudy);
}

function* watchLoadWeekStudy() {
  yield takeLatest(LOAD_WEEK_STUDY_REQUEST, loadWeekStudy);
}

function* watchLoadTodayStudy() {
  yield takeLatest(LOAD_TODAY_STUDY_REQUEST, loadTodayStudy);
}

function* watchAddStudy() {
  yield takeLatest(ADD_STUDY_REQUEST, addStudy);
}

function* watchDelStudy() {
  yield takeLatest(DEL_STUDY_REQUEST, delStudy);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadStudy),
    fork(watchLoadTodayStudy),
    fork(watchLoadWeekStudy),
    fork(watchAddStudy),
    fork(watchDelStudy)
  ]);
}
