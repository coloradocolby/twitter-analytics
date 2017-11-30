import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class DashboardPage extends Component{

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      status: ''
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api', {
      accessToken: this.state.credential.accessToken,
      secret: this.state.credential.secret,
      status: this.state.status
    }).then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log('error', err);
    });
  }
  onStatusChange = (e) => {
    const status = e.target.value;
    this.setState(() => ({ status }));
    console.log(status);
  }

  render() {
    return (
      <div className="container">
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
            What would you like to tweet today, { this.props.user.displayName.split(' ')[0] }?
            </h1>
            <form onSubmit={this.handleSubmit}>
              <textarea 
                className="textarea" 
                placeholder="Compose tweet here..."
                value={this.state.status}
                onChange={this.onStatusChange}
              ></textarea>
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
    </div>
    )
  }
 
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  credential: state.auth.credential
})
export default connect(mapStateToProps)(DashboardPage);

