const logger = store => next => action => {
    console.group(action.type);
    console.log('Current action: ', action);
    const returnValue = next(action);
    console.log('New state: ', store.getState());
    console.groupEnd();
    return next(returnValue);
};

export default logger;