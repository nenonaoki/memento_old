// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import _isEmpty from 'lodash/isEmpty';
import * as settingActions from '../../../actions/setting';

import Cover from '../../atoms/cover';

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
  settingCoverInput: Function,
};

const SettingCover = (props: Props) => {
  const {
    accountState,
    settingState,
    settingPut,
    settingCoverInput,
  } = props;

  const errors = settingState.errors || {};
  let fileInput;

  const onSubmit = (e) => {
    settingPut(accountState.payload.name, { cover: fileInput.files[0] });
    e.preventDefault();
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = event =>
      settingCoverInput(event.target.result);

    if (file.type.search(/image\/(png|jpeg|gif)/gi) !== -1) {
      fileReader.readAsDataURL(file);
    } else {
      settingCoverInput('');
    }
  };

  return (
    <div className="ibox">
      <Helmet
        title="カバー画像の編集"
      />
      <form onSubmit={onSubmit}>
        <div className="ibox-title">
          <h5>カバー画像の編集</h5>
        </div>
        <div className="ibox-content">
          <div className={errors.cover ? 'form-group has-error' : 'form-group'}>
            <label className="control-label">Cover</label>
            <input
              onChange={onChange}
              ref={input => { fileInput = input; }}
              className="m-b-sm"
              type="file"
              name="user[cover]"
            />
            {settingState.cover.url && (
              <div className="text-center">
                <Cover src={settingState.cover.url} className="img-responsive" />
              </div>
            )}
            {errors.cover && (
              <div className="help-block">
                <ul>
                  {errors.cover.map((error, idx) => (
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
              disabled={_isEmpty(settingState.cover.url)}
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
)(SettingCover);
