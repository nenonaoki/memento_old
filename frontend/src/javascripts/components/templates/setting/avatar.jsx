// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import _isEmpty from 'lodash/isEmpty';
import * as settingActions from '../../../actions/setting';

import Avatar from '../../atoms/avatar';

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
  settingAvatarInput: Function,
};

const SettingAvatar = (props: Props) => {
  const {
    accountState,
    settingState,
    settingPut,
    settingAvatarInput,
  } = props;

  const errors = settingState.errors || {};
  let fileInput;

  const onSubmit = (e) => {
    settingPut(accountState.payload.name, { avatar: fileInput.files[0] });
    e.preventDefault();
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = event =>
      settingAvatarInput(event.target.result);

    if (file.type.search(/image\/(png|jpeg|gif)/gi) !== -1) {
      fileReader.readAsDataURL(file);
    } else {
      settingAvatarInput('');
    }
  };

  return (
    <div className="ibox">
      <Helmet
        title="アバター画像の編集"
      />
      <form onSubmit={onSubmit}>
        <div className="ibox-title">
          <h5>アバター画像の編集</h5>
        </div>
        <div className="ibox-content">
          <div className={errors.avatar ? 'form-group has-error' : 'form-group'}>
            <label className="control-label">Avatar</label>
            <input
              onChange={onChange}
              ref={input => { fileInput = input; }}
              className="m-b-sm"
              type="file"
              name="user[avatar]"
            />
            {settingState.avatar.url && (
              <div className="text-center">
                <Avatar image={settingState.avatar} className="img-lg" />
              </div>
            )}
            {errors.avatar && (
              <div className="help-block">
                <ul>
                  {errors.avatar.map((error, idx) => (
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
              disabled={_isEmpty(settingState.avatar.url)}
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
)(SettingAvatar);
