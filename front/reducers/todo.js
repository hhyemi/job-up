import produce from '../util/produce';

export const initialState = {
  todos: [],
  loadTodoLoading: false, // 일정 가져오기
  loadTodoDone: false,
  loadTodoError: null,
  addTodoLoading: false, // 일정 추가
  addTodoDone: false,
  addTodoError: null,
  delTodoLoading: false, // 일정 삭제
  delTodoDone: false,
  delTodoError: null,
  uptTodoLoading: false, // 일정 수정
  uptTodoDone: false,
  uptTodoError: null,
  uptSeqTodoLoading: false, // 일정 순서 수정
  uptSeqTodoDone: false,
  uptSeqTodoError: null
};

export const LOAD_TODO_REQUEST = 'LOAD_TODO_REQUEST';
export const LOAD_TODO_SUCCESS = 'LOAD_TODO_SUCCESS';
export const LOAD_TODO_FAILURE = 'LOAD_TODO_FAILURE';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const DEL_TODO_REQUEST = 'DEL_TODO_REQUEST';
export const DEL_TODO_SUCCESS = 'DEL_TODO_SUCCESS';
export const DEL_TODO_FAILURE = 'DEL_TODO_FAILURE';

export const UPT_TODO_REQUEST = 'UPT_TODO_REQUEST';
export const UPT_TODO_SUCCESS = 'UPT_TODO_SUCCESS';
export const UPT_TODO_FAILURE = 'UPT_TODO_FAILURE';

export const UPT_SEQ_TODO_REQUEST = 'UPT_SEQ_TODO_REQUEST';
export const UPT_SEQ_TODO_SUCCESS = 'UPT_SEQ_TODO_SUCCESS';
export const UPT_SEQ_TODO_FAILURE = 'UPT_SEQ_TODO_FAILURE';

export const UPT_SEQ_LOC_REQUEST = 'UPT_SEQ_LOC_REQUEST';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_TODO_REQUEST:
        draft.loadTodoLoading = true;
        draft.loadTodoError = null;
        draft.loadTodoDone = false;
        break;
      case LOAD_TODO_SUCCESS:
        draft.loadTodoLoading = false;
        draft.loadTodoDone = true;
        draft.todos = action.data;
        break;
      case LOAD_TODO_FAILURE:
        draft.loadTodoLoading = false;
        draft.loadTodoError = action.error;
        break;
      case ADD_TODO_REQUEST:
        draft.addTodoLoading = true;
        draft.addTodoError = null;
        draft.addTodoDone = false;
        break;
      case ADD_TODO_SUCCESS:
        draft.addTodoLoading = false;
        draft.addTodoDone = true;
        draft.todos.push(action.data);
        break;
      case ADD_TODO_FAILURE:
        draft.addTodoLoading = false;
        draft.addTodoError = action.error;
        break;
      case DEL_TODO_REQUEST:
        draft.delTodoLoading = true;
        draft.delTodoError = null;
        draft.delTodoDone = false;
        break;
      case DEL_TODO_SUCCESS:
        draft.delTodoLoading = false;
        draft.delTodoDone = true;
        draft.todos = draft.todos.filter((v) => v.id !== action.data.TodoId);
        break;
      case DEL_TODO_FAILURE:
        draft.delTodoLoading = false;
        draft.delTodoError = action.error;
        break;
      case UPT_TODO_REQUEST:
        draft.uptTodoLoading = true;
        draft.uptTodoError = null;
        draft.uptTodoDone = false;
        break;
      case UPT_TODO_SUCCESS:
        draft.uptTodoLoading = false;
        draft.uptTodoDone = true;
        draft.todos = draft.todos.map((v) => (v.id === action.data.TodoId ? action.data.todo : v));
        break;
      case UPT_TODO_FAILURE:
        draft.uptTodoLoading = false;
        draft.uptTodoError = action.error;
        break;
      case UPT_SEQ_TODO_REQUEST:
        draft.uptSeqTodoLoading = true;
        draft.uptSeqTodoError = null;
        draft.uptSeqTodoDone = false;
        break;
      case UPT_SEQ_TODO_SUCCESS:
        draft.uptSeqTodoLoading = false;
        draft.uptSeqTodoDone = true;
        draft.todos = action.data;
        break;
      case UPT_SEQ_TODO_FAILURE:
        draft.uptSeqTodoLoading = false;
        draft.uptSeqTodoError = action.error;
        break;
      case UPT_SEQ_LOC_REQUEST:
        draft.todos = action.data;
        break;
      default:
        break;
    }
  });

export default reducer;
