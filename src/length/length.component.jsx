import React from "react";

function Length({
  id1,
  increment,
  decrement,
  displayLength,
  title,
  changeTime,
  type,
  time,
  formatTime,
}) {
  return (
    <div>
      <h3 className="break-title" id={id1}>
        {title}
      </h3>
      <div className="set-time break-set-time">
        <button
          className="btn btn-remove"
          id={decrement}
          onClick={() => changeTime(-60, type)}
        >
          <ion-icon className="icon" name="remove-circle-outline"></ion-icon>
        </button>
        <h3 id={displayLength}>{formatTime(time)}</h3>
        <button
          className="btn btn-add"
          id={increment}
          onClick={formatTime(time) < 60 ? () => changeTime(60, type) : null}
        >
          <ion-icon className="icon" name="add-circle-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}
export default Length;
