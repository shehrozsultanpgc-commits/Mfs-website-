export type Currency = 'PKR' | 'USD' | 'GBP' | 'EUR' | 'AED';

export interface ServiceItem {
  id: string;
  badge: string;
  icon: string;
  title: string;
  description: string;
  pricePkr: number;
  priceUsd: number;
  unit: string;
  category?: 'Academic' | 'Career' | 'Business';
  deliveryTime?: string;
  rating?: number;
  features?: string[];
  originalPricePkr?: number;
  originalPriceUsd?: number;
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  country?: string;
  countryFlag?: string;
  service?: string;
  date?: string;
  avatarUrl?: string;
  avatarBg?: string;
  rating: number;
  text: string;
  verified: boolean;
  orderRef?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactCardItem {
  id: string;
  title: string;
  value: string;
  link?: string;
  iconName: 'mail' | 'support' | 'phone' | 'clock' | 'mapPin';
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export type DeliverySpeed = 'standard' | 'express' | 'priority' | 'sameday';

export type AdminRole = 'super_admin' | 'administrator' | 'manager' | 'staff' | 'read_only';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatarUrl?: string;
  isGoogleAuthConnected: boolean;
  lastLogin: string;
}

export type AdminTab = 
  | 'dashboard'
  | 'orders'
  | 'clients'
  | 'projects'
  | 'payments'
  | 'payment_verification'
  | 'invoices'
  | 'refunds'
  | 'files'
  | 'messages'
  | 'notifications'
  | 'analytics'
  | 'ai_control'
  | 'website_cms'
  | 'indexing'
  | 'team'
  | 'reports'
  | 'activity'
  | 'settings'
  | 'system_health'
  | 'ops_center';

