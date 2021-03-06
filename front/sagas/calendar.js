import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_CALENDAR_FAILURE,
  ADD_CALENDAR_REQUEST,
  ADD_CALENDAR_SUCCESS,
  DEL_CALENDAR_FAILURE,
  DEL_CALENDAR_REQUEST,
  DEL_CALENDAR_SUCCESS,
  LOAD_CALENDAR_FAILURE,
  LOAD_CALENDAR_REQUEST,
  LOAD_CALENDAR_SUCCESS,
  LOAD_TODAY_CAL_FAILURE,
  LOAD_TODAY_CAL_REQUEST,
  LOAD_TODAY_CAL_SUCCESS,
  UPT_CALENDAR_FAILURE,
  UPT_CALENDAR_REQUEST,
  UPT_CALENDAR_SUCCESS
} from '../reducers/calendar';

// 달력 가져오기
function loadCalendarAPI() {
  return axios.get('/cal');
}

function* loadCalendar() {
  try {
    const result = yield call(loadCalendarAPI);
    yield put({
      type: LOAD_CALENDAR_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_CALENDAR_FAILURE,
      error: err.response.data
    });
  }
}

// 오늘 달력 가져오기
function loadTodayCalAPI() {
  return axios.get('/cal/today');
}

function* loadTodayCal() {
  try {
    const result = yield call(loadTodayCalAPI);
    yield put({
      type: LOAD_TODAY_CAL_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_TODAY_CAL_FAILURE,
      error: err.response.data
    });
  }
}

// 달력 추가
function addCalendarAPI(data) {
  return axios.post('/cal/add', data);
}

function* addCalendar(action) {
  try {
    const result = yield call(addCalendarAPI, action.data);
    yield put({
      type: ADD_CALENDAR_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_CALENDAR_FAILURE,
      error: err.response.data
    });
  }
}

// 달력 삭제
function delCalendarAPI(data) {
  return axios.delete(`/cal/del/${data}`);
}

function* delCalendar(action) {
  try {
    const result = yield call(delCalendarAPI, action.data);
    yield put({
      type: DEL_CALENDAR_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEL_CALENDAR_FAILURE,
      error: err.response.data
    });
  }
}

// 달력 수정
function uptCalendarAPI(data) {
  return axios.patch('/cal/upt/', data);
}

function* uptCalendar(action) {
  try {
    const result = yield call(uptCalendarAPI, action.data);
    yield put({
      type: UPT_CALENDAR_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPT_CALENDAR_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLoadCalendar() {
  yield takeLatest(LOAD_CALENDAR_REQUEST, loadCalendar);
}

function* watchLoadTodayCal() {
  yield takeLatest(LOAD_TODAY_CAL_REQUEST, loadTodayCal);
}

function* watchAddCalendar() {
  yield takeLatest(ADD_CALENDAR_REQUEST, addCalendar);
}

function* watchDelCalendar() {
  yield takeLatest(DEL_CALENDAR_REQUEST, delCalendar);
}

function* watchUptCalendar() {
  yield takeLatest(UPT_CALENDAR_REQUEST, uptCalendar);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadCalendar),
    fork(watchLoadTodayCal),
    fork(watchAddCalendar),
    fork(watchDelCalendar),
    fork(watchUptCalendar)
  ]);
}
