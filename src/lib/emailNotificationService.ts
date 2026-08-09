export interface EmailOrderPayload {
  orderId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceTitle: string;
  serviceCategory?: string;
  currency: string;
  amount: number;
  formattedAmount?: string;
  urgency: string;
  quantity?: number;
  projectNotes?: string;
  paymentMethod: string;
  paymentProofUrl?: string;
  fileNames?: string[];
}

export interface EmailActionPayload {
  actionType: 'contact_inquiry' | 'support_ticket' | 'dispute_submission' | 'revision_request' | 'status_update' | string;
  actionTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  subject?: string;
  details: string;
  referenceId?: string;
  metadata?: Record<string, any>;
}

/**
 * Dispatch automated email notification for an order (sends client confirmation + admin alert)
 */
export async function sendOrderNotificationEmail(payload: EmailOrderPayload): Promise<boolean> {
  try {
    const res = await fetch('/api/notifications/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data?.success === true;
  } catch (err) {
    console.warn('[Email Notification Client] Order notification dispatch warning:', err);
    return false;
  }
}

/**
 * Dispatch automated email notification for a client action (sends client confirmation + admin alert)
 */
export async function sendActionNotificationEmail(payload: EmailActionPayload): Promise<boolean> {
  try {
    const res = await fetch('/api/notifications/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data?.success === true;
  } catch (err) {
    console.warn('[Email Notification Client] Action notification dispatch warning:', err);
    return false;
  }
}
