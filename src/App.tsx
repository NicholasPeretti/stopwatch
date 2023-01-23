import React from "react";
import Button from "./components/Button";
import useStopwatch from "./hooks/useStopwatch";
import formatDuration from "./lib/formatDuration";

import "./main.css";

export default function App() {
  const {
    time,
    startStopwatch,
    stopStopwatch,
    isRunning,
    resetStopwatch,
    laps,
    recordLap,
  } = useStopwatch();

  const { ms, secs, mins } = formatDuration(time);

  return (
    <div className="flex flex-col h-full w-full justify-between">
      <div className="text-8xl font-mono pt-4 sticky top-0 mx-auto">
        {mins}:<span className="font-extralight">{secs}</span>
        <span className="text-3xl">,{ms}</span>
      </div>
      <ul className="text-xl pl-2 h-full w-[360px] mx-auto pb-[135px] overflow-auto">
        {laps.map((lapTime, index) => {
          const { ms, secs, mins } = formatDuration(lapTime);
          return (
            <li key={index}>
              <span className="text-[#999] font-mono">
                LAP {index.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
                &ensp;&#8212;&ensp;
              </span>
              {mins}:{secs}
              <span className="text-sm">,{ms}</span>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col w-full text-2xl fixed bottom-0">
        <Button
          disabled={!isRunning}
          className={`${
            isRunning ? "mb-0" : "-mb-[65px]"
          } transition-[margin] duration-300`}
          onClick={() => {
            recordLap();
          }}
        >
          Lap
        </Button>
        <div className="flex justify-center w-full">
          <Button
            onClick={() => {
              isRunning ? stopStopwatch() : startStopwatch();
            }}
          >
            {isRunning ? "pause" : "start"}
          </Button>
          <Button
            onClick={() => {
              resetStopwatch();
            }}
          >
            reset
          </Button>
        </div>
      </div>
    </div>
  );
}
