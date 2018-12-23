import { LIST_POSTS, INCREASE_VOTES, DECREASE_VOTES } from '../actions/posts';

export default function (state = [], action) {
  switch (action.type) {
    case LIST_POSTS:
      switch (action.sortType) {
        case 'DATE':
          return action.posts
            .sort((p1, p2) => action.sortOrder === 'ASC' ? p1.timestamp - p2.timestamp : p2.timestamp - p1.timestamp)
            .filter((e) => e.title.toUpperCase().includes(action.searchTerm.toUpperCase()));
        case 'VOTES':
          return action.posts
            .sort((p1, p2) => action.sortOrder === 'ASC' ? p1.voteScore - p2.voteScore : p2.voteScore - p1.voteScore)
            .filter((e) => e.title.toUpperCase().includes(action.searchTerm.toUpperCase()));
        default: return action.posts;
      }

    case INCREASE_VOTES:
    case DECREASE_VOTES:
      return state.map((e, i) => {
        return e.id === action.post.id ? action.post : e;
      });
    default:
      return state;
  }
}