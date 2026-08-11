import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export interface OrderCheckoutPayload {
  orderId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceTitle: string;
  serviceCategory?: string;
  currency: string;
  amount: number;
  formattedAmount: string;
  urgency: string;
  quantity?: number;
  projectNotes?: string;
  paymentMethod: 'EasyPaisa' | 'JazzCash' | 'Bank Transfer' | string;
  paymentProofUrl?: string;
  fileNames?: string[];
  createdAt?: string;
}

export interface ActionPayload {
  actionType: 'contact_inquiry' | 'support_ticket' | 'dispute_submission' | 'revision_request' | 'status_update' | string;
  actionTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  subject?: string;
  details: string;
  referenceId?: string;
  metadata?: Record<string, any>;
  createdAt?: string;
}

function getAdminEmail(): string {
  return process.env.SUPPORT_EMAIL || process.env.AGENCY_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL || 'mfsmedia.agency@gmail.com';
}

function getSenderEmail(): string {
  return process.env.SMTP_FROM_EMAIL || process.env.SENDER_EMAIL || 'MFS Growth Agency <onboarding@resend.dev>';
}

function getWhatsAppNumber(): string {
  const raw = process.env.AGENCY_WHATSAPP || '+923015323689';
  return raw.replace(/[^0-9]/g, '');
}

// In-memory log store for inspecting email dispatch history and diagnostic auditing
export interface EmailLogEntry {
  id: string;
  timestamp: string;
  recipient: string;
  type: 'order_client' | 'order_admin' | 'action_client' | 'action_admin';
  subject: string;
  provider: 'sendgrid' | 'resend' | 'smtp' | 'simulation';
  status: 'sent' | 'simulated' | 'failed';
  messageId?: string;
  error?: string;
  previewHtml?: string;
}

const emailLogsStore: EmailLogEntry[] = [];

export function getEmailLogs(): EmailLogEntry[] {
  return [...emailLogsStore].reverse();
}

export function logEmailDispatch(entry: EmailLogEntry) {
  emailLogsStore.push(entry);
  if (emailLogsStore.length > 200) {
    emailLogsStore.shift();
  }
}

async function sendViaSendGrid(to: string, subject: string, html: string): Promise<{ success: boolean; messageId: string } | null> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey || apiKey.trim().length < 10 || apiKey.includes('placeholder')) return null;

  try {
    const sender = getSenderEmail();
    const fromMatch = sender.match(/<([^>]+)>/);
    const fromEmail = fromMatch ? fromMatch[1] : sender.trim();

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: fromEmail || 'mfsmedia.agency@gmail.com', name: 'MFS Growth Agency' },
        subject,
        content: [{ type: 'text/html', value: html }],
      }),
    });

    if (response.ok) {
      const msgId = response.headers.get('x-message-id') || `sg-${Date.now()}`;
      return { success: true, messageId: msgId };
    } else {
      const errText = await response.text();
      console.warn('[SendGrid Notice] Dispatch returned notice:', errText);
      return null;
    }
  } catch (err: any) {
    console.warn('[SendGrid Error] Failed sending email via SendGrid:', err?.message || err);
    return null;
  }
}

let resendClient: Resend | null = null;
function getResendClient(): Resend | null {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendClient && resendKey && resendKey.trim().length > 10 && !resendKey.includes('placeholder')) {
    try {
      resendClient = new Resend(resendKey.trim());
    } catch (err) {
      console.warn('[MFS Resend] Failed to initialize Resend client:', err);
      resendClient = null;
    }
  }
  return resendClient;
}

// Fallback SMTP Transporter if configured
function getSmtpTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
}

/**
 * HTML Template for Client Order Confirmation
 */
