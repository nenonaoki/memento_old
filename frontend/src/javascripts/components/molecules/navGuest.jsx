// @flow
import qs from 'qs';
import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

type Props = {
  location: Object,
  headerState: Object,
  searchState: Object,
  onSubmitSearch: Function,
  onClickSearch: Function,
  onClickMenu: Function,
  onInputQuery: Function,
};

const NavGuest = (props: Props) => {
  const {
    location,
    headerState,
    searchState,
    onSubmitSearch,
    onClickSearch,
    onClickMenu,
    onInputQuery,
  } = props;

  const dropdpwnClassNames = classnames({
    'nav-collapse': true,
    opened: (headerState.search || headerState.account || headerState.menu),
  });

  let redirectParam = '';
  if (location.pathname === '/login') {
    redirectParam = qs.stringify({
      ref: location.query.ref,
    });
  } else {
    redirectParam = qs.stringify({
      ref: location.pathname + location.search,
    });
  }

  return (
    <div>
      <ul className="nav navbar-top-links pull-right">
        <li>
          <Link to={`/login?${redirectParam}`} className="btn btn-link">
            ログイン
          </Link>
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

export default NavGuest;
