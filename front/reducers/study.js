import produce from '../util/produce';

export const initialState = {
  studies: [],
  loadStudyLoading: false, // 공부시간 가져오기
  loadStudyDone: false,
  loadStudyError: null,
  addStudyLoading: false, // 공부시간 추가
  addStudyDone: false,
  addStudyError: null,
  delStudyLoading: false, // 공부시간 삭제
  delStudyDone: false,
  delStudyError: null,
  uptStudyLoading: false, // 공부시간 수정
  uptStudyDone: false,
  uptStudyError: null
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

export const UPT_STUDY_REQUEST = 'UPT_STUDY_REQUEST';
export const UPT_STUDY_SUCCESS = 'UPT_STUDY_SUCCESS';
export const UPT_STUDY_FAILURE = 'UPT_STUDY_FAILURE';

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
        draft.studies = draft.studies.concat(action.data);
        break;
      case LOAD_STUDY_FAILURE:
        draft.loadStudyLoading = false;
        draft.loadStudyError = action.error;
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
        draft.studies = draft.studies.filter((v) => v.id !== action.data.StudyId);
        break;
      case DEL_STUDY_FAILURE:
        draft.delStudyLoading = false;
        draft.delStudyError = action.error;
        break;
      case UPT_STUDY_REQUEST:
        draft.uptStudyLoading = true;
        draft.uptStudyError = null;
        draft.uptStudyDone = false;
        break;
      case UPT_STUDY_SUCCESS:
        draft.uptStudyLoading = false;
        draft.uptStudyDone = true;
        draft.studies = draft.studies.map((v) => (v.id === action.data.StudyId ? action.data.study : v));
        break;
      case UPT_STUDY_FAILURE:
        draft.uptStudyLoading = false;
        draft.uptStudyError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
