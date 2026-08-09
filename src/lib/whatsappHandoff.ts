export interface OrderReceiptPayload {
  orderId: string;
  clientName: string;
  serviceName: string;
  deadline: string;
  quantity: string | number;
  totalPrice: string;
  projectBrief?: string;
  currency?: string;
}

const MFS_WHATSAPP_NUMBER = "923015323689"; // +92 301 5323689
const MFS_EMAIL = "mfsmedia.agency@gmail.com";
const MFS_INSTAGRAM_URL = "https://instagram.com/mfsgrowth";

/**
 * Formats a clean, professional pre-written receipt message for dispatch
 */
export function generateReceiptFormattedText(orderData: OrderReceiptPayload): string {
  return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆 MFS GROWTH AGENCY - OFFICIAL ORDER BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Order Ref ID: ${orderData.orderId}
👤 Client Name: ${orderData.clientName}
📚 Service Requested: ${orderData.serviceName}
📊 Scope / Quantity: ${orderData.quantity}
⏱ Required Deadline: ${orderData.deadline}
💰 Total Price (50% OFF): ${orderData.totalPrice}

📝 Project Brief:
${orderData.projectBrief || 'Standard project guidelines.'}

⚡ Action Required:
I have generated this Order Brief on your website. Please confirm my order, start preparation, and share payment details (EasyPaisa / JazzCash / Bank Transfer). I will send payment proof upon transfer.`;
}

/**
 * Generates WhatsApp click-to-send link
 */
export function generateWhatsAppOrderLink(orderData: OrderReceiptPayload): string {
  const message = generateReceiptFormattedText(orderData);
  return `https://wa.me/${MFS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates Mailto click-to-send link
 */
export function generateEmailOrderLink(orderData: OrderReceiptPayload): string {
  const subject = `Official Order Brief [${orderData.orderId}] - ${orderData.clientName}`;
  const body = generateReceiptFormattedText(orderData);
  return `mailto:${MFS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Copies the receipt text to clipboard and opens Instagram profile/DMs
 */
export async function copyReceiptAndOpenInstagram(orderData: OrderReceiptPayload): Promise<void> {
  const text = generateReceiptFormattedText(orderData);
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    console.warn('Clipboard write failed:', e);
  }
  window.open(MFS_INSTAGRAM_URL, '_blank');
}

