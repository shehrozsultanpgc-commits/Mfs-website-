import React, { useState } from 'react';
import { Currency } from '../../types';
import {
  MessageSquare,
  Lock,
  Mail,
  Phone,
  MessageCircle,
  Send,
  Paperclip,
  Clock,
  CheckCheck,
  Check,
  User,
  ShieldAlert,
  Sparkles,
  Search,
  Plus,
  FileText,
  AlertCircle,
  Zap,
  Tag,
  ChevronRight,
  Filter,
  Eye,
  AtSign,
  Info
} from 'lucide-react';

interface CRMCommunicationHubProps {
  currency: Currency;
  onShowToast: (msg: string) => void;
}

interface NoteRecord {
  id: string;
  author: string;
  role: string;
  category: 'Internal Note' | 'QA Feedback' | 'Payment Verfication' | 'Client Special Request';
  content: string;
  timestamp: string;
  clientId: string;
  clientName: string;
  isPrivate: boolean; // Always true
  mentions: string[];
}

interface ClientMessage {
  id: string;
  sender: 'Client' | 'Agency Admin' | 'MFS AI Agent';
  channel: 'WhatsApp' | 'Email' | 'Portal Chat' | 'SMS';
  clientId: string;
  clientName: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'replied';
  attachments?: string[];
}

