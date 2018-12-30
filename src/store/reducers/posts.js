import { LIST_POSTS, INCREASE_VOTES, DECREASE_VOTES } from '../actions/posts';

const initialState = {
  loading: true,
  list: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LIST_POSTS:
      switch (action.sortType) {
        case 'DATE':
          return {
            loading: false,
            list: action.posts
              .sort((p1, p2) => action.sortOrder === 'ASC' ? p1.timestamp - p2.timestamp : p2.timestamp - p1.timestamp)
              .filter((e) => e.title.toUpperCase().includes(action.searchTerm.toUpperCase()))
          };
        case 'VOTES':
          return {
            loading: false,
            list: action.posts
              .sort((p1, p2) => action.sortOrder === 'ASC' ? p1.voteScore - p2.voteScore : p2.voteScore - p1.voteScore)
              .filter((e) => e.title.toUpperCase().includes(action.searchTerm.toUpperCase()))
          };
        default: return action.posts;
      }

    case INCREASE_VOTES:
    case DECREASE_VOTES:
      return {
        loading: false,
        list: state.list.map((e, i) => {
          return e.id === action.post.id ? action.post : e;
        })
      }
    default:
      return state;
  }
}

