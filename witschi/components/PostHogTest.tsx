"use client";

import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";

export function PostHogTest() {
  const posthog = usePostHog();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (posthog) {
      setIsLoaded(true);
      // Send a test event
      posthog.capture("posthog_test", {
        test: true,
        timestamp: new Date().toISOString(),
      });
    }
  }, [posthog]);

  if (!isLoaded) {
    return <div className="text-sm text-gray-500">Loading PostHog...</div>;
  }

  return (
    <div className="text-sm text-green-600">
      ✅ PostHog is loaded and working! Check your PostHog dashboard for events.
    </div>
  );
}
