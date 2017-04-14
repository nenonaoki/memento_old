// @flow
import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as notificationActions from '../../actions/notification';

import Notifier from '../molecules/notifier';

function mapStateToProps(state/* , ownProps */) {
  return {
    notificationState: state.notification,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(notificationActions, dispatch);
}

type Props = {
  notificationState: Array<Object>,
  notificationClose: Function,
};

const Notification = (props: Props) => (
  <CSSTransitionGroup
    id="toast-container"
    className="toast-bottom-full-width"
    component="div"
    transitionName={{
      appear: 'fadeIn',
      enter: 'fadeIn',
      leave: 'fadeOut',
    }}
    transitionAppear={true}
    transitionAppearTimeout={1000}
    transitionEnterTimeout={1000}
    transitionLeaveTimeout={1000}
  >
  {props.notificationState.map(item => (
    <Notifier
      key={item.timestamp}
      type={item.type}
      title={item.title}
      message={item.message}
      onClose={() => props.notificationClose(item.timestamp)}
    />
  ))}
  </CSSTransitionGroup>
);


// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
