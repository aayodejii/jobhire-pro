// hooks/useAffiliateTracking.ts
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import api from '../lib/api';

interface TrackingEvent {
  event_type: 'page_view' | 'click' | 'signup' | 'purchase' | 'custom';
  referral_code?: string;
  conversion_value?: number;
  metadata?: Record<string, any>;
}

interface UseAffiliateTrackingReturn {
  trackEvent: (event: TrackingEvent) => Promise<void>;
  trackConversion: (value?: number, metadata?: Record<string, any>) => Promise<void>;
  getReferralCode: () => string | null;
  isLoading: boolean;
  error: string | null;
}

export const useAffiliateTracking = (): UseAffiliateTrackingReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState(() =>
    sessionStorage.getItem('tracking_session') ||
    `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );

  useEffect(() => {
    sessionStorage.setItem('tracking_session', sessionId);
  }, [sessionId]);

  const getReferralCode = useCallback((): string | null => {
    // Check URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    if (refParam) {
      localStorage.setItem('referral_code', refParam);
      return refParam;
    }

    // Check localStorage for stored referral code
    return localStorage.getItem('referral_code');
  }, []);

  const trackEvent = useCallback(async (event: TrackingEvent): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const referralCode = event.referral_code || getReferralCode();

      const payload = {
        ...event,
        referral_code: referralCode,
        session_id: sessionId,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        metadata: {
          ...event.metadata,
          page_title: document.title,
          referrer: document.referrer,
        }
      };

      await api.post('/api/track/', payload);
      // await api.post('/api/referral-actions/track-event/', payload);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Tracking failed';
      setError(errorMessage);
      console.error('Tracking error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, getReferralCode]);

  const trackConversion = useCallback(async (
    value?: number,
    metadata?: Record<string, any>
  ): Promise<void> => {
    await trackEvent({
      event_type: 'purchase',
      conversion_value: value,
      metadata
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackConversion,
    getReferralCode,
    isLoading,
    error
  };
};

