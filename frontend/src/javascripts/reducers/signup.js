// @flow
import { fromJS } from 'immutable';
import * as signupActions from '../actions/signup';

const defaultState = {
  completed: false,
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export function signup(previousState = defaultState, action) {
  const state = fromJS(previousState);
  // let newState;

  switch (action.type) {
    case 'INIT':
      return state.merge(action.props.signup).toJS();
    case signupActions.SIGNUP_CLEAR:
      return defaultState;
    case signupActions.SIGNUP_POST_SUCCEEDED:
      return fromJS(defaultState).set('completed', true).toJS();
    case signupActions.SIGNUP_POST_FAILED:
      return state.delete('errors').merge(action.response).toJS();
    case signupActions.SIGNUP_NAME_INPUT:
      return state.set('name', action.value).toJS();
    case signupActions.SIGNUP_EMAIL_INPUT:
      return state.set('email', action.value).toJS();
    case signupActions.SIGNUP_PASSWORD_INPUT:
      return state.set('password', action.value).toJS();
    case signupActions.SIGNUP_PASSWORDCONFIRMATION_INPUT:
      return state.set('passwordConfirmation', action.value).toJS();
    default:
      return previousState;
  }
}
