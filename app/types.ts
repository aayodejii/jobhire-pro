// src/types.ts
export interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    image: string;
}

export interface Benefit {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export interface PricingPlan {
    id: number;
    name: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    buttonVariant: 'primary' | 'secondary';
}

export interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

export interface Step {
    id: number;
    title: string;
    description: string;
}