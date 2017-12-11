import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import TimePickerWrapper from './TimePickerWrapper';
class Adjust extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: false
    };
  }
 
  render() {
    return (
      <div className="container">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Adjust</h1>
              <h2 className="subtitle">Let's fine tune this</h2>
              <div className="adjust-settings">
                <SingleDatePicker
                  date={this.state.date} // momentPropTypes.momentObj or null
                  onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                  focused={this.state.focused} // PropTypes.bool
                  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                  numberOfMonths={1}
                />
                <TimePickerWrapper />
              </div> 
              <button className="bd-tw-button button test-button">
                <span className="icon">
                  <i className="fa fa-twitter"></i>
                </span>
                <span>
                  Test
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    );

  }
}
export default Adjust;