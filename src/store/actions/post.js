import { getPost } from '../../services/ReadableAPI';
export const GET_POST = 'GET_POST';

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