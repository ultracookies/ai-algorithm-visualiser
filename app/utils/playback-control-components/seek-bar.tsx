"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

// MediaControls.tsx
import React from "react";
import { Rewind, Pause, FastForward, Play } from "lucide-react";

import { GreedySimulationContainer } from "../../rl-algos/dqn/dqnComponents";

const iconButtonClasses =
  "flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition";

export const Idk = memo(({ numEpisodes }: { numEpisodes: number }) => {
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePauseBtn = useCallback(() => setIsPaused(!isPaused), [isPaused]);

  console.log("Idk re-render");

  const handleCurrentEpisodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentEpisode(Number(e.target.value));
  };

  const incrementCurrentEpisode = () => {
    const newEpisode =
      currentEpisode < numEpisodes ? currentEpisode + 1 : currentEpisode;
    setCurrentEpisode(newEpisode);
  };

  const pauseTheUpdates = () => {
    setIsPaused(true);
  };

  return (
    <>
      <MediaControls isPaused={isPaused} handlePauseBtn={handlePauseBtn} />
      <SeekBar
        numEpisodes={numEpisodes}
        currentEpisode={currentEpisode}
        handleCurrentEpisodeChange={handleCurrentEpisodeChange}
        incrementCurrentEpisode={incrementCurrentEpisode}
        pauseTheUpdates={pauseTheUpdates}
        isPaused={isPaused}
      />
      <GreedySimulationContainer isPaused={isPaused} />
    </>
  );
});
// memoize this
export const MediaControls = memo(
  ({
    isPaused,
    handlePauseBtn,
  }: {
    isPaused: boolean;
    handlePauseBtn: () => void;
  }) => {
    console.log("mediacontrols re-render");
    return (
      <div className="flex gap-10 justify-center mt-7">
        <button className={iconButtonClasses} aria-label="Rewind">
          <Rewind />
        </button>
        <PlayPauseButton isPaused={isPaused} handlePauseBtn={handlePauseBtn} />
        <button className={iconButtonClasses} aria-label="Fast Forward">
          <FastForward />
        </button>
      </div>
    );
  }
);

function SeekBar({
  numEpisodes,
  currentEpisode,
  incrementCurrentEpisode,
  handleCurrentEpisodeChange,
  isPaused,
  pauseTheUpdates,
}: {
  numEpisodes: number;
  currentEpisode: number;
  incrementCurrentEpisode: () => void;
  handleCurrentEpisodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPaused: boolean;
  pauseTheUpdates: () => void;
}) {
  const formatEpisode = (episode: number) => {
    return `Episode: ${episode}`;
  };
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  console.log("seekbar re-render");

  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      incrementCurrentEpisode();
    }, 2000);

    return () => clearInterval(intervalRef.current!);
  });

  const handleMouseDown = () => {
    clearInterval(intervalRef.current!);
    pauseTheUpdates();
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-row gap-2">
        <span style={{ color: "white" }}>{formatEpisode(currentEpisode)}</span>
      </div>

      <input
        type="range"
        min="0"
        max={numEpisodes}
        value={currentEpisode}
        onMouseDown={handleMouseDown}
        onChange={handleCurrentEpisodeChange}
      />
    </div>
  );
}

const PlayPauseButton = ({
  isPaused,
  handlePauseBtn,
}: {
  isPaused: boolean;
  handlePauseBtn: () => void;
}) => {
  const toggle = () => handlePauseBtn();

  console.log("playpause re-render");

  return (
    <button
      className="flex justify-center items-center bg-blue-500 text-white w-12 h-12 rounded-full transition-all duration-300 ease-in-out hover:scale-110"
      onClick={toggle}
    >
      {isPaused ? <Play size={32} /> : <Pause size={32} />}
    </button>
  );
};
