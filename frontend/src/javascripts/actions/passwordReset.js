// @flow
export const PASSWORD_RESET_EMAIL_POST = 'PASSWORD_RESET_EMAIL_POST';
export const PASSWORD_RESET_EMAIL_POST_SUCCEEDED = 'PASSWORD_RESET_EMAIL_POST_SUCCEEDED';
export const PASSWORD_RESET_EMAIL_POST_FAILED = 'PASSWORD_RESET_EMAIL_POST_FAILED';
export const PASSWORD_RESET_EMAIL_POST_ABORTED = 'PASSWORD_RESET_EMAIL_POST_ABORTED';
export const PASSWORD_RESET_PASSWORD_INIT = 'PASSWORD_RESET_PASSWORD_INIT';
export const PASSWORD_RESET_PASSWORD_POST = 'PASSWORD_RESET_PASSWORD_POST';
export const PASSWORD_RESET_PASSWORD_POST_SUCCEEDED = 'PASSWORD_RESET_PASSWORD_POST_SUCCEEDED';
export const PASSWORD_RESET_PASSWORD_POST_FAILED = 'PASSWORD_RESET_PASSWORD_POST_FAILED';
export const PASSWORD_RESET_PASSWORD_POST_ABORTED = 'PASSWORD_RESET_PASSWORD_POST_ABORTED';
export const PASSWORD_RESET_EMAIL_INPUT = 'PASSWORD_RESET_EMAIL_INPUT';
export const PASSWORD_RESET_PASSWORD_INPUT = 'PASSWORD_RESET_PASSWORD_INPUT';
export const PASSWORD_RESET_PASSWORDCONFIRMATION_INPUT = 'PASSWORD_RESET_PASSWORDCONFIRMATION_INPUT';

export function passwordResetEmailPost(param) {
  return {
    type: PASSWORD_RESET_EMAIL_POST,
    param,
  };
}

export function passwordResetEmailPostCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = PASSWORD_RESET_EMAIL_POST_SUCCEEDED;
  } else {
    action.type = PASSWORD_RESET_EMAIL_POST_FAILED;
  }
  return action;
}

export function passwordResetEmailPostAborted(error) {
  return {
    type: PASSWORD_RESET_EMAIL_POST_ABORTED,
    error,
  };
}

export function passwordResetPasswordInit(token, email) {
  return {
    type: PASSWORD_RESET_PASSWORD_INIT,
    token,
    email,
  };
}

export function passwordResetPasswordPost(param) {
  return {
    type: PASSWORD_RESET_PASSWORD_POST,
    param,
  };
}

export function passwordResetPasswordPostCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = PASSWORD_RESET_PASSWORD_POST_SUCCEEDED;
  } else {
    action.type = PASSWORD_RESET_PASSWORD_POST_FAILED;
  }
  return action;
}

export function passwordResetPasswordPostAborted(error) {
  return {
    type: PASSWORD_RESET_PASSWORD_POST_ABORTED,
    error,
  };
}

export function passwordResetEmailInput(value) {
  return {
    type: PASSWORD_RESET_EMAIL_INPUT,
    value,
  };
}

export function passwordResetPasswordInput(value) {
  return {
    type: PASSWORD_RESET_PASSWORD_INPUT,
    value,
  };
}

export function passwordResetPasswordConfirmationInput(value) {
  return {
    type: PASSWORD_RESET_PASSWORDCONFIRMATION_INPUT,
    value,
  };
}
