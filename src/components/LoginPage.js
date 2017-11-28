import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="title is-3">Twitter Analytics</h1>
      <p className="is-size-5">Let's analyze some tweets.</p>
      <button className="button bd-tw-button z-depth-1" onClick={startLogin}>
        <span className="icon">
          <i className="fa fa-twitter"> </i>
        </span>
        <span>
          <strong>Login</strong> with <strong>Twitter</strong>
        </span>
      </button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
