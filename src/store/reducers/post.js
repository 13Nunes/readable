import {
  GET_POST, ADD_POST, EDIT_POST, DELETE_POST,
  INCREASE_VOTE, DECREASE_VOTE
} from '../actions/post';

const initialState = {
  loading: true,
  post: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return {
        loading: false,
        data: action.post
      }
    case ADD_POST:
      return {
        loading: false,
        data: action.data
      }
    case EDIT_POST:
      return {
        loading: false,
        data: action.data
      }
    case INCREASE_VOTE:
    case DECREASE_VOTE:
      return {
        loading: false,
        data: action.post
      }

    case DELETE_POST:
      return {
        loading: false,
        data: action.post
      }

    default:
      return state;
  }
}
