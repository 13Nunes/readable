import { GET_POST } from '../actions/post';

const initialState = {
  loading: true,
  post: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return {
        loading: false,
        post: action.post
      }
    default:
      return state;
  }
}
