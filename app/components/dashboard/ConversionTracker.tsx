// components/ConversionTracker.tsx
import { useAffiliateTracking } from "@/app/hooks/useAffiliateTracking";
import React, { useEffect } from "react";

interface ConversionTrackerProps {
  isConverted: boolean;
  conversionValue?: number;
  conversionType?: "signup" | "purchase" | "custom";
  metadata?: Record<string, any>;
  onTrackingComplete?: () => void;
}

export const ConversionTracker: React.FC<ConversionTrackerProps> = ({
  isConverted,
  conversionValue,
  conversionType = "purchase",
  metadata,
  onTrackingComplete,
}) => {
  const { trackEvent } = useAffiliateTracking();

  useEffect(() => {
    if (isConverted) {
      const trackConversion = async () => {
        await trackEvent({
          event_type: conversionType,
          conversion_value: conversionValue,
          metadata,
        });

        if (onTrackingComplete) {
          onTrackingComplete();
        }
      };

      trackConversion();
    }
  }, [
    isConverted,
    conversionValue,
    conversionType,
    metadata,
    trackEvent,
    onTrackingComplete,
  ]);

  return null; // This is a tracking component, no UI
};
