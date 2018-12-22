import { LIST_POSTS, INCREASE_VOTES, DECREASE_VOTES } from '../actions/posts';

export default function (state = [], action) {
  switch (action.type) {
    case LIST_POSTS:
      if (action.sortType === 'DATE')
        if (action.sortOrder === 'ASC')
          return action.posts.sort(function (p1, p2) { return p1.timestamp - p2.timestamp });
        else return action.posts.sort(function (p1, p2) { return p2.timestamp - p1.timestamp });
      else
        if (action.sortOrder === 'ASC')
          return action.posts.sort(function (p1, p2) { return p1.voteScore - p2.voteScore });
        else return action.posts.sort(function (p1, p2) { return p2.voteScore - p1.voteScore });
    case INCREASE_VOTES:
    case DECREASE_VOTES:
      return state.map((e, i) => {
        return e.id === action.post.id ? action.post : e;
      });
    default:
      return state;
  }
}