// @flow
import { fromJS } from 'immutable';
import * as mediumActions from '../actions/medium';
import _filter from 'lodash/filter';
import _chunk from 'lodash/chunk';

const defaultState = {
  content: '',
  serial: '',
};

const convertSerial: string = serial => {
  const half: string = serial.replace(/[ａ-ｚＡ-Ｚ０-９]/g, char =>
    String.fromCharCode(char.charCodeAt(0) - 0xFEE0)
  );
  const filtered: Array = _filter(half.toUpperCase(), char => /[a-zA-Z\d]/.test(char));
  const chunked: Array = _chunk(filtered, 4).map(chunk => chunk.join(''));
  return chunked.join(' ').substr(0, 19);
};

export function medium(previousState = defaultState, action) {
  const state = fromJS(previousState);
  let newState;

  switch (action.type) {
    case 'INIT':
      return state.merge(action.props.medium).toJS();
    case mediumActions.MEDIUM_GET_SUCCEEDED:
      return state.merge(action.response).toJS();
    case mediumActions.MEDIUM_COMMENTS_GET_SUCCEEDED:
      if (!state.has('comments')) {
        newState = state.set('comments', action.response);
      } else {
        newState = state.update('comments', comments =>
          comments.mergeWith((prev, next, key) => {
            let newProp;
            switch (key) {
              case 'payload':
                if (prev.get(0).get('id') < next.get(0).get('id')) {
                  newProp = next.concat(prev);
                } else {
                  newProp = prev.concat(next);
                }
                break;
              case 'firstId':
                newProp = Math.max(prev, next);
                break;
              case 'lastId':
                newProp = Math.min(prev, next);
                break;
              default:
                newProp = next;
            }
            return newProp;
          }, action.response)
        );
      }
      return newState.toJS();
    case mediumActions.MEDIUM_TICKET_CHECK_IN_SUCCEEDED:
      return state.mergeDeep(action.response).toJS();
    case mediumActions.MEDIUM_CLEAR:
      return defaultState;
    case mediumActions.MEDIUM_CONTENT_INPUT:
      return state.set('content', action.value).toJS();
    case mediumActions.MEDIUM_SERIAL_INPUT:
      return state.set('serial', convertSerial(action.value)).toJS();
    default:
      return previousState;
  }
}
