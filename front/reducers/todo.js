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
  uptTodoError: null
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
        draft.Todos = action.data;
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
        draft.todos.unshift(action.data);
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
        draft.Todos = draft.Todos.filter((v) => v.id !== action.data.CalId);
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
        break;
      case UPT_TODO_FAILURE:
        draft.uptTodoLoading = false;
        draft.uptTodoError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
