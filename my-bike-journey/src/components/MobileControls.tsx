"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Square, Play } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

interface MobileControlsProps {
  onSteerLeft: () => void;
  onSteerRight: () => void;
  onStop: () => void;
  onPlay: () => void;
  isPlaying: boolean;
  nearStopSign: boolean;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  onSteerLeft,
  onSteerRight,
  onStop,
  onPlay,
  isPlaying,
  nearStopSign,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 right-4 z-20 md:hidden"
    >
      <div className="bg-black/70 backdrop-blur-md rounded-2xl p-4">
        {/* Stop/Play Button */}
        <div className="flex justify-center mb-4">
          <Button
            onClick={isPlaying ? onStop : onPlay}
            className={cn(
              "w-16 h-16 rounded-full",
              nearStopSign
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            )}
          >
            {isPlaying ? (
              <Square className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Steering Controls */}
        <div className="flex justify-between items-center">
          <Button
            onClick={onSteerLeft}
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>

          <div className="text-center text-white text-xs">
            <div className="font-semibold">Steer</div>
            <div className="opacity-70">Touch to turn</div>
          </div>

          <Button
            onClick={onSteerRight}
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Stop Sign Indicator */}
        {nearStopSign && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 text-center"
          >
            <div className="text-red-400 text-sm font-semibold">
              Tap to stop and explore!
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
