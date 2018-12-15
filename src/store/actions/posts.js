import { getPosts } from '../../services/ReadableAPI';
export const LIST_POSTS = 'LIST_POSTS';

function getPostsAction(posts) {
    return {
        type: LIST_POSTS,
        posts,
    };
}
export function handleGetPosts(category) {
    return dispatch => {
        return getPosts().then(posts => {
            dispatch(getPostsAction(posts));
        });
    };
}