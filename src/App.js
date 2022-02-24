import { useEffect, useRef, useState } from "react";
import "./App.css";
import beep from "./go-beep.mp3";
import Length from "./length/length.component";

function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  // const [displayTime, setDisplayTime] = useState(5);
  // const [breakTime, setBreakTime] = useState(3);
  // const [sessionTime, setSessionTime] = useState(5);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  let player = useRef(null);

  const playBreakSound = () => {
    player.currentTime = 0;
    player.play();
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const formatTime1 = (time) => {
    let minutes = Math.floor(time / 60);

    return minutes;
  };

  const changeTime = (amount, type) => {
    if (type == "break") {
      if (breakTime <= 60 && amount < 0) return;

      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }

      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };

  useEffect(() => {
    if (displayTime <= 0) {
      setOnBreak(true);
      playBreakSound();
    } else if (!timerOn && displayTime === breakTime) {
      setOnBreak(false);
    }
  }, [displayTime, breakTime, sessionTime, timerOn, onBreak]);

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;

    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVariable) {
              onBreakVariable = true;
              return breakTime;
            } else if (prev <= 0 && onBreakVariable) {
              onBreakVariable = false;
              setOnBreak(false);
              return sessionTime;
            }

            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }

    setTimerOn(!timerOn);
  };

  const resetTime = () => {
    clearInterval(localStorage.getItem("interval-id"));

    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setTimerOn(false);
    setOnBreak(false);
    player.pause();
    player.currentTime = 0;
  };

  return (
    <div className="App container">
      <h1>25 + 5 Clock</h1>
      <div className="set-time-chunk break-length">
        <Length
          id1={"break-label"}
          increment={"break-increment"}
          decrement={"break-decrement"}
          displayLength={"break-length"}
          title={"Break Length"}
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime1}
        />
        <Length
          id1="session-label"
          increment={"session-increment"}
          decrement={"session-decrement"}
          displayLength={"session-length"}
          title={"Session Length"}
          changeTime={changeTime}
          type={"session"}
          time={sessionTime}
          formatTime={formatTime1}
        />
      </div>
      <h2 className="countdown-title" id="timer-label">
        {onBreak ? "Break" : "Session"}
      </h2>
      <p className="countdown-timer" id="time-left">
        {formatTime(displayTime)}
      </p>
      <div className="stop-go-reset">
        <div className="stop-go">
          <button
            className=" btn go stop-go-btn"
            id="start_stop"
            onClick={controlTime}
          >
            {timerOn ? (
              <ion-icon name="pause-circle-outline"></ion-icon>
            ) : (
              <ion-icon name="play-circle-outline"></ion-icon>
            )}
          </button>
        </div>

        <button
          className="btn reset stop-go-btn"
          id="reset"
          onClick={resetTime}
        >
          <ion-icon name="refresh-circle-outline"></ion-icon>
        </button>
      </div>

      <audio ref={(t) => (player = t)} src={beep} id="beep" />
    </div>
  );
}

export default App;
