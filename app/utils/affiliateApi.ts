
// utils/affiliateApi.ts
import axios from 'axios';
import api from '../lib/api';

// const api = axios.create({
//     baseURL: '/api',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Add tenant context to requests
// api.interceptors.request.use((config) => {
//     const tenant = localStorage.getItem('tenant_slug');
//     if (tenant) {
//         config.headers['X-Tenant'] = tenant;
//     }
//     return config;
// });

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
    // referral_action: {
    //     action_type: string;
    //     conversion_value: string;
    // };
}

export const affiliateApi = {
    // Get affiliate stats
    getStats: async (): Promise<AffiliateStats> => {
        const response = await api.get('/api/affiliates/stats/');
        console.log("affiliate stats", response.data)
        return response.data;
    },

    // Get referral links
    getReferralLinks: async (): Promise<ReferralLink[]> => {
        const response = await api.get('/api/referral-links/');
        console.log("referral links", response.data)

        return response.data;
    },

    // Create new referral link
    createReferralLink: async (data: {
        name: string;
        destination_url: string;
    }): Promise<ReferralLink> => {
        const response = await api.post('/api/referral-links/', data);
        return response.data;
    },

    // Get commissions
    getCommissions: async (status?: string): Promise<Commission[]> => {
        const params = status ? { status } : {};
        const response = await api.get('/api/commissions/', { params });
        console.log("commissions", response.data)
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