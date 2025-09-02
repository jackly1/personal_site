"use client";

import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { Landmark } from "@/types";

// Lazy load the detailed landmark component
const LandmarkDetails = lazy(() => import("./LandmarkDetails"));

interface LazyLandmarkDetailsProps {
  landmark: Landmark;
  isVisible: boolean;
}

const LoadingFallback: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center justify-center p-8"
  >
    <div className="flex items-center gap-3 text-gray-600">
      <Loader2 className="w-5 h-5 animate-spin" />
      <span>Loading landmark details...</span>
    </div>
  </motion.div>
);

export const LazyLandmarkDetails: React.FC<LazyLandmarkDetailsProps> = ({
  landmark,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <LandmarkDetails landmark={landmark} />
    </Suspense>
  );
};