export const CRMCommunicationHub: React.FC<CRMCommunicationHubProps> = ({
  currency,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'internal' | 'client_messages'>('internal');

  // Internal Notes State
  const [notes, setNotes] = useState<NoteRecord[]>([
    {
      id: 'NOTE-9101',
      author: 'Shehroz Sultan',
      role: 'Agency Owner / Lead',
      category: 'Client Special Request',
      content: 'Client Muhammad Shehroz Sultan requested 16:9 4K slide dimensions with dark gold accent palette (#E5C158). Ensure executive pitch deck has strict 24h turnaround.',
      timestamp: 'Today at 11:20 AM',
      clientId: 'MFS-CLI-84920',
      clientName: 'Muhammad Shehroz Sultan',
      isPrivate: true,
      mentions: ['@Shehroz', '@DesignTeam']
    },
    {
      id: 'NOTE-8902',
      author: 'QA Lead',
      role: 'Quality Assurance',
      category: 'QA Feedback',
      content: 'Medical journal paper citations verified against APA 7th standards. All DOI links are active and formatted.',
      timestamp: 'Yesterday at 4:15 PM',
      clientId: 'MFS-CLI-71204',
      clientName: 'Dr. Tariq Mahmood',
      isPrivate: true,
      mentions: ['@AcademicEditor']
    },
    {
      id: 'NOTE-8703',
      author: 'Finance Admin',
      role: 'Billing & Verification',
      category: 'Payment Verfication',
      content: 'Verified EasyPaisa screenshot receipt #EP910283 for Rs. 18,000. Account updated.',
      timestamp: '2 days ago',
      clientId: 'MFS-CLI-84920',
      clientName: 'Muhammad Shehroz Sultan',
      isPrivate: true,
      mentions: ['@Finance']
    }
  ]);

  // Client Messages State
  const [messages, setMessages] = useState<ClientMessage[]>([
    {
      id: 'MSG-001',
      sender: 'Client',
      channel: 'WhatsApp',
      clientId: 'MFS-CLI-84920',
      clientName: 'Muhammad Shehroz Sultan',
      text: 'Assalam-o-Alaikum Shehroz bro! EasyPaisa payment screenshot upload kar di hai. Plz check ORD-MFS-849201.',
      timestamp: '15 mins ago',
      status: 'read'
    },
    {
      id: 'MSG-002',
      sender: 'Agency Admin',
      channel: 'WhatsApp',
      clientId: 'MFS-CLI-84920',
      clientName: 'Muhammad Shehroz Sultan',
      text: 'Walaikum Assalam Shehroz bro! Verified! Your Executive Pitch Deck is currently in Stage 8 (Client Review). Delivery on track for today.',
      timestamp: '10 mins ago',
      status: 'replied'
    },
    {
      id: 'MSG-003',
      sender: 'Client',
      channel: 'Email',
      clientId: 'MFS-CLI-62019',
      clientName: 'Sarah Al-Maktoum',
      text: 'Can we add 2 extra slides on Middle East Market Size (TAM/SAM/SOM) for our Dubai pitch deck?',
      timestamp: '2 hours ago',
      status: 'delivered'
    }
  ]);

  // Form Inputs
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<NoteRecord['category']>('Internal Note');
  const [selectedClientId, setSelectedClientId] = useState('MFS-CLI-84920');

  const [newMessageText, setNewMessageText] = useState('');
  const [replyChannel, setReplyChannel] = useState<'WhatsApp' | 'Email' | 'Portal Chat'>('WhatsApp');

  // Add Internal Note
  const handleAddNote = () => {
    if (!newNoteText.trim()) return;

    const newNote: NoteRecord = {
      id: `NOTE-${Math.floor(1000 + Math.random() * 9000)}`,
      author: 'Shehroz Sultan (Admin)',
      role: 'Agency Owner',
      category: newNoteCategory,
      content: newNoteText.trim(),
      timestamp: 'Just now',
      clientId: selectedClientId,
      clientName: selectedClientId === 'MFS-CLI-84920' ? 'Muhammad Shehroz Sultan' : 'Client Enterprise',
      isPrivate: true,
      mentions: ['@Admin']
    };

    setNotes([newNote, ...notes]);
    setNewNoteText('');
    onShowToast('🔒 Private Internal Admin Note Saved (Hidden from Client)');
  };

  // Send Client Message
  const handleSendMessage = () => {
    if (!newMessageText.trim()) return;

    const newMsg: ClientMessage = {
      id: `MSG-${Date.now()}`,
      sender: 'Agency Admin',
      channel: replyChannel,
      clientId: selectedClientId,
      clientName: 'Muhammad Shehroz Sultan',
      text: newMessageText.trim(),
      timestamp: 'Just now',
      status: 'sent'
    };

    setMessages([...messages, newMsg]);
    setNewMessageText('');
    onShowToast(`💬 Outbound Message dispatched via ${replyChannel}`);
  };

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* HEADER BAR */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 bg-gradient-to-r from-neutral-900/90 via-black to-[#0F0F0F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 uppercase tracking-wider flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-[#E5C158]" />
              COMMUNICATION ENGINE
            </span>
            <span className="text-xs text-neutral-400 font-mono">2-Way Vault</span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">Communications & Private Notes Hub</h2>
          <p className="text-xs text-neutral-400">
            Encrypted private admin notes, staff mention system, and unified multi-channel client messaging.
          </p>
        </div>

        {/* SUB TAB SWITCHER */}
        <div className="flex items-center bg-black/60 border border-white/10 rounded-xl p-1 text-xs">
          <button
            onClick={() => setActiveTab('internal')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'internal'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Private Admin Notes
          </button>

          <button
            onClick={() => setActiveTab('client_messages')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'client_messages'
                ? 'bg-[#E5C158] text-black shadow-[0_0_12px_rgba(229,193,88,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Client Communication Panel
          </button>
        </div>
      </div>

      {activeTab === 'internal' ? (
        /* TAB 1: PRIVATE INTERNAL ADMIN NOTES HUB */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: ADD NOTE FORM */}
          <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Lock className="w-4 h-4 text-[#E5C158]" />
              <h3 className="font-extrabold text-white text-sm">Add Private Internal Note</h3>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Notes added here are strictly internal to MFS Admin & Staff. Clients can NEVER see these.</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Target Client Account</label>
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#E5C158]/50"
                >
                  <option value="MFS-CLI-84920">Muhammad Shehroz Sultan (MFS-CLI-84920)</option>
                  <option value="MFS-CLI-71204">Dr. Tariq Mahmood (MFS-CLI-71204)</option>
                  <option value="MFS-CLI-62019">Sarah Al-Maktoum (MFS-CLI-62019)</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Note Category</label>
                <select
                  value={newNoteCategory}
                  onChange={(e) => setNewNoteCategory(e.target.value as any)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#E5C158]/50"
                >
                  <option value="Internal Note">Internal General Note</option>
                  <option value="Client Special Request">Client Special Request</option>
                  <option value="QA Feedback">QA & Formatting Standard</option>
                  <option value="Payment Verfication">Payment & Invoice Verification</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Note Details / Instructions</label>
                <textarea
                  rows={4}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Enter private admin comments, client preferences, or internal staff @mentions (e.g. @DesignTeam)..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white placeholder-neutral-500 focus:border-[#E5C158]/50 focus:outline-none"
                />
              </div>

              <button
                onClick={handleAddNote}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(229,193,88,0.2)]"
              >
                <Lock className="w-3.5 h-3.5 text-black" />
                Save Private Note
              </button>
            </div>
          </div>

          {/* RIGHT: NOTES FEED */}
          <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E5C158]" />
                Internal Notes Timeline ({notes.length})
              </h3>
              <span className="text-[10px] font-mono text-neutral-400">Encrypted Admin Memory</span>
            </div>

            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl glass-card border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent space-y-2 hover:border-[#E5C158]/30 transition-all"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{note.author}</span>
                      <span className="text-[10px] font-mono text-[#E5C158] bg-[#E5C158]/10 px-2 py-0.5 rounded border border-[#E5C158]/30">
                        {note.role}
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {note.category}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {note.content}
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                    <span className="flex items-center gap-1 text-neutral-400">
                      <User className="w-3 h-3 text-[#E5C158]" />
                      Client: {note.clientName} ({note.clientId})
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      {note.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: UNIFIED CLIENT COMMUNICATION CENTER */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CONVERSATION STREAM */}
          <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4 flex flex-col justify-between min-h-[500px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-xs">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-sm">Muhammad Shehroz Sultan</h3>
                    <span className="text-[10px] text-neutral-400 font-mono">Client ID: MFS-CLI-84920 • WhatsApp & Portal Sync</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active 24/7 Channel
                </span>
              </div>

              {/* MESSAGES LIST */}
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {messages.map((msg) => {
                  const isAgency = msg.sender !== 'Client';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAgency ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3.5 rounded-2xl text-xs space-y-1 ${
                          isAgency
                            ? 'bg-gradient-to-r from-[#E5C158]/20 to-[#D4AF37]/10 border border-[#E5C158]/40 text-white rounded-tr-none'
                            : 'bg-neutral-800/80 border border-white/10 text-neutral-200 rounded-tl-none'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4 text-[10px] text-neutral-400 mb-1">
                          <span className="font-bold text-[#E5C158]">{msg.sender}</span>
                          <span className="font-mono">{msg.channel} • {msg.timestamp}</span>
                        </div>
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MESSAGE COMPOSER */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">Send via:</span>
                <button
                  onClick={() => setReplyChannel('WhatsApp')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    replyChannel === 'WhatsApp' ? 'bg-emerald-500 text-black' : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => setReplyChannel('Email')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    replyChannel === 'Email' ? 'bg-sky-500 text-black' : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setReplyChannel('Portal Chat')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    replyChannel === 'Portal Chat' ? 'bg-[#E5C158] text-black' : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  Portal Chat
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  placeholder={`Type response to client via ${replyChannel}...`}
                  className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E5C158]/50"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-black" />
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* QUICK RESPONSE TEMPLATES & CHANNEL STATUS */}
          <div className="glass-card rounded-2xl border border-white/10 p-6 bg-neutral-900/40 space-y-4">
            <h3 className="font-extrabold text-white text-sm border-b border-white/10 pb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#E5C158]" />
              Quick Agency Templates
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { label: 'Deliverable Stage 8 Ready', text: 'Hi Shehroz! Your pitch deck draft is now ready for review in Stage 8. Please check your email or portal.' },
                { label: 'Payment Receipt Verified', text: 'Thank you! Your payment receipt has been verified by MFS Finance and your order status is active.' },
                { label: 'Revision Received', text: 'Your revision request has been logged and assigned to our senior lead designer.' }
              ].map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => setNewMessageText(template.text)}
                  className="w-full text-left p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#E5C158]/40 hover:bg-[#E5C158]/5 transition-all text-neutral-300 space-y-1"
                >
                  <span className="font-bold text-[#E5C158] block">{template.label}</span>
                  <p className="text-[11px] text-neutral-400 line-clamp-2">{template.text}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
