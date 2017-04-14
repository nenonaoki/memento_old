// @flow
import qs from 'qs';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import _has from 'lodash/has';
import * as mediumActions from '../../../actions/medium';

import Tag from '../../atoms/tag';
import Visual from '../../atoms/visual';
import Movie from '../../organisms/movie';
import Conversation from '../../organisms/conversation';

function mapStateToProps(state, ownProps) {
  return {
    accountState: state.account,
    token: ownProps.params.token,
    mediumState: state.medium,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(mediumActions, dispatch);
}

type Props = {
  accountState: Object,
  token: string,
  location: Object,
  mediumState: Object,
  mediumGet: Function,
  mediumClear: Function,
  mediumTicketCheckIn: Function,
  mediumSerialInput: Function,
  mediumCommentsGet: Function,
  mediumCommentPost: Function,
  mediumContentInput: Function,
};

class Medium extends Component {
  props: Props;

  componentWillMount() {
    this.props.mediumGet(this.props.token);
  }

  componentWillUnmount() {
    this.props.mediumClear();
  }

  componentWillUpdate(nextProps) {
    const isLogin = _has(this.props.accountState, 'payload');
    const willLogin = _has(nextProps.accountState, 'payload');

    if ((isLogin !== willLogin)) {
      this.props.mediumClear();
      this.props.mediumGet(nextProps.token);
    }
  }

  render() {
    const {
      accountState,
      token,
      location,
      mediumState,
      mediumTicketCheckIn,
      mediumSerialInput,
      mediumCommentsGet,
      mediumCommentPost,
      mediumContentInput,
    } = this.props;

    const redirectParam = qs.stringify({
      ref: location.pathname + location.search,
    });

    const onSubmitSerial = (e) => {
      // TODO: If statement for the validation before submiting
      mediumTicketCheckIn(token, mediumState);
      e.preventDefault();
    };

    const onInputSerial = (e) =>
      mediumSerialInput(e.target.value);

    const onRequestComments = () => {
      const param = {};

      if (mediumState.comments) {
        param.last_id = mediumState.comments.lastId;
      }

      mediumCommentsGet(token, param);
    };

    const onSubmitComment = (e) => {
      // TODO: If statement for the validation before submiting
      mediumCommentPost(token, mediumState);
      e.preventDefault();
    };

    const onInputComment = (e) =>
      mediumContentInput(e.target.value);

    return (
      <div className="wrapper wrapper-content">
        {mediumState.payload && <Helmet
          title={mediumState.payload.title}
        />}
        <div className="row">
          <div className="col-sm-8">
            <div className="ibox">
              <div className="black-bg">
                {(() => {
                  if (mediumState.payload) {
                    if (mediumState.payload.checked_in) {
                      return (
                        <Movie token={token} />
                      );
                    }
                    return (
                      <Visual
                        src={mediumState.payload.image}
                        className="img-responsive center-block"
                      />
                    );
                  }
                  return '';
                })()}
              </div>
              {(() => {
                if (!_has(accountState, 'payload')) {
                  return (
                    <div className="text-center m-t">
                      <Link to={`/login?${redirectParam}`} className="btn btn-default">
                        ログイン
                      </Link>
                      {' '}
                      <Link to={`/signup?${redirectParam}`} className="btn btn-primary">
                        ユーザー登録
                      </Link>
                    </div>
                  );
                } else if (mediumState.payload && !mediumState.payload.checked_in) {
                  return (
                    <form onSubmit={onSubmitSerial}>
                      <div className="row no-margins">
                        <div className="col-xs-8 no-padding">
                          <input
                            className="form-control text-center"
                            onChange={onInputSerial}
                            value={mediumState.serial}
                            maxLength="19"
                            placeholder="0000 1111 2222 3333"
                          />
                        </div>
                        <div className="col-xs-4 no-padding">
                          <input
                            className="btn btn-primary btn-block b-r-xs"
                            type="submit"
                            value="Check in"
                            disabled={mediumState.serial.length < 19}
                          />
                        </div>
                      </div>
                    </form>
                  );
                }
                return '';
              })()}
            </div>
            <div className="ibox">
              <div className="ibox-content">
                {(() => {
                  if (mediumState.payload) {
                    return (
                      <div>
                        <h2>{mediumState.payload.title}</h2>
                        <p>{mediumState.payload.description}</p>
                        <ul className="tag-list no-padding clearfix">
                          {mediumState.payload.tags.map(tag => (
                            <li key={tag.id}><Tag slug={tag.slug}>{tag.label}</Tag></li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return '';
                })()}
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <Conversation
              accountState={accountState}
              mediumState={mediumState}
              onRequestComments={onRequestComments}
              onSubmitComment={onSubmitComment}
              onInputComment={onInputComment}
            />
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
)(Medium);
