// @flow
import { fromJS } from 'immutable';
import * as tagActions from '../actions/tag';

const defaultState = {};

export function tag(previousState = defaultState, action) {
  const state = fromJS(previousState);
  // let newState;

  switch (action.type) {
    case 'INIT':
      return state.merge(action.props.tag).toJS();
    case tagActions.TAG_GET_SUCCEEDED:
      return action.response;
    case tagActions.TAG_CLEAR:
      return state.clear().toJS();
    default:
      return previousState;
  }
}
