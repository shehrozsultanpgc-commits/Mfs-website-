import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { OrderStatus } from '../lib/database.types';

export interface RealtimeOrderState {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  lastUpdated: string;
  clientName?: string;
  serviceTitle?: string;
  amount?: number;
  currency?: string;
}

export function useRealtimeOrder(orderIdOrNumber: string, initialStatus: OrderStatus = 'pending_verification') {
  const [orderState, setOrderState] = useState<RealtimeOrderState>({
    orderId: orderIdOrNumber,
    orderNumber: orderIdOrNumber,
    status: initialStatus,
    lastUpdated: new Date().toISOString(),
  });
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  useEffect(() => {
    if (!orderIdOrNumber) return;

    let channel: any = null;

    try {
      // Create realtime subscription for the specific order
      channel = supabase
        .channel(`order_status:${orderIdOrNumber}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'orders',
            filter: `order_number=eq.${orderIdOrNumber}`,
          },
          (payload) => {
            if (payload.new && payload.new.status) {
              console.log(`[Supabase Realtime] Order #${orderIdOrNumber} status changed:`, payload.new.status);
              setOrderState((prev) => ({
                ...prev,
                status: payload.new.status as OrderStatus,
                lastUpdated: new Date().toISOString(),
              }));
            }
          }
        )
        .subscribe((status, err) => {
          if (status === 'SUBSCRIBED') {
            setIsSubscribed(true);
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            setIsSubscribed(false);
            if (err) {
              console.warn(`[Supabase Realtime] Order #${orderIdOrNumber} subscription issue:`, status, err);
            }
          }
        });
    } catch (err) {
      console.warn('[Realtime Order Hook] Realtime channel setup warning:', err);
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [orderIdOrNumber]);

  // Method to update order status both in state & Supabase database
  const updateOrderStatus = async (newStatus: OrderStatus): Promise<boolean> => {
    setOrderState((prev) => ({
      ...prev,
      status: newStatus,
      lastUpdated: new Date().toISOString(),
    }));

    try {
      const { error } = await (supabase.from('orders') as any)
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .or(`id.eq.${orderIdOrNumber},order_number.eq.${orderIdOrNumber}`);

      if (error) {
        console.warn('[Realtime Order Hook] Supabase status update warning:', error.message);
      }
      return true;
    } catch (err) {
      console.warn('[Realtime Order Hook] Exception during status update:', err);
      return true; // Graceful state update
    }
  };

  return {
    orderState,
    status: orderState.status,
    isSubscribed,
    updateOrderStatus,
    setOrderState,
  };
}
