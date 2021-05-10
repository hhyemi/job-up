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
  uptCommtyError: null,
  likceCommtyLoading: false, // 좋아요
  likceCommtyDone: false,
  likceCommtyError: null,
  unlikeCommtyLoading: false, // 좋아요 취소
  unlikeCommtyDone: false,
  unlikeCommtyError: null
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

export const LIKE_COMMTY_REQUEST = 'LIKE_COMMTY_REQUEST';
export const LIKE_COMMTY_SUCCESS = 'LIKE_COMMTY_SUCCESS';
export const LIKE_COMMTY_FAILURE = 'LIKE_COMMTY_FAILURE';

export const UNLIKE_COMMTY_REQUEST = 'UNLIKE_COMMTY_REQUEST';
export const UNLIKE_COMMTY_SUCCESS = 'UNLIKE_COMMTY_SUCCESS';
export const UNLIKE_COMMTY_FAILURE = 'UNLIKE_COMMTY_FAILURE';

export const LOAD_HASHTAG_COMMTY_REQUEST = 'LOAD_HASHTAG_COMMTY_REQUEST';
export const LOAD_HASHTAG_COMMTY_SUCCESS = 'LOAD_HASHTAG_COMMTY_SUCCESS';
export const LOAD_HASHTAG_COMMTY_FAILURE = 'LOAD_HASHTAG_COMMTY_FAILURE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_COMMTIES_REQUEST:
      case LOAD_HASHTAG_COMMTY_REQUEST:
        draft.loadCommtiesLoading = true;
        draft.loadCommtiesError = null;
        draft.loadCommtiesDone = false;
        break;
      case LOAD_COMMTIES_SUCCESS:
      case LOAD_HASHTAG_COMMTY_SUCCESS:
        draft.loadCommtiesLoading = false;
        draft.loadCommtiesDone = true;
        draft.commties = action.data.commty;
        draft.commtyCnt = action.data.commtyCnt.count;
        break;
      case LOAD_COMMTIES_FAILURE:
      case LOAD_HASHTAG_COMMTY_FAILURE:
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
        draft.singleCommty = action.data.Commty;
        break;
      case UPT_COMMTY_FAILURE:
        draft.uptCommtyLoading = false;
        draft.uptCommtyError = action.error;
        break;
      case LIKE_COMMTY_REQUEST:
        draft.likeCommtyLoading = true;
        draft.likeCommtyDone = false;
        draft.likeCommtyError = null;
        break;
      case LIKE_COMMTY_SUCCESS: {
        draft.singleCommty.Likers.push({ id: action.data.UserId });
        draft.likeCommtyLoading = false;
        draft.likeCommtyDone = true;
        break;
      }
      case LIKE_COMMTY_FAILURE:
        draft.likeCommtyLoading = false;
        draft.likeCommtyError = action.error;
        break;
      case UNLIKE_COMMTY_REQUEST:
        draft.unlikeCommtyLoading = true;
        draft.unlikeCommtyDone = false;
        draft.unlikeCommtyError = null;
        break;
      case UNLIKE_COMMTY_SUCCESS: {
        draft.singleCommty.Likers = draft.singleCommty.Likers.filter((v) => v.id !== action.data.UserId);
        draft.unlikeCommtyLoading = false;
        draft.unlikeCommtyDone = true;
        break;
      }
      case UNLIKE_COMMTY_FAILURE:
        draft.unlikeCommtyLoading = false;
        draft.unlikeCommtyError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
