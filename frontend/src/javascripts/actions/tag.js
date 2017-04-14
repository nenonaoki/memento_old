// @flow
export const TAG_CLEAR = 'TAG_CLEAR';
export const TAG_GET = 'TAG_GET';
export const TAG_GET_SUCCEEDED = 'TAG_GET_SUCCEEDED';
export const TAG_GET_FAILED = 'TAG_GET_FAILED';
export const TAG_GET_ABORTED = 'TAG_GET_ABORTED';

export function tagClear() {
  return {
    type: TAG_CLEAR,
  };
}

export function tagGet(slug, param) {
  return {
    type: TAG_GET,
    slug,
    param,
  };
}

export function tagGetCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = TAG_GET_SUCCEEDED;
  } else {
    action.type = TAG_GET_FAILED;
  }
  return action;
}

export function tagGetAborted(error) {
  return {
    type: TAG_GET_ABORTED,
    error,
  };
}
