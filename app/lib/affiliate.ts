// src/app/lib/affiliate.ts
import axios from 'axios';
import { Affiliate, ReferralLink } from '../types/types';
import { config } from '@/config';
import api from './api';

// const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const baseURL = config.url.API_URL;

// Get current affiliate profile
export const getAffiliateProfile = async (): Promise<Affiliate> => {
    const response = await api.get(`${baseURL}/api/affiliates/`);
    console.log("profile", response)

    return response.data;
};

// Create affiliate profile
export const createAffiliate = async (data: Partial<Affiliate>): Promise<Affiliate> => {
    // const response = await api.get(`${baseURL}/debug/`,);
    const response = await api.post(`${baseURL}/api/affiliates/`, data);
    console.log(response)
    return response.data;
};

// Create referral link
export const createReferralLink = async (data: {
    name: string;
    destination_url: string;
}): Promise<ReferralLink> => {
    const response = await api.post(`${baseURL}/api/referral-links/`, data);
    return response.data;
};

// Get all referral links
export const getReferralLinks = async (): Promise<ReferralLink[]> => {
    const response = await api.get(`${baseURL}/api/referral-links/`);
    return response.data;
};

// Get commissions
export const getCommissions = async (): Promise<any[]> => {
    const response = await api.get(`${baseURL}/api/commissions/`);
    return response.data;
};

// Request payout
export const requestPayout = async (): Promise<any> => {
    const response = await api.post(`${baseURL}/api/payouts/request_payout/`);
    return response.data;
};