export function buildClientConfirmationHtml(order: OrderCheckoutPayload): string {
  const dateStr = order.createdAt || new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }) + ' PKT';

  const waMessage = `Hello MFS Growth Agency! I have submitted Order #${order.orderId} for ${order.serviceTitle} (${order.currency} ${order.amount.toLocaleString()}).
Client: ${order.clientName}
Phone: ${order.clientPhone}
Delivery Speed: ${order.urgency}
Brief: ${order.projectNotes || 'Standard guidelines provided'}`;

  const whatsappUrl = `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(waMessage)}`;

  const emailSubject = `Order Brief & Payment Verification - Order #${order.orderId} (${order.clientName})`;
  const emailBody = `Dear MFS Agency Management,

I am providing my order details and project brief for Order #${order.orderId}:

- Client Name: ${order.clientName}
- Phone/WhatsApp: ${order.clientPhone}
- Service Required: ${order.serviceTitle}
- Total Amount: ${order.currency} ${order.amount.toLocaleString()}
- Delivery Speed: ${order.urgency}
- Payment Method: ${order.paymentMethod}
- Project Brief / Guidelines:
${order.projectNotes || 'Standard guidelines provided'}

Please verify my payment proof and initiate production.

Best regards,
${order.clientName}`;

  const mailtoUrl = `mailto:mfsmedia.agency@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Receipt & Confirmation - MFS Growth Agency</title>
  <style>
    body { margin: 0; padding: 0; background-color: #050507; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #E0E0E0; }
    .container { max-width: 620px; margin: 30px auto; background-color: #0F0F14; border: 1px solid #22222E; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.8); }
    .header { background: linear-gradient(135deg, #0A0A0F 0%, #151520 100%); padding: 32px 28px; text-align: center; border-bottom: 2px solid #E5C158; }
    .logo-title { font-size: 24px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.5px; margin: 0; }
    .logo-gold { color: #E5C158; }
    .badge { display: inline-block; background: rgba(229, 193, 88, 0.15); border: 1px solid rgba(229, 193, 88, 0.4); color: #E5C158; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-top: 10px; }
    .content { padding: 32px 28px; }
    .greeting { font-size: 18px; font-weight: 700; color: #FFFFFF; margin-bottom: 12px; }
    .text { font-size: 14px; line-height: 1.6; color: #A0A0B0; margin-bottom: 24px; }
    .order-box { background: #07070B; border: 1px solid #1F1F2C; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .order-box-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #808095; margin-bottom: 14px; font-weight: 700; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #14141F; font-size: 13px; }
    .row:last-child { border-bottom: none; }
    .row-label { color: #808095; }
    .row-value { color: #FFFFFF; font-weight: 600; text-align: right; }
    .mono { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; color: #E5C158; font-weight: 700; }
    .status-badge { background: #28C76F; color: #000000; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; }
    .payment-instructions { background: rgba(229, 193, 88, 0.05); border: 1px dashed rgba(229, 193, 88, 0.3); border-radius: 12px; padding: 18px; margin-bottom: 24px; }
    .payment-title { font-size: 13px; font-weight: 700; color: #E5C158; margin-bottom: 8px; }
    .payment-text { font-size: 12px; color: #CCCCCC; line-height: 1.5; margin: 0; }
    .manual-control-box { background: rgba(40, 199, 111, 0.08); border: 1px solid rgba(40, 199, 111, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 24px; }
    .manual-control-title { font-size: 12px; font-weight: 800; color: #28C76F; text-transform: uppercase; margin-bottom: 6px; }
    .manual-control-text { font-size: 12px; color: #D0D0E0; line-height: 1.5; margin: 0; }
    .cta-container { display: flex; flex-direction: column; gap: 12px; margin: 24px 0; }
    .cta-btn-wa { display: block; text-align: center; background: #28C76F; color: #000000; font-weight: 800; font-size: 14px; padding: 14px 24px; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 20px rgba(40, 199, 111, 0.3); text-transform: uppercase; }
    .cta-btn-email { display: block; text-align: center; background: #E5C158; color: #000000; font-weight: 800; font-size: 14px; padding: 14px 24px; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 20px rgba(229, 193, 88, 0.3); text-transform: uppercase; }
    .footer { background-color: #07070A; padding: 20px 28px; text-align: center; font-size: 12px; color: #606075; border-top: 1px solid #1A1A24; }
    .footer a { color: #E5C158; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-title">MFS <span class="logo-gold">GROWTH AGENCY</span></div>
      <div class="badge">Official Order Confirmation & Luxury Receipt</div>
    </div>
    
    <div class="content">
      <div class="greeting">Assalam-o-Alaikum & Hello, ${escapeHtml(order.clientName)}! 👋</div>
      <div class="text">
        Thank you for choosing <strong>MFS Growth Agency</strong>. Your project order has been registered in our live production queue under Order Reference <strong>#${escapeHtml(order.orderId)}</strong>.
      </div>

      <div class="order-box">
        <div class="order-box-title">Itemized Order Specifications & Fixed Rate</div>
        <div class="row">
          <span class="row-label">Order Reference ID:</span>
          <span class="row-value mono">${escapeHtml(order.orderId)}</span>
        </div>
        <div class="row">
          <span class="row-label">Selected Service:</span>
          <span class="row-value">${escapeHtml(order.serviceTitle)}</span>
        </div>
        <div class="row">
          <span class="row-label">Scope / Quantity:</span>
          <span class="row-value">${escapeHtml(String(order.quantity || 1))}</span>
        </div>
        <div class="row">
          <span class="row-label">Fixed Total Rate (50% OFF):</span>
          <span class="row-value mono" style="color:#28C76F; font-size:15px;">${escapeHtml(order.currency)} ${order.amount.toLocaleString()}</span>
        </div>
        <div class="row">
          <span class="row-label">Delivery Speed:</span>
          <span class="row-value">${escapeHtml(order.urgency)}</span>
        </div>
        <div class="row">
          <span class="row-label">Payment Method Selected:</span>
          <span class="row-value">${escapeHtml(order.paymentMethod)}</span>
        </div>
        <div class="row">
          <span class="row-label">Order Status:</span>
          <span class="row-value"><span class="status-badge">PROCESSING & AWAITING VERIFICATION</span></span>
        </div>
        <div class="row">
          <span class="row-label">Timestamp:</span>
          <span class="row-value mono">${escapeHtml(dateStr)}</span>
        </div>
      </div>

      <div class="manual-control-box">
        <div class="manual-control-title">🛡️ MANUAL PAYMENT CONTROL & ADMIN VERIFICATION</div>
        <div class="manual-control-text">
          <strong>Important Notice:</strong> Automated AI systems do <em>not</em> charge or deduct funds automatically. Payment verification and final project kickoff are strictly reviewed and authorized manually by Agency Founder & Administrator <strong>Shehroz Sultan</strong>.
        </div>
      </div>

      <div class="payment-instructions">
        <div class="payment-title">💳 Agency Payment Accounts</div>
        <div class="payment-text">
          Title: <strong>Muhammad Shehroz Sultan</strong><br>
          • <strong>EasyPaisa:</strong> 03116191234<br>
          • <strong>JazzCash:</strong> 03015323688<br>
          • <strong>Askari Bank:</strong> 00553230017265
        </div>
      </div>

      <div style="font-size: 13px; font-weight: 700; color: #FFFFFF; margin-bottom: 10px; text-align: center;">
        👉 Next Steps to Confirm & Dispatch Your Brief Directly:
      </div>

      <div class="cta-container">
        <a href="${whatsappUrl}" target="_blank" class="cta-btn-wa">
          💬 Send Order Brief directly via WhatsApp (+923015323689)
        </a>

        <a href="${mailtoUrl}" class="cta-btn-email">
          ✉️ Send Order Brief & Specs via Direct Email
        </a>
      </div>

      <div class="text" style="font-size: 12px; text-align: center; margin-top: 20px;">
        Need assistance or custom invoicing? Reply directly to this email or contact 24/7 Support at <strong>mfsmedia.agency@gmail.com</strong> / <strong>+92 301 5323689</strong>.
      </div>
    </div>

    <div class="footer">
      © 2026 MFS Growth Agency.<br>
      Helping Students & Professionals Grow with High-Quality Digital Solutions.
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * HTML Template for Admin Order Notification Alert
 */
export function buildAdminAlertHtml(order: OrderCheckoutPayload): string {
  const dateStr = order.createdAt || new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }) + ' PKT';
  const fileList = order.fileNames && order.fileNames.length > 0
    ? order.fileNames.map(f => `<li>📎 ${escapeHtml(f)}</li>`).join('')
    : '<li>No files uploaded</li>';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>🚨 NEW ORDER RECEIVED - ${escapeHtml(order.orderId)}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #050507; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #E0E0E0; }
    .container { max-width: 650px; margin: 25px auto; background-color: #0E0E14; border: 2px solid #E5C158; border-radius: 16px; overflow: hidden; }
    .header { background: #12121B; padding: 24px 28px; border-bottom: 1px solid #222230; text-align: left; }
    .alert-tag { background: #E5C158; color: #000000; font-size: 10px; font-weight: 900; padding: 4px 10px; border-radius: 4px; font-family: monospace; text-transform: uppercase; }
    .title { font-size: 20px; font-weight: 900; color: #FFFFFF; margin-top: 10px; }
    .mono { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; color: #E5C158; }
    .body-content { padding: 28px; }
    .section-title { font-size: 12px; font-weight: 800; color: #E5C158; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 1px solid #1F1F2C; padding-bottom: 6px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
    .field { background: #07070C; padding: 12px; border-radius: 8px; border: 1px solid #1A1A26; }
    .field-label { font-size: 11px; color: #808095; font-weight: 600; display: block; margin-bottom: 4px; }
    .field-value { font-size: 13px; color: #FFFFFF; font-weight: 700; word-break: break-all; }
    .notes-box { background: #07070C; padding: 14px; border-radius: 8px; border: 1px solid #1A1A26; font-size: 13px; color: #CCCCCC; line-height: 1.5; margin-bottom: 20px; }
    .files-list { font-size: 12px; color: #A0A0B5; list-style: none; padding: 0; margin: 0 0 20px 0; }
    .files-list li { padding: 4px 0; }
    .admin-btn { display: block; text-align: center; background: linear-gradient(135deg, #E5C158 0%, #D4AF37 100%); color: #000000; font-weight: 900; font-size: 14px; padding: 16px 24px; text-decoration: none; border-radius: 10px; box-shadow: 0 0 25px rgba(229, 193, 88, 0.4); text-transform: uppercase; letter-spacing: 0.5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="alert-tag">🚨 NEW CLIENT CHECKOUT ORDER</span>
      <div class="title">Order ID: <span class="mono">${escapeHtml(order.orderId)}</span></div>
    </div>

    <div class="body-content">
      <div class="section-title">👤 Client Contact & Details</div>
      <div class="grid">
        <div class="field">
          <span class="field-label">Client Name</span>
          <span class="field-value">${escapeHtml(order.clientName)}</span>
        </div>
        <div class="field">
          <span class="field-label">Email Address</span>
          <span class="field-value">${escapeHtml(order.clientEmail)}</span>
        </div>
        <div class="field">
          <span class="field-label">Phone / WhatsApp</span>
          <span class="field-value">${escapeHtml(order.clientPhone)}</span>
        </div>
        <div class="field">
          <span class="field-label">Order Timestamp</span>
          <span class="field-value mono">${escapeHtml(dateStr)}</span>
        </div>
      </div>

      <div class="section-title">💼 Service Specifications & Billing</div>
      <div class="grid">
        <div class="field">
          <span class="field-label">Service Title</span>
          <span class="field-value">${escapeHtml(order.serviceTitle)}</span>
        </div>
        <div class="field">
          <span class="field-label">Amount & Currency</span>
          <span class="field-value mono">${escapeHtml(order.currency)} ${order.amount.toLocaleString()}</span>
        </div>
        <div class="field">
          <span class="field-label">Urgency Speed</span>
          <span class="field-value">${escapeHtml(order.urgency)}</span>
        </div>
        <div class="field">
          <span class="field-label">Payment Channel</span>
          <span class="field-value">${escapeHtml(order.paymentMethod)}</span>
        </div>
      </div>

      ${order.projectNotes ? `
        <div class="section-title">📝 Project Requirements & Client Notes</div>
        <div class="notes-box">${escapeHtml(order.projectNotes)}</div>
      ` : ''}

      <div class="section-title">📂 Uploaded Requirements & Proof</div>
      <ul class="files-list">
        ${fileList}
        ${order.paymentProofUrl ? `<li>🖼️ Payment Proof Screenshot: <a href="${escapeHtml(order.paymentProofUrl)}" style="color:#E5C158;" target="_blank">View Screenshot</a></li>` : ''}
      </ul>

      <a href="https://mfs-growth-agency.com/admin?tab=orders&order=${encodeURIComponent(order.orderId)}" class="admin-btn">
        ⚡ Open Order in Admin Command Center
      </a>
    </div>
  </div>
</body>
</html>
  `;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Dispatch client confirmation email
 */
