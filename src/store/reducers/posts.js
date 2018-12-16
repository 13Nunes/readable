import { LIST_POSTS, INCREASE_VOTES, DECREASE_VOTES } from '../actions/posts';

export default function (state = {}, action) {
  switch (action.type) {
    case LIST_POSTS:
      return action.posts;
    case INCREASE_VOTES:
      return {
        ...state,
      }
    case DECREASE_VOTES:
      return {
        ...state,
      }
    default:
      return state;
  }
}