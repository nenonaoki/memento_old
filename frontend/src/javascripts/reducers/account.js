// @flow
import { fromJS } from 'immutable';
import * as accountActions from '../actions/account';
import * as settingActions from '../actions/setting';
import * as loginActions from '../actions/login';

const defaultState = {};

export function account(previousState = defaultState, action) {
  const state = fromJS(previousState);
  let newState;

  switch (action.type) {
    case 'INIT':
      return state.merge(action.props.account).toJS();
    case loginActions.LOGIN_POST_SUCCEEDED:
      return state.merge(action.response).toJS();
    case loginActions.LOGIN_DELETE_SUCCEEDED:
      return state.clear().toJS();
    case settingActions.SETTING_PUT_SUCCEEDED:
      return state.merge(action.response).toJS();
    case accountActions.ACCOUNT_MEDIA_GET_SUCCEEDED:
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
    case accountActions.ACCOUNT_MEDIA_CLEAR:
      return state.delete('media').toJS();
    default:
      return previousState;
  }
}
