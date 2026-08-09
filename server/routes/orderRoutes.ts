import { Router, Request, Response } from 'express';
import { sendClientConfirmation, sendAdminAlert, OrderCheckoutPayload } from '../services/emailService';
import { sanitizeEmail, sanitizeString, sanitizePhone } from '../utils/security';

const router = Router();

// In-memory store for orders if needed during session
const ordersStore = new Map<string, OrderCheckoutPayload>();

/**
 * POST /api/orders/checkout
 * Process client checkout and dispatch email confirmations
 */
router.post('/checkout', async (req: Request, res: Response) => {
  try {
    const rawPayload: OrderCheckoutPayload = req.body;

    if (!rawPayload || !rawPayload.orderId || !rawPayload.clientEmail || !rawPayload.serviceTitle) {
      return res.status(400).json({
        success: false,
        error: 'Missing required order fields (orderId, clientEmail, serviceTitle).',
      });
    }

    const cleanEmail = sanitizeEmail(rawPayload.clientEmail);
    if (!cleanEmail) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or malformed client email address.',
      });
    }

    const payload: OrderCheckoutPayload = {
      ...rawPayload,
      orderId: sanitizeString(rawPayload.orderId),
      clientName: sanitizeString(rawPayload.clientName || 'Valued Client'),
      clientEmail: cleanEmail,
      clientPhone: sanitizePhone(rawPayload.clientPhone || ''),
      serviceTitle: sanitizeString(rawPayload.serviceTitle),
      serviceCategory: sanitizeString(rawPayload.serviceCategory || ''),
      currency: sanitizeString(rawPayload.currency || 'PKR'),
      urgency: sanitizeString(rawPayload.urgency || 'Standard'),
      projectNotes: sanitizeString(rawPayload.projectNotes || ''),
      paymentMethod: sanitizeString(rawPayload.paymentMethod || 'EasyPaisa'),
      createdAt: rawPayload.createdAt || new Date().toISOString(),
    };

    // Save in memory store
    ordersStore.set(payload.orderId, payload);

    // Dispatch emails concurrently
    const [clientRes, adminRes] = await Promise.allSettled([
      sendClientConfirmation(payload),
      sendAdminAlert(payload),
    ]);

    const clientSent = clientRes.status === 'fulfilled' && clientRes.value.success;
    const adminSent = adminRes.status === 'fulfilled' && adminRes.value.success;

    return res.status(200).json({
      success: true,
      message: 'Order processed successfully.',
      orderId: payload.orderId,
      notifications: {
        clientEmail: clientSent,
        adminAlert: adminSent,
      },
    });
  } catch (err: any) {
    console.error('[Order Checkout Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to process order. Please try again or contact support.',
    });
  }
});

/**
 * GET /api/orders/:id
 * Retrieve order details by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const order = ordersStore.get(id);

  if (!order) {
    return res.status(404).json({
      success: false,
      error: `Order #${id} not found in current session store.`,
    });
  }

  return res.status(200).json({
    success: true,
    order,
  });
});

/**
 * GET /api/orders
 * List all active orders
 */
router.get('/', (req: Request, res: Response) => {
  const allOrders = Array.from(ordersStore.values());
  return res.status(200).json({
    success: true,
    count: allOrders.length,
    orders: allOrders,
  });
});

export default router;
