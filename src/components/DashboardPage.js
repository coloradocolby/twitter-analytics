import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

export const DashboardPage = ({ userObj, userName }) => {
  const userFirstName = userName.split(' ')[0];
  return (
    <div className="container">
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            Welcome to your dashboard, { userFirstName }
          </h1>
          <h2 className="subtitle">
            Let's see what information we can find on your account:
          </h2>
        </div>
      </div>
    </section>
    <pre>
      { JSON.stringify(userObj, null, 2) }
    </pre>
  </div>
  )
};

const mapStateToProps = (state) => ({
  userObj: state.auth.user,
  userName: state.auth.user.displayName
})
export default connect(mapStateToProps)(DashboardPage);

