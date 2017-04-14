// @flow
// import { replace } from 'react-router-redux';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import * as signupActions from '../actions/signup';
import store from '../store';

/* SIGNUP_POST */
const fetchSignupPost = (param) => {
  const headers = new Headers();
  const formData = new FormData();

  headers.append('X-CSRF-Token', store.getState().csrf.token);
  formData.append('user[name]', param.name);
  formData.append('user[display_name]', param.name);
  formData.append('user[email]', param.email);
  formData.append('user[password]', param.password);
  formData.append('user[password_confirmation]', param.passwordConfirmation);

  return fetch('/api/users', {
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

export function signupPostEpic(action$) {
  return action$.ofType(signupActions.SIGNUP_POST)
    .mergeMap(action =>
      Observable.from(fetchSignupPost(action.param))
        .map(signupActions.signupPostCompleted)
        .catch(signupActions.signupPostAborted)
    );
}

// export function signupPostSucceededEpic(action$) {
//   return action$.ofType(signupActions.SIGNUP_POST_SUCCEEDED)
//     .mapTo(replace('/'));
// }
