// @flow
import { fromJS } from 'immutable';
import * as loginActions from '../actions/login';

const defaultState = {
  email: '',
  password: '',
  rememberMe: true,
};

export function login(previousState = defaultState, action) {
  const state = fromJS(previousState);

  switch (action.type) {
    case 'INIT':
      return state.merge(action.props.login).toJS();
    case loginActions.LOGIN_POST_SUCCEEDED:
      return defaultState;
    case loginActions.LOGIN_POST_FAILED:
      return state.delete('errors').merge(action.response).toJS();
    case loginActions.LOGIN_EMAIL_INPUT:
      return state.set('email', action.value).toJS();
    case loginActions.LOGIN_PASSWORD_INPUT:
      return state.set('password', action.value).toJS();
    case loginActions.LOGIN_REMEMBERME_CHECK:
      return state.set('rememberMe', action.value).toJS();
    default:
      return previousState;
  }
}
