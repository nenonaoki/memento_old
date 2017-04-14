// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import * as settingActions from '../../../actions/setting';

import Avatar from '../../atoms/avatar';
import Cover from '../../atoms/cover';

function mapStateToProps(state/* , ownProps */) {
  return {
    accountState: state.account,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(settingActions, dispatch);
}

type Props = {
  children: any,
  location: Object,
  accountState: Object,
  settingInit: Function,
};

class Setting extends Component {
  props: Props;

  componentWillMount() {
    const { accountState, settingInit } = this.props;

    settingInit(accountState);
  }
  render() {
    const {
      location,
      accountState,
    } = this.props;

    const isHome = location.pathname === '/setting';

    const menuClassNames = classnames({
      'col-sm-4': true,
      'hidden-xs': !isHome,
    });

    const contentsClassNames = classnames({
      'col-sm-8': true,
      'hidden-xs': isHome,
    });

    return (
      <div className="wrapper wrapper-content">
        <Helmet
          title="アカウント設定"
        />
        <div className="row">
          <div className={menuClassNames}>
            <div className="ibox">
              <div className="ibox-title">
                <h3>アカウント設定</h3>
              </div>
              <div className="ibox-content no-padding">
                <ul className="list-group">
                  <li className="list-group-item">
                    <h4 className="list-group-item-heading">Name</h4>
                    <div className="list-group-item-text">{accountState.payload.name}</div>
                  </li>
                  <li className="list-group-item">
                    <div className="pull-right">
                      <Link to="/setting/display_name" className="btn btn-sm btn-default">Edit</Link>
                    </div>
                    <h4 className="list-group-item-heading">Display Name</h4>
                    <div className="list-group-item-text">{accountState.payload.displayName}</div>
                  </li>
                  <li className="list-group-item">
                    <div className="pull-right">
                      <Link to="/setting/description" className="btn btn-sm btn-default">Edit</Link>
                    </div>
                    <h4 className="list-group-item-heading">Description</h4>
                    <div className="list-group-item-text" style={{ wordWrap: 'break-word' }}>
                      {accountState.payload.description.length > 0 ? accountState.payload.description : <span className="text-muted">No description</span>}
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="pull-right">
                      <Link to="/setting/email" className="btn btn-sm btn-default">Edit</Link>
                    </div>
                    <h4 className="list-group-item-heading">Email</h4>
                    <div className="list-group-item-text">{accountState.payload.email}</div>
                  </li>
                  <li className="list-group-item">
                    <div className="pull-right">
                      <Link to="/setting/password" className="btn btn-sm btn-default">Edit</Link>
                    </div>
                    <h4 className="list-group-item-heading">Password</h4>
                    <div className="list-group-item-text">**********</div>
                  </li>
                  <li className="list-group-item">
                    <div className="pull-right">
                      <Link to="/setting/avatar" className="btn btn-sm btn-default">Edit</Link>
                    </div>
                    <h4 className="list-group-item-heading">Avatar</h4>
                    <div className="list-group-item-text">
                      <Avatar image={accountState.payload.avatar} className="img-md" />
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="pull-right">
                      <Link to="/setting/cover" className="btn btn-sm btn-default">Edit</Link>
                    </div>
                    <h4 className="list-group-item-heading">Cover</h4>
                    <div className="list-group-item-text">
                      <Cover src={accountState.payload.cover.url} className="img-responsive" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={contentsClassNames}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);
