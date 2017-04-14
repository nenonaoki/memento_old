// @flow
import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import Avatar from '../atoms/avatar';

type Props = {
  accountState: Object,
  headerState: Object,
  searchState: Object,
  onSubmitSearch: Function,
  onClickSearch: Function,
  onClickAccount: Function,
  onClickMenu: Function,
  onInputQuery: Function,
  onClickLogout: Function,
};

const NavUser = (props: Props) => {
  const {
    accountState,
    headerState,
    searchState,
    onSubmitSearch,
    onClickSearch,
    onClickAccount,
    onClickMenu,
    onInputQuery,
    onClickLogout,
  } = props;

  const dropdpwnClassNames = classnames({
    'nav-collapse': true,
    opened: (headerState.search || headerState.account || headerState.menu),
  });

  return (
    <div>
      <ul className="nav navbar-top-links pull-right">
        <li>
          <a onClick={onClickAccount} style={{ userSelect: 'none' }}>
            <Avatar
              src={accountState.payload.avatar.url}
              className="img-sm m-t-n-sm m-b-n-sm"
            />
            <span
              className="hidden-xs m-l-sm"
            >{accountState.payload.displayName}</span>
          </a>
        </li>
        <li>
          <a onClick={onClickSearch} style={{ userSelect: 'none' }}>
            <i className="fa fa-search"></i>
            <span
              className="hidden-xs"
            >検索</span>
          </a>
        </li>
        <li>
          <a onClick={onClickMenu}>
            <i className="fa fa-bars"></i>
          </a>
        </li>
      </ul>
      <div className={dropdpwnClassNames}>
        {headerState.account && (
          <ul>
            <li>
              <Link to="/account" className="btn btn-link p-sm center-block">マイページ</Link>
            </li>
            <li>
              <Link to="/setting" className="btn btn-link p-sm center-block">設定</Link>
            </li>
            <li>
              <a onClick={onClickLogout} className="btn btn-link p-sm center-block">ログアウト</a>
            </li>
          </ul>
        )}
        {headerState.search && (
          <form name="searchForm" className="center-block" onSubmit={onSubmitSearch}>
            <div className="input-group">
              <input
                onChange={onInputQuery}
                value={searchState.query}
                type="search"
                name="q"
                className="form-control"
                placeholder="Search words"
              />
              <div className="input-group-btn">
                <button className="btn btn-primary" type="submit">検索</button>
              </div>
            </div>
          </form>
        )}
        {headerState.menu && (
          <ul>
            <li>
              <Link to="/about" className="btn btn-link p-sm center-block">Mementoについて</Link>
            </li>
            <li>
              <Link to="/help" className="btn btn-link p-sm center-block">ヘルプ</Link>
            </li>
            <li>
              <Link to="/privacy" className="btn btn-link p-sm center-block">プライバシーポリシー</Link>
            </li>
            <li>
              <Link to="/terms" className="btn btn-link p-sm center-block">利用規約</Link>
            </li>
            <li>
              <Link to="/company" className="btn btn-link p-sm center-block">運営会社</Link>
            </li>
            <li>
              <Link to="/recruit" className="btn btn-link p-sm center-block">採用情報</Link>
            </li>
            <li>
              <Link to="/company" className="btn btn-link p-sm center-block">Mementoブログ</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavUser;
