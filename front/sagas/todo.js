import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_TODO_FAILURE,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  DEL_TODO_FAILURE,
  DEL_TODO_REQUEST,
  DEL_TODO_SUCCESS,
  LOAD_TODO_FAILURE,
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS,
  UPT_SEQ_TODO_FAILURE,
  UPT_SEQ_TODO_REQUEST,
  UPT_SEQ_TODO_SUCCESS,
  UPT_TODO_FAILURE,
  UPT_TODO_REQUEST,
  UPT_TODO_SUCCESS
} from '../reducers/todo';

// 일정 가져오기
function loadTodoAPI() {
  return axios.get('/todo');
}

function* loadTodo() {
  try {
    const result = yield call(loadTodoAPI);
    yield put({
      type: LOAD_TODO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_TODO_FAILURE,
      error: err.response.data
    });
  }
}

// 일정 추가
function addTodoAPI(data) {
  return axios.post('/todo/add', data);
}

function* addTodo(action) {
  try {
    const result = yield call(addTodoAPI, action.data);
    yield put({
      type: ADD_TODO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_TODO_FAILURE,
      error: err.response.data
    });
  }
}

// 일정 삭제
function delTodoAPI(data) {
  return axios.delete(`/todo/del/${data}`);
}

function* delTodo(action) {
  try {
    const result = yield call(delTodoAPI, action.data);
    yield put({
      type: DEL_TODO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEL_TODO_FAILURE,
      error: err.response.data
    });
  }
}

// 일정 수정
function uptTodoAPI(data) {
  return axios.patch('/todo/upt/', data);
}

function* uptTodo(action) {
  try {
    const result = yield call(uptTodoAPI, action.data);
    yield put({
      type: UPT_TODO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPT_TODO_FAILURE,
      error: err.response.data
    });
  }
}

// 일정 순서 수정
function uptSeqTodoAPI(data) {
  return axios.patch('/todo/seq', data);
}

function* uptSeqTodo(action) {
  try {
    const result = yield call(uptSeqTodoAPI, action.data);
    yield put({
      type: UPT_SEQ_TODO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPT_SEQ_TODO_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLoadTodo() {
  yield takeLatest(LOAD_TODO_REQUEST, loadTodo);
}

function* watchAddTodo() {
  yield takeLatest(ADD_TODO_REQUEST, addTodo);
}

function* watchDelTodo() {
  yield takeLatest(DEL_TODO_REQUEST, delTodo);
}

function* watchUptTodo() {
  yield takeLatest(UPT_TODO_REQUEST, uptTodo);
}

function* watchUptSeqTodo() {
  yield takeLatest(UPT_SEQ_TODO_REQUEST, uptSeqTodo);
}

export default function* userSaga() {
  yield all([fork(watchLoadTodo), fork(watchAddTodo), fork(watchDelTodo), fork(watchUptTodo), fork(watchUptSeqTodo)]);
}
