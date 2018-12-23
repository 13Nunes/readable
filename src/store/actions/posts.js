import { getPosts, getPostsByCategory, decreaseVotes, increaseVotes } from '../../services/ReadableAPI';
export const LIST_POSTS = 'LIST_POSTS';
export const INCREASE_VOTES = 'INCREASE_VOTES';
export const DECREASE_VOTES = 'DECREASE_VOTES';

function getPostsAction(posts, sortType, sortOrder, searchTerm) {
  return {
    type: LIST_POSTS,
    posts,
    sortType,
    sortOrder,
    searchTerm
  };
}
export function handleGetPosts(sortType, sortOrder, searchTerm, category = null) {
  return dispatch => {
    if (category === null || category === '') {
      return getPosts().then(posts => {
        dispatch(getPostsAction(posts, sortType, sortOrder, searchTerm));
      })
    } else {
      return getPostsByCategory(category).then(posts => {
        dispatch(getPostsAction(posts, sortType, sortOrder, searchTerm));
      });
    }
  };
}
//
function increaseVotesAction(post) {
  return {
    type: INCREASE_VOTES,
    post,
  };
}
export function handleIncreaseVotes(post) {
  return dispatch => {
    return increaseVotes(post.id).then(post => {
      dispatch(increaseVotesAction(post));
    });
  };
}
//
function decreaseVotesAction(post) {
  return {
    type: DECREASE_VOTES,
    post,
  };
}
export function handleDecreaseVotes(post) {
  return dispatch => {
    return decreaseVotes(post.id).then(post => {
      dispatch(decreaseVotesAction(post));
    });
  };
}