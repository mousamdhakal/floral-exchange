import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga'

import reducer from './reducers';

import rootSaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(sagaMiddleware)));

// run the saga
sagaMiddleware.run(rootSaga)

export default store;
