// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import * as passwordResetActions from '../../../actions/passwordReset';

function mapStateToProps(state, ownProps) {
  return {
    token: ownProps.params.token,
    email: ownProps.location.query.email,
    passwordReset: state.passwordReset,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(passwordResetActions, dispatch);
}

type Props = {
  token: string,
  email: string,
  passwordReset: Object,
  passwordResetPasswordInit: Function,
  passwordResetPasswordPost: Function,
  passwordResetPasswordInput: Function,
  passwordResetPasswordConfirmationInput: Function,
};

class PasswordResetPassword extends Component {
  props: Props;

  componentWillMount() {
    const { token, email, passwordResetPasswordInit } = this.props;

    passwordResetPasswordInit(token, email);
  }
  render() {
    const {
      passwordReset,
      passwordResetPasswordPost,
      passwordResetPasswordInput,
      passwordResetPasswordConfirmationInput,
    } = this.props;

    const errors = passwordReset.errors || {};

    const passwordGroupClassNames = classnames({
      'form-group': true,
      'has-error': errors.password,
    });

    const passwordConfirmationGroupClassNames = classnames({
      'form-group': true,
      'has-error': errors.passwordConfirmation,
    });

    const onSubmitForm = (e) => {
      passwordResetPasswordPost(passwordReset);
      e.preventDefault();
    };

    const onInputPassword = (e) =>
      passwordResetPasswordInput(e.target.value);

    const onInputPasswordConfirmation = (e) =>
      passwordResetPasswordConfirmationInput(e.target.value);

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
                  <div className={passwordGroupClassNames}>
                    <label className="control-label">Password</label>
                    <input
                      onInput={onInputPassword}
                      value={passwordReset.password}
                      className="form-control"
                      type="password"
                    />
                    {errors.password && (
                      <div className="help-block m-b-none">
                        <ul>
                          {errors.password.map((error, idx) => (
                            <li key={idx}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className={passwordConfirmationGroupClassNames}>
                    <label className="control-label">Password confirmation</label>
                    <input
                      onInput={onInputPasswordConfirmation}
                      value={passwordReset.passwordConfirmation}
                      className="form-control"
                      type="password"
                    />
                    {errors.passwordConfirmation && (
                      <div className="help-block m-b-none">
                        <ul>
                          {errors.passwordConfirmation.map((error, idx) => (
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
                      <strong>更新する</strong>
                    </button>
                  </div>
                </div>
              </form>
            </div>
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
)(PasswordResetPassword);
