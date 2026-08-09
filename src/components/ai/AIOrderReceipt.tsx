import React, { useState } from 'react';
import { Download, PhoneCall, Mail, Instagram, CheckCircle2, Copy, Send, Sparkles } from 'lucide-react';
import { generateWhatsAppOrderLink, generateEmailOrderLink, copyReceiptAndOpenInstagram, OrderReceiptPayload } from '../../lib/whatsappHandoff';
import { OrderState } from '../../lib/aiAssistantEngine';
import { MFSLogo } from '../common/MFSLogo';
import { LuxuryOrderReceiptModal } from '../common/LuxuryOrderReceiptModal';

interface AIOrderReceiptProps {
  orderState: OrderState;
  onDownload?: () => void;
}

export const AIOrderReceipt: React.FC<AIOrderReceiptProps> = ({ orderState, onDownload }) => {
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [showLuxuryReceipt, setShowLuxuryReceipt] = useState(false);

  const orderId = `MFS-AI-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const stateAny = (orderState || {}) as any;
  const rawPrice = stateAny.totalPrice || stateAny.estimatedPrice || stateAny.amount || '2,500';
  const formattedPrice = typeof rawPrice === 'number' ? rawPrice.toLocaleString() : String(rawPrice);

  const payload: OrderReceiptPayload = {
    orderId,
    clientName: stateAny.clientName || stateAny.customerName || 'Client Name Pending',
    serviceName: stateAny.serviceRequired || stateAny.serviceName || stateAny.serviceTitle || 'MFS Digital Service',
    deadline: stateAny.deadline || stateAny.urgency || 'Standard Delivery (50% OFF)',
    quantity: String(stateAny.quantity || 'Scope as discussed'),
    totalPrice: formattedPrice.includes('PKR') || formattedPrice.includes('USD') || formattedPrice.includes('EUR') || formattedPrice.includes('GBP') || formattedPrice.includes('AED') ? formattedPrice : `${stateAny.currency || 'PKR'} ${formattedPrice}`,
    projectBrief: stateAny.projectBrief || stateAny.notes || 'Standard MFS project guidelines.'
  };

  const whatsappLink = generateWhatsAppOrderLink(payload);
  const emailLink = generateEmailOrderLink(payload);

  const handleInstagramClick = async () => {
    await copyReceiptAndOpenInstagram(payload);
    setCopiedNotification('Receipt copied to clipboard! Opening Instagram to send DMs...');
    setTimeout(() => setCopiedNotification(null), 4000);
  };

  return (
    <div className="bg-[#121217] border border-[#E5C158]/40 rounded-2xl p-3.5 sm:p-4 shadow-2xl mt-2 w-full max-w-full text-left relative overflow-hidden font-sans">
      {/* Top Metallic Gold Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F5D77F] via-[#E5C158] to-[#906D14]"></div>

      {/* Header Banner */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#2A2B35]">
        <div className="flex items-center gap-2.5">
          <MFSLogo size={32} />
          <div>
            <h3 className="text-white font-bold text-xs sm:text-sm tracking-wide leading-tight">MFS Growth Agency</h3>
            <p className="text-[#E5C158] text-[10px] font-semibold tracking-wider uppercase">Official Order Brief</p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-[#E5C158]/10 text-[#E5C158] border border-[#E5C158]/30 px-2 py-0.5 rounded-md">
          #{orderId}
        </span>
      </div>

      {/* Confirmation Callout Box */}
      <div className="bg-[#1A1A22] border border-[#28C76F]/30 rounded-xl p-2.5 mb-3 flex gap-2 items-start">
        <Send className="w-3.5 h-3.5 text-[#28C76F] flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-gray-300 leading-snug">
          <strong className="text-[#28C76F] font-semibold">Send receipt to confirm: </strong>
          Click <span className="text-[#28C76F] font-bold">WhatsApp</span> or <span className="text-[#E5C158] font-bold">Email</span> below to send this order brief to our team.
        </p>
      </div>

      {/* Order Itemized Rows */}
      <div className="space-y-2 mb-3 bg-[#08080A] rounded-xl p-3 border border-[#2A2B35]">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Client Name</span>
          <span className="text-white font-medium">{payload.clientName}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Service</span>
          <span className="text-[#E5C158] font-bold text-right max-w-[150px] truncate">{payload.serviceName}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Scope / Quantity</span>
          <span className="text-white font-medium">{payload.quantity}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Deadline</span>
          <span className="text-white font-medium">{payload.deadline}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-[#2A2B35]">
          <span className="text-white font-bold text-xs">Total Price</span>
          <span className="text-[#28C76F] font-bold text-xs sm:text-sm">
            {payload.totalPrice} <span className="text-[10px] text-gray-400 font-normal">(50% OFF)</span>
          </span>
        </div>
      </div>

      {copiedNotification && (
        <div className="bg-[#28C76F]/15 border border-[#28C76F]/40 text-[#28C76F] text-xs p-2 rounded-xl mb-2.5 text-center font-medium animate-in fade-in">
          {copiedNotification}
        </div>
      )}

      {/* Multi-Channel High-End Animated Dispatch Buttons */}
      <div className="space-y-2">
        {/* WhatsApp High-End Animated Primary Button */}
        <a 
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="w-full bg-[#28C76F] hover:bg-[#34e082] text-black py-2.5 sm:py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(40,199,111,0.35)] hover:shadow-[0_0_28px_rgba(40,199,111,0.5)] active:scale-[0.98] group relative overflow-hidden cursor-pointer"
        >
          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
          <PhoneCall className="w-4 h-4 fill-black animate-bounce" />
          <span className="tracking-wide">Send to WhatsApp (+92 301 5323689)</span>
        </a>

        {/* Email High-End Secondary Button */}
        <a 
          href={emailLink}
          className="w-full bg-[#1A1A22] border-2 border-[#E5C158]/50 hover:border-[#E5C158] text-white py-2 rounded-xl text-xs font-bold hover:bg-[#242530] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98] group cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5 text-[#E5C158] group-hover:scale-110 transition-transform" />
          <span>Send via Email (mfsmedia.agency@gmail.com)</span>
        </a>

        {/* Luxury Modal & Instagram Secondary Triggers */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            type="button"
            onClick={() => setShowLuxuryReceipt(true)}
            className="w-full bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black py-2 rounded-xl text-[11px] font-extrabold hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#E5C158]/15 cursor-pointer active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            <span>Luxury Brief</span>
          </button>

          <button 
            onClick={handleInstagramClick}
            type="button"
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white py-2 rounded-xl text-[11px] font-bold hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] cursor-pointer"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram DM</span>
          </button>
        </div>

        {/* Download Receipt Image */}
        {onDownload && (
          <button 
            onClick={onDownload}
            type="button"
            className="w-full bg-[#1A1A1F] text-gray-300 hover:text-white border border-[#2A2B35] py-2 rounded-xl text-[11px] font-semibold hover:border-[#E5C158] transition-colors flex items-center justify-center gap-2 cursor-pointer mt-0.5"
          >
            <Download className="w-3.5 h-3.5 text-[#E5C158]" />
            Download Order Brief PNG
          </button>
        )}
      </div>

      {/* Luxury Order Receipt Modal */}
      <LuxuryOrderReceiptModal
        isOpen={showLuxuryReceipt}
        onClose={() => setShowLuxuryReceipt(false)}
        details={{
          orderId,
          clientName: orderState.customerName || 'Valued Client',
          clientEmail: orderState.customerEmail || 'client@mfsgrowth.com',
          clientPhone: orderState.customerPhone || '+92 301 5323689',
          serviceTitle: orderState.serviceRequired || 'Digital Solution',
          currency: orderState.currency || 'PKR',
          amount: orderState.estimatedPrice || 2500,
          quantity: orderState.quantity || 1,
          urgency: orderState.deadline || 'STANDARD',
          notes: orderState.projectBrief || 'Standard guidelines.',
          paymentMethod: 'EasyPaisa / JazzCash / Askari Bank',
        }}
      />

      {/* Payment Note Footer */}
      <div className="mt-3 pt-2 border-t border-[#2A2B35] text-center">
        <p className="text-[10px] text-gray-400">
          Accepting EasyPaisa, JazzCash & Bank Transfer. Send payment proof after transfer for instant order confirmation.
        </p>
      </div>
    </div>
  );
};

