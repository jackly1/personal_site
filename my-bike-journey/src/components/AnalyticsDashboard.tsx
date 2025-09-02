"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { BarChart3, Users, MapPin, Clock, TrendingUp } from "lucide-react";
import type { Analytics } from "@/types";

interface AnalyticsData {
  analytics: Analytics[];
  landmarkStats: Array<{
    landmarkId: string | null;
    _count: { landmarkId: number };
  }>;
  uniqueVisitors: number;
  totalVisits: number;
}

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  isOpen,
  onClose,
}) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(7);

  useEffect(() => {
    if (isOpen) {
      fetchAnalytics();
    }
  }, [isOpen, timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics?days=${timeRange}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getTopLandmarks = () => {
    if (!data?.landmarkStats) return [];
    return data.landmarkStats
      .filter((stat) => stat.landmarkId)
      .sort((a, b) => b._count.landmarkId - a._count.landmarkId)
      .slice(0, 5);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Analytics Dashboard"
      className="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Time Range Selector */}
        <div className="flex gap-2">
          {[1, 7, 30, 90].map((days) => (
            <Button
              key={days}
              variant={timeRange === days ? "primary" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(days)}
            >
              {days === 1 ? "Today" : `${days} days`}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    Unique Visitors
                  </span>
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {formatNumber(data.uniqueVisitors)}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    Total Visits
                  </span>
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {formatNumber(data.totalVisits)}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-purple-50 rounded-lg border border-purple-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">
                    Landmarks Visited
                  </span>
                </div>
                <div className="text-2xl font-bold text-purple-900">
                  {data.landmarkStats.filter((s) => s.landmarkId).length}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 bg-orange-50 rounded-lg border border-orange-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-700">
                    Avg. Session
                  </span>
                </div>
                <div className="text-2xl font-bold text-orange-900">
                  {data.totalVisits > 0
                    ? Math.round(data.totalVisits / data.uniqueVisitors)
                    : 0}
                  m
                </div>
              </motion.div>
            </div>

            {/* Top Landmarks */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Most Visited Landmarks
              </h3>

              <div className="space-y-2">
                {getTopLandmarks().map((stat, index) => (
                  <motion.div
                    key={stat.landmarkId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">
                        {stat.landmarkId
                          ?.replace("-", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {stat._count.landmarkId}
                      </div>
                      <div className="text-xs text-gray-500">visits</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Daily Chart Placeholder */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Daily Visits
              </h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Chart visualization would go here</p>
                  <p className="text-sm">
                    (Integrate with Chart.js or similar)
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Failed to load analytics data</p>
            <Button onClick={fetchAnalytics} className="mt-4">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
