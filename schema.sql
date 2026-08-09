-- =============================================================================
-- MFS GROWTH AGENCY — ENTERPRISE SUPABASE POSTGRESQL SCHEMA (schema.sql)
-- Constitution v1.0 Compliant | Multi-Currency | RLS & RBAC Enterprise Architecture
-- =============================================================================

-- Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. ENUMS & DOMAINS
-- -----------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('super_admin', 'manager', 'specialist', 'client');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM (
        'pending_verification',
        'in_progress',
        'in_review',
        'delivered',
        'completed',
        'cancelled'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE audit_severity AS ENUM ('info', 'low', 'medium', 'high', 'critical');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- -----------------------------------------------------------------------------
-- 2. AUTOMATED TIMESTAMP TRIGGER FUNCTION
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------------------------------
-- 3. CORE DATABASE TABLES
-- -----------------------------------------------------------------------------

-- 3.1 USER PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.users_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    role user_role DEFAULT 'client'::user_role NOT NULL,
    currency_preference TEXT DEFAULT 'PKR' NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3.2 ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE, -- Monospace Format e.g., 'ORD-MFS-849201'
    client_id UUID REFERENCES public.users_profiles(id) ON DELETE SET NULL,
    guest_email TEXT,
    guest_name TEXT,
    guest_phone TEXT,
    service_type TEXT NOT NULL,
    scope_details JSONB DEFAULT '{}'::jsonb NOT NULL, -- Slide count, word count, speed multiplier, promo code
    status order_status DEFAULT 'pending_verification'::order_status NOT NULL,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    currency TEXT DEFAULT 'PKR' NOT NULL, -- PKR, USD, GBP, EUR, AED
    delivery_tier TEXT DEFAULT 'standard' NOT NULL, -- express (+30%), priority (+50%), same_day (+75%), standard
    payment_method TEXT DEFAULT 'easypaisa' NOT NULL, -- easypaisa, jazzcash, bank_transfer, stripe
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3.3 ORDER REQUIREMENTS TABLE
CREATE TABLE IF NOT EXISTS public.order_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    file_name TEXT NOT NULL,
    file_size BIGINT,
    file_type TEXT,
    file_url TEXT NOT NULL,
    uploaded_by UUID REFERENCES public.users_profiles(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3.4 ORDER DELIVERABLES TABLE
CREATE TABLE IF NOT EXISTS public.order_deliverables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    version_number INTEGER DEFAULT 1 NOT NULL,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size BIGINT,
    approval_status verification_status DEFAULT 'pending'::verification_status NOT NULL,
    client_feedback TEXT,
    uploaded_by UUID REFERENCES public.users_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3.5 INVOICES TABLE
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number TEXT NOT NULL UNIQUE, -- Monospace Format e.g., 'INV-MFS-910283'
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    client_id UUID REFERENCES public.users_profiles(id) ON DELETE SET NULL,
    amount NUMERIC(12, 2) NOT NULL,
    currency TEXT DEFAULT 'PKR' NOT NULL,
    status TEXT DEFAULT 'unpaid' NOT NULL, -- 'unpaid', 'paid', 'partially_paid', 'cancelled'
    due_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3.6 PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    currency TEXT DEFAULT 'PKR' NOT NULL,
    payment_method TEXT NOT NULL, -- 'easypaisa', 'jazzcash', 'bank_transfer', 'stripe'
    transaction_ref TEXT, -- Monospace TRX Key
    receipt_screenshot_url TEXT,
    verification_status verification_status DEFAULT 'pending'::verification_status NOT NULL,
    verified_by UUID REFERENCES public.users_profiles(id) ON DELETE SET NULL,
    verification_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3.7 NOC AUDIT LOGS TABLE (Phase 8 Operations Center Integration)
CREATE TABLE IF NOT EXISTS public.noc_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    severity audit_severity DEFAULT 'info'::audit_severity NOT NULL,
    actor_id UUID REFERENCES public.users_profiles(id) ON DELETE SET NULL,
    actor_email TEXT,
    description TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- -----------------------------------------------------------------------------
-- 4. ATTACH AUTOMATED UPDATED_AT TRIGGERS
-- -----------------------------------------------------------------------------
CREATE OR REPLACE TRIGGER trg_users_profiles_updated_at
    BEFORE UPDATE ON public.users_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER trg_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER trg_order_deliverables_updated_at
    BEFORE UPDATE ON public.order_deliverables
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER trg_invoices_updated_at
    BEFORE UPDATE ON public.invoices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER trg_payments_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 5. AUTOMATED USER PROFILE CREATION FROM SUPABASE AUTH
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users_profiles (id, full_name, email, role, currency_preference)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.email,
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'client'::user_role),
        COALESCE(NEW.raw_user_meta_data->>'currency_preference', 'PKR')
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        email = EXCLUDED.email;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to execute on auth.users sign up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 6. HELPER SECURITY FUNCTIONS FOR RLS
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS user_role AS $$
DECLARE
    u_role user_role;
BEGIN
    SELECT role INTO u_role FROM public.users_profiles WHERE id = user_uuid;
    RETURN COALESCE(u_role, 'client'::user_role);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin_or_manager()
RETURNS BOOLEAN AS $$
DECLARE
    u_role user_role;
BEGIN
    IF auth.uid() IS NULL THEN
        RETURN FALSE;
    END IF;
    SELECT role INTO u_role FROM public.users_profiles WHERE id = auth.uid();
    RETURN u_role IN ('super_admin', 'manager');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -----------------------------------------------------------------------------
-- 7. ROW-LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.users_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.noc_audit_logs ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 7.1 POLICIES FOR users_profiles
-- -----------------------------------------------------------------------------
-- Users can view their own profile; Admins & Managers can view all.
CREATE POLICY "Users view own profile or Admins/Managers view all"
    ON public.users_profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin_or_manager());

