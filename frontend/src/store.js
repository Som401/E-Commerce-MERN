import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers will be imported here as we build them

const reducer = combineReducers({
    // Reducers will be added in upcoming stories
});

let initialState = {
    // Initial state will be configured as we add features
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
