// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import _has from 'lodash/has';

function mapStateToProps(state/* , ownProps */) {
  return {
    isLogin: _has(state.account, 'payload'),
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(routerActions, dispatch);
}

type Props = {
  children: any,
  router: Object,
  location: Object,
  isLogin: boolean,
};

class GuestOnly extends Component {
  props: Props;

  componentWillMount() {
    this.guestWillTransfer(this.props);
  }

  componentWillUpdate(nextProps) {
    this.guestWillTransfer(nextProps);
  }

  guestWillTransfer(props) {
    const {
      router,
      location,
      isLogin,
    } = props;

    if (isLogin) {
      const redirectPath = location.query.ref ? location.query.ref : '/';
      router.replace(redirectPath);
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestOnly);
