// @flow
export const SEARCH_CLEAR = 'SEARCH_CLEAR';
export const SEARCH_GET = 'SEARCH_GET';
export const SEARCH_GET_SUCCEEDED = 'SEARCH_GET_SUCCEEDED';
export const SEARCH_GET_FAILED = 'SEARCH_GET_FAILED';
export const SEARCH_GET_ABORTED = 'SEARCH_GET_ABORTED';
export const SEARCH_QUERY_INPUT = 'SEARCH_QUERY_INPUT';

export function searchClear() {
  return {
    type: SEARCH_CLEAR,
  };
}

export function searchGet(param) {
  return {
    type: SEARCH_GET,
    param,
  };
}

export function searchGetCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = SEARCH_GET_SUCCEEDED;
  } else {
    action.type = SEARCH_GET_FAILED;
  }
  return action;
}

export function searchGetAborted(error) {
  return {
    type: SEARCH_GET_ABORTED,
    error,
  };
}

export function searchQueryInput(value) {
  return {
    type: SEARCH_QUERY_INPUT,
    value,
  };
}
