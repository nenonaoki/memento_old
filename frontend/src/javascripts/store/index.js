// @flow
import { browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import createLogger from 'redux-logger';
import combinedReducer from '../reducers';
import combinedEpic from '../epics';

const reactRouterMiddleware = routerMiddleware(browserHistory);
const epicMiddleware = createEpicMiddleware(combinedEpic);
const loggerMiddleware = createLogger();

const middleware = [reactRouterMiddleware, epicMiddleware];
let devToolsExtension = f => f;

if (process.env.NODE_ENV === 'development') {
  middleware.push(loggerMiddleware);
  devToolsExtension = window.devToolsExtension ? window.devToolsExtension() : devToolsExtension;
}

function configureStore() {
  const store = createStore(
    combinedReducer,
    compose(
      applyMiddleware(...middleware),
      devToolsExtension,
    ),
  );

  return store;
}

const store = configureStore();

export default store;
