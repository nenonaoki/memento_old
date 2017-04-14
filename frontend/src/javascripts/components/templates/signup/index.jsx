// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as signupActions from '../../../actions/signup';

import SigupInput from './input';
import SigupComplete from './complete';

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
};

const Signup = (props: Props) => {
  const {
    signupState,
  } = props;

  return (
    <div className="wrapper wrapper-content">
      <Helmet
        title="ユーザー登録"
      />
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          {signupState.completed ? <SigupComplete /> : <SigupInput />}
        </div>
      </div>
    </div>
  );
};

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