export async function sendClientConfirmation(order: OrderCheckoutPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const html = buildClientConfirmationHtml(order);
  const subject = `Order Confirmation #${order.orderId} - MFS Growth Agency`;
  const senderEmail = getSenderEmail();
  const adminEmail = getAdminEmail();

  // 1. SendGrid Provider
  const sendgridRes = await sendViaSendGrid(order.clientEmail, subject, html);
  if (sendgridRes) {
    console.log(`[SendGrid] Client email dispatched for ${order.orderId}:`, sendgridRes.messageId);
    logEmailDispatch({
      id: `log-${Date.now()}-1`,
      timestamp: new Date().toISOString(),
      recipient: order.clientEmail,
      type: 'order_client',
      subject,
      provider: 'sendgrid',
      status: 'sent',
      messageId: sendgridRes.messageId,
      previewHtml: html,
    });
    return { success: true, messageId: sendgridRes.messageId };
  }

  // 2. Resend Provider
  const resend = getResendClient();
  if (resend) {
    try {
      const isTestDomain = senderEmail.includes('onboarding@resend.dev');
      const targetEmail = isTestDomain ? adminEmail : order.clientEmail;

      const response = await resend.emails.send({
        from: senderEmail,
        to: [targetEmail],
        subject: isTestDomain && targetEmail !== order.clientEmail
          ? `[Client Copy: ${order.clientEmail}] ${subject}`
          : subject,
        html: html,
      });

      if (response && response.data && response.data.id && !response.error) {
        console.log(`[Resend] Client email dispatched for ${order.orderId}:`, response.data.id);
        logEmailDispatch({
          id: `log-${Date.now()}-1`,
          timestamp: new Date().toISOString(),
          recipient: order.clientEmail,
          type: 'order_client',
          subject,
          provider: 'resend',
          status: 'sent',
          messageId: response.data.id,
          previewHtml: html,
        });
        return { success: true, messageId: response.data.id };
      } else {
        const errMsg = response?.error?.message || 'Resend validation constraint';
        console.warn(`[Resend Notice] Client email dispatch returned notice (${errMsg}). Falling back.`);
      }
    } catch (err: any) {
      console.warn(`[Resend Error] Failed sending to client ${order.clientEmail}:`, err?.message || err);
    }
  }

  // 3. SMTP Provider
  const smtp = getSmtpTransporter();
  if (smtp) {
    try {
      const info = await smtp.sendMail({
        from: senderEmail,
        to: order.clientEmail,
        subject: subject,
        html: html,
      });
      console.log(`[SMTP] Client email sent for ${order.orderId}:`, info.messageId);
      logEmailDispatch({
        id: `log-${Date.now()}-1`,
        timestamp: new Date().toISOString(),
        recipient: order.clientEmail,
        type: 'order_client',
        subject,
        provider: 'smtp',
        status: 'sent',
        messageId: info.messageId,
        previewHtml: html,
      });
      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      console.warn(`[SMTP Error] Failed sending to client:`, err?.message || err);
    }
  }

  console.log(`[Email Simulation] Simulated Client Confirmation Email queued for ${order.clientEmail} (#${order.orderId})`);
  const simId = `sim-client-${Date.now()}`;
  logEmailDispatch({
    id: `log-${Date.now()}-1`,
    timestamp: new Date().toISOString(),
    recipient: order.clientEmail,
    type: 'order_client',
    subject,
    provider: 'simulation',
    status: 'simulated',
    messageId: simId,
    previewHtml: html,
  });
  return { success: true, messageId: simId };
}

