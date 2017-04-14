// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import * as passwordResetActions from '../../../actions/passwordReset';

function mapStateToProps(state/* , ownProps */) {
  return {
    passwordReset: state.passwordReset,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(passwordResetActions, dispatch);
}

type Props = {
  passwordReset: Object,
  passwordResetEmailPost: Function,
  passwordResetEmailInput: Function,
};

const PasswordResetEmail = (props: Props) => {
  const {
    passwordReset,
    passwordResetEmailPost,
    passwordResetEmailInput,
  } = props;

  const errors = passwordReset.errors || {};

  const emailFormClassNames = classnames({
    'form-group': true,
    'has-error': errors.email,
  });

  const onSubmitForm = (e) => {
    passwordResetEmailPost(passwordReset);
    e.preventDefault();
  };

  const onInputEmail = (e) =>
    passwordResetEmailInput(e.target.value);

  return (
    <div className="wrapper wrapper-content">
      <Helmet
        title="パスワードのリセット"
      />
      <div className="row">
        <div className="col-sm-4 col-sm-offset-4">
          <div className="ibox">
            <form onSubmit={onSubmitForm}>
              <div className="ibox-title">
                <h3>パスワードのリセット</h3>
              </div>
              <div className="ibox-content">
                <div className={emailFormClassNames}>
                  <label className="control-label">Email</label>
                  <input
                    onInput={onInputEmail}
                    value={passwordReset.email}
                    className="form-control"
                    type="email"
                    placeholder="Enter E-mail"
                  />
                  {errors.email && (
                    <div className="help-block m-b-none">
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
                  <button
                    className="btn btn-primary pull-right"
                    type="submit"
                  >
                    <strong>リセット用メールを送る</strong>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetEmail);
