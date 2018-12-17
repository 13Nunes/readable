export const SET_USER = 'SET_USER';

function setUserAction(user) {
    return {
        type: SET_USER,
        user,
    };
}
export function handleSetUser(user) {
    return dispatch => {
        return dispatch(setUserAction(user));
    };
}