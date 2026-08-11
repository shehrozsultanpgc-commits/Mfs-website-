import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Currency } from '../types';
import { OrderPage } from './OrderPage';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  prefilledService?: string;
  onShowToast?: (msg: string) => void;
  onNavigatePage?: (page: 'home' | 'services' | 'pricing' | 'reviews' | 'about' | 'contact' | 'faq' | 'order' | 'payment' | 'confirmation' | 'dashboard' | 'admin', targetSection?: string) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  currency,
  prefilledService = 'presentation',
  onShowToast,
  onNavigatePage,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl bg-[#08080C] border-2 border-[#E5C158]/50 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(229,193,88,0.2)] my-auto max-h-[92vh] overflow-y-auto p-2 sm:p-4 text-left"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
              title="Close Order Window"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Embedded 4-Step Order Wizard Component */}
            <OrderPage
              currency={currency}
              prefilledServiceId={prefilledService}
              onShowToast={onShowToast}
              onNavigatePage={(page, sec) => {
                onClose();
                if (onNavigatePage) onNavigatePage(page, sec);
              }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
