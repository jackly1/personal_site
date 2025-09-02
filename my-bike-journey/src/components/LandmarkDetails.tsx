"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, MessageSquare, Star, ExternalLink } from "lucide-react";
import { Button } from "./ui/Button";
import type { Landmark, GuestbookEntry } from "@/types";

interface LandmarkDetailsProps {
  landmark: Landmark;
}

export const LandmarkDetails: React.FC<LandmarkDetailsProps> = ({
  landmark,
}) => {
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>(
    []
  );
  const [isLoadingEntries, setIsLoadingEntries] = useState(false);

  useEffect(() => {
    loadGuestbookEntries();
  }, [landmark.id]);

  const loadGuestbookEntries = async () => {
    setIsLoadingEntries(true);
    try {
      const response = await fetch(`/api/guestbook?landmarkId=${landmark.id}`);
      const data = await response.json();
      setGuestbookEntries(data.entries);
    } catch (error) {
      console.error("Error loading guestbook entries:", error);
    } finally {
      setIsLoadingEntries(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {landmark.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>
                  Position: ({landmark.position?.x}, {landmark.position?.y},{" "}
                  {landmark.position?.z})
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Added {formatDate(landmark.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {landmark.isActive ? (
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                <span>Inactive</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Description
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {landmark.description}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Details</h3>
          <p className="text-gray-700 leading-relaxed">{landmark.details}</p>
        </div>
      </div>

      {/* Technical Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Technical Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Spline Object:</span>
            <span className="ml-2 text-gray-600 font-mono">
              {landmark.splineObjectName}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Landmark ID:</span>
            <span className="ml-2 text-gray-600 font-mono">{landmark.id}</span>
          </div>
        </div>
      </div>

      {/* Guestbook Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Guestbook ({guestbookEntries.length})
          </h3>
          <Button variant="ghost" size="sm">
            <ExternalLink className="w-4 h-4 mr-1" />
            View All
          </Button>
        </div>

        {isLoadingEntries ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : guestbookEntries.length > 0 ? (
          <div className="space-y-3">
            {guestbookEntries.slice(0, 3).map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">
                    {entry.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{entry.message}</p>
              </motion.div>
            ))}
            {guestbookEntries.length > 3 && (
              <p className="text-center text-gray-500 text-sm">
                +{guestbookEntries.length - 3} more entries
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No messages yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button className="flex-1">
          <MessageSquare className="w-4 h-4 mr-2" />
          Add to Guestbook
        </Button>
        <Button variant="ghost">
          <Star className="w-4 h-4 mr-2" />
          Favorite
        </Button>
      </div>
    </motion.div>
  );
};
