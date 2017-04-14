// @flow
import { fromJS } from 'immutable';
import * as searchActions from '../actions/search';

const defaultState = {
  query: '',
};

export function search(previousState = defaultState, action) {
  const state = fromJS(previousState);
  // let newState;

  switch (action.type) {
    case searchActions.SEARCH_QUERY_INPUT:
      return state.set('query', action.value).toJS();
    case searchActions.SEARCH_GET_SUCCEEDED:
      return state.merge(action.response).toJS();
    case searchActions.SEARCH_CLEAR:
      return defaultState;
    default:
      return previousState;
  }
}
