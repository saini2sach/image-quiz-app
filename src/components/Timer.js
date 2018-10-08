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
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextState !== this.state;
  }

  render() {

    let {count, min, sec} = this.state;

    let timerId = setTimeout( () => {
    	this.setState( (prevState) => ({
        sec: (prevState.sec === 0) ? 59 : prevState.sec - 1,
        min: (prevState.sec === 0) ? prevState.min - 1 : prevState.min,
        count: prevState.count - 1
      }))
    }, 1000);

    if(count <= 0 ){
    	clearTimeout(timerId);
      this.props.showResult();
    }

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