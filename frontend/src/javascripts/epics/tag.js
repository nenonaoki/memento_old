// @flow
import qs from 'qs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import * as tagActions from '../actions/tag';

/* TAG_GET */
const fetchTagGet = (slug, param) =>
  fetch(`/api/tags/${slug}?${qs.stringify(param)}`, {
    credentials: 'include',
  })
    .then(response =>
      response.json().then(json => ({
        ok: response.ok,
        status: response.status,
        body: json,
      })
    ));

export function tagGetEpic(action$) {
  return action$.ofType(tagActions.TAG_GET)
    .mergeMap(action =>
      Observable.from(fetchTagGet(action.slug, action.param))
        .map(tagActions.tagGetCompleted)
        .catch(tagActions.tagGetAborted)
    );
}
