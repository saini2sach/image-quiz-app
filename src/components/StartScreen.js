import React, { Component } from 'react';

// Selectable game durations shown as chips. 1 min is the default.
const TIME_OPTIONS = [
  { label: '30 sec', value: 30 },
  { label: '1 min', value: 60 },
  { label: '2 min', value: 120 },
  { label: '3 min', value: 180 }
];

class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTime: 60
    };
    this.selectTime = this.selectTime.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  selectTime = (value) => {
    this.setState({ selectedTime: value });
  }

  handleStart = () => {
    this.props.onStart(this.state.selectedTime);
  }

  render() {
    let { selectedTime } = this.state;
    return (
      <div className="col-10 offset-1 main-content start-screen">
        <h2 className="start-heading">How to Play</h2>
        <ul className="start-rules">
          <li>A picture is shown — pick its correct name from the four options before the timer runs out.</li>
          <li>After each answer the next picture loads automatically; you can also press Continue to move on sooner.</li>
          <li>The timer pauses while a picture is loading, so slow images never cost you time.</li>
          <li>To win: accuracy of at least <b>80%</b> and attempt more than <b>Total&nbsp;Time / 5&nbsp;seconds</b> questions.</li>
        </ul>

        <p className="start-time-label">Choose your time</p>
        <div className="time-chips">
          {TIME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={ 'time-chip' + (selectedTime === opt.value ? ' time-chip-active' : '') }
              onClick={() => this.selectTime(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="continue-btn-wrapper">
          <button className="continue-btn start-game-btn" onClick={this.handleStart}>
            Start Game
          </button>
        </div>
      </div>
    )
  }
}

export default StartScreen;
