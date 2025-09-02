"use client";

import {
  Suspense,
  lazy,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  BarChart3,
  MessageSquare,
  Trophy,
  Settings,
  MapPin,
} from "lucide-react";
import type { Application } from "@splinetool/runtime";
import { Button } from "./ui/Button";
import { GuestbookModal } from "./GuestbookModal";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { cn } from "@/lib/utils";
import type {
  Landmark,
  GuestbookEntry,
  PerformanceStats,
  GameState,
  SplineEvent,
  SplineApp,
} from "@/types";

const Spline = lazy(() => import("@splinetool/react-spline"));

export default function BikeJourney() {
  const [app, setApp] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLandmark, setActiveLandmark] = useState<Landmark | null>(null);
  const [nearStopSign, setNearStopSign] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showGuestbook, setShowGuestbook] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>(
    []
  );
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 60,
    objects: 0,
    triangles: 0,
  });
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: true,
    currentSpeed: 1,
    score: 0,
    visitedLandmarks: [],
  });

  const visitStartTime = useRef<number | null>(null);
  const landmarkVisitStartTime = useRef<number | null>(null);

  const SPLINE_SCENE_URL =
    process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ||
    "https://prod.spline.design/XXXXXXXXXXXX/scene.splinecode";

  // Initialize visitor tracking
  useEffect(() => {
    const initializeVisitor = async () => {
      try {
        const response = await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userAgent: navigator.userAgent,
            country: "Unknown", // Could integrate with IP geolocation
            city: "Unknown",
          }),
        });
        const data = await response.json();
        setVisitorId(data.visitorId);
        visitStartTime.current = Date.now();
      } catch (error) {
        console.error("Error initializing visitor:", error);
      }
    };

    initializeVisitor();
  }, []);

  // Load landmarks from API
  useEffect(() => {
    const loadLandmarks = async () => {
      try {
        const response = await fetch("/api/landmarks");
        const data = await response.json();
        setLandmarks(data.landmarks);
      } catch (error) {
        console.error("Error loading landmarks:", error);
        // Fallback to hardcoded landmarks
        setLandmarks([
          {
            id: "movie-theater",
            title: "Movie Theater",
            description:
              "This is where my passion for storytelling began. Growing up, I spent countless hours here, absorbing narratives that would later influence my approach to creating immersive digital experiences.",
            details:
              "Just like films transport audiences to different worlds, I strive to create web experiences that captivate and engage users from the first interaction.",
            splineObjectName: "MovieTheater_Stop",
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "soccer-pitch",
            title: "Soccer Pitch",
            description:
              "Team collaboration and strategic thinking were forged on this field. Every match taught me about coordination, timing, and the importance of each player's role.",
            details:
              "In development, like in soccer, success comes from understanding how individual components work together to create something greater than the sum of their parts.",
            splineObjectName: "SoccerPitch_Stop",
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }
    };

    loadLandmarks();
  }, []);

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

  // Track visit when leaving landmark
  const trackVisit = useCallback(
    async (landmarkId?: string) => {
      if (!visitorId) return;

      const duration = landmarkVisitStartTime.current
        ? Math.floor((Date.now() - landmarkVisitStartTime.current) / 1000)
        : undefined;

      try {
        await fetch("/api/visits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorId,
            landmarkId,
            duration,
          }),
        });
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    },
    [visitorId]
  );

  // Load guestbook entries for a landmark
  const loadGuestbookEntries = useCallback(async (landmarkId: string) => {
    try {
      const response = await fetch(`/api/guestbook?landmarkId=${landmarkId}`);
      const data = await response.json();
      setGuestbookEntries(data.entries);
    } catch (error) {
      console.error("Error loading guestbook entries:", error);
    }
  }, []);

  // Add guestbook entry
  const addGuestbookEntry = useCallback(
    async (name: string, message: string) => {
      if (!activeLandmark) return;

      try {
        const response = await fetch("/api/guestbook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            landmarkId: activeLandmark.id,
            name,
            message,
          }),
        });

        if (response.ok) {
          // Reload guestbook entries
          await loadGuestbookEntries(activeLandmark.id);
        }
      } catch (error) {
        console.error("Error adding guestbook entry:", error);
        throw error;
      }
    },
    [activeLandmark, loadGuestbookEntries]
  );

  const onMouseDown = useCallback(
    (e: unknown) => {
      const event = e as SplineEvent;
      const landmarkMatch = landmarks.find(
        (l) =>
          event.target.name === l.splineObjectName ||
          event.target.name.includes("StopSign")
      );

      if (landmarkMatch) {
        setActiveLandmark(landmarkMatch);
        landmarkVisitStartTime.current = Date.now();
        loadGuestbookEntries(landmarkMatch.id);

        // Update game state
        setGameState((prev) => ({
          ...prev,
          visitedLandmarks: prev.visitedLandmarks.includes(landmarkMatch.id)
            ? prev.visitedLandmarks
            : [...prev.visitedLandmarks, landmarkMatch.id],
          score: prev.visitedLandmarks.includes(landmarkMatch.id)
            ? prev.score
            : prev.score + 100,
        }));
      }
    },
    [landmarks, loadGuestbookEntries]
  );

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
        case "a":
        case "A": {
          setShowAnalytics((prev) => !prev);
          break;
        }
        case "g":
        case "G": {
          if (activeLandmark) {
            setShowGuestbook((prev) => !prev);
          }
          break;
        }
        case "Escape": {
          setActiveLandmark(null);
          setShowGuestbook(false);
          setShowAnalytics(false);
          setShowSettings(false);
          break;
        }
        case "Enter": {
          if (activeLandmark && !showGuestbook) {
            setShowGuestbook(true);
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nearStopSign, app, activeLandmark, showGuestbook]);

  // Track visit when landmark is closed
  useEffect(() => {
    if (!activeLandmark && landmarkVisitStartTime.current) {
      trackVisit();
      landmarkVisitStartTime.current = null;
    }
  }, [activeLandmark, trackVisit]);

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900"
        >
          <motion.div
            className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white text-lg font-medium"
          >
            Loading 3D Experience...
          </motion.p>
        </motion.div>
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
        {/* Top Controls */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="bg-black/70 text-white hover:bg-black/80"
          >
            <BarChart3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowStats(!showStats)}
            className="bg-black/70 text-white hover:bg-black/80"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Game Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-lg pointer-events-auto"
        >
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>{gameState.score}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>
                {gameState.visitedLandmarks.length}/{landmarks.length}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Performance Stats */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-16 left-4 bg-black/70 text-green-400 font-mono text-xs p-3 rounded pointer-events-auto"
            >
              <div>FPS: {stats.fps}</div>
              <div>Objects: {stats.objects}</div>
              <div>Triangles: {stats.triangles}</div>
              <div>
                Memory:{" "}
                {stats.memory
                  ? `${Math.round(stats.memory / 1024 / 1024)}MB`
                  : "N/A"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-6 py-4 rounded-xl pointer-events-auto"
        >
          <h3 className="text-sm opacity-90 mb-2">Navigate Your Journey</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
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
                A
              </kbd>
              <span>Analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/20 rounded font-semibold">
                G
              </kbd>
              <span>Guestbook</span>
            </div>
          </div>
        </motion.div>

        {/* Stop Sign Indicator */}
        <AnimatePresence>
          {nearStopSign && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500/10 border-2 border-red-500/50 text-white px-5 py-3 rounded-lg font-semibold backdrop-blur-sm"
            >
              Press SPACE to learn more
            </motion.div>
          )}
        </AnimatePresence>

        {/* Landmark Info Panel */}
        <motion.div
          initial={{ x: 400 }}
          animate={{ x: activeLandmark ? 0 : 400 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute top-1/2 -translate-y-1/2 w-96 bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl pointer-events-auto"
        >
          {activeLandmark && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {activeLandmark.title}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowGuestbook(true)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <button
                    onClick={() => setActiveLandmark(null)}
                    className="w-8 h-8 flex items-center justify-center bg-black/10 hover:bg-black/20 rounded-full transition-colors"
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
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {activeLandmark.description}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {activeLandmark.details}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowGuestbook(true)}
                  className="flex-1"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View Guestbook
                </Button>
              </div>
            </>
          )}
        </motion.div>

        {/* Modals */}
        <AnalyticsDashboard
          isOpen={showAnalytics}
          onClose={() => setShowAnalytics(false)}
        />

        {activeLandmark && (
          <GuestbookModal
            isOpen={showGuestbook}
            onClose={() => setShowGuestbook(false)}
            landmark={activeLandmark}
            entries={guestbookEntries}
            onAddEntry={addGuestbookEntry}
          />
        )}
      </div>
    </>
  );
}
