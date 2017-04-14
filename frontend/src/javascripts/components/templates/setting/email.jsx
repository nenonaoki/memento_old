// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import * as settingActions from '../../../actions/setting';

function mapStateToProps(state/* , ownProps */) {
  return {
    settingState: state.setting,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(settingActions, dispatch);
}

type Props = {
  settingState: Object,
  settingEmailPost: Function,
  settingEmailInput: Function,
};

const SettingEmail = (props: Props) => {
  const {
    settingState,
    settingEmailPost,
    settingEmailInput,
  } = props;

  const errors = settingState.errors || {};

  const onSubmit = (e) => {
    settingEmailPost(settingState);
    e.preventDefault();
  };

  const onInputEmail = (e) =>
    settingEmailInput(e.target.value);

  return (
    <div className="ibox">
      <Helmet
        title="E-mailの編集"
      />
      <form onSubmit={onSubmit}>
        <div className="ibox-title">
          <h5>E-mailの編集</h5>
        </div>
        <div className="ibox-content">
          <p>新しいアドレスに変更確認のメールを送ります。</p>
          <div className={errors.email ? 'form-group has-error' : 'form-group'}>
            <label className="control-label">New Email</label>
            <input
              onChange={onInputEmail}
              value={settingState.email}
              className="form-control"
              type="email"
              name="user[email]"
            />
            {errors.email && (
              <div className="help-block">
                <ul>
                  {errors.email.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
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
              disabled={settingState.email.length === 0}
            >
              <strong>確認メールを送る</strong>
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
)(SettingEmail);
