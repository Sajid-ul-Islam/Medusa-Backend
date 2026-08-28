"use client";

import { useState, useEffect } from "react";
import { Headphones, Play, Pause, Volume2, RotateCcw, FastForward } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudiobookPlayerProps {
  title: string;
  narrator?: string;
  duration?: string;
}

export function AudiobookPlayer({
  title,
  narrator = "Professional Voice Artist",
  duration = "3:45",
}: AudiobookPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5 | 2>(1);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const cycleSpeed = () => {
    if (playbackSpeed === 1) setPlaybackSpeed(1.25);
    else if (playbackSpeed === 1.25) setPlaybackSpeed(1.5);
    else if (playbackSpeed === 1.5) setPlaybackSpeed(2);
    else setPlaybackSpeed(1);
  };

  return (
    <div className="my-6 p-5 rounded-2xl border bg-gradient-to-r from-amber-500/10 via-card to-card shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Headphones className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-sm leading-tight flex items-center gap-2">
              Audiobook Voice Sample
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                Narrated
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Narrator: {narrator} • Preview: {duration}
            </div>
          </div>
        </div>

        <button
          onClick={cycleSpeed}
          className="px-2.5 py-1 rounded-lg border bg-background text-xs font-bold hover:bg-muted transition"
        >
          {playbackSpeed}x
        </button>
      </div>

      {/* Progress Scrubber */}
      <div className="space-y-1">
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setProgress(Math.round(clickPos * 100));
          }}
          className="h-2 w-full bg-muted rounded-full overflow-hidden cursor-pointer relative"
        >
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
          <span>0:{String(Math.floor((progress / 100) * 225)).padStart(2, "0")}</span>
          <span>{duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setProgress(Math.max(0, progress - 10))}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition"
            aria-label="Rewind 10 seconds"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <Button
            size="sm"
            onClick={togglePlay}
            className="bg-amber-600 hover:bg-amber-500 text-white gap-1.5 h-8 px-4 text-xs font-bold"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" /> Pause Preview
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" /> Play Audio Sample
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Volume2 className="h-3.5 w-3.5" /> Studio Mastered
        </div>
      </div>
    </div>
  );
}
