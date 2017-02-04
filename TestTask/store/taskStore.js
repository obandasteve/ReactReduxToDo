import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import TaskReducers from '../reducers/TaskReducers';

// custom middleware
const actionLogger = (store) => (next) => (action) => {

    if (typeof action !== "function") {
        console.log('sync dispatch:', action);
    } else {
        console.log('async dispatch: ', action);
    }
    return next(action);
}

const taskStore = createStore(
    TaskReducers,
    applyMiddleware(actionLogger, thunk)
);

export default taskStore;

