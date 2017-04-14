// @flow
export const USER_CLEAR = 'USER_CLEAR';
export const USER_GET = 'USER_GET';
export const USER_GET_SUCCEEDED = 'USER_GET_SUCCEEDED';
export const USER_GET_FAILED = 'USER_GET_FAILED';
export const USER_GET_ABORTED = 'USER_GET_ABORTED';
export const USER_MEDIA_GET = 'USER_MEDIA_GET';
export const USER_MEDIA_GET_SUCCEEDED = 'USER_MEDIA_GET_SUCCEEDED';
export const USER_MEDIA_GET_FAILED = 'USER_MEDIA_GET_FAILED';
export const USER_MEDIA_GET_ABORTED = 'USER_MEDIA_GET_ABORTED';

export function userClear() {
  return {
    type: USER_CLEAR,
  };
}

export function userGet(userName) {
  return {
    type: USER_GET,
    userName,
  };
}

export function userGetCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = USER_GET_SUCCEEDED;
  } else {
    action.type = USER_GET_FAILED;
  }
  return action;
}

export function userGetAborted(error) {
  return {
    type: USER_GET_ABORTED,
    error,
  };
}


export function userMediaGet(userName, param) {
  return {
    type: USER_MEDIA_GET,
    userName,
    param,
  };
}

export function userMediaGetCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = USER_MEDIA_GET_SUCCEEDED;
  } else {
    action.type = USER_MEDIA_GET_FAILED;
  }
  return action;
}

export function userMediaGetAborted(error) {
  return {
    type: USER_MEDIA_GET_ABORTED,
    error,
  };
}
