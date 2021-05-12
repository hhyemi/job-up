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
  UPT_STUDY_FAILURE,
  UPT_STUDY_REQUEST,
  UPT_STUDY_SUCCESS
} from '../reducers/study';

// 공부시간 가져오기
function loadStudyAPI(lastId) {
  return axios.get(`/study?lastId=${lastId || 0}`);
}

function* loadStudy(action) {
  try {
    const result = yield call(loadStudyAPI, action.lastId);
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

// 공부시간 수정
function uptStudyAPI(data) {
  return axios.patch('/study/upt/', data);
}

function* uptStudy(action) {
  try {
    const result = yield call(uptStudyAPI, action.data);
    yield put({
      type: UPT_STUDY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPT_STUDY_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLoadStudy() {
  yield takeLatest(LOAD_STUDY_REQUEST, loadStudy);
}

function* watchAddStudy() {
  yield takeLatest(ADD_STUDY_REQUEST, addStudy);
}

function* watchDelStudy() {
  yield takeLatest(DEL_STUDY_REQUEST, delStudy);
}

function* watchUptStudy() {
  yield takeLatest(UPT_STUDY_REQUEST, uptStudy);
}

export default function* userSaga() {
  yield all([fork(watchLoadStudy), fork(watchAddStudy), fork(watchDelStudy), fork(watchUptStudy)]);
}
