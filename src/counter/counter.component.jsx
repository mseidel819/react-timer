import Countdown from "react-countdown";
import "./counter.styles.css";
import React from "react";
import stop from "../beep.mp3";
import go from "../go-beep.mp3";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "Session",
      run: true,
      change: 0,
    };
  }

  changeTimer = () => {
    // run = !run;

    this.setState((prevState) => ({
      run: !prevState.run,
    }));
    this.setState((prevState) => ({
      change: prevState.change + 1,
    }));
    this.state.label === "Session"
      ? this.setState({
          label: "Break",
        })
      : this.setState({
          label: "Session",
        });
  };
  // console.log(changeTimer());
  render() {
    const timer = this.state.run
      ? this.props.props.sessionLength
      : this.props.props.breakLength;
    // const timer = 3;

    const timeoutFunc = () => {
      let stop1 = new Audio(stop);
      let go1 = new Audio(go);

      setTimeout(() => {
        this.changeTimer();
        this.state.label === "Session" ? stop1.play() : go1.play();
      }, 1000);
    };

    return (
      <div>
        <div className=" set-time-chunk countdown-container">
          <h2 id="timer-label" className="countdown-title">
            {this.state.label}
          </h2>
          <div id="time-left" className="countdown-timer">
            <Countdown
              // intervalDelay={0}
              // precision={4}
              key={this.state.change}
              onComplete={() => timeoutFunc()}
              date={Date.now() + timer * 60000}
              autoStart={this.state.change === 0 ? false : true}
              renderer={(props) => {
                return (
                  <div>
                    <p id="time-left">
                      {props.hours === 1
                        ? (props.minutes = 60)
                        : props.minutes >= 10 && props.minutes !== 60
                        ? props.minutes
                        : "0" + props.minutes}
                      :
                      {props.seconds < 10 ? "0" + props.seconds : props.seconds}
                    </p>
                    <div className="stop-go-reset">
                      <div id="start_stop" className="stop-go">
                        <button
                          onClick={() => props.api.start()}
                          className={
                            props.api.isStopped() || props.api.isPaused()
                              ? " btn go stop-go-btn"
                              : " btn go stop-go-btn hidden"
                          }
                        >
                          <ion-icon name="play-circle-outline"></ion-icon>
                        </button>
                        <button
                          onClick={() => props.api.pause()}
                          className={
                            props.api.isStopped() || props.api.isPaused()
                              ? "btn stop stop-go-btn hidden"
                              : "btn stop stop-go-btn "
                          }
                        >
                          <ion-icon name="pause-circle-outline"></ion-icon>
                        </button>
                      </div>
                      <div id="reset" className="reset">
                        <button
                          onClick={() => window.location.reload()}
                          className="btn reset stop-go-btn"
                        >
                          <ion-icon name="refresh-circle-outline"></ion-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Counter;
