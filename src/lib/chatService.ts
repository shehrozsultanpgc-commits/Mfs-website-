import { supabase } from './supabase';
import type { UserRole } from './database.types';

export interface ChatMessage {
  id: string;
  orderId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole | 'system';
  message: string;
  attachments?: { name: string; url: string; size?: string }[];
  timestamp: string;
}

const LOCAL_STORAGE_CHAT_PREFIX = 'mfs_chat_order_';

/**
 * Get cached chat history for an order
 */
export function getChatHistory(orderId: string): ChatMessage[] {
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_CHAT_PREFIX}${orderId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('[MFS Chat] Local storage read error:', err);
  }

  // Default initial system welcome message for order chat
  return [
    {
      id: `sys-welcome-${orderId}`,
      orderId,
      senderId: 'mfs-system',
      senderName: 'MFS Project Coordinator',
      senderRole: 'system',
      message: `Welcome to the secure live project workspace for Order #${orderId}. Send a message here to communicate directly with your dedicated project team.`,
      timestamp: new Date().toISOString(),
    },
  ];
}

/**
 * Persist chat history to local cache
 */
function saveChatHistory(orderId: string, messages: ChatMessage[]): void {
  try {
    localStorage.setItem(`${LOCAL_STORAGE_CHAT_PREFIX}${orderId}`, JSON.stringify(messages));
  } catch (err) {
    console.warn('[MFS Chat] Local storage write error:', err);
  }
}

/**
 * Send a chat message over Realtime Broadcast and save to history
 */
export async function sendChatMessage(
  orderId: string,
  senderName: string,
  senderRole: UserRole | 'system',
  message: string,
  attachments?: { name: string; url: string; size?: string }[]
): Promise<ChatMessage> {
  const newMessage: ChatMessage = {
    id: 'msg-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now(),
    orderId,
    senderId: senderRole === 'super_admin' ? 'admin-01' : 'client-01',
    senderName,
    senderRole,
    message: message.trim(),
    attachments: attachments || [],
    timestamp: new Date().toISOString(),
  };

  // 1. Save to local storage cache
  const history = getChatHistory(orderId);
  const updatedHistory = [...history, newMessage];
  saveChatHistory(orderId, updatedHistory);

  // 2. Broadcast message over Supabase Realtime Channel
  try {
    const channel = supabase.channel(`order_chat:${orderId}`);
    await channel.subscribe();
    await channel.send({
      type: 'broadcast',
      event: 'new_chat_message',
      payload: newMessage,
    });
  } catch (err) {
    console.warn('[MFS Chat] Supabase broadcast warning:', err);
  }

  return newMessage;
}

/**
 * Subscribe to live chat messages for a specific order
 */
export function subscribeToOrderChat(
  orderId: string,
  onMessageReceived: (msg: ChatMessage) => void
): () => void {
  let channel: any = null;

  try {
    channel = supabase
      .channel(`order_chat:${orderId}`)
      .on('broadcast', { event: 'new_chat_message' }, (payload) => {
        if (payload.payload) {
          onMessageReceived(payload.payload as ChatMessage);
        }
      })
      .subscribe();
  } catch (err) {
    console.warn('[MFS Chat] Realtime subscription exception:', err);
  }

  return () => {
    if (channel) {
      supabase.removeChannel(channel);
    }
  };
}
