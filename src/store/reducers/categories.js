import { LIST_CATEGORIES } from '../actions/categories';

const initialState = {
  loading: true,
  list: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LIST_CATEGORIES:
      return {
        loading: false,
        list: action.categories
      };
    default:
      return state;
  }
}