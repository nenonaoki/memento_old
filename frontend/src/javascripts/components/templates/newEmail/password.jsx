// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import * as newEmailActions from '../../../actions/newEmail';

function mapStateToProps(state, ownProps) {
  return {
    token: ownProps.params.token,
    email: ownProps.location.query.email,
    newEmail: state.newEmail,
  };
}

function mapDispatchToProps(dispatch/* , ownProps */) {
  return bindActionCreators(newEmailActions, dispatch);
}

type Props = {
  token: string,
  email: string,
  newEmail: Object,
  newEmailPasswordInit: Function,
  newEmailPasswordPost: Function,
  newEmailPasswordInput: Function,
};

class NewEmailPassword extends Component {
  props: Props;

  componentWillMount() {
    const { token, email, newEmailPasswordInit } = this.props;

    newEmailPasswordInit(token, email);
  }
  render() {
    const {
      email,
      newEmail,
      newEmailPasswordPost,
      newEmailPasswordInput,
    } = this.props;

    const errors = newEmail.errors || {};

    const passwordGroupClassNames = classnames({
      'form-group': true,
      'has-error': errors.password,
    });

    const onSubmit = (e) => {
      newEmailPasswordPost(newEmail);
      e.preventDefault();
    };

    const onInputPassword = (e) =>
      newEmailPasswordInput(e.target.value);

    return (
      <div className="wrapper wrapper-content">
        <Helmet
          title="E-mailの変更"
        />
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div className="ibox">
              <form onSubmit={onSubmit}>
                <div className="ibox-title">
                  <h3>E-mailの変更</h3>
                </div>
                <div className="ibox-content">
                  <p><strong>{email}</strong> に変更します。</p>
                  <div className={passwordGroupClassNames}>
                    <label className="control-label">Password</label>
                    <input
                      onInput={onInputPassword}
                      value={newEmail.password}
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
                </div>
                <div className="ibox-footer clearfix">
                  <div className="pull-right">
                    <button
                      className="btn btn-primary"
                      type="submit"
                    >
                      <strong>変更</strong>
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
)(NewEmailPassword);
