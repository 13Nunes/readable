import { LIST_POSTS, INCREASE_VOTES, DECREASE_VOTES } from '../actions/posts';

export default function (state = [], action) {
  switch (action.type) {
    case LIST_POSTS:
      return action.posts;
    case INCREASE_VOTES:
      return state.map((e, i) => {
        if (e.id === action.post.id) e.voteScore += 1;
        return e;
      });
    case DECREASE_VOTES:
      return state.map((e, i) => {
        if (e.id === action.post.id) e.voteScore -= 1;
        return e;
      });
    default:
      return state;
  }
}