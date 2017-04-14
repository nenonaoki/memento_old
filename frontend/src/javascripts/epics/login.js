// @flow
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import * as loginActions from '../actions/login';
import store from '../store';

/* LOGIN_POST */
const fetchLoginPost = (param) => {
  const headers = new Headers();
  const formData = new FormData();

  headers.append('X-CSRF-Token', store.getState().csrf.token);
  formData.append('session[email]', param.email);
  formData.append('session[password]', param.password);
  formData.append('session[remember_me]', param.rememberMe);

  return fetch('/api/login', {
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

export function loginPostEpic(action$) {
  return action$.ofType(loginActions.LOGIN_POST)
    .mergeMap(action =>
      Observable.from(fetchLoginPost(action.param))
        .map(loginActions.loginPostCompleted)
        .catch(loginActions.loginPostAborted)
    );
}

/* LOGIN_DELETE */
const fetchLoginDelete = () => {
  const headers = new Headers();
  const formData = new FormData();

  headers.append('X-CSRF-Token', store.getState().csrf.token);
  formData.append('_method', 'delete');

  return fetch('/api/logout', {
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

export function loginDeleteEpic(action$) {
  return action$.ofType(loginActions.LOGIN_DELETE)
    .mergeMap(() =>
      Observable.from(fetchLoginDelete())
        .map(loginActions.loginDeleteCompleted)
        .catch(loginActions.loginDeleteAborted)
    );
}
