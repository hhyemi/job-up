import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  DEL_CATEGORY_FAILURE,
  DEL_CATEGORY_REQUEST,
  DEL_CATEGORY_SUCCESS,
  LOAD_CATEGORY_FAILURE,
  LOAD_CATEGORY_REQUEST,
  LOAD_CATEGORY_SUCCESS
} from '../reducers/category';

// 카테고리 가져오기
function loadCategoryAPI() {
  return axios.get('/cat');
}

function* loadCategory() {
  try {
    const result = yield call(loadCategoryAPI);
    yield put({
      type: LOAD_CATEGORY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_CATEGORY_FAILURE,
      error: err.response.data
    });
  }
}

// 카테고리 추가
function addCategoryAPI(data) {
  return axios.post('/cat/add', data);
}

function* addCategory(action) {
  try {
    const result = yield call(addCategoryAPI, action.data);
    yield put({
      type: ADD_CATEGORY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_CATEGORY_FAILURE,
      error: err.response.data
    });
  }
}

// 카테고리 삭제
function delCategoryAPI(data) {
  return axios.delete('/cat/del', { data });
}

function* delCategory(action) {
  try {
    const result = yield call(delCategoryAPI, action.data);
    yield put({
      type: DEL_CATEGORY_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DEL_CATEGORY_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLoadCategory() {
  yield takeLatest(LOAD_CATEGORY_REQUEST, loadCategory);
}

function* watchAddCategory() {
  yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
}

function* watchDelCategory() {
  yield takeLatest(DEL_CATEGORY_REQUEST, delCategory);
}

export default function* userSaga() {
  yield all([fork(watchLoadCategory), fork(watchAddCategory), fork(watchDelCategory)]);
}
