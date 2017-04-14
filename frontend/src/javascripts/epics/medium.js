// @flow
import qs from 'qs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import * as mediumActions from '../actions/medium';
import * as notificationActions from '../actions/notification';
import store from '../store';

/* MEDIUM_GET */
const fetchMediumGet = (token) =>
  fetch(`/api/media/${token}`, { credentials: 'include' })
    .then(response =>
      response.json().then(json => ({
        ok: response.ok,
        status: response.status,
        body: json,
      })
    ));

export function mediumGetEpic(action$) {
  return action$.ofType(mediumActions.MEDIUM_GET)
    .mergeMap(action =>
      Observable.from(fetchMediumGet(action.token))
        .map(mediumActions.mediumGetCompleted)
        .catch(mediumActions.mediumGetAborted)
    );
}

/* MEDIUM_COMMENTS_GET */
const fetchMediumCommentsGet = (token, param) =>
  fetch(`/api/media/${token}/comments?${qs.stringify(param)}`, {
    credentials: 'include',
  })
    .then(response =>
      response.json().then(json => ({
        ok: response.ok,
        status: response.status,
        body: json,
      })
    ));

export function mediumCommentsGetEpic(action$) {
  return action$.ofType(mediumActions.MEDIUM_COMMENTS_GET)
    .mergeMap(action =>
      Observable.from(fetchMediumCommentsGet(action.token, action.param))
        .map(mediumActions.mediumCommentsGetCompleted)
        .catch(mediumActions.mediumCommentsGetAborted)
    );
}

/* MEDIUM_COMMENT_POST */
const fetchMediumCommentPost = (token, param) => {
  const state = store.getState();
  const headers = new Headers();
  const formData = new FormData();

  headers.append('X-CSRF-Token', state.csrf.token);
  formData.append('comment[content]', param.content);
  formData.append('comment[medium_id]', state.medium.payload.id);

  return fetch(`/api/media/${token}/comments`, {
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

export function mediumCommentPostEpic(action$) {
  return action$.ofType(mediumActions.MEDIUM_COMMENT_POST)
    .mergeMap(action =>
      Observable.from(fetchMediumCommentPost(action.token, action.param))
        .map(mediumActions.mediumCommentPostCompleted)
        .catch(mediumActions.mediumCommentPostAborted)
    );
}

export function mediumCommentPostSucceededEpic(action$) {
  return action$.ofType(mediumActions.MEDIUM_COMMENT_POST_SUCCEEDED)
    .map(() => {
      const state = store.getState();

      return mediumActions.mediumCommentsGet(state.medium.payload.token, {
        first_id: state.medium.comments.firstId,
      });
    });
}

/* MEDIUM_TICKET_CHECK_IN */
const fetchMediumTicketCheckIn = (token, param) => {
  const headers = new Headers();
  const formData = new FormData();

  headers.append('X-CSRF-Token', store.getState().csrf.token);
  formData.append('serial', param.serial.replace(/\s/g, ''));

  return fetch(`/api/media/${token}/check_in`, {
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

export function mediumTicketCheckInEpic(action$) {
  return action$.ofType(mediumActions.MEDIUM_TICKET_CHECK_IN)
    .mergeMap(action =>
      Observable.from(fetchMediumTicketCheckIn(action.token, action.param))
        .map(mediumActions.mediumTicketCheckInCompleted)
        .catch(mediumActions.mediumTicketCheckInAborted)
    );
}

export function mediumTicketCheckInSucceededEpic(action$) {
  return action$.ofType(mediumActions.MEDIUM_TICKET_CHECK_IN_SUCCEEDED)
    .map(() => (
      notificationActions.notificationOpen('success', 'チェックインしました。')
    ));
}

export function mediumTicketCheckInFailedEpic(action$) {
  return action$.ofType(mediumActions.MEDIUM_TICKET_CHECK_IN_FAILED)
    .map(() => (
      notificationActions.notificationOpen('error', 'チェックインできませんでした。シリアルコードを確認してください。')
    ));
}
