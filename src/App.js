import React from "react";
import Countdown from "react-countdown";
import Counter from "./counter/counter.component";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 1,
      sessionLength: 5,
    };
  }

  handlerSessionAdd = () => {
    this.setState((prevState) => ({
      sessionLength: prevState.sessionLength + 1,
    }));
  };
  handlerSessionSubtract = () => {
    this.setState((prevState) => ({
      sessionLength: prevState.sessionLength - 1,
    }));
  };
  handlerBreakAdd = () => {
    this.setState((prevState) => ({
      breakLength: prevState.breakLength + 1,
    }));
  };
  handlerBreakSubtract = () => {
    this.setState((prevState) => ({
      breakLength: prevState.breakLength - 1,
    }));
  };

  render() {
    return (
      <div className="container">
        <h1>25 + 5 Clock</h1>
        <div className="clock-face">
          <div className="set-time-section">
            <div className="set-time-chunk break-length">
              <h3 id="break-label" className="break-title">
                Break Length
              </h3>
              <div className="set-time break-set-time">
                <button
                  onClick={
                    this.state.breakLength > 1
                      ? () => this.handlerBreakSubtract()
                      : null
                  }
                  id="break-decrement"
                  className="btn btn-remove"
                >
                  <ion-icon
                    className="icon"
                    name="remove-circle-outline"
                  ></ion-icon>
                </button>
                <span id="break-length">{this.state.breakLength || 5}</span>
                <button
                  onClick={
                    this.state.breakLength < 60
                      ? () => this.handlerBreakAdd()
                      : null
                  }
                  id="break-increment"
                  className="btn btn-add"
                >
                  <ion-icon
                    className="icon"
                    name="add-circle-outline"
                  ></ion-icon>
                </button>
              </div>
            </div>
            <div className=" set-time-chunk session-length">
              <h3 id="session-label" className="session-title">
                Session Length
              </h3>
              <div className=" set-time session-set-time">
                <button
                  onClick={
                    this.state.sessionLength > 1
                      ? () => this.handlerSessionSubtract()
                      : null
                  }
                  id="session-decrement"
                  className="btn btn-remove"
                >
                  <ion-icon name="remove-circle-outline"></ion-icon>
                </button>
                <span id="session-length">
                  {this.state.sessionLength || 25}
                </span>
                <button
                  onClick={
                    this.state.sessionLength < 60
                      ? () => this.handlerSessionAdd()
                      : null
                  }
                  id="session-increment"
                  className="btn btn-add"
                >
                  <ion-icon
                    className="icon"
                    name="add-circle-outline"
                  ></ion-icon>
                </button>
              </div>
            </div>
          </div>

          <Counter props={this.state} />
        </div>
      </div>
    );
  }
}

export default App;
