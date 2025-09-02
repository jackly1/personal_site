"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Zap, Cpu, MemoryStick } from "lucide-react";
import type { PerformanceStats } from "@/types";

interface PerformanceMonitorProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  isVisible,
  onToggle,
}) => {
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 60,
    objects: 0,
    triangles: 0,
    memory: 0,
  });
  const [isMonitoring, setIsMonitoring] = useState(false);

  const updateStats = useCallback(() => {
    // FPS calculation
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setStats((prev) => ({ ...prev, fps }));
        frameCount = 0;
        lastTime = currentTime;
      }

      if (isMonitoring) {
        animationId = requestAnimationFrame(measureFPS);
      }
    };

    if (isMonitoring) {
      measureFPS();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isMonitoring]);

  const getMemoryUsage = useCallback(() => {
    if ("memory" in performance) {
      const memory = (
        performance as Performance & {
          memory: {
            usedJSHeapSize: number;
            totalJSHeapSize: number;
            jsHeapSizeLimit: number;
          };
        }
      ).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
      };
    }
    return null;
  }, []);

  const getPerformanceLevel = (fps: number) => {
    if (fps >= 55) return { level: "Excellent", color: "text-green-400" };
    if (fps >= 45) return { level: "Good", color: "text-yellow-400" };
    if (fps >= 30) return { level: "Fair", color: "text-orange-400" };
    return { level: "Poor", color: "text-red-400" };
  };

  useEffect(() => {
    if (isVisible) {
      setIsMonitoring(true);
    } else {
      setIsMonitoring(false);
    }
  }, [isVisible]);

  useEffect(() => {
    const cleanup = updateStats();
    return cleanup;
  }, [updateStats]);

  useEffect(() => {
    const interval = setInterval(() => {
      const memoryInfo = getMemoryUsage();
      if (memoryInfo) {
        setStats((prev) => ({
          ...prev,
          memory: memoryInfo.used,
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getMemoryUsage]);

  const performanceLevel = getPerformanceLevel(stats.fps);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          className="absolute top-16 left-4 bg-black/80 backdrop-blur-md text-white font-mono text-xs p-4 rounded-lg pointer-events-auto border border-gray-700"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="font-semibold">Performance</span>
            </div>
            <button
              onClick={onToggle}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          <div className="space-y-2">
            {/* FPS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span>FPS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={performanceLevel.color}>{stats.fps}</span>
                <span className="text-gray-400 text-xs">
                  ({performanceLevel.level})
                </span>
              </div>
            </div>

            {/* Objects */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-3 h-3 text-green-400" />
                <span>Objects</span>
              </div>
              <span className="text-gray-300">{stats.objects}</span>
            </div>

            {/* Triangles */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-sm" />
                <span>Triangles</span>
              </div>
              <span className="text-gray-300">
                {stats.triangles.toLocaleString()}
              </span>
            </div>

            {/* Memory */}
            {stats.memory && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MemoryStick className="w-3 h-3 text-red-400" />
                  <span>Memory</span>
                </div>
                <span className="text-gray-300">
                  {Math.round(stats.memory / 1024 / 1024)}MB
                </span>
              </div>
            )}

            {/* Performance Bar */}
            <div className="mt-3 pt-2 border-t border-gray-700">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Performance</span>
                <span className={`text-xs ${performanceLevel.color}`}>
                  {performanceLevel.level}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <motion.div
                  className={`h-1.5 rounded-full ${
                    stats.fps >= 55
                      ? "bg-green-400"
                      : stats.fps >= 45
                      ? "bg-yellow-400"
                      : stats.fps >= 30
                      ? "bg-orange-400"
                      : "bg-red-400"
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min((stats.fps / 60) * 100, 100)}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
