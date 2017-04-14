// @flow
export const NOTIFICATION_OPEN = 'NOTIFICATION_OPEN';
export const NOTIFICATION_CLOSE = 'NOTIFICATION_CLOSE';

export function notificationOpen(messageType, message, title) {
  return {
    type: NOTIFICATION_OPEN,
    title,
    message,
    messageType,
  };
}

export function notificationClose(timestamp) {
  return {
    type: NOTIFICATION_CLOSE,
    timestamp,
  };
}
