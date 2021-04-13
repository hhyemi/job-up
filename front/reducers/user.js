import produce from '../util/produce';

export const initialState = {
  me: null,
  git: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  gitLogInLoading: false, // 깃 로그인 시도중
  gitLogInDone: false,
  gitLogInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  loadMyInfoLoading: false, // 내정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: null,
  updateMyInfoLoading: false, // 내정보 수정하기 시도중
  updateMyInfoDone: false,
  updateMyInfoError: null
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const GIT_LOG_IN_REQUEST = 'GIT_LOG_IN_REQUEST';
export const GIT_LOG_IN_SUCCESS = 'GIT_LOG_IN_SUCCESS';
export const GIT_LOG_IN_FAILURE = 'GIT_LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const UPDATE_MY_INFO_REQUEST = 'UPDATE_MY_INFO_REQUEST';
export const UPDATE_MY_INFO_SUCCESS = 'UPDATE_MY_INFO_SUCCESS';
export const UPDATE_MY_INFO_FAILURE = 'UPDATE_MY_INFO_FAILURE';

// action creator
export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data
});

export const logoutRequestAction = (data) => ({
  type: LOG_OUT_REQUEST,
  data
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.me = action.data;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case GIT_LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case GIT_LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.git = action.data;
        draft.logInDone = true;
        break;
      case GIT_LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.me = action.data;
        draft.loadMyInfoDone = true;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      case UPDATE_MY_INFO_REQUEST:
        draft.updateMyInfoLoading = true;
        draft.updateMyInfoError = null;
        draft.updateMyInfoDone = false;
        break;
      case UPDATE_MY_INFO_SUCCESS:
        draft.me = action.data;
        draft.updateMyInfoLoading = false;
        draft.updateMyInfoDone = true;
        break;
      case UPDATE_MY_INFO_FAILURE:
        draft.updateMyInfoLoading = false;
        draft.updateMyInfoError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
