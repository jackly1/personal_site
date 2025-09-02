"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { MessageSquare, Send, CheckCircle } from "lucide-react";
import type { GuestbookEntry, Landmark } from "@/types";

interface GuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  landmark: Landmark;
  entries: GuestbookEntry[];
  onAddEntry: (name: string, message: string) => Promise<void>;
}

export const GuestbookModal: React.FC<GuestbookModalProps> = ({
  isOpen,
  onClose,
  landmark,
  entries,
  onAddEntry,
}) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddEntry(name.trim(), message.trim());
      setName("");
      setMessage("");
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting guestbook entry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Guestbook - ${landmark.title}`}
    >
      <div className="space-y-6">
        {/* Success Message */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                Thank you for your message!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Entry Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
              required
              maxLength={50}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Share your thoughts about this landmark..."
              rows={4}
              required
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {message.length}/500
            </div>
          </div>

          <Button
            type="submit"
            loading={isSubmitting}
            disabled={!name.trim() || !message.trim()}
            className="w-full"
          >
            <Send className="w-4 h-4 mr-2" />
            Add to Guestbook
          </Button>
        </form>

        {/* Existing Entries */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700">
            <MessageSquare className="w-5 h-5" />
            <h3 className="font-medium">Recent Messages ({entries.length})</h3>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {entries.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No messages yet. Be the first to share your thoughts!
              </p>
            ) : (
              entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-gray-50 rounded-lg border"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">
                      {entry.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{entry.message}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
