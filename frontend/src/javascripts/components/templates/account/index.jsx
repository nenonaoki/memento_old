// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import * as accountActions from '../../../actions/account';

import Avatar from '../../atoms/avatar';
import Visual from '../../atoms/visual';

function mapStateToProps(state/* , ownProps */) {
  return {
    accountState: state.account,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(accountActions, dispatch);
}

type Props = {
  accountState: Object,
  accountMediaClear: Function,
  accountMediaGet: Function,
};

const Medium = (props: Object) => (
  <div className="col-xs-6 col-md-4">
    <Link to={`/media/${props.medium.token}`}>
      <div className="ibox">
        <div className="ibox-content product-box">
          <div className="product-img">
            <Visual
              src={props.medium.image.url}
              className="img-responsive"
            />
            <span className="product-check"><i className="fa fa-check-circle"></i></span>
          </div>
          <div className="product-desc">
            <h5>{props.medium.title}</h5>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

class Account extends Component {
  props: Props;

  componentWillMount() {
    const { accountState, accountMediaGet } = this.props;

    accountMediaGet(accountState.payload.name);
  }

  componentWillUnmount() {
    this.props.accountMediaClear();
  }

  render() {
    const {
      accountState,
      accountMediaGet,
    } = this.props;

    const media = accountState.media;

    const onRequestMoreMedia = (e) => {
      accountMediaGet(accountState.payload.name, { last_id: accountState.media.last_id });
      e.preventDefault();
    };

    return (
      <div className="wrapper wrapper-content">
        {accountState.payload && <Helmet
          title={accountState.payload.displayName}
        />}
        <div className="row">
          <div className="col-sm-4 col-md-3">
            {(() => {
              if (accountState.payload) {
                const widgetStyle = {};
                if (accountState.payload.cover.url) {
                  widgetStyle.backgroundImage = `url(${accountState.payload.cover.url})`;
                }

                return (
                  <div className="m-b-lg">
                    <div
                      style={widgetStyle}
                      className="widget-head-color-box navy-bg p-lg text-center no-margins"
                    >
                      <Avatar
                        src={accountState.payload.avatar.url}
                        className="img-lg img-thumbnail"
                      />
                    </div>
                    <div className="widget-text-box">
                      <Link to="/setting" className="btn btn-sm btn-default pull-right">Edit</Link>
                      <h3 className="font-bold">
                        {accountState.payload.displayName}<br />
                        <small>@{accountState.payload.name}</small>
                      </h3>
                      {accountState.payload.description.length > 0 && (
                        <p>{accountState.payload.description}</p>
                      )}
                      <div className="text-center">
                        <span>{media && media.count} Visits</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return '';
            })()}
          </div>

          <div className="col-sm-8 col-md-9">
            <div className="row">
              {media && media.payload.map(medium => (
                <Medium key={medium.id} medium={medium} />
              ))}
              {media && media.payload.length === 0 && (
                <div className="col-md-12">
                  <h2 className="p-w-sm">No media found</h2>
                </div>
              )}
            </div>
            {(() => {
              if (media) {
                // TODO: Error when length is bigger but the same items
                if (media.count !== media.payload.length) {
                  return (
                    <p><button
                      onClick={onRequestMoreMedia}
                      className="btn btn-default btn-block"
                    >
                      <i className="fa fa-arrow-down"></i> Show More
                    </button></p>
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

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
