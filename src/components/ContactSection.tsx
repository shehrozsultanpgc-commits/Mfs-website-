import React from 'react';
import { CONTACT_CARDS } from '../data/content';
import { Mail, Headset, Phone, Clock, MapPin, Bot, Mic } from 'lucide-react';

interface ContactSectionProps {
  onOpenAIChat?: (mode?: 'chat' | 'voice') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenAIChat }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'mail':
        return Mail;
      case 'support':
        return Headset;
      case 'phone':
        return Phone;
      case 'clock':
        return Clock;
      case 'mapPin':
        return MapPin;
      case 'bot':
        return Bot;
      case 'mic':
        return Mic;
      default:
        return Mail;
    }
  };

  const enhancedContactCards = [
    ...CONTACT_CARDS,
    {
      id: 'contact-6',
      title: 'MFS AI Chatbot',
      value: 'Instant 24/7 Support',
      iconName: 'bot',
      onClick: () => onOpenAIChat?.('chat'),
    },
    {
      id: 'contact-7',
      title: 'Voice Assistant',
      value: 'Interactive Audio Help',
      iconName: 'mic',
      onClick: () => onOpenAIChat?.('voice'),
    }
  ];

  return (
    <section id="contact" className="py-24 relative bg-white/[0.01] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-poppins text-xs font-bold uppercase tracking-widest text-[#E5C158] block mb-2">
            Connect with Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-white mb-4">
            Get in Touch <span className="gold-pure-gradient">Today</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Reach out through our official channels. Our team is online around the clock to support your projects.
          </p>
        </div>

        {/* Clean Communication Panel (Non-Card Layout) */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {/* Direct Communication Channels */}
          <div className="space-y-4">
            <h3 className="text-sm font-poppins font-bold uppercase tracking-wider text-[#E5C158] mb-4">
              Direct Communication Channels
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 py-2 border-b border-white/5">
                <Mail className="w-4 h-4 text-[#E5C158] shrink-0" />
                <span className="text-neutral-400 font-medium w-28">Agency Email:</span>
                <a href="mailto:mfsmedia.agency@gmail.com" className="text-white font-mono hover:text-[#E5C158] transition-colors">
                  mfsmedia.agency@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 py-2 border-b border-white/5">
                <Phone className="w-4 h-4 text-[#28C76F] shrink-0" />
                <span className="text-neutral-400 font-medium w-28">WhatsApp / Call:</span>
                <a href="https://wa.me/923015323689" target="_blank" rel="noreferrer" className="text-white font-mono hover:text-[#28C76F] transition-colors">
                  +92 301 5323689
                </a>
              </div>
              <div className="flex items-center gap-3 py-2">
                <Clock className="w-4 h-4 text-[#E5C158] shrink-0" />
                <span className="text-neutral-400 font-medium w-28">Support Desk:</span>
                <span className="text-white font-medium">24/7 Online Support</span>
              </div>
            </div>
          </div>

          {/* Instant AI & Interactive Support */}
          <div className="pt-6 lg:pt-0 lg:pl-8 space-y-4">
            <h3 className="text-sm font-poppins font-bold uppercase tracking-wider text-[#E5C158] mb-4">
              Instant AI & Interactive Support
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Get immediate answers to your project scope, turnaround, or payment questions using our dual-mode AI assistant.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onOpenAIChat?.('chat')}
                className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#E5C158] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <Bot className="w-4 h-4 text-[#E5C158] group-hover:scale-110 transition-transform" />
                <span>Launch MFS AI Chat</span>
              </button>
              <button
                onClick={() => onOpenAIChat?.('voice')}
                className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#28C76F] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <Mic className="w-4 h-4 text-[#28C76F] group-hover:scale-110 transition-transform" />
                <span>Launch Voice Assistant</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
