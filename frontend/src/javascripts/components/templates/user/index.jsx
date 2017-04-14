// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { routerActions } from 'react-router-redux';
import _assign from 'lodash/assign';
import * as userActions from '../../../actions/user';

import Avatar from '../../atoms/avatar';
import Visual from '../../atoms/visual';

function mapStateToProps(state, ownProps) {
  return {
    history: ownProps.history,
    userName: ownProps.params.user_name,
    userState: state.user,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(_assign(routerActions, userActions), dispatch);
}

type Props = {
  router: Object,
  userName: string,
  userState: Object,
  userGet: Function,
  userClear: Function,
  userMediaGet: Function,
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

class User extends Component {
  props: Props;

  componentWillMount() {
    const { userName, userGet, userMediaGet } = this.props;

    userGet(userName);
    userMediaGet(userName);
  }

  componentWillUnmount() {
    this.props.userClear();
  }

  render() {
    const {
      userName,
      userState,
      userMediaGet,
     } = this.props;

    const media = userState.media;

    const onRequestMoreMedia = (e) => {
      userMediaGet(userName, { last_id: userState.media.last_id });
      e.preventDefault();
    };

    return (
      <div className="wrapper wrapper-content">
        {userState.payload && <Helmet
          title={userState.payload.displayName}
        />}
        <div className="row">
          <div className="col-sm-4 col-md-3">
            {(() => {
              if (userState.payload) {
                const widgetStyle = {};
                if (userState.payload.cover.url) {
                  widgetStyle.backgroundImage = `url(${userState.payload.cover.url})`;
                }

                return (
                  <div className="m-b-lg">
                    <div
                      style={widgetStyle}
                      className="widget-head-color-box navy-bg p-lg text-center no-margins"
                    >
                      <Avatar
                        src={userState.payload.avatar.url}
                        className="img-lg img-thumbnail"
                      />
                    </div>
                    <div className="widget-text-box">
                      <h3 className="font-bold">
                        {userState.payload.displayName}<br />
                        <small>@{userState.payload.name}</small>
                      </h3>
                      {userState.payload.description.length > 0 && (
                        <p>{userState.payload.description}</p>
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
)(User);
