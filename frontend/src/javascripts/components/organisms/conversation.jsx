// @flow
import React, { Component } from 'react';
import _has from 'lodash/has';

import Comment from '../molecules/comment';

type Props = {
  accountState: Object,
  mediumState: Object,
  onRequestComments: Function,
  onSubmitComment: Function,
  onInputComment: Function,
};

class Conversation extends Component {
  props: Props;

  componentWillMount() {
    this.props.onRequestComments();
  }

  render() {
    const {
      accountState,
      mediumState,
      onRequestComments,
      onSubmitComment,
      onInputComment,
    } = this.props;

    const isLogin = _has(accountState, 'payload');
    const comments = mediumState.comments;

    return (
      <div className="ibox">
        <div className="ibox-title">
          <h5>Comments ({comments ? comments.count : '0'})</h5>
        </div>
        <div>
          {mediumState.payload && mediumState.payload.checked_in && (
            <form onSubmit={onSubmitComment}>
              <div className="row no-margins">
                <div className="col-xs-10 no-padding">
                  <textarea
                    className="form-control"
                    onInput={onInputComment}
                    value={mediumState.content}
                    name="comment[content]"
                    placeholder="Enter comment"
                  />
                </div>
                <div className="col-xs-2 no-padding">
                  <button
                    className="btn btn-primary btn-block p-h-sm b-r-xs"
                    type="submit"
                    disabled={(
                      mediumState.content.length === 0 ||
                      mediumState.content.length > 100
                    )}
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>)
          }
          <div className="chat-discussion">
            {comments && comments.payload.map(comment => {
              let isMine = false;

              if (isLogin) {
                isMine = accountState.payload.displayName === comment.user.displayName;
              }
              return (
                <Comment
                  key={comment.id}
                  user={comment.user}
                  message={comment.content}
                  createdAt={comment.createdAt}
                  isMine={isMine}
                />);
            })}
            {(() => {
              if (comments) {
                if (comments.count !== comments.payload.length) {
                  return (
                    <button
                      onClick={onRequestComments}
                      className="btn btn-default btn-block m-t"
                    >
                      <i className="fa fa-arrow-down"></i> Show More
                    </button>
                  );
                }
              }
              return '';
            })()}
          </div>
        </div>
      </div>
    );
  }
}

export default Conversation;
