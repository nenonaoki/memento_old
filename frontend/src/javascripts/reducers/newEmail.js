// @flow
import { fromJS } from 'immutable';
import * as newEmailActions from '../actions/newEmail';

const defaultState = {
  token: '',
  email: '',
  password: '',
};

export function newEmail(previousState = defaultState, action) {
  const state = fromJS(previousState);
  // let newState;

  switch (action.type) {
    case newEmailActions.NEW_EMAIL_PASSWORD_INIT:
      return state.merge({
        token: action.token,
        email: action.email,
      }).toJS();
    case newEmailActions.NEW_EMAIL_PASSWORD_INPUT:
      return state.set('password', action.value).toJS();
    case newEmailActions.NEW_EMAIL_PASSWORD_POST_SUCCEEDED:
      return defaultState;
    case newEmailActions.NEW_EMAIL_PASSWORD_POST_FAILED:
      return state.delete('errors').merge(action.response).toJS();
    default:
      return previousState;
  }
}
