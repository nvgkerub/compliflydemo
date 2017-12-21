import Thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from './reducers';

// const reducer = combineReducers(reducers);

const store = createStore(reducers, {}, applyMiddleware(Thunk));


export default store;
