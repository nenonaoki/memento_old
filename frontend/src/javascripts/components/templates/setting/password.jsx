// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import * as passwordResetActions from '../../../actions/passwordReset';

function mapStateToProps(state/* , ownProps */) {
  return {
    accountState: state.account,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(passwordResetActions, dispatch);
}

type Props = {
  accountState: Object,
  passwordResetEmailPost: Function,
};

const SettingPassword = (props: Props) => {
  const {
    accountState,
    passwordResetEmailPost,
  } = props;

  const onSubmit = (e) => {
    passwordResetEmailPost(accountState.payload);
    e.preventDefault();
  };

  return (
    <div className="ibox">
      <Helmet
        title="パスワードの編集"
      />
      <form onSubmit={onSubmit}>
        <div className="ibox-title">
          <h5>パスワードの編集</h5>
        </div>
        <div className="ibox-content">
          <p>以下のアドレスにリセット用のメールを送ります。</p>

          <div className="form-group">
            <strong>{accountState.payload.email}</strong>
          </div>
        </div>
        <div className="ibox-footer clearfix">
          <div className="pull-right">
            <Link
              to="/setting"
              className="btn btn-white"
            >
              <strong>戻る</strong>
            </Link>
            {' '}
            <button
              className="btn btn-primary"
              type="submit"
            >
              <strong>リセット用メールを送る</strong>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingPassword);
