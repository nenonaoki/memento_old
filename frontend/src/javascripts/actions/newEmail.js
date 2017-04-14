// @flow
export const NEW_EMAIL_PASSWORD_INIT = 'NEW_EMAIL_PASSWORD_INIT';
export const NEW_EMAIL_PASSWORD_INPUT = 'NEW_EMAIL_PASSWORD_INPUT';
export const NEW_EMAIL_PASSWORD_POST = 'NEW_EMAIL_PASSWORD_POST';
export const NEW_EMAIL_PASSWORD_POST_SUCCEEDED = 'NEW_EMAIL_PASSWORD_POST_SUCCEEDED';
export const NEW_EMAIL_PASSWORD_POST_FAILED = 'NEW_EMAIL_PASSWORD_POST_FAILED';
export const NEW_EMAIL_PASSWORD_ABORTED = 'NEW_EMAIL_PASSWORD_ABORTED';

export function newEmailPasswordInit(token, email) {
  return {
    type: NEW_EMAIL_PASSWORD_INIT,
    token,
    email,
  };
}

export function newEmailPasswordInput(value) {
  return {
    type: NEW_EMAIL_PASSWORD_INPUT,
    value,
  };
}

export function newEmailPasswordPost(param) {
  return {
    type: NEW_EMAIL_PASSWORD_POST,
    param,
  };
}

export function newEmailPasswordPostCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = NEW_EMAIL_PASSWORD_POST_SUCCEEDED;
  } else {
    action.type = NEW_EMAIL_PASSWORD_POST_FAILED;
  }
  return action;
}

export function newEmailPasswordPostAborted(error) {
  return {
    type: NEW_EMAIL_PASSWORD_ABORTED,
    error,
  };
}
