// @flow
import { fromJS } from 'immutable';
import _now from 'lodash/now';
import * as notificationActions from '../actions/notification';

const defaultState = [];

export function notification(previousState = defaultState, action) {
  const state = fromJS(previousState);
  // let newState;

  switch (action.type) {
    case 'INIT':
      return state.merge(action.props.notification).toJS();
    case notificationActions.NOTIFICATION_OPEN:
      return state.push({
        type: action.messageType,
        title: action.title,
        message: action.message,
        timestamp: _now(),
      }).toJS();
    case notificationActions.NOTIFICATION_CLOSE:
      return state.delete(
        state.findIndex(item => item.get('timestamp') === action.timestamp)
      ).toJS();
    default:
      return previousState;
  }
}
