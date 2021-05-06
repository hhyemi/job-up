import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import catSaga from './category';
import calSaga from './calendar';
import todoSaga from './todo';
import memoSaga from './memo';
import commtySaga from './commty';

import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl; // axios보낼때 앞에 붙여줌
axios.defaults.withCredentials = true; // 쿠키전달을 위한 cors문제

export default function* rootSage() {
  yield all([fork(userSaga), fork(catSaga), fork(calSaga), fork(todoSaga), fork(memoSaga), fork(commtySaga)]);
}
