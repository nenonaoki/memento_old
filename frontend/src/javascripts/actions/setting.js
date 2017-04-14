// @flow
export const SETTING_INIT = 'SETTING_INIT';
export const SETTING_PUT = 'SETTING_PUT';
export const SETTING_PUT_SUCCEEDED = 'SETTING_PUT_SUCCEEDED';
export const SETTING_PUT_FAILED = 'SETTING_PUT_FAILED';
export const SETTING_PUT_ABORTED = 'SETTING_PUT_ABORTED';
export const SETTING_EMAIL_POST = 'SETTING_EMAIL_POST';
export const SETTING_EMAIL_POST_SUCCEEDED = 'SETTING_EMAIL_POST_SUCCEEDED';
export const SETTING_EMAIL_POST_FAILED = 'SETTING_EMAIL_POST_FAILED';
export const SETTING_EMAIL_POST_ABORTED = 'SETTING_EMAIL_POST_ABORTED';
export const SETTING_DISPLAY_NAME_INPUT = 'SETTING_DISPLAY_NAME_INPUT';
export const SETTING_DESCRIPTION_INPUT = 'SETTING_DESCRIPTION_INPUT';
export const SETTING_EMAIL_INPUT = 'SETTING_EMAIL_INPUT';
export const SETTING_PASSWORD_INPUT = 'SETTING_PASSWORD_INPUT';
export const SETTING_PASSWORDCONFIRMATION_INPUT = 'SETTING_PASSWORDCONFIRMATION_INPUT';
export const SETTING_AVATAR_INPUT = 'SETTING_AVATAR_INPUT';
export const SETTING_COVER_INPUT = 'SETTING_COVER_INPUT';

export function settingInit(param) {
  return {
    type: SETTING_INIT,
    param,
  };
}

export function settingPut(userName, param) {
  return {
    type: SETTING_PUT,
    userName,
    param,
  };
}

export function settingPutCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = SETTING_PUT_SUCCEEDED;
  } else {
    action.type = SETTING_PUT_FAILED;
  }
  return action;
}

export function settingPutAborted(error) {
  return {
    type: SETTING_PUT_ABORTED,
    error,
  };
}

export function settingEmailPost(param) {
  return {
    type: SETTING_EMAIL_POST,
    param,
  };
}

export function settingEmailPostCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = SETTING_EMAIL_POST_SUCCEEDED;
  } else {
    action.type = SETTING_EMAIL_POST_FAILED;
  }
  return action;
}

export function settingEmailPostAborted(error) {
  return {
    type: SETTING_EMAIL_POST_ABORTED,
    error,
  };
}

export function settingDisplayNameInput(value) {
  return {
    type: SETTING_DISPLAY_NAME_INPUT,
    value,
  };
}

export function settingDescriptionInput(value) {
  return {
    type: SETTING_DESCRIPTION_INPUT,
    value,
  };
}

export function settingEmailInput(value) {
  return {
    type: SETTING_EMAIL_INPUT,
    value,
  };
}

export function settingPasswordInput(value) {
  return {
    type: SETTING_PASSWORD_INPUT,
    value,
  };
}

export function settingPasswordConfirmationInput(value) {
  return {
    type: SETTING_PASSWORDCONFIRMATION_INPUT,
    value,
  };
}

export function settingAvatarInput(value) {
  return {
    type: SETTING_AVATAR_INPUT,
    value,
  };
}

export function settingCoverInput(value) {
  return {
    type: SETTING_COVER_INPUT,
    value,
  };
}
