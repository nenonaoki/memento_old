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
  settingDescriptionInput: Function,
};

const SettingDescription = (props: Props) => {
  const {
    accountState,
    settingState,
    settingPut,
    settingDescriptionInput,
  } = props;

  const errors = settingState.errors || {};

  const onSubmit = (e) => {
    settingPut(accountState.payload.name, { description: _trim(settingState.description) });
    e.preventDefault();
  };

  const onInputDescription = (e) =>
    settingDescriptionInput(e.target.value);

  return (
    <div className="ibox">
      <Helmet
        title="紹介文の編集"
      />
      <form onSubmit={onSubmit}>
        <div className="ibox-title">
          <h5>紹介文の編集</h5>
        </div>
        <div className="ibox-content">
          <div className={errors.description ? 'form-group has-error' : 'form-group'}>
            <label className="control-label">Description</label>
            <textarea
              className="form-control"
              onChange={onInputDescription}
              value={settingState.description}
              placeholder="Enter description"
            />
            {errors.description && (
              <div className="help-block">
                <ul>
                  {errors.description.map((error, idx) => (
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
              disabled={settingState.description.length === 100}
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
)(SettingDescription);
