"use client";

// components/AffiliateTracker.tsx
import { useAffiliateTracking } from "@/app/hooks/useAffiliateTracking";
import React, { useEffect } from "react";

interface AffiliateTrackerProps {
  autoTrackPageViews?: boolean;
  children?: React.ReactNode;
}

export const AffiliateTracker: React.FC<AffiliateTrackerProps> = ({
  autoTrackPageViews = true,
  children,
}) => {
  const { trackEvent, getReferralCode } = useAffiliateTracking();

  useEffect(() => {
    if (autoTrackPageViews) {
      trackEvent({ event_type: "page_view" });
    }
  }, [trackEvent, autoTrackPageViews]);

  useEffect(() => {
    // Store referral code from URL if present
    getReferralCode();
  }, [getReferralCode]);

  return <>{children}</>;
};
