import React, { useState } from 'react';
import { X, CheckCircle2, Upload, Send, Sparkles } from 'lucide-react';
import { Currency, DeliverySpeed } from '../types';
import { LuxuryOrderReceiptModal } from './common/LuxuryOrderReceiptModal';
import { createRealOrder } from '../lib/supabaseOrderService';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  prefilledService?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  currency,
  prefilledService = 'presentation',
}) => {
  const [service, setService] = useState(prefilledService);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [speed, setSpeed] = useState<DeliverySpeed>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'easypaisa' | 'jazzcash' | 'bank'>('easypaisa');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showLuxuryReceipt, setShowLuxuryReceipt] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const generatedId = 'MFS-' + Math.floor(100000 + Math.random() * 900000);

    const serviceTitleMap: Record<string, string> = {
      presentation: 'Presentation Design',
      assignment: 'Academic Assignment Writing',
      resume: 'ATS Resume & Cover Letter',
      report: 'Executive Report Formatting',
    };

    const sTitle = serviceTitleMap[service] || service;
    const resolvedPaymentMethod = paymentMethod === 'easypaisa' ? 'EasyPaisa' : paymentMethod === 'jazzcash' ? 'JazzCash' : 'Askari Bank';

    // 1. Record in Supabase
    try {
      await createRealOrder({
        order_number: generatedId,
        guest_name: fullName,
        guest_email: email,
        guest_phone: phone,
        service_type: sTitle,
        currency,
        total_amount: 2500,
        delivery_tier: speed,
        payment_method: resolvedPaymentMethod,
        notes: notes || 'Standard guidelines provided',
        scope_details: {
          quantity: 1,
          files: fileName ? [fileName] : []
        }
      });
    } catch (err) {
      console.warn('[Modal Order DB save warning]:', err);
    }

    // 2. Dispatch Dual-Notification Email Receipt
    try {
      await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: generatedId,
          clientName: fullName,
          clientEmail: email,
          clientPhone: phone,
          serviceTitle: sTitle,
          currency,
          amount: 2500,
          formattedAmount: `${currency} 2,500`,
          urgency: speed.toUpperCase(),
          quantity: 1,
          projectNotes: notes || 'Standard guidelines provided',
          paymentMethod: resolvedPaymentMethod,
          fileNames: fileName ? [fileName] : [],
        }),
      });
    } catch (err) {
      console.warn('[Modal Checkout Email Error]:', err);
    } finally {
      setIsSubmitting(false);
      setOrderId(generatedId);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0d0d10] border border-[#E5C158]/30 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5C158] block mb-1">
                50% Grand Launch Promo Applied
              </span>
              <h3 className="text-2xl font-bold font-poppins text-white">
                Place Your Order
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Fill in your project details to get started immediately.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
              {/* Service selection */}
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Service Type</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white rounded-xl px-4 py-3 focus:outline-none"
                >
                  <option value="presentation">Presentation Design</option>
                  <option value="assignment">Academic Assignment Writing</option>
                  <option value="resume">ATS Resume & Cover Letter</option>
                  <option value="report">Executive Report Formatting</option>
                </select>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white rounded-xl px-4 py-3 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white rounded-xl px-4 py-3 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Phone Number (WhatsApp)</label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 0000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white rounded-xl px-4 py-3 focus:outline-none"
                />
              </div>

              {/* Instructions / Notes */}
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Project Brief / Guidelines</label>
                <textarea
                  rows={3}
                  placeholder="Provide slide count, word count, deadline, or special instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#050507] border border-white/15 focus:border-[#E5C158] text-white rounded-xl p-4 focus:outline-none resize-none"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-neutral-300 font-semibold mb-2">Payment Option</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'easypaisa', label: 'EasyPaisa' },
                    { id: 'jazzcash', label: 'JazzCash' },
                    { id: 'bank', label: 'Bank Transfer' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`py-2.5 rounded-xl border font-semibold text-center transition-all cursor-pointer ${
                        paymentMethod === m.id
                          ? 'bg-[#E5C158] text-[#050507] border-[#E5C158]'
                          : 'bg-white/[0.03] border-white/10 text-neutral-300'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <div className="mt-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-neutral-400">
                  {paymentMethod === 'easypaisa' && 'EasyPaisa Account: 03116191234 (Muhammad Shehroz Sultan)'}
                  {paymentMethod === 'jazzcash' && 'JazzCash Account: 03015323688 (Muhammad Shehroz Sultan)'}
                  {paymentMethod === 'bank' && 'Askari Bank Account Number: 00553230017265 (Muhammad Shehroz Sultan)'}
                </div>
              </div>

              {/* Upload Screenshot simulation */}
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Upload Payment Screenshot / Brief File</label>
                <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-white/20 hover:border-[#E5C158] bg-white/[0.02] cursor-pointer text-neutral-400 hover:text-white transition-colors">
                  <Upload className="w-4 h-4 text-[#E5C158]" />
                  <span>{fileName ? fileName : 'Choose file to upload'}</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 mt-2 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-neutral-700 text-neutral-300 cursor-not-allowed'
                    : 'bg-[#E5C158] hover:bg-[#fce888] text-[#050507]'
                }`}
              >
                <span>{isSubmitting ? 'Dispatching Order & Email Notifications...' : 'Submit Order'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#28C76F]/20 text-[#28C76F] border border-[#28C76F]/40 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold font-poppins text-white">
              Order Received!
            </h3>

            <p className="text-neutral-300 text-xs max-w-md leading-relaxed">
              Thank you, <span className="text-[#E5C158] font-bold">{fullName}</span>! Your order has been submitted successfully under reference number:
            </p>

            <div className="px-6 py-2.5 rounded-xl bg-[#E5C158]/10 border border-[#E5C158]/30 font-poppins font-black text-xl text-[#E5C158]">
              {orderId}
            </div>

            <p className="text-neutral-400 text-xs max-w-sm">
              Our support team will verify your details and connect with you on WhatsApp ({phone}) shortly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2 w-full">
              <button
                type="button"
                onClick={() => setShowLuxuryReceipt(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black font-extrabold text-xs cursor-pointer shadow-lg hover:opacity-95 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>View Luxury Receipt</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 text-white font-bold text-xs cursor-pointer border border-white/15 hover:bg-white/20"
              >
                Back to Website
              </button>
            </div>

            <LuxuryOrderReceiptModal
              isOpen={showLuxuryReceipt}
              onClose={() => setShowLuxuryReceipt(false)}
              details={{
                orderId: orderId || 'MFS-984210',
                clientName: fullName || 'Valued Client',
                clientEmail: email || 'client@mfsgrowth.com',
                clientPhone: phone || '+92 301 5323689',
                serviceTitle: service,
                currency,
                amount: 2500,
                urgency: speed.toUpperCase(),
                notes: notes,
                paymentMethod: paymentMethod === 'easypaisa' ? 'EasyPaisa' : paymentMethod === 'jazzcash' ? 'JazzCash' : 'Askari Bank',
              }}
            />
          </div>
        )}

      </div>
    </div>
  );
};
