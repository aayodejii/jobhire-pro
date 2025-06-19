// components/TrackableButton.tsx
import { useAffiliateTracking } from "@/app/hooks/useAffiliateTracking";
import React from "react";

interface TrackableButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  trackingEvent?: {
    event_type: "click" | "signup" | "purchase" | "custom";
    conversion_value?: number;
    metadata?: Record<string, any>;
  };
  children: React.ReactNode;
}

export const TrackableButton: React.FC<TrackableButtonProps> = ({
  trackingEvent,
  onClick,
  children,
  ...buttonProps
}) => {
  const { trackEvent } = useAffiliateTracking();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (trackingEvent) {
      await trackEvent(trackingEvent);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button {...buttonProps} onClick={handleClick}>
      {children}
    </button>
  );
};
