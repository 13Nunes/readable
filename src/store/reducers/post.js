import { INCREASE_VOTES, DECREASE_VOTES } from '../actions/posts';

export default function (state = {}, action) {
  switch (action.type) {
    case INCREASE_VOTES:
      return {
        ...action.post,
        voteScore: action.post.voteScore++
      }
    case DECREASE_VOTES:
      return {
        ...action.post,
        voteScore: action.post.voteScore--
      }
    default:
      return state;
  }
}