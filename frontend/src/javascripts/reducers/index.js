// @flow
import { fromJS } from 'immutable';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as header from './header';
import * as notification from './notification';
import * as home from './home';
import * as login from './login';
import * as signup from './signup';
import * as passwordReset from './passwordReset';
import * as newEmail from './newEmail';
import * as account from './account';
import * as setting from './setting';
import * as user from './user';
import * as search from './search';
import * as tag from './tag';
import * as medium from './medium';

function csrf(previousState = {}, action) {
  const state = fromJS(previousState);

  switch (action.type) {
    case 'INIT':
      return state.merge(action.props.csrf).toJS();
    default:
      return previousState;
  }
}

export default combineReducers({
  csrf,
  ...header,
  ...notification,
  ...home,
  ...login,
  ...signup,
  ...passwordReset,
  ...newEmail,
  ...account,
  ...setting,
  ...user,
  ...search,
  ...tag,
  ...medium,
  routing: routerReducer,
});
