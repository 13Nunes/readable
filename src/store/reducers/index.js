// Basic
import { combineReducers } from 'redux';

// Reducers
import categories from './categories';
import posts from './posts';
import user from './user';

// Combine and export
export default combineReducers({
  user,
  categories,
  posts
});