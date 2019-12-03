import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { trackReducer } from './reducers/trackReducer';

export const store = createStore(trackReducer, applyMiddleware(thunk));