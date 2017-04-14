// @flow
import qs from 'qs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import * as searchActions from '../actions/search';

/* SEARCH_GET */
const fetchSearchGet = (param) =>
  fetch(`/api/search?${qs.stringify(param)}`, {
    credentials: 'include',
  })
    .then(response =>
      response.json().then(json => ({
        ok: response.ok,
        status: response.status,
        body: json,
      })
    ));

export function searchGetEpic(action$) {
  return action$.ofType(searchActions.SEARCH_GET)
    .mergeMap(action =>
      Observable.from(fetchSearchGet(action.param))
        .map(searchActions.searchGetCompleted)
        .catch(searchActions.searchGetAborted)
    );
}
