"use client";

import { useState } from "react";

// MediaControls.tsx
import React from "react";
import { Rewind, Pause, FastForward, Play } from "lucide-react";

const iconButtonClasses =
  "flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition";

const PlayPauseButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const toggle = () => setIsPlaying(!isPlaying);

  return (
    <button
      className="flex justify-center items-center bg-blue-500 text-white w-12 h-12 rounded-full transition-all duration-300 ease-in-out hover:scale-110"
      onClick={toggle}
    >
      {isPlaying ? <Pause size={32} /> : <Play size={32} />}
    </button>
  );
};

export function MediaControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const toggle = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex gap-10 justify-center mt-7">
      <button className={iconButtonClasses} aria-label="Rewind">
        <Rewind />
      </button>
      <PlayPauseButton />
      <button className={iconButtonClasses} aria-label="Fast Forward">
        <FastForward />
      </button>
    </div>
  );
}

export function SeekBar({ numEpisodes }: { numEpisodes: number }) {
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEpisode(parseInt(e.target.value));
  };
  const formatEpisode = (episode: number) => {
    return `Episode: ${episode}`;
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
        onChange={handleSeek}
      />
    </div>
  );
}
