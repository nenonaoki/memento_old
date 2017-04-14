// @flow
import { LOCATION_CHANGE } from 'react-router-redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import _map from 'lodash/fp/map';
import * as headerActions from '../actions/header';

import * as accountEpics from './account';
import * as loginEpics from './login';
import * as passwordResetEpics from './passwordReset';
import * as newEmailEpics from './newEmail';
import * as mediumEpics from './medium';
import * as settingEpics from './setting';
import * as signupEpics from './signup';
import * as searchEpics from './search';
import * as tagEpics from './tag';
import * as userEpics from './user';

function blurElementEpic(action$) {
  return action$.ofType(LOCATION_CHANGE)
    .do(() => {
      document.activeElement.blur();
      window.scrollTo(0, 0);
    })
    .mapTo(headerActions.headerReset());
}

function focusSearchEpic(action$) {
  return action$.ofType(headerActions.HEADER_SEARCH_TOGGLE)
    .delay(100)
    .do(() => {
      if (document.searchForm) {
        document.searchForm.q.focus();
      }
    })
    .mergeMap(() =>
      Observable.empty()
    );
}

const curriedMap = _map(f => f); // Make array with only object properties
const epics = curriedMap({
  blurElementEpic,
  focusSearchEpic,
  ...accountEpics,
  ...passwordResetEpics,
  ...newEmailEpics,
  ...loginEpics,
  ...mediumEpics,
  ...settingEpics,
  ...signupEpics,
  ...searchEpics,
  ...tagEpics,
  ...userEpics,
});

export default combineEpics.apply(this, epics);
