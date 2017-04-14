// @flow
import qs from 'qs';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { routerActions } from 'react-router-redux';
import _has from 'lodash/has';
import _assign from 'lodash/assign';
import * as headerActions from '../../actions/header';
import * as searchActions from '../../actions/search';
import * as loginActions from '../../actions/login';

import NavGuest from '../molecules/navGuest';
import NavUser from '../molecules/navUser';

function mapStateToProps(state/* , ownProps */) {
  return {
    accountState: state.account,
    headerState: state.header,
    searchState: state.search,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(_assign(
    routerActions,
    headerActions,
    searchActions,
    loginActions
  ), dispatch);
}

type Props = {
  push: Function,
  location: Object,
  accountState: Object,
  headerState: Object,
  headerReset: Function,
  headerSearchToggle: Function,
  headerAccountToggle: Function,
  headerMenuToggle: Function,
  searchState: Object,
  searchQueryInput: Function,
  loginDelete: Function,
};

const Header = (props: Props) => {
  const {
    push,
    location,
    accountState,
    headerState,
    headerReset,
    headerSearchToggle,
    headerAccountToggle,
    headerMenuToggle,
    searchState,
    searchQueryInput,
    loginDelete,
  } = props;

  const isLogin = _has(accountState, 'payload');

  const onClickMask = () =>
    headerReset();

  const onClickSearch = () =>
    headerSearchToggle();

  const onClickAccount = () =>
    headerAccountToggle();

  const onClickMenu = () =>
    headerMenuToggle();

  const onInputQuery = (e) =>
    searchQueryInput(e.target.value);

  const onSubmitSearch = (e) => {
    const param = {
      q: searchState.query,
    };
    push(`/search?${qs.stringify(param)}`);
    e.preventDefault();
  };

  const onClickLogout = () =>
    loginDelete();

  return (
    <div className="white-bg">
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="pull-left">
          <Link to="/" className="navbar-brand text-uppercase">Memento</Link>
        </div>
        {isLogin ? (
          <NavUser
            accountState={accountState}
            headerState={headerState}
            searchState={searchState}
            onSubmitSearch={onSubmitSearch}
            onClickSearch={onClickSearch}
            onClickAccount={onClickAccount}
            onClickMenu={onClickMenu}
            onInputQuery={onInputQuery}
            onClickLogout={onClickLogout}
          />
        ) : (
          <NavGuest
            location={location}
            headerState={headerState}
            searchState={searchState}
            onSubmitSearch={onSubmitSearch}
            onClickSearch={onClickSearch}
            onClickMenu={onClickMenu}
            onInputQuery={onInputQuery}
          />
        )}
      </nav>
      {(headerState.search || headerState.account || headerState.menu) && (
        <div onClick={onClickMask} className="mask animated fadeIn" />
      )}
    </div>
  );
};

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
