// Basic
import { combineReducers } from 'redux';

// Reducers
import categories from './categories';
import posts from './posts';
import post from './post';
import user from './user';
import comments from './comments';

// Combine and export
export default combineReducers({
  user,
  categories,
  posts,
  post,
  comments
});