// @flow
export const ACCOUNT_MEDIA_CLEAR = 'ACCOUNT_MEDIA_CLEAR';
export const ACCOUNT_MEDIA_GET = 'ACCOUNT_MEDIA_GET';
export const ACCOUNT_MEDIA_GET_SUCCEEDED = 'ACCOUNT_MEDIA_GET_SUCCEEDED';
export const ACCOUNT_MEDIA_GET_FAILED = 'ACCOUNT_MEDIA_GET_FAILED';
export const ACCOUNT_MEDIA_GET_ABORTED = 'ACCOUNT_MEDIA_GET_ABORTED';

export function accountMediaClear() {
  return {
    type: ACCOUNT_MEDIA_CLEAR,
  };
}

export function accountMediaGet(userName, param) {
  return {
    type: ACCOUNT_MEDIA_GET,
    userName,
    param,
  };
}

export function accountMediaGetCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = ACCOUNT_MEDIA_GET_SUCCEEDED;
  } else {
    action.type = ACCOUNT_MEDIA_GET_FAILED;
  }
  return action;
}

export function accountMediaGetAborted(error) {
  return {
    type: ACCOUNT_MEDIA_GET_ABORTED,
    error,
  };
}
