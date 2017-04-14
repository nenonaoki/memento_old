// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import _trim from 'lodash/trim';
import * as settingActions from '../../../actions/setting';

function mapStateToProps(state/* , ownProps */) {
  return {
    accountState: state.account,
    settingState: state.setting,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(settingActions, dispatch);
}

type Props = {
  accountState: Object,
  settingState: Object,
  settingPut: Function,
  settingDisplayNameInput: Function,
};

const SettingDisplayName = (props: Props) => {
  const {
    accountState,
    settingState,
    settingPut,
    settingDisplayNameInput,
  } = props;

  const errors = settingState.errors || {};

  const onSubmit = (e) => {
    settingPut(accountState.payload.name, { displayName: _trim(settingState.displayName) });
    e.preventDefault();
  };

  const onInputDisplayName = (e) =>
    settingDisplayNameInput(e.target.value);

  return (
    <div className="ibox">
      <Helmet
        title="表示名の編集"
      />
      <form onSubmit={onSubmit}>
        <div className="ibox-title">
          <h5>表示名の編集</h5>
        </div>
        <div className="ibox-content">
          <div className={errors.displayName ? 'form-group has-error' : 'form-group'}>
            <label className="control-label">Name</label>
            <input
              onChange={onInputDisplayName}
              value={settingState.displayName}
              className="form-control"
              type="text"
            />
            {errors.displayName && (
              <div className="help-block">
                <ul>
                  {errors.displayName.map((error, idx) => (
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
              disabled={settingState.displayName.length === 0}
            >
              <strong>変更</strong>
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
)(SettingDisplayName);
