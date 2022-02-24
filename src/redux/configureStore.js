import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import greetingsReducer from './greetings/data';

const reducer = combineReducers({
  greetings: greetingsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
