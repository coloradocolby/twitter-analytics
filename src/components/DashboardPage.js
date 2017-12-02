import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from './Modal';
import LoadingPage from './LoadingPage';

class DashboardPage extends Component{

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      status: '',
      toggleModal: false,
      modalType: 'is-success',
      modalMessage: '',
      screen_name: '',
      charactersUsed: 0,
      followers_count: null,
      friends_count: null,
      favourites_count: null,
      statuses_count: null,
      klout_score: null,
      is_ready: false
    }
  }

  componentDidMount() {
    // GET USERS TWITTER INFO
    axios.post('http://localhost:3000/api/user', {
      accessToken: this.state.credential.accessToken,
      secret: this.state.credential.secret,
      uid: this.state.user.providerData[0].uid
    }).then((res) => {
      const user = JSON.parse(res.data)[0];
      const { 
        followers_count, 
        screen_name, 
        statuses_count,
        friends_count,
        favourites_count
      } = user;
      this.setState(() => ({
        followers_count,
        screen_name,
        statuses_count,
        friends_count,
        favourites_count
      }));
      // GET USER KLOUT SCORE
      axios.post('http://localhost:3000/api/klout', {
        screenName: screen_name
      }).then((resp) => {
        const klout_score = resp.data.score;
        this.setState(() => ({
          klout_score: Math.round(klout_score),
          is_ready: true
        }));

      });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/tweet', {
      accessToken: this.state.credential.accessToken,
      secret: this.state.credential.secret,
      status: this.state.status
    }).then((res) => {
      const { data } = res;
      const status = JSON.parse(data);
      console.log(status);
      if(status.created_at){
        this.setState(() => ({ 
          status: '',
          modalMessage: 'Tweet Successful!',
          toggleModal: true,
          modalType: 'is-success'
        }));
      } else {
        if(status.errors) {
          console.log(status.errors);
          const { message } = status.errors[0];
          this.setState(() => ({ 
            status: '',
            modalMessage: message,
            toggleModal: true,
            modalType: 'is-danger'
          }));
        }
      }

    })

  }

  onStatusChange = (e) => {
    const status = e.target.value;
    this.setState(() => ({ 
      status,
      charactersUsed: status.length
    }));
  }

  handleToggleModal = () => {
    this.setState((prevState) => ({ toggleModal: !prevState.toggleModal }));
  }

  render() {
    const { 
      screen_name, 
      followers_count, 
      statuses_count,
      friends_count,
      favourites_count,
      charactersUsed,
      toggleModal,
      modalType,
      modalMessage,
      klout_score,
      is_ready
    } = this.state;

    if(!is_ready){
      return (
        <LoadingPage />
      );
    } else {
      return (
        <div className="container">
          <section className="hero">
            <div className="hero-body">
              <h1 className="title">
                Welcome, { screen_name }
              </h1>
              <form className="tweet-form" onSubmit={this.handleSubmit}>
                <textarea 
                  className="textarea is-large" 
                  placeholder="Compose your tweet here..."
                  maxLength="280"
                  value={this.state.status}
                  onChange={this.onStatusChange}
                ></textarea>
                <p>{ charactersUsed }/280</p>
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
            <nav className="level">
              <div className="level-item has-text-centered animated fadeInDown">
                <div>
                  <p className="heading">Tweets</p>
                  <p className="title">{ statuses_count }</p>
                </div>
              </div>
              <div className="level-item has-text-centered animated fadeInDown delay1">
                <div>
                  <p className="heading">Following</p>
                  <p className="title">{ friends_count }</p>
                </div>
              </div>
              <div className="level-item has-text-centered animated fadeInDown delay2">
                <div>
                  <p className="heading">Followers</p>
                  <p className="title">{ followers_count }</p>
                </div>
              </div>
              <div className="level-item has-text-centered animated fadeInDown delay3">
              <div>
                <p className="heading">Klout</p>
                <p className="title">{ klout_score }</p>
              </div>
            </div>
            </nav>
          </section>
          <Modal 
            message={modalMessage}
            toggleModal={toggleModal}
            handleClose={this.handleToggleModal}
            typeOfMessage={modalType}
          />
        </div>
      );
    }

  }
 
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  credential: state.auth.credential
})
export default connect(mapStateToProps)(DashboardPage);


// <button className="button is-link" onClick={this.handleToggleModal}>Modal</button>
// <button className="button is-link" onClick={() => console.log(user)}>Get User</button>


// <div className="level-item has-text-centered">
// <div>
//   <p className="heading">Likes</p>
//   <p className="title">{ favourites_count }</p>
// </div>
// </div>