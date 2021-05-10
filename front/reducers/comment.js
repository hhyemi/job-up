import produce from '../util/produce';

export const initialState = {
  comments: [],
  loadCommentLoading: false, // 댓글 가져오기
  loadCommentDone: false,
  loadCommentError: null,
  addCommentLoading: false, // 댓글 추가
  addCommentDone: false,
  addCommentError: null,
  delCommentLoading: false, // 댓글 삭제
  delCommentDone: false,
  delCommentError: null,
  uptCommentLoading: false, // 댓글 수정
  uptCommentDone: false,
  uptCommentError: null
};
export const LOAD_COMMENT_REQUEST = 'LOAD_COMMENT_REQUEST';
export const LOAD_COMMENT_SUCCESS = 'LOAD_COMMENT_SUCCESS';
export const LOAD_COMMENT_FAILURE = 'LOAD_COMMENT_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const DEL_COMMENT_REQUEST = 'DEL_COMMENT_REQUEST';
export const DEL_COMMENT_SUCCESS = 'DEL_COMMENT_SUCCESS';
export const DEL_COMMENT_FAILURE = 'DEL_COMMENT_FAILURE';

export const UPT_COMMENT_REQUEST = 'UPT_COMMENT_REQUEST';
export const UPT_COMMENT_SUCCESS = 'UPT_COMMENT_SUCCESS';
export const UPT_COMMENT_FAILURE = 'UPT_COMMENT_FAILURE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_COMMENT_REQUEST:
        draft.loadCommentLoading = true;
        draft.loadCommentError = null;
        draft.loadCommentDone = false;
        break;
      case LOAD_COMMENT_SUCCESS:
        draft.loadCommentLoading = false;
        draft.loadCommentDone = true;
        draft.comments = action.data;
        break;
      case LOAD_COMMENT_FAILURE:
        draft.loadCommentLoading = false;
        draft.loadCommentError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentError = null;
        draft.addCommentDone = false;
        break;
      case ADD_COMMENT_SUCCESS:
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        draft.comments.push(action.data);
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      case DEL_COMMENT_REQUEST:
        draft.delCommentLoading = true;
        draft.delCommentError = null;
        draft.delCommentDone = false;
        break;
      case DEL_COMMENT_SUCCESS:
        draft.delCommentLoading = false;
        draft.delCommentDone = true;
        draft.comments = draft.comments.filter((v) => v.id !== action.data.CommentId);
        break;
      case DEL_COMMENT_FAILURE:
        draft.delCommentLoading = false;
        draft.delCommentError = action.error;
        break;
      case UPT_COMMENT_REQUEST:
        draft.uptCommentLoading = true;
        draft.uptCommentError = null;
        draft.uptCommentDone = false;
        break;
      case UPT_COMMENT_SUCCESS:
        draft.uptCommentLoading = false;
        draft.uptCommentDone = true;
        draft.comments = draft.comments.map((v) => (v.id === action.data.CommentId ? action.data.comment : v));
        break;
      case UPT_COMMENT_FAILURE:
        draft.uptCommentLoading = false;
        draft.uptCommentError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