/**
 * Dispatch admin notification email
 */
export async function sendAdminAlert(order: OrderCheckoutPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const html = buildAdminAlertHtml(order);
  const subject = `🚨 NEW ORDER RECEIVED - [${order.orderId}] - ${order.clientName}`;
  const senderEmail = getSenderEmail();
  const adminEmail = getAdminEmail();

  // 1. SendGrid Provider
  const sendgridRes = await sendViaSendGrid(adminEmail, subject, html);
  if (sendgridRes) {
    console.log(`[SendGrid] Admin alert dispatched for ${order.orderId}:`, sendgridRes.messageId);
    logEmailDispatch({
      id: `log-${Date.now()}-2`,
      timestamp: new Date().toISOString(),
      recipient: adminEmail,
      type: 'order_admin',
      subject,
      provider: 'sendgrid',
      status: 'sent',
      messageId: sendgridRes.messageId,
      previewHtml: html,
    });
    return { success: true, messageId: sendgridRes.messageId };
  }

  // 2. Resend Provider
  const resend = getResendClient();
  if (resend) {
    try {
      const isTestDomain = senderEmail.includes('onboarding@resend.dev');
      const targetEmail = isTestDomain ? 'mfsmedia.agency@gmail.com' : adminEmail;

      const response = await resend.emails.send({
        from: senderEmail,
        to: [targetEmail],
        subject: isTestDomain && targetEmail !== adminEmail 
          ? `[Admin Copy: ${adminEmail}] ${subject}`
          : subject,
        html: html,
      });

      if (response && response.data && response.data.id && !response.error) {
        console.log(`[Resend] Admin alert dispatched for ${order.orderId}:`, response.data.id);
        logEmailDispatch({
          id: `log-${Date.now()}-2`,
          timestamp: new Date().toISOString(),
          recipient: targetEmail,
          type: 'order_admin',
          subject,
          provider: 'resend',
          status: 'sent',
          messageId: response.data.id,
          previewHtml: html,
        });
        return { success: true, messageId: response.data.id };
      } else {
        const errMsg = response?.error?.message || 'Resend validation constraint';
        console.warn(`[Resend Notice] Admin alert dispatch returned notice (${errMsg}). Falling back.`);
      }
    } catch (err: any) {
      console.warn(`[Resend Error] Failed sending admin alert:`, err?.message || err);
    }
  }

  // 3. SMTP Provider
  const smtp = getSmtpTransporter();
  if (smtp) {
    try {
      const info = await smtp.sendMail({
        from: senderEmail,
        to: adminEmail,
        subject: subject,
        html: html,
      });
      console.log(`[SMTP] Admin alert sent for ${order.orderId}:`, info.messageId);
      logEmailDispatch({
        id: `log-${Date.now()}-2`,
        timestamp: new Date().toISOString(),
        recipient: adminEmail,
        type: 'order_admin',
        subject,
        provider: 'smtp',
        status: 'sent',
        messageId: info.messageId,
        previewHtml: html,
      });
      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      console.warn(`[SMTP Error] Failed sending admin alert:`, err?.message || err);
    }
  }

  console.log(`[Email Simulation] Simulated Admin Alert Email queued for ${adminEmail} (#${order.orderId})`);
  const simAdminId = `sim-admin-${Date.now()}`;
  logEmailDispatch({
    id: `log-${Date.now()}-2`,
    timestamp: new Date().toISOString(),
    recipient: adminEmail,
    type: 'order_admin',
    subject,
    provider: 'simulation',
    status: 'simulated',
    messageId: simAdminId,
    previewHtml: html,
  });
  return { success: true, messageId: simAdminId };
}

