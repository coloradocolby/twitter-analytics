import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';
import LoadingPage from './LoadingPage';
// import { SingleDatePicker } from 'react-dates';
// import TimePickerWrapper from './TimePickerWrapper';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import moment from 'moment';

const format = 'h a';
const now = moment().hour(0).minute(0);

class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      tweet: '',
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
      is_ready: true,
      date: null,
      focused: false,
      selectedDay: '',
      selectedTime: '',
    }
  }
  analyze = () => {
    const { tweet, selectedDay, selectedTime, klout_score } = this.state;
    axios.post('http://localhost:3000/api/analyze', {
      data: [ selectedDay, selectedTime, '0', klout_score ? klout_score : '0', tweet ]
    }).then((resp) => {
      console.log(resp.data);
      this.setState(() => ({ 
        status: '',
        modalMessage: `Predicted Retweets : ${resp.data.toFixed(3)}`,
        toggleModal: true,
        modalType: 'is-success'
      }));
    })
  }
  handleDayChange = (selectedDay) => {
    selectedDay ? this.setState(() => ({ selectedDay: selectedDay.value })) : this.setState(() => ({ selectedDay: '' })); 
  }
  handleTimeChange = (selectedTime) => {
    selectedTime ? this.setState( () => ({ selectedTime: selectedTime.value })) : this.setState(() => ({ selectedTime: '' })); 
  }
  componentDidMount() {
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
        screenName: this.state.screen_name
      }).then((resp) => {
        const klout_score = resp.data.score;
        console.log(klout_score);
        this.setState(() => ({
          klout_score: Math.round(klout_score),
          is_ready: true
        }));
      });
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
  }
  handleTweet = () => {

    const { credential, tweet } = this.state;
    axios.post('http://localhost:3000/api/tweet', {
      accessToken: credential.accessToken,
      secret: credential.secret,
      status: tweet
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
  onTweetChange = (e) => {
    const tweet = e.target.value;
    this.setState(() => ({ 
      tweet,
      charactersUsed: tweet.length
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
              <div className="container">
                <h1 className="title">
                  Welcome, { screen_name }
                </h1>
                <form className="tweet-form" onSubmit={this.handleSubmit}>
                  <div className="time-container">
                    <Select
                      name="select-day"
                      placeholder="Select a day"
                      value={this.state.selectedDay}
                      onChange={this.handleDayChange}
                      required
                      options={[
                        { value: 'Monday', label: 'Monday' },
                        { value: 'Tuesday', label: 'Tuesday' },
                        { value: 'Wednesday', label: 'Wednesday' },
                        { value: 'Thursday', label: 'Thursday' },
                        { value: 'Friday', label: 'Friday' },
                        { value: 'Saturday', label: 'Saturday' },
                        { value: 'Sunday', label: 'Sunday' }
                      ]}
                    />
                    <Select
                      name="select-time"
                      placeholder="Select a time"
                      value={this.state.selectedTime}
                      onChange={this.handleTimeChange}
                      required
                      options={[
                        { value: '0', label: '12 am' },
                        { value: '1', label: '1 am' },
                        { value: '2', label: '2 am' },
                        { value: '3', label: '3 am' },
                        { value: '4', label: '4 am' },
                        { value: '5', label: '5 am' },
                        { value: '6', label: '6 am' },
                        { value: '7', label: '7 am' },
                        { value: '8', label: '8 am' },
                        { value: '9', label: '9 am' },
                        { value: '10', label: '10 am' },
                        { value: '11', label: '11 am' },
                        { value: '12', label: '12 pm' },
                        { value: '13', label: '1 pm' },
                        { value: '14', label: '2 pm' },
                        { value: '15', label: '3 pm' },
                        { value: '16', label: '4 pm' },
                        { value: '17', label: '5 pm' },
                        { value: '18', label: '6 pm' },
                        { value: '19', label: '7 pm' },
                        { value: '20', label: '8 pm' },
                        { value: '21', label: '9 pm' },
                        { value: '22', label: '10 pm' },
                        { value: '23', label: '11 pm' },
                      ]}
                    />
                  </div>
                  <textarea 
                    className="textarea is-large" 
                    placeholder="Compose your tweet here..."
                    maxLength="280"
                    value={this.state.tweet}
                    onChange={this.onTweetChange}
                    required
                  ></textarea>
                  <p>{ charactersUsed }/280</p>
                 <button className="is-success button" onClick={this.analyze}>Analyze</button>
                </form>
                
              </div>
            </div>
          </section>
          <div className="send-tweet-container">
            <h4 className="is-size-4">Satisfied with your score?</h4>
            <button className="bd-tw-button button" onClick={this.handleTweet}>
              <span className="icon"><i className="fa fa-twitter"></i></span><span>Tweet</span>
            </button>
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
                <p className="title">{ klout_score || "n/a" }</p>
              </div>
            </div>
          </nav>


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
export default connect(mapStateToProps)(Dashboard);


// <button className="button is-twitter" onClick={this.handleToggleModal}>Modal</button>
// <button className="button is-twitter" onClick={() => console.log(user)}>Get User</button>


// <div className="level-item has-text-centered">
// <div>
//   <p className="heading">Likes</p>
//   <p className="title">{ favourites_count }</p>
// </div>
// </div>

// <SingleDatePicker
// date={this.state.date} // momentPropTypes.momentObj or null
// onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
// focused={this.state.focused} // PropTypes.bool
// onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
// numberOfMonths={1}
// />
// <TimePickerWrapper />