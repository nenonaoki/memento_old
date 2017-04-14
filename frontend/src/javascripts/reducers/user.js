// @flow
import { fromJS } from 'immutable';
import * as userActions from '../actions/user';

const defaultState = {};

export function user(previousState = defaultState, action) {
  const state = fromJS(previousState);
  let newState;

  switch (action.type) {
    case 'INIT':
      return state.merge(action.props.user).toJS();
    case userActions.USER_GET_SUCCEEDED:
      return state.merge(action.response).toJS();
    case userActions.USER_MEDIA_GET_SUCCEEDED:
      if (!state.has('media')) {
        newState = state.set('media', action.response);
      } else {
        newState = state.update('media', media =>
          media.mergeWith((prev, next, key) => {
            let newProp;
            switch (key) {
              case 'payload':
                if (prev.get(0).get('id') < next.get(0).get('id')) {
                  newProp = next.concat(prev);
                } else {
                  newProp = prev.concat(next);
                }
                break;
              case 'first_id':
                newProp = Math.max(prev, next);
                break;
              case 'last_id':
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
    case userActions.USER_CLEAR:
      return defaultState;
    default:
      return previousState;
  }
}
