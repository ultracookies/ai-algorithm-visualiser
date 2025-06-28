"use client";

import { useState } from "react";

// MediaControls.tsx
import React from "react";
import { Rewind, Pause, FastForward } from "lucide-react";

const iconButtonClasses =
  "flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition";

export function MediaControls() {
  return (
    <div className="flex gap-10 justify-center">
      <button className={iconButtonClasses} aria-label="Rewind">
        <Rewind />
      </button>
      <button className={iconButtonClasses} aria-label="Pause">
        <Pause />
      </button>
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
