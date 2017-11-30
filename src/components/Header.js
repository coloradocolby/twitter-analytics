import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout, userName, photoURL, user }) => {
  return (
    <div>
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
            <img id="user-photo" src={photoURL} onClick={() => console.log(user)}/>
            <a className="navbar-item" onClick={ startLogout }>
              Logout { userName.split(' ')[0] }
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userName: state.auth.user.displayName,
  photoURL: state.auth.user.providerData[0].photoURL,
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
