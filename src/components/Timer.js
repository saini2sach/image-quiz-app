import React, { Component } from 'react';
import '../css/timer.css'

class Timer extends Component {
  constructor(props) {
    super(props);
    const minPart = Math.floor(this.props.totalSecs / 60);
    const secPart = this.props.totalSecs % 60;
    this.state = {
      min: minPart,
      sec: secPart,
      count: this.props.totalSecs
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    // Single steady clock for the whole game. It keeps firing every second,
    // but tick() freezes the countdown while an image is still loading.
    this.intervalId = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  tick() {
    // Pause the countdown while the puzzle image is loading so slow image
    // fetches don't eat into the player's time.
    if (this.props.paused) {
      return;
    }

    this.setState( (prevState) => ({
      sec: (prevState.sec === 0) ? 59 : prevState.sec - 1,
      min: (prevState.sec === 0) ? prevState.min - 1 : prevState.min,
      count: prevState.count - 1
    }), () => {
      if (this.state.count <= 0) {
        clearInterval(this.intervalId);
        this.props.showResult();
      }
    });
  }

  render() {
    let {min, sec} = this.state;

    return (
      <div className="clock-timer">
        <span className="min-clock">
            {(min < 10) ? '0'+ min : min}
            <span className="overed"> </span>
          </span>
          <span className="clock-seprator"> : </span>
          <span className="sec-clock">
              {(sec < 10) ? '0'+sec : sec}
              <span className="overed"> </span>
          </span>
      </div>
    )
  }
}

export default Timer;
