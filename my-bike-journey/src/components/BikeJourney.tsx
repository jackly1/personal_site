"use client";

import { Suspense, lazy, useState, useCallback, useEffect } from "react";
import type { Application } from "@splinetool/runtime";

// Spline event types
interface SplineEvent {
  target: {
    name: string;
  };
}

interface SplineApp extends Application {
  scene?: {
    children?: unknown[];
  };
}

const Spline = lazy(() => import("@splinetool/react-spline"));

interface Landmark {
  id: string;
  title: string;
  description: string;
  details: string;
  splineObjectName: string;
}

const landmarks: Landmark[] = [
  {
    id: "movie-theater",
    title: "Movie Theater",
    description:
      "This is where my passion for storytelling began. Growing up, I spent countless hours here, absorbing narratives that would later influence my approach to creating immersive digital experiences.",
    details:
      "Just like films transport audiences to different worlds, I strive to create web experiences that captivate and engage users from the first interaction.",
    splineObjectName: "MovieTheater_Stop",
  },
  {
    id: "soccer-pitch",
    title: "Soccer Pitch",
    description:
      "Team collaboration and strategic thinking were forged on this field. Every match taught me about coordination, timing, and the importance of each player's role.",
    details:
      "In development, like in soccer, success comes from understanding how individual components work together to create something greater than the sum of their parts.",
    splineObjectName: "SoccerPitch_Stop",
  },
];

export default function BikeJourney() {
  const [app, setApp] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLandmark, setActiveLandmark] = useState<Landmark | null>(null);
  const [nearStopSign, setNearStopSign] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({ fps: 60, objects: 0, triangles: 0 });

  const SPLINE_SCENE_URL =
    process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ||
    "https://prod.spline.design/XXXXXXXXXXXX/scene.splinecode";

  const onLoad = useCallback((splineApp: Application) => {
    setApp(splineApp);
    setIsLoading(false);

    // Get scene stats if available
    const app = splineApp as SplineApp;
    if (app.scene) {
      const objectCount = app.scene.children?.length || 0;
      setStats((prev) => ({ ...prev, objects: objectCount }));
    }
  }, []);

  const onMouseDown = useCallback((e: unknown) => {
    const event = e as SplineEvent;
    const landmarkMatch = landmarks.find(
      (l) =>
        event.target.name === l.splineObjectName ||
        event.target.name.includes("StopSign")
    );

    if (landmarkMatch) {
      setActiveLandmark(landmarkMatch);
    }
  }, []);

  const onMouseHover = useCallback((e: unknown) => {
    const event = e as SplineEvent;
    const isNearStop = landmarks.some(
      (l) =>
        event.target.name === l.splineObjectName ||
        event.target.name.includes("StopSign")
    );
    setNearStopSign(isNearStop);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ": {
          e.preventDefault();
          if (nearStopSign && app) {
            app.emitEvent("keyDown", "Space");
          }
          break;
        }
        case "p":
        case "P": {
          setShowStats((prev) => !prev);
          break;
        }
        case "Escape": {
          setActiveLandmark(null);
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nearStopSign, app]);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId = 0 as number;

    const updateFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setStats((prev) => ({ ...prev, fps }));
        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(updateFPS);
    };

    if (showStats) {
      updateFPS();
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [showStats]);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="mt-4 text-white text-lg font-medium">
            Loading 3D Experience...
          </p>
        </div>
      )}

      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <Spline
          scene={SPLINE_SCENE_URL}
          onLoad={onLoad}
          onMouseDown={onMouseDown}
          onMouseOver={onMouseHover}
          className="w-full h-full"
        />
      </Suspense>

      <div className="absolute inset-0 pointer-events-none z-10">
        {showStats && (
          <div className="absolute top-5 left-5 bg-black/70 text-green-400 font-mono text-xs p-3 rounded pointer-events-auto">
            <div>FPS: {stats.fps}</div>
            <div>Objects: {stats.objects}</div>
            <div>Triangles: {stats.triangles}</div>
          </div>
        )}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-6 py-4 rounded-xl pointer-events-auto">
          <h3 className="text-sm opacity-90 mb-2">Navigate Your Journey</h3>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/20 rounded font-semibold">
                SPACE
              </kbd>
              <span>Stop at landmarks</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/20 rounded font-semibold">
                ←→
              </kbd>
              <span>Steer</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/20 rounded font-semibold">
                P
              </kbd>
              <span>Stats</span>
            </div>
          </div>
        </div>

        {nearStopSign && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500/10 border-2 border-red-500/50 text-white px-5 py-3 rounded-lg font-semibold">
            Press SPACE to learn more
          </div>
        )}

        <div
          className={`absolute top-1/2 -translate-y-1/2 w-96 bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl pointer-events-auto transition-all duration-500 ${
            activeLandmark ? "right-8" : "-right-full"
          }`}
        >
          {activeLandmark && (
            <>
              <button
                onClick={() => setActiveLandmark(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/10 hover:bg-black/20 rounded-full transition-colors"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {activeLandmark.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {activeLandmark.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {activeLandmark.details}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
