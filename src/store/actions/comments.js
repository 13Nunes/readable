import {
  getPostComments,
  increaseCommentVotes,
  decreaseCommentVotes,
  addComment,
  deleteComment,
  editComment
} from '../../services/ReadableAPI';

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const INCREASE_COMMENT_VOTES = 'INCREASE_COMMENT_VOTES';
export const DECREASE_COMMENT_VOTES = 'DECREASE_COMMENT_VOTES';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const TOGGLE_EDIT_MODE_COMMENT = 'TOGGLE_EDIT_MODE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

//
function getPostCommentsAction(comments) {
  return {
    type: GET_POST_COMMENTS,
    comments,
  };
}
export function handleGetPostComments(postId) {
  return dispatch => {
    return getPostComments(postId).then(comments => {
      dispatch(getPostCommentsAction(comments));
    });
  };
}
//
function increaseCommentVotesAction(comment) {
  return {
    type: INCREASE_COMMENT_VOTES,
    comment,
  };
}
export function handleIncreaseCommentVotes(comment) {
  return dispatch => {
    return increaseCommentVotes(comment.id).then(comment => {
      dispatch(increaseCommentVotesAction(comment));
    });
  };
}
//
function decreaseCommentVotesAction(comment) {
  return {
    type: DECREASE_COMMENT_VOTES,
    comment,
  };
}
export function handleDecreaseCommentVotes(comment) {
  return dispatch => {
    return decreaseCommentVotes(comment.id).then(comment => {
      dispatch(decreaseCommentVotesAction(comment));
    });
  };
}
//
function addCommentAction(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}
export function handleAddComment(commentData) {
  return dispatch => {
    return addComment(commentData).then(comment => {
      dispatch(addCommentAction(comment));
    });
  };
}
//
function deleteCommentAction(comment) {
  return {
    type: DELETE_COMMENT,
    comment,
  };
}
export function handleDeleteComment(commentId) {
  return dispatch => {
    return deleteComment(commentId).then(comment => {
      dispatch(deleteCommentAction(comment));
    });
  };
}
//
function toggleEditModeCommentAction(comment) {
  return {
    type: TOGGLE_EDIT_MODE_COMMENT,
    comment,
  };
}
export function handleToggleEditModeComment(comment) {
  return dispatch => {
    dispatch(toggleEditModeCommentAction(comment));
  };
}
//
function editCommentAction(comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  };
}
export function handleEditComment(commentData) {
  return dispatch => {
    return editComment(commentData).then(comment => {
      dispatch(editCommentAction(comment));
    });
  };
}