-- Users can update their own profile; Admins & Managers can update any.
CREATE POLICY "Users update own profile or Admins/Managers update any"
    ON public.users_profiles FOR UPDATE
    USING (auth.uid() = id OR public.is_admin_or_manager());

-- -----------------------------------------------------------------------------
-- 7.2 POLICIES FOR orders
-- -----------------------------------------------------------------------------
-- Anyone (guest or client) can insert a new order at checkout.
CREATE POLICY "Public & Authenticated users can insert orders"
    ON public.orders FOR INSERT
    WITH CHECK (TRUE);

-- Clients can view their own orders (matching auth.uid() or matching email); Admins view all.
CREATE POLICY "Clients view own orders, Admins view all"
    ON public.orders FOR SELECT
    USING (
        client_id = auth.uid()
        OR guest_email = auth.jwt()->>'email'
        OR public.is_admin_or_manager()
    );

-- Admins & Managers can update order status or details.
CREATE POLICY "Admins & Managers can update orders"
    ON public.orders FOR UPDATE
    USING (public.is_admin_or_manager() OR client_id = auth.uid());

-- Admins & Managers can delete orders.
CREATE POLICY "Admins & Managers can delete orders"
    ON public.orders FOR DELETE
    USING (public.is_admin_or_manager());

-- -----------------------------------------------------------------------------
-- 7.3 POLICIES FOR order_requirements
-- -----------------------------------------------------------------------------
CREATE POLICY "Anyone can upload order requirements"
    ON public.order_requirements FOR INSERT
    WITH CHECK (TRUE);

CREATE POLICY "Clients view own requirements, Admins view all"
    ON public.order_requirements FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders o
            WHERE o.id = order_requirements.order_id
            AND (o.client_id = auth.uid() OR o.guest_email = auth.jwt()->>'email')
        )
        OR public.is_admin_or_manager()
    );

-- -----------------------------------------------------------------------------
-- 7.4 POLICIES FOR order_deliverables
-- -----------------------------------------------------------------------------
CREATE POLICY "Clients view deliverables, Admins view & edit all"
    ON public.order_deliverables FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders o
            WHERE o.id = order_deliverables.order_id
            AND (o.client_id = auth.uid() OR o.guest_email = auth.jwt()->>'email')
        )
        OR public.is_admin_or_manager()
    );

CREATE POLICY "Admins & Specialists can insert deliverables"
    ON public.order_deliverables FOR INSERT
    WITH CHECK (public.is_admin_or_manager());

CREATE POLICY "Clients can update approval status on own deliverables"
    ON public.order_deliverables FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.orders o
            WHERE o.id = order_deliverables.order_id
            AND (o.client_id = auth.uid() OR o.guest_email = auth.jwt()->>'email')
        )
        OR public.is_admin_or_manager()
    );

-- -----------------------------------------------------------------------------
-- 7.5 POLICIES FOR invoices
-- -----------------------------------------------------------------------------
CREATE POLICY "Clients view own invoices, Admins view all"
    ON public.invoices FOR SELECT
    USING (
        client_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM public.orders o
            WHERE o.id = invoices.order_id
            AND o.guest_email = auth.jwt()->>'email'
        )
        OR public.is_admin_or_manager()
    );

CREATE POLICY "Admins & Managers can manage invoices"
    ON public.invoices FOR ALL
    USING (public.is_admin_or_manager());

-- -----------------------------------------------------------------------------
-- 7.6 POLICIES FOR payments
-- -----------------------------------------------------------------------------
CREATE POLICY "Public & Authenticated users can insert payment proof"
    ON public.payments FOR INSERT
    WITH CHECK (TRUE);

CREATE POLICY "Clients view own payments, Admins view all"
    ON public.payments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders o
            WHERE o.id = payments.order_id
            AND (o.client_id = auth.uid() OR o.guest_email = auth.jwt()->>'email')
        )
        OR public.is_admin_or_manager()
    );

CREATE POLICY "Admins & Managers can verify or update payments"
    ON public.payments FOR UPDATE
    USING (public.is_admin_or_manager());

-- -----------------------------------------------------------------------------
-- 7.7 POLICIES FOR noc_audit_logs
-- -----------------------------------------------------------------------------
CREATE POLICY "System & Users can write audit logs"
    ON public.noc_audit_logs FOR INSERT
    WITH CHECK (TRUE);

CREATE POLICY "Only Super Admins & Managers can view audit logs"
    ON public.noc_audit_logs FOR SELECT
    USING (public.is_admin_or_manager());

-- =============================================================================
-- END OF SUPABASE SCHEMA (schema.sql)
-- =============================================================================
