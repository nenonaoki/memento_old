// @flow
import qs from 'qs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import * as accountActions from '../actions/account';

/* ACCOUNT_MEDIA_GET */
const fetchAccountMediaGet = (userName, param) =>
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

export function accountMediaGetEpic(action$) {
  return action$.ofType(accountActions.ACCOUNT_MEDIA_GET)
    .mergeMap(action =>
      Observable.from(fetchAccountMediaGet(action.userName, action.param))
        .map(accountActions.accountMediaGetCompleted)
        .catch(accountActions.accountMediaGetAborted)
    );
}
