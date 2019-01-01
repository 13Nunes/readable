import {
  GET_POST_COMMENTS,
  INCREASE_COMMENT_VOTES,
  DECREASE_COMMENT_VOTES,
  ADD_COMMENT,
  DELETE_COMMENT
} from '../actions/comments';

const initialState = {
  loading: true,
  list: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POST_COMMENTS:
      return {
        loading: false,
        list: action.comments.map((e, i) => {
          return {
            ...e,
            [i]: e.editing = false
          }
        })
      }

    case INCREASE_COMMENT_VOTES:
    case DECREASE_COMMENT_VOTES:
      return {
        loading: false,
        list: state.list.map((e, i) => {
          return e.id === action.comment.id ? action.comment : e;
        })
      }

    case ADD_COMMENT:
      return {
        loading: false,
        list: [
          ...state.list,
          action.comment
        ]
      }

    case DELETE_COMMENT:
      return {
        loading: false,
        list: state.list.filter((e, i) => {
          return e.id !== action.comment.id;
        })
      }

    default:
      return state;
  }
}
