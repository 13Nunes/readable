import {
  getPost, addPost, editPost, deletePost,
  increaseVotes, decreaseVotes,
} from '../../services/ReadableAPI';

export const GET_POST = 'GET_POST';
export const EDIT_POST = 'EDIT_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const INCREASE_VOTE = 'INCREASE_VOTE';
export const DECREASE_VOTE = 'DECREASE_VOTE';

//
function getPostAction(post) {
  return {
    type: GET_POST,
    post,
  };
}
export function handleGetPost(postId) {
  return dispatch => {
    return getPost(postId).then(post => {
      dispatch(getPostAction(post));
    });
  };
}
//
function addPostAction(data) {
  return {
    type: ADD_POST,
    data,
  };
}
export function handleAddPost(postData) {
  return dispatch => {
    return addPost(postData).then(data => {
      dispatch(addPostAction(data));
    });
  };
}
//
function editPostAction(data) {
  return {
    type: EDIT_POST,
    data,
  };
}
export function handleEditPost(postData) {
  return dispatch => {
    return editPost(postData).then(data => {
      dispatch(editPostAction(data));
    });
  };
}
//
function increaseVoteAction(post) {
  return {
    type: INCREASE_VOTE,
    post,
  };
}
export function handleIncreaseVote(post) {
  return dispatch => {
    return increaseVotes(post.id).then(post => {
      dispatch(increaseVoteAction(post));
    });
  };
}
//
function decreaseVoteAction(post) {
  return {
    type: DECREASE_VOTE,
    post,
  };
}
export function handleDecreaseVote(post) {
  return dispatch => {
    return decreaseVotes(post.id).then(post => {
      dispatch(decreaseVoteAction(post));
    });
  };
}
//
function deletePostAction(post) {
  return {
    type: DELETE_POST,
    post,
  };
}
export function handleDeletePost(postId) {
  return dispatch => {
    return deletePost(postId).then(post => {
      dispatch(deletePostAction(post));
    });
  };
}