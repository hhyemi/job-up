import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  DEL_COMMENT_FAILURE,
  DEL_COMMENT_REQUEST,
  DEL_COMMENT_SUCCESS,
  LOAD_COMMENT_FAILURE,
  LOAD_COMMENT_REQUEST,
  LOAD_COMMENT_SUCCESS,
  UPT_COMMENT_FAILURE,
  UPT_COMMENT_REQUEST,
  UPT_COMMENT_SUCCESS
} from '../reducers/comment';

// 댓글 가져오기
function loadCommentAPI(data) {
  return axios.post('/comment', data);
}

function* loadComment(action) {
  try {
    const result = yield call(loadCommentAPI, action.data);
    yield put({
      type: LOAD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_COMMENT_FAILURE,
      error: err.response.data
    });
  }
}

// 댓글 추가
function addCommentAPI(data) {
  return axios.post('/comment/add', data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data
    });
  }
}

// 댓글 삭제
function delCommentAPI(data) {
  return axios.delete(`/Comment/del/${data}`);
}

function* delComment(action) {
  try {
    const result = yield call(delCommentAPI, action.data);
    yield put({
      type: DEL_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEL_COMMENT_FAILURE,
      error: err.response.data
    });
  }
}

// 댓글 수정
function uptCommentAPI(data) {
  return axios.patch('/Comment/upt/', data);
}

function* uptComment(action) {
  try {
    const result = yield call(uptCommentAPI, action.data);
    yield put({
      type: UPT_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPT_COMMENT_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLoadComment() {
  yield takeLatest(LOAD_COMMENT_REQUEST, loadComment);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchDelComment() {
  yield takeLatest(DEL_COMMENT_REQUEST, delComment);
}

function* watchUptComment() {
  yield takeLatest(UPT_COMMENT_REQUEST, uptComment);
}

export default function* userSaga() {
  yield all([fork(watchLoadComment), fork(watchAddComment), fork(watchDelComment), fork(watchUptComment)]);
}
