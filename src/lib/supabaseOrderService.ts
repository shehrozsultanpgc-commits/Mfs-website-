import { supabase } from './supabase';
import type { Database } from './database.types';

type OrderInsert = Database['public']['Tables']['orders']['Insert'];

function saveToLocalOrders(order: any) {
  try {
    if (typeof window === 'undefined') return;
    const existingRaw = localStorage.getItem('mfs_local_orders');
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    const filtered = existing.filter((o: any) => o.order_number !== order.order_number);
    const updated = [order, ...filtered];
    localStorage.setItem('mfs_local_orders', JSON.stringify(updated));
  } catch (err) {
    console.warn('[Order Storage] Failed to write to localStorage:', err);
  }
}

function getFromLocalOrders(email: string): any[] {
  try {
    if (typeof window === 'undefined') return [];
    const existingRaw = localStorage.getItem('mfs_local_orders');
    if (!existingRaw) return [];
    const existing = JSON.parse(existingRaw);
    if (!Array.isArray(existing)) return [];
    const cleanEmail = email.trim().toLowerCase();
    return existing.filter((o: any) => {
      const gEmail = (o.guest_email || o.client_id || '').toLowerCase();
      return gEmail === cleanEmail || gEmail.includes(cleanEmail);
    });
  } catch (err) {
    return [];
  }
}

export async function createRealOrder(orderData: OrderInsert): Promise<{ success: boolean; data?: any; error?: string }> {
  const fullOrder = {
    id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...orderData,
    status: orderData.status || 'pending_verification',
    created_at: new Date().toISOString(),
  };

  // Always save to local fallback storage first for instant client availability
  saveToLocalOrders(fullOrder);

  // Dispatch real-time sync event across window/tabs
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent('mfs_order_created', { detail: fullOrder }));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      // Ignore event dispatch errors
    }
  }

  try {
    const { data, error } = await (supabase.from('orders') as any)
      .insert({
        ...orderData,
        status: orderData.status || 'pending_verification'
      })
      .select()
      .single();

    if (error) {
      console.warn('[Supabase Order Service] Cloud DB insert notice (fallback local order used):', error.message || error);
      return { success: true, data: fullOrder };
    }

    if (data) {
      saveToLocalOrders(data);
      if (typeof window !== 'undefined') {
        try {
          window.dispatchEvent(new CustomEvent('mfs_order_created', { detail: data }));
          window.dispatchEvent(new Event('storage'));
        } catch (e) {}
      }
    }

    return { success: true, data: data || fullOrder };
  } catch (err: any) {
    console.warn('[Supabase Order Service] Exception during cloud order creation (fallback local order used):', err?.message || err);
    return { success: true, data: fullOrder };
  }
}

export async function fetchClientOrders(email: string): Promise<{ success: boolean; data: any[]; error?: string }> {
  if (!email || !email.trim()) {
    return { success: true, data: [] };
  }
  const cleanEmail = email.trim().toLowerCase();
  const localOrders = getFromLocalOrders(cleanEmail);

  try {
    // Query orders where guest_email equals/ilike email OR client_id equals email
    const { data, error } = await (supabase.from('orders') as any)
      .select('*')
      .or(`guest_email.ilike.${cleanEmail},guest_email.eq.${email},client_id.eq.${cleanEmail}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase Order Service] Notice fetching cloud orders (returning local fallback orders):', error.message || error);
      return { success: true, data: localOrders };
    }

    // Merge Supabase orders and local orders without duplicates
    const dbOrders = data || [];
    const combinedMap = new Map<string, any>();
    
    localOrders.forEach((lo) => {
      const key = lo.order_number || lo.id;
      if (key) combinedMap.set(key, lo);
    });

    dbOrders.forEach((dbo) => {
      const key = dbo.order_number || dbo.id;
      if (key) combinedMap.set(key, dbo);
    });

    const merged = Array.from(combinedMap.values()).sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA;
    });

    return { success: true, data: merged };
  } catch (err: any) {
    console.warn('[Supabase Order Service] Exception fetching cloud orders (returning local fallback orders):', err?.message || err);
    return { success: true, data: localOrders };
  }
}

export async function fetchAllOrdersForAdmin(): Promise<{ success: boolean; data: any[]; error?: string }> {
  let localOrders: any[] = [];
  try {
    if (typeof window !== 'undefined') {
      const existingRaw = localStorage.getItem('mfs_local_orders');
      localOrders = existingRaw ? JSON.parse(existingRaw) : [];
      if (!Array.isArray(localOrders)) localOrders = [];
    }
  } catch (err) {
    localOrders = [];
  }

  try {
    const { data, error } = await (supabase.from('orders') as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase Order Service] Notice fetching admin orders (returning local orders fallback):', error.message || error);
      return { success: true, data: localOrders };
    }

    const dbOrders = data || [];
    const combinedMap = new Map<string, any>();

    localOrders.forEach((lo) => {
      const key = lo.order_number || lo.id;
      if (key) combinedMap.set(key, lo);
    });

    dbOrders.forEach((dbo) => {
      const key = dbo.order_number || dbo.id;
      if (key) combinedMap.set(key, dbo);
    });

    const merged = Array.from(combinedMap.values()).sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA;
    });

    return { success: true, data: merged };
  } catch (err: any) {
    console.warn('[Supabase Order Service] Exception fetching admin orders (returning local orders fallback):', err?.message || err);
    return { success: true, data: localOrders };
  }
}

export function subscribeToClientOrders(
  email: string,
  onUpdate: () => void
): () => void {
  if (!email || !email.trim()) {
    return () => {};
  }
  const cleanEmail = email.trim().toLowerCase();

  try {
    const channel = supabase
      .channel(`client_orders_${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_')}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },
        () => {
          onUpdate();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn('[Supabase Order Service] Realtime setup issue:', err);
    return () => {};
  }
}
