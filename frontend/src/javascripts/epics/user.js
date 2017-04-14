// @flow
import qs from 'qs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import * as userActions from '../actions/user';

/* USER_GET */
const fetchUserGet = (userName) =>
  fetch(`/api/users/${userName}`, {
    credentials: 'include',
  })
    .then(response =>
      response.json().then(json => ({
        ok: response.ok,
        status: response.status,
        body: json,
      })
    ));

export function userGetEpic(action$) {
  return action$.ofType(userActions.USER_GET)
    .mergeMap(action =>
      Observable.from(fetchUserGet(action.userName))
        .map(userActions.userGetCompleted)
        .catch(userActions.userGetAborted)
    );
}

/* USER_MEDIA_GET */
const fetchUserMediaGet = (userName, param) =>
  fetch(`/api/users/${userName}/history?${qs.stringify(param)}`, {
    credentials: 'include',
  })
    .then(response =>
      response.json().then(json => ({
        ok: response.ok,
        status: response.status,
        body: json,
      })
    ));

export function userMediaGetEpic(action$) {
  return action$.ofType(userActions.USER_MEDIA_GET)
    .mergeMap(action =>
      Observable.from(fetchUserMediaGet(action.userName, action.param))
        .map(userActions.userMediaGetCompleted)
        .catch(userActions.userMediaGetAborted)
    );
}
