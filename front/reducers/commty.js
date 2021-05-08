import produce from '../util/produce';

export const initialState = {
  commties: [],
  singleCommty: null,
  commtyCnt: 0,
  loadCommtiesLoading: false, // 커뮤니티들 가져오기
  loadCommtiesDone: false,
  loadCommtiesError: null,
  loadCommtyLoading: false, // 커뮤니티 가져오기
  loadCommtyDone: false,
  loadCommtyError: null,
  addCommtyLoading: false, // 커뮤니티 추가
  addCommtyDone: false,
  addCommtyError: null,
  delCommtyLoading: false, // 커뮤니티 삭제
  delCommtyDone: false,
  delCommtyError: null,
  uptCommtyLoading: false, // 커뮤니티 수정
  uptCommtyDone: false,
  uptCommtyError: null
};
export const LOAD_COMMTIES_REQUEST = 'LOAD_COMMTIES_REQUEST';
export const LOAD_COMMTIES_SUCCESS = 'LOAD_COMMTIES_SUCCESS';
export const LOAD_COMMTIES_FAILURE = 'LOAD_COMMTIES_FAILURE';

export const LOAD_COMMTY_REQUEST = 'LOAD_COMMTY_REQUEST';
export const LOAD_COMMTY_SUCCESS = 'LOAD_COMMTY_SUCCESS';
export const LOAD_COMMTY_FAILURE = 'LOAD_COMMTY_FAILURE';

export const ADD_COMMTY_REQUEST = 'ADD_COMMTY_REQUEST';
export const ADD_COMMTY_SUCCESS = 'ADD_COMMTY_SUCCESS';
export const ADD_COMMTY_FAILURE = 'ADD_COMMTY_FAILURE';

export const DEL_COMMTY_REQUEST = 'DEL_COMMTY_REQUEST';
export const DEL_COMMTY_SUCCESS = 'DEL_COMMTY_SUCCESS';
export const DEL_COMMTY_FAILURE = 'DEL_COMMTY_FAILURE';

export const UPT_COMMTY_REQUEST = 'UPT_COMMTY_REQUEST';
export const UPT_COMMTY_SUCCESS = 'UPT_COMMTY_SUCCESS';
export const UPT_COMMTY_FAILURE = 'UPT_COMMTY_FAILURE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_COMMTIES_REQUEST:
        draft.loadCommtiesLoading = true;
        draft.loadCommtiesError = null;
        draft.loadCommtiesDone = false;
        break;
      case LOAD_COMMTIES_SUCCESS:
        draft.loadCommtiesLoading = false;
        draft.loadCommtiesDone = true;
        draft.commties = action.data.commty;
        draft.commtyCnt = action.data.commtyCnt.count;
        break;
      case LOAD_COMMTIES_FAILURE:
        draft.loadCommtiesLoading = false;
        draft.loadCommtiesError = action.error;
        break;
      case LOAD_COMMTY_REQUEST:
        draft.loadCommtyLoading = true;
        draft.loadCommtyError = null;
        draft.loadCommtyDone = false;
        break;
      case LOAD_COMMTY_SUCCESS:
        draft.loadCommtyLoading = false;
        draft.loadCommtyDone = true;
        draft.singleCommty = action.data;
        break;
      case LOAD_COMMTY_FAILURE:
        draft.loadCommtyLoading = false;
        draft.loadCommtyError = action.error;
        break;
      case ADD_COMMTY_REQUEST:
        draft.addCommtyLoading = true;
        draft.addCommtyError = null;
        draft.addCommtyDone = false;
        break;
      case ADD_COMMTY_SUCCESS:
        draft.addCommtyLoading = false;
        draft.addCommtyDone = true;
        draft.commties.unshift(action.data);
        break;
      case ADD_COMMTY_FAILURE:
        draft.addCommtyLoading = false;
        draft.addCommtyError = action.error;
        break;
      case DEL_COMMTY_REQUEST:
        draft.delCommtyLoading = true;
        draft.delCommtyError = null;
        draft.delCommtyDone = false;
        break;
      case DEL_COMMTY_SUCCESS:
        draft.delCommtyLoading = false;
        draft.delCommtyDone = true;
        draft.commties = draft.commties.filter((v) => v.id !== action.data.CommtyId);
        break;
      case DEL_COMMTY_FAILURE:
        draft.delCommtyLoading = false;
        draft.delCommtyError = action.error;
        break;
      case UPT_COMMTY_REQUEST:
        draft.uptCommtyLoading = true;
        draft.uptCommtyError = null;
        draft.uptCommtyDone = false;
        break;
      case UPT_COMMTY_SUCCESS:
        draft.uptCommtyLoading = false;
        draft.uptCommtyDone = true;
        draft.commties = draft.commties.map((v) => (v.id === action.data.CommtyId ? action.data.Commty : v));
        break;
      case UPT_COMMTY_FAILURE:
        draft.uptCommtyLoading = false;
        draft.uptCommtyError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
