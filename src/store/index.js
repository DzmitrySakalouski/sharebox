import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { trackReducer } from './reducers/trackReducer';
import logger from 'redux-logger'

export const store = createStore(trackReducer, applyMiddleware(thunk, logger));