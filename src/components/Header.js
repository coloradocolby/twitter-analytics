import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout, userName}) => {
  const userFirstName = userName.split(' ')[0];
  return (
    <nav className="navbar is-link">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/dashboard">
          <h1 className="title is-3">Twitter Analytics</h1>
        </Link>
        <div className="navbar-burger burger" data-target="navbar">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navbar" className="navbar-menu">
        <div className="navbar-start">
          <NavLink to="/dashboard" className="navbar-item" activeClassName="is-active" exact={true}>Dashboard</NavLink>
          <NavLink to="/contact" className="navbar-item" activeClassName="is-active">Contact</NavLink>
        </div>
        
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a 
                  className="bd-tw-button button" 
                  data-social-network="Twitter" 
                  data-social-action="tweet" 
                  data-social-target="http://localhost:4000" 
                  target="_blank" 
                  href="https://twitter.com/intent/tweet?text=Having some fun reviewing some Twitter Analytics!&amp;hashtags=twitteranalytics&amp;url=https://www.twitteranalytics.com&amp;via=coloradocolby"
                >
                  <span className="icon">
                    <i className="fa fa-twitter"></i>
                  </span>
                  <span>
                    Tweet
                  </span>
                </a>
              </p>
            </div>
          </div>
          <div className="navbar-item">
            <button className="button is-primary" onClick={ startLogout }>Logout { userFirstName }</button>
          </div>
        </div>


      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  userName: state.auth.user.displayName
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
