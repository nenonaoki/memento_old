// @flow
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import _isNil from 'lodash/isNil'; // null or undefined
import * as settingActions from '../actions/setting';
import * as notificationActions from '../actions/notification';
import store from '../store';

/* SETTING_PUT */
const fetchSettingPut = (userName, param) => {
  const headers = new Headers();
  const formData = new FormData();

  headers.append('X-CSRF-Token', store.getState().csrf.token);
  formData.append('_method', 'PUT');
  if (!_isNil(param.displayName)) {
    formData.append('user[display_name]', param.displayName);
  }
  if (!_isNil(param.description)) {
    formData.append('user[description]', param.description);
  }
  if (!_isNil(param.avatar)) {
    formData.append('user[avatar]', param.avatar);
  }
  if (!_isNil(param.cover)) {
    formData.append('user[cover]', param.cover);
  }

  return fetch(`/api/users/${userName}`, {
    credentials: 'include',
    method: 'POST',
    headers,
    body: formData,
  })
    .then(response =>
      response.json().then(json => ({
        ok: response.ok,
        status: response.status,
        body: json,
      })
    ));
};

export function settingPutEpic(action$) {
  return action$.ofType(settingActions.SETTING_PUT)
    .mergeMap(action =>
      Observable.from(fetchSettingPut(action.userName, action.param))
        .map(settingActions.settingPutCompleted)
        .catch(settingActions.settingPutAborted)
    );
}

export function settingPutSucceededEpic(action$) {
  return action$.ofType(settingActions.SETTING_PUT_SUCCEEDED)
    .map(() => (
      notificationActions.notificationOpen('success', 'ユーザー情報を更新しました。')
    ));
}

/* SETTING_EMAIL_POST */
const fetchSettingEmailPost = (param) => {
  const headers = new Headers();
  const formData = new FormData();

  headers.append('X-CSRF-Token', store.getState().csrf.token);
  formData.append('user[email]', param.email);

  return fetch('/api/new_emails', {
    credentials: 'include',
    method: 'POST',
    headers,
    body: formData,
  })
    .then(response =>
      response.json().then(json => ({
        ok: response.ok,
        status: response.status,
        body: json,
      })
    ));
};

export function settingEmailPostEpic(action$) {
  return action$.ofType(settingActions.SETTING_EMAIL_POST)
    .mergeMap(action =>
      Observable.from(fetchSettingEmailPost(action.param))
        .map(settingActions.settingEmailPostCompleted)
        .catch(settingActions.settingEmailPostAborted)
    );
}

export function settingEmailPostSucceededEpic(action$) {
  return action$.ofType(settingActions.SETTING_EMAIL_POST_SUCCEEDED)
    .map(() => (
      notificationActions.notificationOpen('success', '新しいアドレスに確認メールを送信しました。')
    ));
}
