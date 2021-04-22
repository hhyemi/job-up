import produce from '../util/produce';

export const initialState = {
  categories: [],
  loadCategoryLoading: false, // 카테고리 가져오기
  loadCategoryDone: false,
  loadCategoryError: null,
  addCategoryLoading: false, // 카테고리 추가
  addCategoryDone: false,
  addCategoryError: null,
  delCategoryLoading: false, // 카테고리 삭제
  delCategoryDone: false,
  delCategoryError: null
};

export const LOAD_CATEGORY_REQUEST = 'LOAD_CATEGORY_REQUEST';
export const LOAD_CATEGORY_SUCCESS = 'LOAD_CATEGORY_SUCCESS';
export const LOAD_CATEGORY_FAILURE = 'LOAD_CATEGORY_FAILURE';

export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';

export const DEL_CATEGORY_REQUEST = 'DEL_CATEGORY_REQUEST';
export const DEL_CATEGORY_SUCCESS = 'DEL_CATEGORY_SUCCESS';
export const DEL_CATEGORY_FAILURE = 'DEL_CATEGORY_FAILURE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_CATEGORY_REQUEST:
        draft.loadCategoryLoading = true;
        draft.loadCategoryError = null;
        draft.loadCategoryDone = false;
        break;
      case LOAD_CATEGORY_SUCCESS:
        draft.loadCategoryLoading = false;
        draft.loadCategoryDone = true;
        draft.categories = action.data;
        break;
      case LOAD_CATEGORY_FAILURE:
        draft.loadCategoryLoading = false;
        draft.loadCategoryError = action.error;
        break;
      case ADD_CATEGORY_REQUEST:
        draft.addCategoryLoading = true;
        draft.addCategoryError = null;
        draft.addCategoryDone = false;
        break;
      case ADD_CATEGORY_SUCCESS:
        draft.addCategoryLoading = false;
        draft.addCategoryDone = true;
        draft.categories.unshift(action.data);
        break;
      case ADD_CATEGORY_FAILURE:
        draft.addCategoryLoading = false;
        draft.addCategoryError = action.error;
        break;
      case DEL_CATEGORY_REQUEST:
        draft.delCategoryLoading = true;
        draft.delCategoryError = null;
        draft.delCategoryDone = false;
        break;
      case DEL_CATEGORY_SUCCESS:
        draft.delCategoryLoading = false;
        draft.delCategoryDone = true;
        console.log(action.data, action.data.id);
        draft.categories = draft.categories.filter((v) => !action.data.id.includes(v.id));
        break;
      case DEL_CATEGORY_FAILURE:
        draft.delCategoryLoading = false;
        draft.delCategoryError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
