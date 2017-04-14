// @flow
import qs from 'qs';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { routerActions } from 'react-router-redux';
import _has from 'lodash/has';
import _assign from 'lodash/assign';
import * as homeActions from '../../../actions/home';
import * as searchActions from '../../../actions/search';
import * as notificationActions from '../../../actions/notification';

import Slider from '../../organisms/slider';

function mapStateToProps(state/* , ownProps */) {
  return {
    accountState: state.account,
    searchState: state.search,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(_assign(
    routerActions,
    homeActions,
    searchActions,
    notificationActions
  ), dispatch);
}

type Props = {
  push: Function,
  location: Object,
  accountState: Object,
  searchState: Object,
  searchQueryInput: Function,
}

class Home extends Component {
  props: Props;

  render() {
    const {
      push,
      location,
      accountState,
      searchState,
      searchQueryInput,
    } = this.props;

    const isLogin = _has(accountState, 'payload');

    const redirectParam = qs.stringify({
      ref: location.pathname + location.search,
    });

    const onInputQuery = (e) =>
      searchQueryInput(e.target.value);

    const onSubmitSearch = (e) => {
      const param = {
        q: searchState.query,
      };
      push(`/search?${qs.stringify(param)}`);
      e.preventDefault();
    };

    return (
      <div className="landing-page">
        <section id="frontHero">
          <div className="text-center container">
            <h1>Replay your moment</h1>
            {isLogin ? (
              <form name="searchFormTop" className="center-block m-t-lg" onSubmit={onSubmitSearch}>
                <div className="input-group">
                  <input
                    onChange={onInputQuery}
                    value={searchState.query}
                    type="search"
                    name="q"
                    className="form-control input-lg"
                    placeholder="Search words"
                  />
                  <div className="input-group-btn">
                    <button className="btn btn-lg btn-primary" type="submit">検索</button>
                  </div>
                </div>
              </form>
            ) : (
              <Link to={`/signup?${redirectParam}`} className="btn btn-lg btn-primary m-t-lg">
                ユーザー登録
              </Link>
            )}
          </div>
        </section>

        <section className="container p-w-xl">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="navy-line"></div>
              <h1><span className="navy">Pick up</span></h1>
            </div>
          </div>
          <Slider />
        </section>

        <section className="navy-section">
          <div className="container m-b-lg">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="white-line"></div>
                <h1>What's Memento</h1>
              </div>
            </div>
            <div className="row m-b-md">
              <div className="col-sm-6">
                <h2>VR体験</h2>
                <p>360°見渡せるVirtual Reality動画で、その場にいるかのような臨場感。<br />あの瞬間を再現！</p>
              </div>
              <div className="col-sm-6 text-right">
                <img src="/images/home/pickup.jpg" alt="dashboard" className="img-responsive pull-right" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-sm-push-6">
                <h2>参加者限定コンテンツ</h2>
                <p>セットリスト、チャット機能を参加者のみに公開！</p>
              </div>
              <div className="col-sm-6 col-sm-pull-6">
                <img src="/images/home/pickup.jpg" alt="dashboard" className="img-responsive" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="white-line"></div>
                <h1>Demo movie</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src="https://www.youtube.com/embed/gnYFL_OB7qs"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="navy-line"></div>
              <h1><span className="navy">How to use</span></h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-3">
              <h2 className="m-t-none"><span className="label label-primary">Step 1</span></h2>
              <div className="m-b-sm"><img src="/images/home/pickup.jpg" className="img-responsive center-block" alt="" /></div>
              <p>イベント会場でMementoカードを手に入れよう！<br />カード配付イベントはこちら。</p>
            </div>
            <div className="col-sm-6 col-md-3">
              <h2 className="m-t-none"><span className="label label-primary">Step 2</span></h2>
              <div className="m-b-sm"><img src="/images/home/pickup.jpg" className="img-responsive center-block" alt="" /></div>
              <p>QRコードを読み取ってイベントページへアクセス。</p>
            </div>
            <div className="clearfix visible-sm-block"></div>
            <div className="col-sm-6 col-md-3">
              <h2 className="m-t-none"><span className="label label-primary">Step 3</span></h2>
              <div className="m-b-sm"><img src="/images/home/pickup.jpg" className="img-responsive center-block" alt="" /></div>
              <p>シリアルコードを入力して、イベントにチェックイン！</p>
            </div>
            <div className="col-sm-6 col-md-3">
              <h2 className="m-t-none"><span className="label label-primary">Step 4</span></h2>
              <div className="m-b-sm"><img src="/images/home/pickup.jpg" className="img-responsive center-block" alt="" /></div>
              <p>VR動画やセットリストなど限定コンテンツを楽しもう！</p>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="row m-b-lg">
            <div className="col-lg-12 text-center">
              <div className="navy-line"></div>
              <h1><span className="navy">Follow us</span></h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <ul className="list-inline social-icon">
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-instagram"></i></a></li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    );
  }
}

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
