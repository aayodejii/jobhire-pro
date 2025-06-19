// src/types.ts
export interface Affiliate {
    id: string;
    user: string;
    tenant: string;
    code: string;
    balance: number;
    payout_threshold: number;
    payout_method?: string;
    created_at: string;
}

export interface ReferralLink {
    id: string;
    affiliate: string;
    slug: string;
    destination_url: string;
    is_active: boolean;
    created_at: string;
}

export interface Commission {
    id: string;
    affiliate: string;
    referral_action: string;
    amount: number;
    rate: number;
    status: 'pending' | 'paid' | 'rejected';
    created_at: string;
}

export interface Payout {
    id: string;
    tenant: string;
    affiliate: string;
    amount: number;
    status: 'pending' | 'processed' | 'failed';
    method: string;
    created_at: string;
}

export interface CommissionRule {
    id: string;
    tenant: string;
    action_type: string;
    value: number;
    is_percentage: boolean;
    min_value?: number;
    max_value?: number;
    is_active: boolean;
}


export interface UserModel {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    role: "jobseeker" | "recruiter";

}
