import { LIST_POSTS, INCREASE_VOTES, DECREASE_VOTES } from '../actions/posts';

export default function (state = [], action) {
  switch (action.type) {
    case LIST_POSTS:
      return action.posts;
    case INCREASE_VOTES:
    case DECREASE_VOTES:
      return state.map((e, i) => {
        return e.id === action.post.id ? action.post : e;
      });

    default:
      return state;
  }
}