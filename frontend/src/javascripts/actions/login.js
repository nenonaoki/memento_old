// @flow
export const LOGIN_POST = 'LOGIN_POST';
export const LOGIN_POST_SUCCEEDED = 'LOGIN_POST_SUCCEEDED';
export const LOGIN_POST_FAILED = 'LOGIN_POST_FAILED';
export const LOGIN_POST_ABORTED = 'LOGIN_POST_ABORTED';
export const LOGIN_DELETE = 'LOGIN_DELETE';
export const LOGIN_DELETE_SUCCEEDED = 'LOGIN_DELETE_SUCCEEDED';
export const LOGIN_DELETE_FAILED = 'LOGIN_DELETE_FAILED';
export const LOGIN_DELETE_ABORTED = 'LOGIN_DELETE_ABORTED';
export const LOGIN_EMAIL_INPUT = 'LOGIN_EMAIL_INPUT';
export const LOGIN_PASSWORD_INPUT = 'LOGIN_PASSWORD_INPUT';
export const LOGIN_REMEMBERME_CHECK = 'LOGIN_REMEMBERME_CHECK';

export function loginPost(param) {
  return {
    type: LOGIN_POST,
    param,
  };
}

export function loginPostCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = LOGIN_POST_SUCCEEDED;
  } else {
    action.type = LOGIN_POST_FAILED;
  }
  return action;
}

export function loginPostAborted(error) {
  return {
    type: LOGIN_POST_ABORTED,
    error,
  };
}

export function loginDelete() {
  return {
    type: LOGIN_DELETE,
  };
}

export function loginDeleteCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = LOGIN_DELETE_SUCCEEDED;
  } else {
    action.type = LOGIN_DELETE_FAILED;
  }
  return action;
}

export function loginDeleteAborted(error) {
  return {
    type: LOGIN_DELETE_ABORTED,
    error,
  };
}

export function loginEmailInput(value) {
  return {
    type: LOGIN_EMAIL_INPUT,
    value,
  };
}

export function loginPasswordInput(value) {
  return {
    type: LOGIN_PASSWORD_INPUT,
    value,
  };
}

export function loginRememberMeCheck(value) {
  return {
    type: LOGIN_REMEMBERME_CHECK,
    value,
  };
}
