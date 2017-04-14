// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import * as loginActions from '../../../actions/login';

function mapStateToProps(state/* , ownProps */) {
  return {
    login: state.login,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(loginActions, dispatch);
}

type Props = {
  login: Object,
  loginPost: Function,
  loginEmailInput: Function,
  loginPasswordInput: Function,
  loginRememberMeCheck: Function,
};

const Login = (props: Props) => {
  const {
    login,
    loginPost,
    loginEmailInput,
    loginPasswordInput,
    loginRememberMeCheck,
  } = props;

  const errors = login.errors || {};

  const onSubmitForm = (e) => {
    loginPost(login);
    e.preventDefault();
  };

  const onInputEmail = (e) =>
    loginEmailInput(e.target.value);

  const onInputPassword = (e) =>
    loginPasswordInput(e.target.value);

  const onCheckRememberMe = (e) =>
    loginRememberMeCheck(e.target.checked);

  return (
    <div className="wrapper wrapper-content">
      <Helmet
        title="ログイン"
      />
      <div className="row">
        <div className="col-sm-4 col-sm-offset-4">
          <div className="ibox">
            <form onSubmit={onSubmitForm}>
              <div className="ibox-title">
                <h3>ログイン</h3>
              </div>
              <div className="ibox-content">
                <div className={errors.general ? 'form-group has-error' : 'form-group'}>
                  <label className="control-label">Email</label>
                  <input
                    onInput={onInputEmail}
                    value={login.email}
                    className="form-control"
                    type="email"
                    name="session[email]"
                    placeholder="Enter E-mail"
                  />
                </div>
                <div className={errors.general ? 'form-group has-error' : 'form-group'}>
                  <label className="control-label">Password</label>{' '}
                  <Link to="/password_resets/new"><small>パスワードをお忘れですか？</small></Link>
                  <input
                    onInput={onInputPassword}
                    value={login.password}
                    className="form-control"
                    type="password"
                    name="session[password]"
                    placeholder="Password"
                  />
                  {errors.general && (
                    <div className="help-block">
                      <ul>
                        {errors.general.map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    <input
                      onChange={onCheckRememberMe}
                      checked={login.rememberMe}
                      type="checkbox"
                      value="1"
                      name="session[remember_me]"
                    />{' '}
                    <span>パスワードを記憶する</span>
                  </label>
                </div>
              </div>
              <div className="ibox-footer clearfix">
                <div className="pull-right">
                  <Link to="/signup" className="btn btn-sm btn-link m-t-xxs">ユーザー登録</Link>
                  {' '}
                  <button
                    className="btn btn-primary pull-right"
                    type="submit"
                  >
                    <strong>ログイン</strong>
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
  mapDispatchToProps,
)(Login);
