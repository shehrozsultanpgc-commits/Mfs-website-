import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Paperclip,
  Shield,
  User,
  Clock,
  CheckCheck,
  Bot,
  FileText,
  X,
} from 'lucide-react';
import {
  getChatHistory,
  sendChatMessage,
  subscribeToOrderChat,
  ChatMessage,
} from '../lib/chatService';
import type { UserRole } from '../lib/database.types';

interface ProjectChatProps {
  orderId: string;
  senderName?: string;
  senderRole?: UserRole | 'system';
  onShowToast?: (msg: string) => void;
}

export const ProjectChat: React.FC<ProjectChatProps> = ({
  orderId,
  senderName = 'Valued Client',
  senderRole = 'client',
  onShowToast,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Load existing history
    const history = getChatHistory(orderId);
    setMessages(history);

    // Subscribe to live WebSocket chat channel
    const unsubscribe = subscribeToOrderChat(orderId, (newMessage) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
    });

    return () => {
      unsubscribe();
    };
  }, [orderId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !pendingFile) return;

    setIsSending(true);

    const attachments = pendingFile
      ? [
          {
            name: pendingFile.name,
            url: URL.createObjectURL(pendingFile),
            size: `${(pendingFile.size / 1024).toFixed(1)} KB`,
          },
        ]
      : [];

    const sentMessage = await sendChatMessage(
      orderId,
      senderName,
      senderRole as UserRole | 'system',
      inputText,
      attachments
    );

    setMessages((prev) => {
      if (prev.some((m) => m.id === sentMessage.id)) return prev;
      return [...prev, sentMessage];
    });

    setInputText('');
    setPendingFile(null);
    setIsSending(false);

    if (onShowToast) {
      onShowToast('Message transmitted securely over encrypted channel.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPendingFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col h-[520px] bg-[#0A0A0E] border border-[#23242F] rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-[#0F0F14] border-b border-[#23242F] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Live Project Communication Workspace</h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                WebSocket Active
              </span>
            </div>
            <p className="text-xs text-[#9FA0A7] font-mono">Order Ref: <span className="text-white font-bold">{orderId}</span></p>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#050507]/60 custom-scrollbar">
        {messages.map((msg) => {
          const isSystem = msg.senderRole === 'system';
          const isAdmin = msg.senderRole === 'super_admin' || msg.senderRole === 'manager';
          const isSelf = msg.senderRole === senderRole;

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-3">
                <div className="max-w-md bg-[#12121A] border border-[#2B2C3B] rounded-xl p-3 text-center space-y-1 shadow-md">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#E5C158] font-semibold">
                    <Shield className="w-3.5 h-3.5" />
                    <span>{msg.senderName}</span>
                  </div>
                  <p className="text-xs text-[#CFCFCF]">{msg.message}</p>
                  <div className="text-[10px] font-mono text-[#777885]">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-[#9FA0A7]">
                  {msg.senderName}
                </span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                    isAdmin
                      ? 'bg-[#E5C158]/10 text-[#E5C158] border-[#E5C158]/30'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  }`}
                >
                  {isAdmin ? 'MFS Lead' : 'Client'}
                </span>
                <span className="text-[10px] font-mono text-[#777885] flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-lg ${
                  isSelf
                    ? 'bg-[#E5C158] text-[#050507] font-medium rounded-tr-none'
                    : 'bg-[#15151F] text-white border border-[#2A2B3D] rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.message}</p>

                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-black/10 text-xs space-y-1">
                    {msg.attachments.map((att, idx) => (
                      <a
                        key={idx}
                        href={att.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 p-1.5 rounded bg-black/20 hover:bg-black/30 transition-all font-mono text-xs"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span className="truncate">{att.name}</span>
                        {att.size && <span className="opacity-70">({att.size})</span>}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="bg-[#0F0F14] border-t border-[#23242F] p-4 space-y-2">
        {pendingFile && (
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#181824] border border-[#2E2F42] rounded-lg text-xs font-mono text-[#E5C158]">
            <div className="flex items-center gap-2 truncate">
              <Paperclip className="w-3.5 h-3.5" />
              <span className="truncate">{pendingFile.name}</span>
            </div>
            <button
              type="button"
              onClick={() => setPendingFile(null)}
              className="p-1 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <label className="p-2.5 rounded-xl bg-[#181824] border border-[#2B2C3D] hover:bg-[#232433] text-[#9FA0A7] hover:text-white transition-all cursor-pointer">
            <Paperclip className="w-4 h-4" />
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message or query..."
            className="flex-1 bg-[#15151F] border border-[#2B2C3D] focus:border-[#E5C158] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#6C6D7D] focus:outline-none transition-colors"
          />

          <button
            type="submit"
            disabled={isSending || (!inputText.trim() && !pendingFile)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
              isSending || (!inputText.trim() && !pendingFile)
                ? 'bg-[#222330] text-[#555666] cursor-not-allowed'
                : 'bg-[#E5C158] text-[#050507] hover:bg-[#fce888] shadow-lg'
            }`}
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
