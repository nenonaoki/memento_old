// @flow
export const MEDIUM_CLEAR = 'MEDIUM_CLEAR';
export const MEDIUM_GET = 'MEDIUM_GET';
export const MEDIUM_GET_SUCCEEDED = 'MEDIUM_GET_SUCCEEDED';
export const MEDIUM_GET_FAILED = 'MEDIUM_GET_FAILED';
export const MEDIUM_GET_ABORTED = 'MEDIUM_GET_ABORTED';
export const MEDIUM_COMMENTS_GET = 'MEDIUM_COMMENTS_GET';
export const MEDIUM_COMMENTS_GET_SUCCEEDED = 'MEDIUM_COMMENTS_GET_SUCCEEDED';
export const MEDIUM_COMMENTS_GET_FAILED = 'MEDIUM_COMMENTS_GET_FAILED';
export const MEDIUM_COMMENTS_GET_ABORTED = 'MEDIUM_COMMENTS_GET_ABORTED';
export const MEDIUM_COMMENT_POST = 'MEDIUM_COMMENT_POST';
export const MEDIUM_COMMENT_POST_SUCCEEDED = 'MEDIUM_COMMENT_POST_SUCCEEDED';
export const MEDIUM_COMMENT_POST_FAILED = 'MEDIUM_COMMENT_POST_FAILED';
export const MEDIUM_COMMENT_POST_ABORTED = 'MEDIUM_COMMENT_POST_ABORTED';
export const MEDIUM_COMMENT_DELETE = 'MEDIUM_COMMENT_DELETE';
export const MEDIUM_TICKET_CHECK_IN = 'MEDIUM_TICKET_CHECK_IN';
export const MEDIUM_TICKET_CHECK_IN_SUCCEEDED = 'MEDIUM_TICKET_CHECK_IN_SUCCEEDED';
export const MEDIUM_TICKET_CHECK_IN_FAILED = 'MEDIUM_TICKET_CHECK_IN_FAILED';
export const MEDIUM_TICKET_CHECK_IN_ABORTED = 'MEDIUM_TICKET_CHECK_IN_ABORTED';
export const MEDIUM_CONTENT_INPUT = 'MEDIUM_CONTENT_INPUT';
export const MEDIUM_SERIAL_INPUT = 'MEDIUM_SERIAL_INPUT';

export function mediumClear() {
  return {
    type: MEDIUM_CLEAR,
  };
}

export function mediumGet(token) {
  return {
    type: MEDIUM_GET,
    token,
  };
}

export function mediumGetCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = MEDIUM_GET_SUCCEEDED;
  } else {
    action.type = MEDIUM_GET_FAILED;
  }
  return action;
}

export function mediumGetAborted(error) {
  return {
    type: MEDIUM_GET_ABORTED,
    error,
  };
}

export function mediumCommentsGet(token, param) {
  return {
    type: MEDIUM_COMMENTS_GET,
    token,
    param,
  };
}

export function mediumCommentsGetCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = MEDIUM_COMMENTS_GET_SUCCEEDED;
  } else {
    action.type = MEDIUM_COMMENTS_GET_FAILED;
  }
  return action;
}

export function mediumCommentsGetAborted(error) {
  return {
    type: MEDIUM_COMMENTS_GET_ABORTED,
    error,
  };
}

export function mediumCommentPost(token, param) {
  return {
    type: MEDIUM_COMMENT_POST,
    token,
    param,
  };
}

export function mediumCommentPostCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = MEDIUM_COMMENT_POST_SUCCEEDED;
  } else {
    action.type = MEDIUM_COMMENT_POST_FAILED;
  }
  return action;
}

export function mediumCommentPostAborted(error) {
  return {
    type: MEDIUM_COMMENT_POST_ABORTED,
    error,
  };
}

export function mediumCommentDelete(token, id) {
  return {
    type: MEDIUM_COMMENT_DELETE,
    token,
    id,
  };
}

export function mediumTicketCheckIn(token, param) {
  return {
    type: MEDIUM_TICKET_CHECK_IN,
    token,
    param,
  };
}

export function mediumTicketCheckInCompleted(response) {
  const action = {
    response: response.body,
  };

  if (response.ok) {
    action.type = MEDIUM_TICKET_CHECK_IN_SUCCEEDED;
  } else {
    action.type = MEDIUM_TICKET_CHECK_IN_FAILED;
  }
  return action;
}

export function mediumTicketCheckInAborted(error) {
  return {
    type: MEDIUM_TICKET_CHECK_IN_ABORTED,
    error,
  };
}

export function mediumContentInput(value) {
  return {
    type: MEDIUM_CONTENT_INPUT,
    value,
  };
}

export function mediumSerialInput(value) {
  return {
    type: MEDIUM_SERIAL_INPUT,
    value,
  };
}
