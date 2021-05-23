import produce from '../util/produce';

export const initialState = {
  studies: [],
  studyCnt: 0,
  todayStudies: [],
  weekStudies: [],
  loadStudyLoading: false, // 공부시간 가져오기
  loadStudyDone: false,
  loadStudyError: null,
  loadTodayStudyLoading: false, // 일간 공부시간 가져오기
  loadTodayStudyDone: false,
  loadTodayStudyError: null,
  loadWeekStudyLoading: false, // 주간 공부시간 가져오기
  loadWeekStudyDone: false,
  loadWeekStudyError: null,
  addStudyLoading: false, // 공부시간 추가
  addStudyDone: false,
  addStudyError: null,
  delStudyLoading: false, // 공부시간 삭제
  delStudyDone: false,
  delStudyError: null
};

export const LOAD_STUDY_REQUEST = 'LOAD_STUDY_REQUEST';
export const LOAD_STUDY_SUCCESS = 'LOAD_STUDY_SUCCESS';
export const LOAD_STUDY_FAILURE = 'LOAD_STUDY_FAILURE';

export const ADD_STUDY_REQUEST = 'ADD_STUDY_REQUEST';
export const ADD_STUDY_SUCCESS = 'ADD_STUDY_SUCCESS';
export const ADD_STUDY_FAILURE = 'ADD_STUDY_FAILURE';

export const DEL_STUDY_REQUEST = 'DEL_STUDY_REQUEST';
export const DEL_STUDY_SUCCESS = 'DEL_STUDY_SUCCESS';
export const DEL_STUDY_FAILURE = 'DEL_STUDY_FAILURE';

export const LOAD_TODAY_STUDY_REQUEST = 'LOAD_TODAY_STUDY_REQUEST';
export const LOAD_TODAY_STUDY_SUCCESS = 'LOAD_TODAY_STUDY_SUCCESS';
export const LOAD_TODAY_STUDY_FAILURE = 'LOAD_TODAY_STUDY_FAILURE';

export const LOAD_WEEK_STUDY_REQUEST = 'LOAD_WEEK_STUDY_REQUEST';
export const LOAD_WEEK_STUDY_SUCCESS = 'LOAD_WEEK_STUDY_SUCCESS';
export const LOAD_WEEK_STUDY_FAILURE = 'LOAD_WEEK_STUDY_FAILURE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_STUDY_REQUEST:
        draft.loadStudyLoading = true;
        draft.loadStudyError = null;
        draft.loadStudyDone = false;
        break;
      case LOAD_STUDY_SUCCESS:
        draft.loadStudyLoading = false;
        draft.loadStudyDone = true;
        draft.studies = action.data.study;
        draft.studyCnt = action.data.studyCnt.length;
        break;
      case LOAD_STUDY_FAILURE:
        draft.loadStudyLoading = false;
        draft.loadStudyError = action.error;
        break;
      case LOAD_TODAY_STUDY_REQUEST:
        draft.loadTodayStudyLoading = true;
        draft.loadTodayStudyError = null;
        draft.loadTodayStudyDone = false;
        break;
      case LOAD_TODAY_STUDY_SUCCESS:
        draft.loadTodayStudyLoading = false;
        draft.loadTodayStudyDone = true;
        draft.todayStudies = action.data;
        break;
      case LOAD_TODAY_STUDY_FAILURE:
        draft.loadTodayStudyLoading = false;
        draft.loadTodayStudyError = action.error;
        break;
      case LOAD_WEEK_STUDY_REQUEST:
        draft.loadWeekStudyLoading = true;
        draft.loadWeekStudyError = null;
        draft.loadWeekStudyDone = false;
        break;
      case LOAD_WEEK_STUDY_SUCCESS:
        draft.loadWeekStudyLoading = false;
        draft.loadWeekStudyDone = true;
        draft.weekStudies = action.data;
        break;
      case LOAD_WEEK_STUDY_FAILURE:
        draft.loadWeekStudyLoading = false;
        draft.loadWeekStudyError = action.error;
        break;
      case ADD_STUDY_REQUEST:
        draft.addStudyLoading = true;
        draft.addStudyError = null;
        draft.addStudyDone = false;
        break;
      case ADD_STUDY_SUCCESS:
        draft.addStudyLoading = false;
        draft.addStudyDone = true;
        draft.studies.unshift(action.data);
        draft.todayStudies.unshift(action.data);
        break;
      case ADD_STUDY_FAILURE:
        draft.addStudyLoading = false;
        draft.addStudyError = action.error;
        break;
      case DEL_STUDY_REQUEST:
        draft.delStudyLoading = true;
        draft.delStudyError = null;
        draft.delStudyDone = false;
        break;
      case DEL_STUDY_SUCCESS:
        draft.delStudyLoading = false;
        draft.delStudyDone = true;
        draft.studies = draft.studies.filter((v) => !action.data.id.includes(v.id));
        break;
      case DEL_STUDY_FAILURE:
        draft.delStudyLoading = false;
        draft.delStudyError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
