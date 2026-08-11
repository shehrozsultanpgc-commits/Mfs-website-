import { Router, Request, Response } from 'express';
import {
  sendClientConfirmation,
  sendAdminAlert,
  sendClientActionConfirmation,
  sendAdminActionAlert,
  getEmailLogs,
  OrderCheckoutPayload,
  ActionPayload,
} from '../services/emailService';
import { sanitizeEmail, sanitizeString, sanitizePhone } from '../utils/security';

const router = Router();

/**
 * GET /api/notifications/logs
 * Retrieve email dispatch and diagnostic logs for audit dashboard
 */
router.get('/logs', (req: Request, res: Response) => {
  try {
    const logs = getEmailLogs();
    return res.status(200).json({
      success: true,
      count: logs.length,
      logs,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to fetch email logs' });
  }
});


/**
 * POST /api/notifications/action
 * Dispatch automated email notifications for client actions (inquiries, support tickets, status triggers, etc.)
 */
router.post('/action', async (req: Request, res: Response) => {
  try {
    const rawPayload: ActionPayload = req.body;

    if (!rawPayload || !rawPayload.clientEmail || !rawPayload.actionTitle || !rawPayload.details) {
      return res.status(400).json({
        success: false,
        error: 'Missing required action notification fields (clientEmail, actionTitle, details).',
      });
    }

    const cleanEmail = sanitizeEmail(rawPayload.clientEmail);
    if (!cleanEmail) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or malformed client email address.',
      });
    }

    const actionData: ActionPayload = {
      ...rawPayload,
      actionTitle: sanitizeString(rawPayload.actionTitle),
      clientName: sanitizeString(rawPayload.clientName || 'Valued Client'),
      clientEmail: cleanEmail,
      clientPhone: sanitizePhone(rawPayload.clientPhone || ''),
      subject: sanitizeString(rawPayload.subject || ''),
      details: sanitizeString(rawPayload.details),
      referenceId: sanitizeString(rawPayload.referenceId || ''),
      actionType: sanitizeString(rawPayload.actionType || 'client_action'),
      createdAt: rawPayload.createdAt || new Date().toISOString(),
    };

    // Dispatch emails concurrently
    const [clientRes, adminRes] = await Promise.allSettled([
      sendClientActionConfirmation(actionData),
      sendAdminActionAlert(actionData),
    ]);

    const clientSent = clientRes.status === 'fulfilled' && clientRes.value.success;
    const adminSent = adminRes.status === 'fulfilled' && adminRes.value.success;

    return res.status(200).json({
      success: true,
      message: 'Action notifications dispatched successfully.',
      notifications: {
        clientEmailSent: clientSent,
        adminAlertSent: adminSent,
      },
    });
  } catch (err: any) {
    console.error('[Notification Action Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to send action notifications.',
    });
  }
});

/**
 * POST /api/notifications/order
 * Alias endpoint for dispatching order checkout notifications
 */
router.post('/order', async (req: Request, res: Response) => {
  try {
    const payload: OrderCheckoutPayload = req.body;

    if (!payload || !payload.orderId || !payload.clientEmail || !payload.serviceTitle) {
      return res.status(400).json({
        success: false,
        error: 'Missing required order notification fields.',
      });
    }

    const [clientRes, adminRes] = await Promise.allSettled([
      sendClientConfirmation(payload),
      sendAdminAlert(payload),
    ]);

    const clientSent = clientRes.status === 'fulfilled' && clientRes.value.success;
    const adminSent = adminRes.status === 'fulfilled' && adminRes.value.success;

    return res.status(200).json({
      success: true,
      message: 'Order email notifications dispatched successfully.',
      notifications: {
        clientEmailSent: clientSent,
        adminAlertSent: adminSent,
      },
    });
  } catch (err: any) {
    console.error('[Notification Order Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to send order email notifications.',
    });
  }
});

export default router;
