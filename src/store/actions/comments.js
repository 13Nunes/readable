import {
  getPostComments,
  increaseCommentVotes,
  decreaseCommentVotes,
  addComment
} from '../../services/ReadableAPI';

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const INCREASE_COMMENT_VOTES = 'INCREASE_COMMENT_VOTES';
export const DECREASE_COMMENT_VOTES = 'DECREASE_COMMENT_VOTES';
export const ADD_COMMENT = 'ADD_COMMENT';

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