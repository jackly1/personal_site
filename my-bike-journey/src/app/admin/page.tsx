"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { Landmark } from "@/types";

export default function AdminPage() {
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLandmark, setEditingLandmark] = useState<Landmark | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
    splineObjectName: "",
    position: { x: 0, y: 0, z: 0 },
    isActive: true,
  });

  useEffect(() => {
    loadLandmarks();
  }, []);

  const loadLandmarks = async () => {
    try {
      const response = await fetch("/api/landmarks");
      const data = await response.json();
      setLandmarks(data.landmarks);
    } catch (error) {
      console.error("Error loading landmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingLandmark
        ? `/api/landmarks/${editingLandmark.id}`
        : "/api/landmarks";
      const method = editingLandmark ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadLandmarks();
        setShowModal(false);
        setEditingLandmark(null);
        resetForm();
      }
    } catch (error) {
      console.error("Error saving landmark:", error);
    }
  };

  const handleEdit = (landmark: Landmark) => {
    setEditingLandmark(landmark);
    setFormData({
      title: landmark.title,
      description: landmark.description,
      details: landmark.details,
      splineObjectName: landmark.splineObjectName,
      position: landmark.position || { x: 0, y: 0, z: 0 },
      isActive: landmark.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this landmark?")) return;

    try {
      const response = await fetch(`/api/landmarks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadLandmarks();
      }
    } catch (error) {
      console.error("Error deleting landmark:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      details: "",
      splineObjectName: "",
      position: { x: 0, y: 0, z: 0 },
      isActive: true,
    });
  };

  const openNewModal = () => {
    setEditingLandmark(null);
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Landmark Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your bike journey landmarks
            </p>
          </div>
          <Button onClick={openNewModal}>
            <Plus className="w-4 h-4 mr-2" />
            Add Landmark
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {landmarks.map((landmark) => (
            <motion.div
              key={landmark.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {landmark.title}
                </h3>
                <div className="flex items-center gap-2">
                  {landmark.isActive ? (
                    <Eye className="w-4 h-4 text-green-500" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {landmark.description}
              </p>

              <div className="text-xs text-gray-500 mb-4">
                <div>Spline Object: {landmark.splineObjectName}</div>
                <div>
                  Position: ({landmark.position?.x}, {landmark.position?.y},{" "}
                  {landmark.position?.z})
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(landmark)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(landmark.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {landmarks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No landmarks found</p>
            <Button onClick={openNewModal} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Create your first landmark
            </Button>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingLandmark(null);
          resetForm();
        }}
        title={editingLandmark ? "Edit Landmark" : "Add New Landmark"}
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="splineObjectName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Spline Object Name
            </label>
            <input
              id="splineObjectName"
              type="text"
              value={formData.splineObjectName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  splineObjectName: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              required
            />
          </div>

          <div>
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Details
            </label>
            <textarea
              id="details"
              value={formData.details}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, details: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="posX"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                X Position
              </label>
              <input
                id="posX"
                type="number"
                value={formData.position.x}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    position: {
                      ...prev.position,
                      x: parseFloat(e.target.value) || 0,
                    },
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="posY"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Y Position
              </label>
              <input
                id="posY"
                type="number"
                value={formData.position.y}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    position: {
                      ...prev.position,
                      y: parseFloat(e.target.value) || 0,
                    },
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="posZ"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Z Position
              </label>
              <input
                id="posZ"
                type="number"
                value={formData.position.z}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    position: {
                      ...prev.position,
                      z: parseFloat(e.target.value) || 0,
                    },
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isActive"
              className="ml-2 block text-sm text-gray-700"
            >
              Active
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              {editingLandmark ? "Update" : "Create"} Landmark
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowModal(false);
                setEditingLandmark(null);
                resetForm();
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
