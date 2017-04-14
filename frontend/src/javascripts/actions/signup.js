// @flow
export const SIGNUP_POST = 'SIGNUP_POST';
export const SIGNUP_POST_SUCCEEDED = 'SIGNUP_POST_SUCCEEDED';
export const SIGNUP_POST_FAILED = 'SIGNUP_POST_FAILED';
export const SIGNUP_POST_ABORTED = 'SIGNUP_POST_ABORTED';
export const SIGNUP_NAME_INPUT = 'SIGNUP_NAME_INPUT';
export const SIGNUP_EMAIL_INPUT = 'SIGNUP_EMAIL_INPUT';
export const SIGNUP_PASSWORD_INPUT = 'SIGNUP_PASSWORD_INPUT';
export const SIGNUP_PASSWORDCONFIRMATION_INPUT = 'SIGNUP_PASSWORDCONFIRMATION_INPUT';

export function signupPost(param) {
  return {
    type: SIGNUP_POST,
    param,
  };
}

export function signupPostCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = SIGNUP_POST_SUCCEEDED;
  } else {
    action.type = SIGNUP_POST_FAILED;
  }
  return action;
}

export function signupPostAborted(error) {
  return {
    type: SIGNUP_POST_ABORTED,
    error,
  };
}

export function signupNameInput(value) {
  return {
    type: SIGNUP_NAME_INPUT,
    value,
  };
}

export function signupEmailInput(value) {
  return {
    type: SIGNUP_EMAIL_INPUT,
    value,
  };
}

export function signupPasswordInput(value) {
  return {
    type: SIGNUP_PASSWORD_INPUT,
    value,
  };
}

export function signupPasswordConfirmationInput(value) {
  return {
    type: SIGNUP_PASSWORDCONFIRMATION_INPUT,
    value,
  };
}
