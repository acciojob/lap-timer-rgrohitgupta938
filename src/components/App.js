import React, { useState, useEffect, useRef } from "react";
import "./../styles/App.css";

const App = () => {
  const [time, setTime] = useState(0);
  const [lap, setlap] = useState([]);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    return clearInterval(intervalRef.current);
  }, []);

  const startTimer = () => {
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 10);
  };

  const stopTimer = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const laps = () => {
    if (running) {
      setlap((prevLaps) => [...prevLaps, time]);
    }
  };

  const resetIimer = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setlap([]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time / 100) % 60);
    const centiseconds = time % 100;
    return `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(
      centiseconds
    )}`;
  };

  const padNumber = (number) => {
    return number.toString().padStart(2, "0");
  };

  return (
    <div>
      <p>{formatTime(time)}</p>
      <div className="btn-grp">
        <button onClick={() => startTimer()}>Start</button>
        <button onClick={() => stopTimer()}>Stop</button>
        <button onClick={() => laps()}>Lap</button>
        <button onClick={() => resetIimer()}>Reset</button>
      </div>
      <ul>
        {lap.map((l, index) => (
          <li key={index}>{formatTime(l)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
