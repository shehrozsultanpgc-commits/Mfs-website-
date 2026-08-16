import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Mic, Sparkles, Phone, ArrowUpRight, Shield, Bot, ChevronRight } from 'lucide-react';
import { AIAssistantEngine, ChatMessage } from '../../lib/aiAssistantEngine';
import { AIOrderReceipt } from './AIOrderReceipt';
import { AIVoiceAssistant } from './AIVoiceAssistant';
import { MFSLogo } from '../common/MFSLogo';
import { useModalHistory } from '../../hooks/useModalHistory';

interface AIAssistantWidgetProps {
  externalIsOpen?: boolean;
  externalMode?: 'chat' | 'voice';
  onCloseExternal?: () => void;
}

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({ 
  externalIsOpen, 
  externalMode, 
  onCloseExternal 
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);

  useModalHistory(isChatOpen, () => setIsChatOpen(false), 'aiChatDrawer');
  useModalHistory(isVoiceOpen, () => setIsVoiceOpen(false), 'aiVoiceDrawer');
  const [briefNotice, setBriefNotice] = useState<string | null>(null);

  const handleToggleBrief = () => {
    const state = engine.getState();
    const hasDetails = Boolean(state.customerName || state.serviceRequired);
    if (!hasDetails && !showReceipt) {
      setBriefNotice('Please provide your details (Name & Service) to the AI Assistant first! As soon as you discuss your project, your custom WhatsApp brief will open automatically.');
      setTimeout(() => setBriefNotice(null), 6000);
      return;
    }
    setBriefNotice(null);
    setShowReceipt(!showReceipt);
  };
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [engine] = useState(() => new AIAssistantEngine('PKR'));
  const [showReceipt, setShowReceipt] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const startListening = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setInput((prev) => prev + (prev ? ' ' : '') + speechResult);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      if (event.error === 'not-allowed') {
        alert("Microphone access is not allowed. Please grant permissions to use voice input.");
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const prevExternalRef = useRef<{ isOpen?: boolean; mode?: 'chat' | 'voice' }>({
    isOpen: externalIsOpen,
    mode: externalMode
  });

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      if (
        externalIsOpen !== prevExternalRef.current.isOpen ||
        externalMode !== prevExternalRef.current.mode
      ) {
        prevExternalRef.current = { isOpen: externalIsOpen, mode: externalMode };
        if (externalIsOpen) {
          if (externalMode === 'voice') {
            setIsVoiceOpen(true);
            setIsChatOpen(false);
          } else {
            setIsChatOpen(true);
            setIsVoiceOpen(false);
          }
        } else {
          setIsChatOpen(false);
          setIsVoiceOpen(false);
        }
      }
    }
  }, [externalIsOpen, externalMode]);

  const handleCloseChat = () => {
    setIsChatOpen(false);
    if (onCloseExternal) {
      onCloseExternal();
    }
  };

  const handleCloseVoice = () => {
    setIsVoiceOpen(false);
    if (onCloseExternal) {
      onCloseExternal();
    }
  };

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setMessages([...engine.getMessages()]);
    }
  }, [isChatOpen, engine, messages.length]);

  // Auto-detect order completion when AI completes step 4 intake to reveal the action card & WhatsApp buttons
  useEffect(() => {
    const state = engine.getState();
    const lastMsg = messages[messages.length - 1];
    const lastContent = lastMsg && lastMsg.role === 'assistant' ? lastMsg.content.toLowerCase() : '';
    
    // STRICT TRIGGER: Only show receipt when state is complete OR AI has delivered the step 4 official order brief
    const hasNameAndService = Boolean(state.customerName || state.serviceRequired);
    const isBriefDelivered = 
      lastContent.includes('official order brief') || 
      lastContent.includes('details pre-filled') || 
      lastContent.includes('1-click action buttons');

    const isOrderConfirmedByAI = state.isComplete || (hasNameAndService && isBriefDelivered);

    if (isOrderConfirmedByAI && !showReceipt) {
      setShowReceipt(true);
    }
  }, [messages, engine, showReceipt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showReceipt]);

  const processUserMessage = async (userMsgText: string) => {
    if (!userMsgText.trim()) return;
    
    setInput('');
    setIsTyping(true);
    
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMsgText.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMsg]);

    setTimeout(async () => {
      const replyMsg = await engine.processMessage(userMsgText.trim());
      setMessages(prev => [...prev, replyMsg]);
      setIsTyping(false);
      
      const state = engine.getState();
      const replyLower = replyMsg.content.toLowerCase();
      const hasNameAndService = Boolean(state.customerName || state.serviceRequired);
      const isBriefDelivered = 
        replyLower.includes('official order brief') || 
        replyLower.includes('details pre-filled') || 
        replyLower.includes('1-click action buttons');

      if (state.isComplete || (hasNameAndService && isBriefDelivered)) {
        setShowReceipt(true);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }, 400);
  };

  const handleSend = async () => {
    await processUserMessage(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const downloadReceipt = async () => {
    const state = engine.getState();
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 760;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D unavailable');

      // Fill main dark background
      ctx.fillStyle = '#0F0F12';
      ctx.fillRect(0, 0, 600, 760);

      // Fill inner card container
      ctx.fillStyle = '#1A1A1F';
      ctx.strokeStyle = '#32333D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(40, 40, 520, 680, 24);
      } else {
        ctx.rect(40, 40, 520, 680);
      }
      ctx.fill();
      ctx.stroke();

      // Top gold banner accent
      const goldGrad = ctx.createLinearGradient(40, 40, 560, 40);
      goldGrad.addColorStop(0, '#E5C158');
      goldGrad.addColorStop(1, '#D4AF37');
      ctx.fillStyle = goldGrad;
      ctx.fillRect(40, 40, 520, 8);

      // Draw official MFS master logo image on canvas
      const logoImg = new Image();
      logoImg.src = '/mfs-logo.png';
      await new Promise((resolve) => {
        logoImg.onload = resolve;
        logoImg.onerror = resolve;
      });

      if (logoImg.complete && logoImg.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(300, 120, 36, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(logoImg, 264, 84, 72, 72);
        ctx.restore();
      } else {
        const logoGrad = ctx.createRadialGradient(300, 120, 10, 300, 120, 36);
        logoGrad.addColorStop(0, '#F5D77F');
        logoGrad.addColorStop(0.5, '#E5C158');
        logoGrad.addColorStop(1, '#906D14');
        ctx.fillStyle = logoGrad;
        ctx.beginPath();
        ctx.arc(300, 120, 36, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#000000';
        ctx.font = '900 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('MFS', 300, 121);
      }

      // Title & Header
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 22px sans-serif';
      ctx.fillText('MFS GROWTH AGENCY', 300, 185);

      ctx.fillStyle = '#E5C158';
      ctx.font = '600 13px sans-serif';
      ctx.fillText('OFFICIAL ORDER BRIEF & RECEIPT', 300, 210);

      // Divider
      ctx.strokeStyle = '#2A2B35';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, 235);
      ctx.lineTo(520, 235);
      ctx.stroke();

      // Table Container Background
      ctx.fillStyle = '#050507';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(70, 255, 460, 320, 16);
      } else {
        ctx.rect(70, 255, 460, 320);
      }
      ctx.fill();
      ctx.strokeStyle = '#2A2B35';
      ctx.stroke();

      // Fields
      const fields = [
        { label: 'Client Name', val: String(state.customerName || 'Client') },
        { label: 'Service Required', val: String(state.serviceRequired || 'Digital Service') },
        { label: 'Scope / Quantity', val: String(state.quantity || '1') },
        { label: 'Project Deadline', val: String(state.deadline || 'Standard') },
        { label: 'Total Price', val: `${state.currency || 'PKR'} ${state.estimatedPrice || 'TBD'}` },
      ];

      let yPos = 300;
      fields.forEach((item, idx) => {
        // Label
        ctx.fillStyle = '#9FA0A7';
        ctx.font = '500 14px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.label, 95, yPos);

        // Value
        ctx.textAlign = 'right';
        if (item.label === 'Total Price') {
          ctx.fillStyle = '#28C76F';
          ctx.font = '700 20px sans-serif';
        } else {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '600 15px sans-serif';
        }
        ctx.fillText(item.val, 505, yPos);

        if (idx < fields.length - 1) {
          ctx.strokeStyle = '#1E1F28';
          ctx.beginPath();
          ctx.moveTo(95, yPos + 18);
          ctx.lineTo(505, yPos + 18);
          ctx.stroke();
        }
        yPos += 54;
      });

      // Discount Tag
      ctx.fillStyle = 'rgba(40, 199, 111, 0.12)';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(170, 595, 260, 32, 16);
      } else {
        ctx.rect(170, 595, 260, 32);
      }
      ctx.fill();

      ctx.fillStyle = '#28C76F';
      ctx.font = '600 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✓ 50% Grand Launch Offer Applied', 300, 615);

      // Footer
      ctx.fillStyle = '#6C6D75';
      ctx.font = '400 12px sans-serif';
      ctx.fillText('24/7 Support: +92 301 5323689 | mfsmedia.agency@gmail.com', 300, 680);

      // Save PNG
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `MFS_Order_Receipt_${String(state.customerName || 'Client').replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      const text = `MFS Growth Agency - Order Brief\n\nName: ${state.customerName}\nService: ${state.serviceRequired}\nScope: ${state.quantity}\nDeadline: ${state.deadline}\nEstimated Price: ${state.currency} ${state.estimatedPrice}\n\nBrief: ${state.projectBrief}`;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MFS-Order-Brief-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const suggestionChips = [
    "Explore Services",
    "Check Pricing",
    "Start an Order",
    "Track an Order",
    "Talk to Support"
  ];

  return (
    <>
      {/* Standalone Voice Assistant Popup Window */}
      {isVoiceOpen && (
        <AIVoiceAssistant 
          onClose={handleCloseVoice} 
          onSwitchToChat={() => {
            setIsVoiceOpen(false);
            setIsChatOpen(true);
          }} 
        />
      )}

      {/* Standalone Text Chat Assistant Window - Premium MFS AI Concierge */}
      {isChatOpen && (
        <div className="fixed bottom-2 sm:bottom-6 right-2 sm:right-6 left-2 sm:left-auto z-50 w-[calc(100vw-1rem)] sm:w-[420px] h-[calc(100dvh-1.5rem)] sm:h-auto max-h-[min(640px,calc(100dvh-2rem))] bg-[#0A0A0E] border border-[#E5C158]/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden font-sans animate-in zoom-in-95 duration-200 pb-[env(safe-area-inset-bottom)]">
          {/* Header */}
          <div className="bg-[#121218]/95 backdrop-blur-md px-3.5 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between border-b border-[#232330] flex-shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="relative shrink-0">
                <MFSLogo size={32} />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#28C76F] rounded-full border-2 border-[#0A0A0E] shadow-[0_0_8px_rgba(40,199,111,0.8)]"></div>
              </div>
              <div className="text-left min-w-0">
                <h3 className="text-white font-bold text-xs sm:text-sm tracking-wide truncate flex items-center gap-1.5">
                  MFS AI Concierge
                </h3>
                <p className="text-neutral-400 text-[10px] sm:text-[11px] flex items-center gap-1.5 font-normal truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] shrink-0"></span>
                  Your Growth Assistant
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <button
                onClick={handleToggleBrief}
                className={`px-2 sm:px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-[11px] font-semibold ${
                  showReceipt 
                    ? 'bg-[#28C76F]/20 text-[#28C76F] border-[#28C76F]/40 shadow-sm' 
                    : 'bg-[#181820] text-neutral-300 border-white/10 hover:border-[#E5C158]/40 hover:text-[#E5C158]'
                }`}
                title="Toggle Order Brief & WhatsApp Action Buttons"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
                <span className="hidden sm:inline">{showReceipt ? 'Hide Brief' : 'Order Brief'}</span>
              </button>

              <button
                onClick={() => {
                  setIsChatOpen(false);
                  setIsVoiceOpen(true);
                }}
                className="p-1.5 sm:p-2 rounded-xl bg-[#181820] border border-white/10 text-[#E5C158] hover:bg-[#E5C158]/15 hover:border-[#E5C158]/40 transition-all cursor-pointer flex items-center gap-1.5 text-[11px] font-semibold"
                title="Switch to Voice Call"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Voice Call</span>
              </button>
              
              <button 
                onClick={handleCloseChat}
                className="text-neutral-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-[#181820] cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center border border-white/5 active:bg-white/10"
                title="Close AI Concierge"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {briefNotice && (
            <div className="bg-[#E5C158]/10 border-b border-[#E5C158]/30 text-[#E5C158] text-xs px-3.5 py-2.5 text-center font-medium animate-in fade-in flex items-center justify-between flex-shrink-0">
              <span className="leading-tight">{briefNotice}</span>
              <button onClick={() => setBriefNotice(null)} className="text-neutral-400 hover:text-white ml-2 cursor-pointer flex-shrink-0">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto min-h-0 space-y-4 bg-[#07070A] scrollbar-thin scrollbar-thumb-neutral-800">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-6 px-3 text-center my-auto space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E5C158]/20 to-[#D4AF37]/5 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] shadow-lg shadow-[#E5C158]/10">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base tracking-wide">MFS AI Concierge</h4>
                  <p className="text-neutral-400 text-xs mt-1 max-w-[270px] leading-relaxed">
                    How can we help you grow today? Select a topic or ask any question about our services and pricing.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-[340px] pt-1">
                  {suggestionChips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => processUserMessage(chip)}
                      className="px-3 py-1.5 rounded-full bg-[#14141C] hover:bg-[#E5C158]/15 border border-white/10 hover:border-[#E5C158]/40 text-xs text-neutral-300 hover:text-[#E5C158] font-medium transition-all cursor-pointer flex items-center gap-1 group shadow-sm active:scale-95"
                    >
                      <span>{chip}</span>
                      <ChevronRight className="w-3 h-3 text-neutral-500 group-hover:text-[#E5C158] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.role === 'assistant' ? (
                  <div className="max-w-[90%] bg-[#121218] border border-[#232330] rounded-2xl rounded-tl-xs p-3.5 text-neutral-200 text-xs sm:text-sm leading-relaxed shadow-lg">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#E5C158] mb-1.5 pb-1 border-b border-white/5">
                      <Sparkles className="w-3 h-3 text-[#E5C158]" />
                      <span>MFS Concierge</span>
                    </div>
                    <div className="whitespace-pre-line">{msg.content}</div>
                  </div>
                ) : (
                  <div className="max-w-[88%] bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-neutral-950 font-semibold rounded-2xl rounded-tr-xs p-3.5 text-xs sm:text-sm leading-snug shadow-md shadow-[#E5C158]/10">
                    {msg.content}
                  </div>
                )}
                <span className="text-[10px] text-neutral-500 font-mono mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-[#121218] border border-[#232330] rounded-2xl rounded-tl-xs p-3.5 flex items-center gap-2.5 shadow-md">
                  <div className="w-5 h-5 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">MFS Concierge is thinking</span>
                  <div className="flex gap-1 ml-1">
                    <span className="w-1.5 h-1.5 bg-[#E5C158] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#E5C158] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 bg-[#E5C158] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </div>
              </div>
            )}

            {showReceipt && (
              <div className="animate-in fade-in duration-500">
                <AIOrderReceipt orderState={engine.getState()} onDownload={downloadReceipt} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Typing & Input Area - Workspace Composer */}
          <div className="p-3 bg-[#0A0A0E] border-t border-[#232330] flex-shrink-0">
            <div className="flex items-end gap-2 bg-[#121218] rounded-xl p-2 border border-[#232330] focus-within:border-[#E5C158]/70 focus-within:shadow-[0_0_15px_rgba(229,193,88,0.12)] transition-all">
              <button 
                onClick={startListening}
                disabled={isListening}
                className={`p-2 transition-colors flex-shrink-0 cursor-pointer rounded-lg hover:bg-white/5 ${isListening ? 'text-red-500 animate-pulse' : 'text-neutral-400 hover:text-[#E5C158]'}`}
                title={isListening ? "Listening..." : "Voice Input"}
              >
                <Mic className="w-4 h-4" />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about pricing, services, or start an order..."
                rows={1}
                className="flex-1 bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder-neutral-500 py-1.5 px-1 resize-none max-h-28 min-h-[36px] leading-relaxed"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2.5 text-neutral-950 bg-gradient-to-r from-[#E5C158] to-[#D4AF37] rounded-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer font-bold shadow-md shadow-[#E5C158]/15 active:scale-95"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single Non-Intrusive Floating AI & Support Entry Point */}
      <AnimatePresence>
        {!isChatOpen && !isVoiceOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end pointer-events-auto"
          >
            {/* Popover Quick Support Menu when open */}
            <AnimatePresence>
              {isQuickMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-3 w-64 bg-[#0C0C10]/95 backdrop-blur-xl border border-[#E5C158]/35 rounded-2xl p-3 shadow-[0_15px_35px_rgba(0,0,0,0.85)] space-y-2 overflow-hidden"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-bold text-white px-1">
                    <span className="flex items-center gap-1.5 text-[#E5C158]">
                      <Sparkles className="w-3.5 h-3.5" />
                      MFS AI & Live Concierge
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsQuickMenuOpen(false);
                      }}
                      className="text-neutral-400 hover:text-white p-1 rounded-md cursor-pointer"
                      title="Close support options"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsQuickMenuOpen(false);
                      setIsVoiceOpen(false);
                      setIsChatOpen(true);
                    }}
                    type="button"
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#E5C158]/10 hover:border-[#E5C158]/40 border border-white/5 transition-all text-left text-xs font-semibold text-white group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-white group-hover:text-[#E5C158] transition-colors">AI Chat Assistant</span>
                      <span className="text-[10px] text-neutral-400 font-normal">Instant 24/7 Order & Quote Help</span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsQuickMenuOpen(false);
                      setIsChatOpen(false);
                      setIsVoiceOpen(true);
                    }}
                    type="button"
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-[#E5C158]/10 hover:border-[#E5C158]/40 border border-white/5 transition-all text-left text-xs font-semibold text-white group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-white group-hover:text-[#E5C158] transition-colors">Voice AI Consultation</span>
                      <span className="text-[10px] text-neutral-400 font-normal">Speak in English or Urdu</span>
                    </div>
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://wa.me/923015323689"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsQuickMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-[#28C76F]/10 hover:bg-[#28C76F]/20 border border-[#28C76F]/30 transition-all text-left text-xs font-semibold text-white group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#28C76F] text-black flex items-center justify-center font-bold">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
                    </div>
                    <div>
                      <span className="block text-white group-hover:text-[#28C76F] transition-colors">WhatsApp Direct</span>
                      <span className="text-[10px] text-neutral-400 font-normal">+92 301 5323689</span>
                    </div>
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Single Unified Floating Entry Point Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsQuickMenuOpen((prev) => !prev);
              }}
              className="h-11 sm:h-12 px-3.5 sm:px-4 rounded-full bg-[#0C0C10] border-2 border-[#E5C158] shadow-[0_0_25px_rgba(229,193,88,0.25)] flex items-center gap-2.5 cursor-pointer group"
              title="MFS AI & Live Support"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#E5C158] to-[#D4AF37] text-neutral-950 flex items-center justify-center font-bold shadow-sm">
                <Sparkles className="w-4 h-4 fill-neutral-950" />
              </div>
              <span className="text-xs font-poppins font-bold text-white group-hover:text-[#E5C158] transition-colors hidden sm:inline tracking-wide">
                MFS AI & Support
              </span>
              <span className="w-2 h-2 rounded-full bg-[#28C76F] animate-pulse shadow-[0_0_8px_rgba(40,199,111,0.8)]"></span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

