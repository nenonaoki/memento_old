// @flow
// import { replace } from 'react-router-redux';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import * as newEmailActions from '../actions/newEmail';
import store from '../store';

/* NEW_EMAIL_PASSWORD_POST */
const fetchNewEmailPasswordPost = (param) => {
  const headers = new Headers();
  const formData = new FormData();

  headers.append('X-CSRF-Token', store.getState().csrf.token);
  formData.append('_method', 'PUT');
  formData.append('email', param.email);
  formData.append('user[password]', param.password);

  return fetch(`/api/new_emails/${param.token}`, {
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

export function newEmailPasswordPostEpic(action$) {
  return action$.ofType(newEmailActions.NEW_EMAIL_PASSWORD_POST)
    .mergeMap(action =>
      Observable.from(fetchNewEmailPasswordPost(action.param))
        .map(newEmailActions.newEmailPasswordPostCompleted)
        .catch(newEmailActions.newEmailPasswordPostAborted)
    );
}

export function newEmailPasswordPostSucceededEpic(action$) {
  return action$.ofType(newEmailActions.NEW_EMAIL_PASSWORD_POST_SUCCEEDED)
    .mergeMap(() => {
      window.location.href = '/setting';
      return Observable.empty();
    });
}
