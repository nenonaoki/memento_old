// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as signupActions from '../../../actions/signup';

function mapStateToProps(state/* , ownProps */) {
  return {
    signupState: state.signup,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(signupActions, dispatch);
}

type Props = {
  signupState: Object,
  signupPost: Function,
  signupNameInput: Function,
  signupEmailInput: Function,
  signupPasswordInput: Function,
  signupPasswordConfirmationInput: Function,
};

const Input = (props: Props) => {
  const {
    signupState,
    signupPost,
    signupNameInput,
    signupEmailInput,
    signupPasswordInput,
    signupPasswordConfirmationInput,
  } = props;

  const errors = signupState.errors || {};

  const onSubmitForm = (e) => {
    signupPost(signupState);
    e.preventDefault();
  };

  const onInputName = (e) =>
    signupNameInput(e.target.value);

  const onInputEmail = (e) =>
    signupEmailInput(e.target.value);

  const onInputPassword = (e) =>
    signupPasswordInput(e.target.value);

  const onInputPasswordConfirmation = (e) =>
    signupPasswordConfirmationInput(e.target.value);

  return (
    <div className="ibox">
      <form onSubmit={onSubmitForm}>
        <div className="ibox-title">
          <h3>ユーザー登録</h3>
        </div>
        <div className="ibox-content">
          <div className="row">
            <div className="col-sm-6 b-r">
              <div className={errors.name ? 'form-group has-error' : 'form-group'}>
                <label className="control-label">Name</label>
                <input
                  onInput={onInputName}
                  value={signupState.name}
                  className="form-control"
                  type="text"
                  placeholder="a - z, 0 - 9, _"
                />
                {errors.name && (
                  <div className="help-block m-b-none">
                    <ul>
                      {errors.name.map((error, idx) => (
                        <li key={idx}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className={errors.email ? 'form-group has-error' : 'form-group'}>
                <label className="control-label">Email</label>
                <input
                  onInput={onInputEmail}
                  value={signupState.email}
                  className="form-control"
                  type="email"
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
              <div className={errors.password ? 'form-group has-error' : 'form-group'}>
                <label className="control-label">Password</label>
                <input
                  onInput={onInputPassword}
                  value={signupState.password}
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
              <div className={errors.passwordConfirmation ? 'form-group has-error' : 'form-group'}>
                <label className="control-label">Password confirmation</label>
                <input
                  onInput={onInputPasswordConfirmation}
                  value={signupState.passwordConfirmation}
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
            <div className="col-sm-6">
              <h4>アカウントをお持ちの方ですか？</h4>
              <p>Log into an account:</p>
              <p className="text-center">
                <Link to="/login"><i className="fa fa-sign-in big-icon"></i></Link>
              </p>
            </div>
          </div>
        </div>
        <div className="ibox-footer clearfix">
          <button
            className="btn btn-primary pull-right"
            type="submit"
          >
            <strong>登録</strong>
          </button>
        </div>
      </form>
    </div>
  );
};

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);
