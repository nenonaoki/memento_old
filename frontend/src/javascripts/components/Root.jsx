// @flow
import 'babel-polyfill';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from '../store';
import Routes from './Routes';

function isServer() {
  return !(typeof window !== 'undefined' && window.document);
}

type Props = {
  path: string,
};

export default class Root extends Component {
  props: Props;

  componentWillMount() {
    store.dispatch({
      type: 'INIT',
      props: this.props,
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Router
          routes={Routes}
          history={(isServer() ?
            createMemoryHistory(this.props.path) : syncHistoryWithStore(browserHistory, store))}
        />
      </Provider>
    );
  }
}
