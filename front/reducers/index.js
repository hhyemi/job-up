import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import category from './category';
import calendar from './calendar';
import todo from './todo';
import memo from './memo';
import commty from './commty';
import comment from './comment';
import study from './study';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        category,
        calendar,
        todo,
        memo,
        commty,
        comment,
        study
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
