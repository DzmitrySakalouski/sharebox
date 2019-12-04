import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { trackReducer } from './reducers/trackReducer';
import { preloaderReducer } from './reducers/loaderReducer';
import logger from 'redux-logger';

const reducer = combineReducers({loader: preloaderReducer, track: trackReducer});

export const store = createStore(reducer, applyMiddleware(thunk, logger));