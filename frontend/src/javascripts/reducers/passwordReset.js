// @flow
import { fromJS } from 'immutable';
import * as passwordResetActions from '../actions/passwordReset';

const defaultState = {
  token: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export function passwordReset(previousState = defaultState, action) {
  const state = fromJS(previousState);
  // let newState;

  switch (action.type) {
    case passwordResetActions.PASSWORD_RESET_EMAIL_POST_SUCCEEDED:
    case passwordResetActions.PASSWORD_RESET_PASSWORD_POST_SUCCEEDED:
      return defaultState;
    case passwordResetActions.PASSWORD_RESET_EMAIL_POST_FAILED:
    case passwordResetActions.PASSWORD_RESET_PASSWORD_POST_FAILED:
      return state.delete('errors').merge(action.response).toJS();
    case passwordResetActions.PASSWORD_RESET_EMAIL_INPUT:
      return state.set('email', action.value).toJS();
    case passwordResetActions.PASSWORD_RESET_PASSWORD_INIT:
      return state.merge({
        token: action.token,
        email: action.email,
      }).toJS();
    case passwordResetActions.PASSWORD_RESET_PASSWORD_INPUT:
      return state.set('password', action.value).toJS();
    case passwordResetActions.PASSWORD_RESET_PASSWORDCONFIRMATION_INPUT:
      return state.set('passwordConfirmation', action.value).toJS();
    default:
      return previousState;
  }
}
