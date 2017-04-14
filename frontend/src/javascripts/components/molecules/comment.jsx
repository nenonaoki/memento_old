// @flow
import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import Avatar from '../atoms/avatar';

type Props = {
  user: {
    name: string,
    displayName: string,
    avatar: {
      url: string,
    }
  },
  isMine: boolean,
  message: string,
  createdAt: string,
};

const Comment = (props: Props) => {
  const commentClassNames = classnames({
    'chat-message': true,
    left: !props.isMine,
    right: props.isMine,
  });

  return (
    <div className={commentClassNames}>
      <Avatar
        src={props.user.avatar.url}
        className="message-avatar"
      />
      <div className="message">
        <Link className="message-author" to={`/users/${props.user.name}`}>
          {props.user.displayName}
        </Link>
        <small className="text-muted m-l-xs">@{props.user.name}</small>
        <span className="message-date">{props.createdAt}前</span>
        <span className="message-content">{props.message}</span>
      </div>
    </div>
  );
};

export default Comment;
