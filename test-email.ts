import { sendClientConfirmation, sendAdminAlert } from './server/services/emailService';
import { GoogleGenAI } from '@google/genai';

async function test() {
  const payload = {
    orderId: 'TEST-123',
    clientName: 'Test Client',
    clientEmail: 'test@example.com',
    clientPhone: '123456',
    serviceTitle: 'Test Service',
    currency: 'PKR',
    amount: 100,
    formattedAmount: 'PKR 100',
    urgency: 'Standard',
    paymentMethod: 'EasyPaisa',
  };
  console.log("Sending client...");
  const r1 = await sendClientConfirmation(payload);
  console.log("Client result:", r1);
  console.log("Sending admin...");
  const r2 = await sendAdminAlert(payload);
  console.log("Admin result:", r2);
}
test();