/**
 * HTML Template for Client Action Confirmation Email
 */
export function buildClientActionHtml(action: ActionPayload): string {
  const dateStr = action.createdAt || new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }) + ' PKT';
  const refId = action.referenceId || 'MFS-ACT-' + Math.floor(100000 + Math.random() * 900000);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(action.actionTitle)} - MFS Growth Agency</title>
  <style>
    body { margin: 0; padding: 0; background-color: #050507; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #E0E0E0; }
    .container { max-width: 620px; margin: 30px auto; background-color: #0F0F14; border: 1px solid #22222E; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.8); }
    .header { background: linear-gradient(135deg, #0A0A0F 0%, #151520 100%); padding: 32px 28px; text-align: center; border-bottom: 2px solid #E5C158; }
    .logo-title { font-size: 24px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.5px; margin: 0; }
    .logo-gold { color: #E5C158; }
    .badge { display: inline-block; background: rgba(229, 193, 88, 0.15); border: 1px solid rgba(229, 193, 88, 0.4); color: #E5C158; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-top: 10px; }
    .content { padding: 32px 28px; }
    .greeting { font-size: 18px; font-weight: 700; color: #FFFFFF; margin-bottom: 12px; }
    .text { font-size: 14px; line-height: 1.6; color: #A0A0B0; margin-bottom: 24px; }
    .action-box { background: #07070B; border: 1px solid #1F1F2C; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .action-box-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #808095; margin-bottom: 14px; font-weight: 700; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #14141F; font-size: 13px; }
    .row:last-child { border-bottom: none; }
    .row-label { color: #808095; }
    .row-value { color: #FFFFFF; font-weight: 600; text-align: right; }
    .mono { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; color: #E5C158; font-weight: 700; }
    .details-box { background: rgba(229, 193, 88, 0.05); border: 1px border-solid rgba(229, 193, 88, 0.2); border-radius: 10px; padding: 14px; color: #D0D0E0; font-size: 13px; line-height: 1.5; margin-top: 12px; }
    .cta-btn { display: block; text-align: center; background: #E5C158; color: #000000; font-weight: 800; font-size: 14px; padding: 14px 28px; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 20px rgba(229, 193, 88, 0.3); margin: 24px 0 16px 0; }
    .footer { background-color: #07070A; padding: 20px 28px; text-align: center; font-size: 12px; color: #606075; border-top: 1px solid #1A1A24; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-title">MFS <span class="logo-gold">GROWTH AGENCY</span></div>
      <div class="badge">Action Confirmation Received</div>
    </div>
    
    <div class="content">
      <div class="greeting">Hello, ${escapeHtml(action.clientName)}! 👋</div>
      <div class="text">
        We have received your action request: <strong>${escapeHtml(action.actionTitle)}</strong>. Our management desk has logged your request and assigned a priority support engineer.
      </div>

      <div class="action-box">
        <div class="action-box-title">Action Request Details</div>
        <div class="row">
          <span class="row-label">Reference ID:</span>
          <span class="row-value mono">${escapeHtml(refId)}</span>
        </div>
        <div class="row">
          <span class="row-label">Action Category:</span>
          <span class="row-value">${escapeHtml(action.actionType.toUpperCase().replace('_', ' '))}</span>
        </div>
        ${action.subject ? `
        <div class="row">
          <span class="row-label">Subject:</span>
          <span class="row-value">${escapeHtml(action.subject)}</span>
        </div>
        ` : ''}
        <div class="row">
          <span class="row-label">Date Received:</span>
          <span class="row-value mono">${escapeHtml(dateStr)}</span>
        </div>
        <div class="details-box">
          <strong>Submitted Details:</strong><br>
          ${escapeHtml(action.details)}
        </div>
      </div>

      <a href="https://mfs-growth-agency.com/client" class="cta-btn">
        🚀 View Live Updates in Client Dashboard
      </a>

      <div class="text" style="font-size: 12px; text-align: center; margin-top: 16px;">
        Need immediate response? Contact us on WhatsApp at <strong>+92 301 5323689</strong> (24/7 Support).
      </div>
    </div>

    <div class="footer">
      © 2026 MFS Growth Agency.<br>
      High-Quality Digital Solutions for Students & Professionals Worldwide.
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * HTML Template for Admin Action Notification Alert Email
 */
export function buildAdminActionHtml(action: ActionPayload): string {
  const dateStr = action.createdAt || new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }) + ' PKT';
  const refId = action.referenceId || 'MFS-ACT-' + Math.floor(100000 + Math.random() * 900000);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>🔔 CLIENT ACTION TRIGGERED - ${escapeHtml(action.actionTitle)}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #050507; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #E0E0E0; }
    .container { max-width: 650px; margin: 25px auto; background-color: #0E0E14; border: 2px solid #E5C158; border-radius: 16px; overflow: hidden; }
    .header { background: #12121B; padding: 24px 28px; border-bottom: 1px solid #222230; text-align: left; }
    .alert-tag { background: #E5C158; color: #000000; font-size: 10px; font-weight: 900; padding: 4px 10px; border-radius: 4px; font-family: monospace; text-transform: uppercase; }
    .title { font-size: 20px; font-weight: 900; color: #FFFFFF; margin-top: 10px; }
    .mono { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; color: #E5C158; }
    .body-content { padding: 28px; }
    .section-title { font-size: 12px; font-weight: 800; color: #E5C158; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 1px solid #1F1F2C; padding-bottom: 6px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
    .field { background: #07070C; padding: 12px; border-radius: 8px; border: 1px solid #1A1A26; }
    .field-label { font-size: 11px; color: #808095; font-weight: 600; display: block; margin-bottom: 4px; }
    .field-value { font-size: 13px; color: #FFFFFF; font-weight: 700; word-break: break-all; }
    .notes-box { background: #07070C; padding: 14px; border-radius: 8px; border: 1px solid #1A1A26; font-size: 13px; color: #CCCCCC; line-height: 1.5; margin-bottom: 20px; }
    .admin-btn { display: block; text-align: center; background: linear-gradient(135deg, #E5C158 0%, #D4AF37 100%); color: #000000; font-weight: 900; font-size: 14px; padding: 16px 24px; text-decoration: none; border-radius: 10px; box-shadow: 0 0 25px rgba(229, 193, 88, 0.4); text-transform: uppercase; letter-spacing: 0.5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="alert-tag">🔔 CLIENT ACTION NOTIFICATION</span>
      <div class="title">${escapeHtml(action.actionTitle)} [Ref: <span class="mono">${escapeHtml(refId)}</span>]</div>
    </div>

    <div class="body-content">
      <div class="section-title">👤 Client Identity</div>
      <div class="grid">
        <div class="field">
          <span class="field-label">Client Name</span>
          <span class="field-value">${escapeHtml(action.clientName)}</span>
        </div>
        <div class="field">
          <span class="field-label">Email Address</span>
          <span class="field-value">${escapeHtml(action.clientEmail)}</span>
        </div>
        ${action.clientPhone ? `
        <div class="field">
          <span class="field-label">Phone / WhatsApp</span>
          <span class="field-value">${escapeHtml(action.clientPhone)}</span>
        </div>
        ` : ''}
        <div class="field">
          <span class="field-label">Timestamp</span>
          <span class="field-value mono">${escapeHtml(dateStr)}</span>
        </div>
      </div>

      <div class="section-title">📄 Action Details</div>
      <div class="notes-box">
        ${action.subject ? `<strong>Subject:</strong> ${escapeHtml(action.subject)}<br><br>` : ''}
        <strong>Details:</strong><br>
        ${escapeHtml(action.details)}
      </div>

      <a href="https://mfs-growth-agency.com/admin" class="admin-btn">
        ⚡ Access Admin Command Center
      </a>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Dispatch client action confirmation email
 */
export async function sendClientActionConfirmation(action: ActionPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const html = buildClientActionHtml(action);
  const subject = `[Confirmation] ${action.actionTitle} - MFS Growth Agency`;
  const senderEmail = getSenderEmail();
  const adminEmail = getAdminEmail();

  // 1. SendGrid Provider
  const sendgridRes = await sendViaSendGrid(action.clientEmail, subject, html);
  if (sendgridRes) {
    console.log(`[SendGrid] Client action email dispatched for ${action.clientEmail}:`, sendgridRes.messageId);
    return { success: true, messageId: sendgridRes.messageId };
  }

  // 2. Resend Provider
  const resend = getResendClient();
  if (resend) {
    try {
      const isTestDomain = senderEmail.includes('onboarding@resend.dev');
      const targetEmail = isTestDomain ? adminEmail : action.clientEmail;

      const response = await resend.emails.send({
        from: senderEmail,
        to: [targetEmail],
        subject: isTestDomain && targetEmail !== action.clientEmail
          ? `[Client Copy: ${action.clientEmail}] ${subject}`
          : subject,
        html: html,
      });

      if (response && response.data && response.data.id && !response.error) {
        console.log(`[Resend] Client action email dispatched for ${action.clientEmail}:`, response.data.id);
        return { success: true, messageId: response.data.id };
      }
    } catch (err: any) {
      console.warn(`[Resend Error] Action email to client failed:`, err?.message || err);
    }
  }

  // 3. SMTP Provider
  const smtp = getSmtpTransporter();
  if (smtp) {
    try {
      const info = await smtp.sendMail({
        from: senderEmail,
        to: action.clientEmail,
        subject: subject,
        html: html,
      });
      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      console.warn(`[SMTP Error] Action email to client failed:`, err?.message || err);
    }
  }

  console.log(`[Email Simulation] Simulated Client Action Email queued for ${action.clientEmail}`);
  return { success: true, messageId: `sim-client-act-${Date.now()}` };
}

/**
 * Dispatch admin action alert email
 */
export async function sendAdminActionAlert(action: ActionPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const html = buildAdminActionHtml(action);
  const subject = `🔔 CLIENT ACTION ALERT: ${action.actionTitle} - ${action.clientName}`;
  const senderEmail = getSenderEmail();
  const adminEmail = getAdminEmail();

  // 1. SendGrid Provider
  const sendgridRes = await sendViaSendGrid(adminEmail, subject, html);
  if (sendgridRes) {
    console.log(`[SendGrid] Admin action alert dispatched:`, sendgridRes.messageId);
    return { success: true, messageId: sendgridRes.messageId };
  }

  // 2. Resend Provider
  const resend = getResendClient();
  if (resend) {
    try {
      const isTestDomain = senderEmail.includes('onboarding@resend.dev');
      const targetEmail = isTestDomain ? 'mfsmedia.agency@gmail.com' : adminEmail;

      const response = await resend.emails.send({
        from: senderEmail,
        to: [targetEmail],
        subject: isTestDomain && targetEmail !== adminEmail
          ? `[Admin Copy: ${adminEmail}] ${subject}`
          : subject,
        html: html,
      });

      if (response && response.data && response.data.id && !response.error) {
        console.log(`[Resend] Admin action alert dispatched:`, response.data.id);
        return { success: true, messageId: response.data.id };
      }
    } catch (err: any) {
      console.warn(`[Resend Error] Admin action alert failed:`, err?.message || err);
    }
  }

  // 3. SMTP Provider
  const smtp = getSmtpTransporter();
  if (smtp) {
    try {
      const info = await smtp.sendMail({
        from: senderEmail,
        to: adminEmail,
        subject: subject,
        html: html,
      });
      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      console.warn(`[SMTP Error] Admin action alert failed:`, err?.message || err);
    }
  }

  console.log(`[Email Simulation] Simulated Admin Action Alert Email queued for ${adminEmail}`);
  return { success: true, messageId: `sim-admin-act-${Date.now()}` };
}
