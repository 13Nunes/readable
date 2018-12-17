import { getCategories } from '../../services/ReadableAPI';

export const LIST_CATEGORIES = 'LIST_CATEGORIES';

function getCategoriesAction(categories) {
    return {
        type: LIST_CATEGORIES,
        categories,
    };
}
export function handleGetCategories() {
    return dispatch => {
        return getCategories().then(categories => {
            dispatch(getCategoriesAction(categories));
        });
    };
}