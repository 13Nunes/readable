// Basic
import { combineReducers } from 'redux';

// Reducers
import posts from './posts';
import post from './post.js';

// Combine and export
export default combineReducers({
    posts,
    post
});