import produce from '../util/produce';

export const initialState = {
  calendars: [],
  loadCalendarLoading: false, // 달력 가져오기
  loadCalendarDone: false,
  loadCalendarError: null,
  addCalendarLoading: false, // 달력 추가
  addCalendarDone: false,
  addCalendarError: null,
  delCalendarLoading: false, // 달력 삭제
  delCalendarDone: false,
  delCalendarError: null
};

export const LOAD_CALENDAR_REQUEST = 'LOAD_CALENDAR_REQUEST';
export const LOAD_CALENDAR_SUCCESS = 'LOAD_CALENDAR_SUCCESS';
export const LOAD_CALENDAR_FAILURE = 'LOAD_CALENDAR_FAILURE';

export const ADD_CALENDAR_REQUEST = 'ADD_CALENDAR_REQUEST';
export const ADD_CALENDAR_SUCCESS = 'ADD_CALENDAR_SUCCESS';
export const ADD_CALENDAR_FAILURE = 'ADD_CALENDAR_FAILURE';

export const DEL_CALENDAR_REQUEST = 'DEL_CALENDAR_REQUEST';
export const DEL_CALENDAR_SUCCESS = 'DEL_CALENDAR_SUCCESS';
export const DEL_CALENDAR_FAILURE = 'DEL_CALENDAR_FAILURE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_CALENDAR_REQUEST:
        draft.loadCalendarLoading = true;
        draft.loadCalendarError = null;
        draft.loadCalendarDone = false;
        break;
      case LOAD_CALENDAR_SUCCESS:
        draft.loadCalendarLoading = false;
        draft.loadCalendarDone = true;
        draft.calendars = action.data;
        break;
      case LOAD_CALENDAR_FAILURE:
        draft.loadCalendarLoading = false;
        draft.loadCalendarError = action.error;
        break;
      case ADD_CALENDAR_REQUEST:
        draft.addCalendarLoading = true;
        draft.addCalendarError = null;
        draft.addCalendarDone = false;
        break;
      case ADD_CALENDAR_SUCCESS:
        draft.addCalendarLoading = false;
        draft.addCalendarDone = true;
        break;
      case ADD_CALENDAR_FAILURE:
        draft.addCalendarLoading = false;
        draft.addCalendarError = action.error;
        break;
      case DEL_CALENDAR_REQUEST:
        draft.delCalendarLoading = true;
        draft.delCalendarError = null;
        draft.delCalendarDone = false;
        break;
      case DEL_CALENDAR_SUCCESS:
        draft.delCalendarLoading = false;
        draft.delCalendarDone = true;
        draft.calendars = draft.calendars.filter((v) => v.id !== action.data.CalId);
        break;
      case DEL_CALENDAR_FAILURE:
        draft.delCalendarLoading = false;
        draft.delCalendarError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
