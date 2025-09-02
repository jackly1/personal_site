"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Star,
  Target,
  Clock,
  MapPin,
  MessageSquare,
} from "lucide-react";
import type { GameState, Landmark } from "@/types";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  condition: (gameState: GameState, landmarks: Landmark[]) => boolean;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface AchievementSystemProps {
  gameState: GameState;
  landmarks: Landmark[];
  onAchievementUnlocked: (achievement: Achievement) => void;
}

export const AchievementSystem: React.FC<AchievementSystemProps> = ({
  gameState,
  landmarks,
  onAchievementUnlocked,
}) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentUnlocks, setRecentUnlocks] = useState<Achievement[]>([]);

  const allAchievements: Achievement[] = [
    {
      id: "first-stop",
      title: "First Stop",
      description: "Stop at your first landmark",
      icon: <MapPin className="w-6 h-6" />,
      condition: (gameState) => gameState.visitedLandmarks.length >= 1,
      points: 50,
      unlocked: false,
    },
    {
      id: "explorer",
      title: "Explorer",
      description: "Visit 5 different landmarks",
      icon: <Target className="w-6 h-6" />,
      condition: (gameState) => gameState.visitedLandmarks.length >= 5,
      points: 200,
      unlocked: false,
    },
    {
      id: "completionist",
      title: "Completionist",
      description: "Visit all landmarks",
      icon: <Trophy className="w-6 h-6" />,
      condition: (gameState, landmarks) =>
        gameState.visitedLandmarks.length >= landmarks.length,
      points: 500,
      unlocked: false,
    },
    {
      id: "high-scorer",
      title: "High Scorer",
      description: "Reach 1000 points",
      icon: <Star className="w-6 h-6" />,
      condition: (gameState) => gameState.score >= 1000,
      points: 100,
      unlocked: false,
    },
    {
      id: "speed-demon",
      title: "Speed Demon",
      description: "Visit 3 landmarks in under 5 minutes",
      icon: <Clock className="w-6 h-6" />,
      condition: (gameState) => gameState.visitedLandmarks.length >= 3,
      points: 300,
      unlocked: false,
    },
    {
      id: "social-butterfly",
      title: "Social Butterfly",
      description: "Leave messages at 3 different landmarks",
      icon: <MessageSquare className="w-6 h-6" />,
      condition: (gameState) => gameState.visitedLandmarks.length >= 3,
      points: 150,
      unlocked: false,
    },
  ];

  useEffect(() => {
    // Check for new achievements
    const updatedAchievements = allAchievements.map((achievement) => {
      const isUnlocked = achievement.condition(gameState, landmarks);
      const wasUnlocked =
        achievements.find((a) => a.id === achievement.id)?.unlocked || false;

      if (isUnlocked && !wasUnlocked) {
        const unlockedAchievement = {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date(),
        };

        setRecentUnlocks((prev) => [unlockedAchievement, ...prev.slice(0, 2)]);
        onAchievementUnlocked(unlockedAchievement);

        return unlockedAchievement;
      }

      return {
        ...achievement,
        unlocked:
          achievements.find((a) => a.id === achievement.id)?.unlocked || false,
        unlockedAt: achievements.find((a) => a.id === achievement.id)
          ?.unlockedAt,
      };
    });

    setAchievements(updatedAchievements);
  }, [gameState, landmarks]);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalPoints = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <>
      {/* Achievement Notifications */}
      <AnimatePresence>
        {recentUnlocks.map((achievement, index) => (
          <motion.div
            key={`${achievement.id}-${achievement.unlockedAt?.getTime()}`}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ delay: index * 0.1 }}
            className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg max-w-sm"
          >
            <div className="flex items-center gap-3">
              <div className="text-yellow-200">{achievement.icon}</div>
              <div>
                <h4 className="font-bold text-sm">Achievement Unlocked!</h4>
                <p className="text-xs opacity-90">{achievement.title}</p>
                <p className="text-xs opacity-75">
                  +{achievement.points} points
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Achievement Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-20 right-4 bg-black/70 backdrop-blur-md text-white px-4 py-3 rounded-lg pointer-events-auto"
      >
        <div className="flex items-center gap-3 text-sm">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <div>
            <div className="font-semibold">
              {unlockedCount}/{achievements.length} Achievements
            </div>
            <div className="text-xs opacity-75">
              {totalPoints} points earned
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
