import React from 'react';
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';

class TimePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    const { defaultTime, meridiem, focused, showTimezone, timezone } = props;
    let hour = '';
    let minute = '';

    this.state = {
      hour,
      minute,
      meridiem,
      focused,
      timezone,
      showTimezone,
    };

    this.onFocusChange = this.onFocusChange.bind(this);
    this.onHourChange = this.onHourChange.bind(this);
    this.onMeridiemChange = this.onMeridiemChange.bind(this);
    this.onMinuteChange = this.onMinuteChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.handleFocusedChange = this.handleFocusedChange.bind(this);
  }

  onHourChange(hour) {
    this.setState({ hour });
  }

  onMinuteChange(minute) {
    this.setState({ minute });
  }

  onTimeChange(time) {
    const [hour, minute] = time.split(':');
    this.setState({ hour, minute });
  }

  onMeridiemChange(meridiem) {
    this.setState({ meridiem });
  }

  onFocusChange(focused) {
    this.setState({ focused });
  }

  handleFocusedChange() {
    const { focused } = this.state;
    this.setState({ focused: !focused });
  }

  get basicTrigger() {
    const { hour, minute } = this.state;
    return (
      <div
        onClick={this.handleFocusedChange}
        className="time_picker_trigger"
      >
        <div>
          Click to open panel<br />
          {hour}:{minute}
        </div>
      </div>
    );
  }

  render() {
    const {
      hour,
      minute,
      focused,
      meridiem,
      timezone,
      showTimezone,
    } = this.state;

    return (
      <div className="time_picker_wrapper">
        <TimePicker
          {...this.props}
          focused={focused}
          meridiem={meridiem}
          timezone={timezone}
          trigger={this.trigger}
          onFocusChange={this.onFocusChange}
          onHourChange={this.onHourChange}
          onMeridiemChange={this.onMeridiemChange}
          onMinuteChange={this.onMinuteChange}
          onTimeChange={this.onTimeChange}
          showTimezone={showTimezone}
          time={hour && minute ? `${hour}:${minute}` : null}
          theme="material"
          colorPalette="dark"
          withoutIcon={true}
        />
      </div>
    );
  }
}

TimePickerWrapper.defaultProps = {
  defaultTime: null,
  focused: false,
  meridiem: null,
  showTimezone: false
};

export default TimePickerWrapper;