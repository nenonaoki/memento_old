// @flow
import { fromJS } from 'immutable';
import * as headerActions from '../actions/header';
import * as loginActions from '../actions/login';

const defaultState = {
  search: false,
  account: false,
  menu: false,
};

export function header(previousState = defaultState, action) {
  const state = fromJS(previousState);

  switch (action.type) {
    case headerActions.HEADER_RESET:
    case loginActions.LOGIN_DELETE_SUCCEEDED:
      return defaultState;
    case headerActions.HEADER_ACCOUNT_TOGGLE:
      return state.merge({
        search: false,
        account: !state.get('account'),
        menu: false,
      }).toJS();
    case headerActions.HEADER_SEARCH_TOGGLE:
      return state.merge({
        search: !state.get('search'),
        account: false,
        menu: false,
      }).toJS();
    case headerActions.HEADER_MENU_TOGGLE:
      return state.merge({
        search: false,
        account: false,
        menu: !state.get('menu'),
      }).toJS();
    default:
      return previousState;
  }
}
