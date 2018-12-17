import { LIST_CATEGORIES } from '../actions/categories';

export default function (state = [], action) {
  switch (action.type) {
    case LIST_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}