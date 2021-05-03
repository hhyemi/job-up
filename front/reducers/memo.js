import produce from '../util/produce';

export const initialState = {
  memos: [],
  loadMemoLoading: false, // 메모 가져오기
  loadMemoDone: false,
  loadMemoError: null,
  addMemoLoading: false, // 메모 추가
  addMemoDone: false,
  addMemoError: null,
  delMemoLoading: false, // 메모 삭제
  delMemoDone: false,
  delMemoError: null,
  uptMemoLoading: false, // 메모 수정
  uptMemoDone: false,
  uptMemoError: null
};

export const LOAD_MEMO_REQUEST = 'LOAD_MEMO_REQUEST';
export const LOAD_MEMO_SUCCESS = 'LOAD_MEMO_SUCCESS';
export const LOAD_MEMO_FAILURE = 'LOAD_MEMO_FAILURE';

export const ADD_MEMO_REQUEST = 'ADD_MEMO_REQUEST';
export const ADD_MEMO_SUCCESS = 'ADD_MEMO_SUCCESS';
export const ADD_MEMO_FAILURE = 'ADD_MEMO_FAILURE';

export const DEL_MEMO_REQUEST = 'DEL_MEMO_REQUEST';
export const DEL_MEMO_SUCCESS = 'DEL_MEMO_SUCCESS';
export const DEL_MEMO_FAILURE = 'DEL_MEMO_FAILURE';

export const UPT_MEMO_REQUEST = 'UPT_MEMO_REQUEST';
export const UPT_MEMO_SUCCESS = 'UPT_MEMO_SUCCESS';
export const UPT_MEMO_FAILURE = 'UPT_MEMO_FAILURE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MEMO_REQUEST:
        draft.loadMemoLoading = true;
        draft.loadMemoError = null;
        draft.loadMemoDone = false;
        break;
      case LOAD_MEMO_SUCCESS:
        draft.loadMemoLoading = false;
        draft.loadMemoDone = true;
        draft.memos = action.data;
        break;
      case LOAD_MEMO_FAILURE:
        draft.loadMemoLoading = false;
        draft.loadMemoError = action.error;
        break;
      case ADD_MEMO_REQUEST:
        draft.addMemoLoading = true;
        draft.addMemoError = null;
        draft.addMemoDone = false;
        break;
      case ADD_MEMO_SUCCESS:
        draft.addMemoLoading = false;
        draft.addMemoDone = true;
        draft.memos.push(action.data);
        break;
      case ADD_MEMO_FAILURE:
        draft.addMemoLoading = false;
        draft.addMemoError = action.error;
        break;
      case DEL_MEMO_REQUEST:
        draft.delMemoLoading = true;
        draft.delMemoError = null;
        draft.delMemoDone = false;
        break;
      case DEL_MEMO_SUCCESS:
        draft.delMemoLoading = false;
        draft.delMemoDone = true;
        draft.memos = draft.memos.filter((v) => v.id !== action.data.MemoId);
        break;
      case DEL_MEMO_FAILURE:
        draft.delMemoLoading = false;
        draft.delMemoError = action.error;
        break;
      case UPT_MEMO_REQUEST:
        draft.uptMemoLoading = true;
        draft.uptMemoError = null;
        draft.uptMemoDone = false;
        break;
      case UPT_MEMO_SUCCESS:
        draft.uptMemoLoading = false;
        draft.uptMemoDone = true;
        draft.Memos = draft.memos.map((v) => (v.id === action.data.MemoId ? action.data.Memo : v));
        break;
      case UPT_MEMO_FAILURE:
        draft.uptMemoLoading = false;
        draft.uptMemoError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
