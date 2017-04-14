// @flow
import { fromJS } from 'immutable';
import * as settingActions from '../actions/setting';

const defualtState = {
  displayName: '',
  description: '',
  email: '',
  avatar: {},
  cover: {},
};

export function setting(previousState = defualtState, action) {
  const state = fromJS(previousState);
  // let newState;

  switch (action.type) {
    case 'INIT':
      return state.merge(action.props.setting).toJS();
    case settingActions.SETTING_INIT:
      return state.merge({
        displayName: action.param.payload.displayName,
        description: action.param.payload.description,
        email: action.param.payload.email,
        avatar: action.param.payload.avatar,
        cover: action.param.payload.cover,
      }).toJS();
    case settingActions.SETTING_DISPLAY_NAME_INPUT:
      return state.set('displayName', action.value).toJS();
    case settingActions.SETTING_DESCRIPTION_INPUT:
      return state.set('description', action.value).toJS();
    case settingActions.SETTING_EMAIL_INPUT:
      return state.set('email', action.value).toJS();
    case settingActions.SETTING_PASSWORD_INPUT:
      return state.set('password', action.value).toJS();
    case settingActions.SETTING_PASSWORDCONFIRMATION_INPUT:
      return state.set('passwordConfirmation', action.value).toJS();
    case settingActions.SETTING_AVATAR_INPUT:
      return state.setIn(['avatar', 'url'], action.value).toJS();
    case settingActions.SETTING_COVER_INPUT:
      return state.setIn(['cover', 'url'], action.value).toJS();
    case settingActions.SETTING_PUT_FAILED:
      return state.delete('errors').merge(action.response).toJS();
    case settingActions.SETTING_EMAIL_POST_SUCCEEDED:
      return state.deleteIn(['errors', 'email']).toJS();
    case settingActions.SETTING_EMAIL_POST_FAILED:
      return state.delete('errors').merge(action.response).toJS();
    default:
      return previousState;
  }
}
