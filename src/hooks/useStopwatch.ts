import { useRef, useState } from "react";
import startAnimationLoop from "../lib/startAnimationLoop";

export default function useStopwatch() {
  const lastFrameTimestamp = useRef(Date.now());
  const stopAnimationLoop = useRef(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapMark, setLapMark] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  function startStopwatch() {
    setIsRunning(true);
    lastFrameTimestamp.current = Date.now();
    stopAnimationLoop.current = startAnimationLoop(() => {
      let now = Date.now();
      let timeElapsed = now - lastFrameTimestamp.current;
      lastFrameTimestamp.current = now;

      setTime((prevTime) => prevTime + timeElapsed);
    });
  }
  function stopStopwatch() {
    if (!isRunning) return;
    stopAnimationLoop.current?.();
    setIsRunning(false);
  }

  function resetStopwatch() {
    stopStopwatch();
    setTime(0);
    setLapMark(0);
    setLaps([]);
  }

  function recordLap() {
    if (!isRunning) return;
    const currentLap = time - lapMark;

    setLapMark(time);
    setLaps((laps) => [...laps, currentLap]);
  }

  return {
    time,
    stopStopwatch,
    startStopwatch,
    resetStopwatch,
    isRunning,
    recordLap,
    laps,
  };
}
