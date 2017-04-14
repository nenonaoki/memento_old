// @flow
// import { replace } from 'react-router-redux';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import * as notificationActions from '../actions/notification';
import * as passwordResetActions from '../actions/passwordReset';
import store from '../store';

/* PASSWORD_RESET_EMAIL_POST */
const fetchPasswordResetEmailPost = (param) => {
  const headers = new Headers();
  const formData = new FormData();

  headers.append('X-CSRF-Token', store.getState().csrf.token);
  formData.append('user[email]', param.email);

  return fetch('/api/password_resets', {
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

export function passwordResetEmailPostEpic(action$) {
  return action$.ofType(passwordResetActions.PASSWORD_RESET_EMAIL_POST)
    .mergeMap(action =>
      Observable.from(fetchPasswordResetEmailPost(action.param))
        .map(passwordResetActions.passwordResetEmailPostCompleted)
        .catch(passwordResetActions.passwordResetEmailPostAborted)
    );
}

export function passwordResetEmailPostSucceededEpic(action$) {
  return action$.ofType(passwordResetActions.PASSWORD_RESET_EMAIL_POST_SUCCEEDED)
    .map(() => (
      notificationActions.notificationOpen('success', 'パスワード再設定のメールをお送りしました。')
    ));
}

/* PASSWORD_RESET_PASSWORD_POST */
const fetchPasswordResetPasswordPost = (param) => {
  const headers = new Headers();
  const formData = new FormData();

  headers.append('X-CSRF-Token', store.getState().csrf.token);
  formData.append('_method', 'PUT');
  formData.append('email', param.email);
  formData.append('user[password]', param.password);
  formData.append('user[password_confirmation]', param.passwordConfirmation);

  return fetch(`/api/password_resets/${param.token}`, {
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

export function passwordResetPasswordPostEpic(action$) {
  return action$.ofType(passwordResetActions.PASSWORD_RESET_PASSWORD_POST)
    .mergeMap(action =>
      Observable.from(fetchPasswordResetPasswordPost(action.param))
        .map(passwordResetActions.passwordResetPasswordPostCompleted)
        .catch(passwordResetActions.passwordResetPasswordPostAborted)
    );
}

export function passwordResetPasswordPostSucceededEpic(action$) {
  return action$.ofType(passwordResetActions.PASSWORD_RESET_PASSWORD_POST_SUCCEEDED)
    .mergeMap(() => {
      window.location.href = '/account';
      return Observable.empty();
    });
}

// export function signupPostSucceededEpic(action$) {
//   return action$.ofType(signupActions.SIGNUP_POST_SUCCEEDED)
//     .mapTo(replace('/'));
// }
