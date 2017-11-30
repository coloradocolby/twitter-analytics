import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class DashboardPage extends Component{

  constructor(props) {
    super(props);
    this.state = {
      ...props
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="container">
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Welcome to your dashboard, { this.props.user.displayName.split(' ')[0] }
            </h1>
            <form onSubmit={this.handleSubmit}>
              <textarea className="textarea" placeholder="Compose tweet here..."></textarea>
              <button className="bd-tw-button button">
                <span className="icon">
                  <i className="fa fa-twitter"></i>
                </span>
                <span>
                  Tweet
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
      <button className="button is-primary" onClick={() => console.log(this.state)}>Get State</button>
    </div>
    )
  }
 
};

const mapStateToProps = (state) => ({
  user: state.user,
  credential: state.credential
})
export default connect(mapStateToProps)(DashboardPage);

