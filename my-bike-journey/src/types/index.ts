import type { Application } from "@splinetool/runtime";

export interface Landmark {
  id: string;
  title: string;
  description: string;
  details: string;
  splineObjectName: string;
  position?: {
    x: number;
    y: number;
    z: number;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GuestbookEntry {
  id: string;
  landmarkId: string;
  name: string;
  message: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Visit {
  id: string;
  visitorId: string;
  landmarkId?: string;
  duration?: number;
  timestamp: string;
}

export interface Visitor {
  id: string;
  ipAddress: string;
  userAgent?: string;
  country?: string;
  city?: string;
  visits: Visit[];
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  id: string;
  date: string;
  totalVisits: number;
  uniqueVisitors: number;
  landmarkStats?: Record<string, number>;
  createdAt: string;
  updatedAt: string;
}

export interface SplineEvent {
  target: {
    name: string;
  };
}

export interface SplineApp extends Application {
  scene?: {
    children?: unknown[];
  };
}

export interface PerformanceStats {
  fps: number;
  objects: number;
  triangles: number;
  memory?: number;
}

export interface GameState {
  isPlaying: boolean;
  currentSpeed: number;
  currentLandmark?: string;
  score: number;
  visitedLandmarks: string[];
}
