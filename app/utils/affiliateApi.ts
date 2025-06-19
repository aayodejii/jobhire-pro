// utils/affiliateApi.ts
import useSWR from 'swr';
import api from '../lib/api';

export interface AffiliateStats {
    total_clicks: number;
    total_page_views: number;
    total_signups: number;
    total_conversions: number;
    conversion_rate: number;
    total_earnings: number;
    pending_earnings: number;
    paid_earnings: number;
}

export interface ReferralLink {
    id: number;
    slug: string;
    destination_url: string;
    full_url: string;
    is_active: boolean;
    created_at: string;
    total_clicks: number;
    total_page_views: number;
    total_signups: number;
    total_conversions: number;
}

export interface Commission {
    id: number;
    amount: string;
    rate: string;
    status: 'pending' | 'approved' | 'paid';
    calculated_at: string;
    referral_action_type: 'signup'
}

// SWR fetcher function
const fetcher = (url: string) => api.get(url).then(res => res.data);

export const useAffiliateStats = () => {
    const { data, error, isLoading, mutate } = useSWR<AffiliateStats>('/api/affiliates/stats/', fetcher);
    return {
        stats: data,
        isLoading,
        error,
        mutateStats: mutate
    };
};

export const useReferralLinks = () => {
    const { data, error, isLoading, mutate } = useSWR<ReferralLink[]>('/api/referral-links/', fetcher);
    return {
        links: data,
        isLoading,
        error,
        mutateLinks: mutate
    };
};

export const useCommissions = (status?: string) => {
    const params = status ? { status } : {};
    const { data, error, isLoading, mutate } = useSWR<Commission[]>(
        ['/api/commissions/', params],
        ([url, params]) => api.get(url, { params }).then(res => res.data)
    );
    return {
        commissions: data,
        isLoading,
        error,
        mutateCommissions: mutate
    };
};

// Mutation functions
export const affiliateApi = {
    // Create new referral link
    createReferralLink: async (data: {
        name: string;
        destination_url: string;
    }): Promise<ReferralLink> => {
        const response = await api.post('/api/referral-links/', data);
        return response.data;
    },

    // Request payout
    requestPayout: async (): Promise<any> => {
        const response = await api.post('/api/payouts/request_payout/');
        return response.data;
    },

    // Track event
    trackEvent: async (eventData: any): Promise<any> => {
        const response = await api.post('/api/referral-actions/track-event/', eventData);
        return response.data;
    },

    updateReferralLink: async (id: number, data: { slug: string }): Promise<ReferralLink> => {
        const response = await api.patch(`/api/referral-links/${id}/`, data);
        return response.data;
    },
};