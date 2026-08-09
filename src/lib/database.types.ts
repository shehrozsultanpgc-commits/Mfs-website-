export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'super_admin' | 'manager' | 'specialist' | 'client';

export type OrderStatus =
  | 'pending_verification'
  | 'in_progress'
  | 'in_review'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export type VerificationStatus = 'pending' | 'approved' | 'rejected';

export type AuditSeverity = 'info' | 'low' | 'medium' | 'high' | 'critical';

export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'EUR' | 'AED';

export type DeliveryTier = 'express' | 'priority' | 'same_day' | 'standard';

export interface Database {
  public: {
    Tables: {
      users_profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          role: UserRole;
          currency_preference: CurrencyCode | string;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          phone?: string | null;
          role?: UserRole;
          currency_preference?: CurrencyCode | string;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          role?: UserRole;
          currency_preference?: CurrencyCode | string;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          client_id: string | null;
          guest_email: string | null;
          guest_name: string | null;
          guest_phone: string | null;
          service_type: string;
          scope_details: Json;
          status: OrderStatus;
          total_amount: number;
          currency: CurrencyCode | string;
          delivery_tier: DeliveryTier | string;
          payment_method: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          client_id?: string | null;
          guest_email?: string | null;
          guest_name?: string | null;
          guest_phone?: string | null;
          service_type: string;
          scope_details?: Json;
          status?: OrderStatus;
          total_amount: number;
          currency?: CurrencyCode | string;
          delivery_tier?: DeliveryTier | string;
          payment_method?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          client_id?: string | null;
          guest_email?: string | null;
          guest_name?: string | null;
          guest_phone?: string | null;
          service_type?: string;
          scope_details?: Json;
          status?: OrderStatus;
          total_amount?: number;
          currency?: CurrencyCode | string;
          delivery_tier?: DeliveryTier | string;
          payment_method?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_requirements: {
        Row: {
          id: string;
          order_id: string;
          file_name: string;
          file_size: number | null;
          file_type: string | null;
          file_url: string;
          uploaded_by: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          file_name: string;
          file_size?: number | null;
          file_type?: string | null;
          file_url: string;
          uploaded_by?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          file_name?: string;
          file_size?: number | null;
          file_type?: string | null;
          file_url?: string;
          uploaded_by?: string | null;
          notes?: string | null;
          created_at?: string;
        };
      };
      order_deliverables: {
        Row: {
          id: string;
          order_id: string;
          title: string;
          version_number: number;
          file_name: string;
          file_url: string;
          file_size: number | null;
          approval_status: VerificationStatus;
          client_feedback: string | null;
          uploaded_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          title: string;
          version_number?: number;
          file_name: string;
          file_url: string;
          file_size?: number | null;
          approval_status?: VerificationStatus;
          client_feedback?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          title?: string;
          version_number?: number;
          file_name?: string;
          file_url?: string;
          file_size?: number | null;
          approval_status?: VerificationStatus;
          client_feedback?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      invoices: {
        Row: {
          id: string;
          invoice_number: string;
          order_id: string;
          client_id: string | null;
          amount: number;
          currency: CurrencyCode | string;
          status: 'unpaid' | 'paid' | 'partially_paid' | 'cancelled';
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invoice_number: string;
          order_id: string;
          client_id?: string | null;
          amount: number;
          currency?: CurrencyCode | string;
          status?: 'unpaid' | 'paid' | 'partially_paid' | 'cancelled';
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invoice_number?: string;
          order_id?: string;
          client_id?: string | null;
          amount?: number;
          currency?: CurrencyCode | string;
          status?: 'unpaid' | 'paid' | 'partially_paid' | 'cancelled';
          due_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          invoice_id: string | null;
          order_id: string;
          amount: number;
          currency: CurrencyCode | string;
          payment_method: string;
          transaction_ref: string | null;
          receipt_screenshot_url: string | null;
          verification_status: VerificationStatus;
          verified_by: string | null;
          verification_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invoice_id?: string | null;
          order_id: string;
          amount: number;
          currency?: CurrencyCode | string;
          payment_method: string;
          transaction_ref?: string | null;
          receipt_screenshot_url?: string | null;
          verification_status?: VerificationStatus;
          verified_by?: string | null;
          verification_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          invoice_id?: string | null;
          order_id?: string;
          amount?: number;
          currency?: CurrencyCode | string;
          payment_method?: string;
          transaction_ref?: string | null;
          receipt_screenshot_url?: string | null;
          verification_status?: VerificationStatus;
          verified_by?: string | null;
          verification_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      noc_audit_logs: {
        Row: {
          id: string;
          event_type: string;
          severity: AuditSeverity;
          actor_id: string | null;
          actor_email: string | null;
          description: string;
          metadata: Json;
          ip_address: string | null;
          user_agent: string | null;
          timestamp: string;
        };
        Insert: {
          id?: string;
          event_type: string;
          severity?: AuditSeverity;
          actor_id?: string | null;
          actor_email?: string | null;
          description: string;
          metadata?: Json;
          ip_address?: string | null;
          user_agent?: string | null;
          timestamp?: string;
        };
        Update: {
          id?: string;
          event_type?: string;
          severity?: AuditSeverity;
          actor_id?: string | null;
          actor_email?: string | null;
          description?: string;
          metadata?: Json;
          ip_address?: string | null;
          user_agent?: string | null;
          timestamp?: string;
        };
      };
    };
    Enums: {
      user_role: UserRole;
      order_status: OrderStatus;
      verification_status: VerificationStatus;
      audit_severity: AuditSeverity;
    };
  };
}
