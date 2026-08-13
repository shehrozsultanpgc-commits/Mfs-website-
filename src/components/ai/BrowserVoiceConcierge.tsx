import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, PhoneOff, MessageSquare, Send, Sparkles, Loader2, RefreshCw, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { MFSLogo } from '../common/MFSLogo';
import { useModalHistory } from '../../hooks/useModalHistory';

export interface BrowserVoiceConciergeProps {
  onClose: () => void;
  onSwitchToChat?: () => void;
}

export interface VoiceMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * Intelligent Local Smart Fallback Reply Generator
 * Used when network connection fails or API endpoint is unreachable
 */
function generateSmartFallbackReply(message: string, currentState?: any) {
  const lower = (message || '').toLowerCase().trim();
  let text = '';
  let newState = currentState ? { ...currentState } : {};

  if (
    lower.includes('rate') ||
    lower.includes('price') ||
    lower.includes('kitne') ||
    lower.includes('cost') ||
    lower.includes('charge') ||
    lower.includes('discount')
  ) {
    text =
      "🏷️ **MFS Growth Agency - Grand Launch Rates (50% OFF Applied)**:\n\n" +
      "• 📊 **Presentation Design**: PKR 1,250 ($7.50 USD) / 10 slides *(Was PKR 2,500)*\n" +
      "• ✍️ **Assignment Writing**: PKR 1,000 ($7.50 USD) / 1,000 words *(Was PKR 2,000)*\n" +
      "• 👔 **Resume Writing**: PKR 1,250 ($10.00 USD) / Resume *(Was PKR 2,500)*\n" +
      "• ⚡ **ATS Resume Engineering**: PKR 1,500 ($12.00 USD) / ATS Standard *(Was PKR 3,000)*\n" +
      "• 📄 **Report Formatting**: PKR 1,000 ($7.50 USD) / 1,000 words\n\n" +
      "⚡ **Turnaround Speed Options**:\n" +
      "• Standard Delivery (24-48 Hours): Base Rate\n" +
      "• Express 24-Hour: +30% Rush Fee\n" +
      "• Priority 12-24 Hours: +50% Rush Fee\n" +
      "• 1-Hour Urgent Express / Same-Day: +75% Rush Fee\n\n" +
      "Which service would you like to place an order for?";
  } else if (lower.includes('presentation') || lower.includes('slide') || lower.includes('deck') || lower.includes('ppt')) {
    newState.serviceRequired = 'Presentation Design';
    newState.quantity = '10 Slides';
    newState.turnaroundSpeed = lower.includes('urgent') || lower.includes('1-hour') || lower.includes('express') ? '1-Hour Urgent Express (+75% Rush)' : 'Standard Delivery (24-48h)';
    newState.basePrice = 'PKR 1,250';
    newState.rushFee = lower.includes('urgent') || lower.includes('1-hour') || lower.includes('express') ? 'PKR 938' : 'PKR 0 (Standard)';
    newState.estimatedPrice = lower.includes('urgent') || lower.includes('1-hour') || lower.includes('express') ? 'PKR 2,188' : 'PKR 1,250';
    text =
      "Zabardast! **Presentation Design** humari top-rated service hai. 🎨\n\n" +
      `• **Base Price**: ${newState.basePrice} (50% OFF Applied!)\n` +
      `• **Speed**: ${newState.turnaroundSpeed}\n` +
      `• **Total Amount**: **${newState.estimatedPrice}**\n\n` +
      "Aap Standard Delivery (24-48 Hours) chahte hain ya 1-Hour Urgent Express?";
  } else if (lower.includes('assignment') || lower.includes('paper') || lower.includes('essay') || lower.includes('thesis')) {
    newState.serviceRequired = 'Assignment Writing';
    newState.quantity = '1,000 Words';
    newState.turnaroundSpeed = lower.includes('urgent') || lower.includes('1-hour') || lower.includes('express') ? '1-Hour Urgent Express (+75% Rush)' : 'Standard Delivery (24-48h)';
    newState.basePrice = 'PKR 1,000';
    newState.rushFee = lower.includes('urgent') || lower.includes('1-hour') || lower.includes('express') ? 'PKR 750' : 'PKR 0 (Standard)';
    newState.estimatedPrice = lower.includes('urgent') || lower.includes('1-hour') || lower.includes('express') ? 'PKR 1,750' : 'PKR 1,000';
    text =
      "Understood! Our **Assignment Writing** service guarantees 100% original, plagiarism-free research with strict APA/Harvard/MLA referencing and Turnitin check. 📚\n\n" +
      `• **Base Price**: ${newState.basePrice} (50% OFF Applied!)\n` +
      `• **Speed**: ${newState.turnaroundSpeed}\n` +
      `• **Total Amount**: **${newState.estimatedPrice}**\n\n` +
      "Aap ka topic aur word count kya hai?";
  } else if (lower.includes('resume') || lower.includes('cv') || lower.includes('cover') || lower.includes('ats')) {
    newState.serviceRequired = 'ATS Resume & CV Engineering';
    newState.quantity = '1 ATS Resume';
    newState.turnaroundSpeed = lower.includes('urgent') || lower.includes('1-hour') || lower.includes('express') ? '1-Hour Urgent Express (+75% Rush)' : 'Standard Delivery (24h)';
    newState.basePrice = 'PKR 1,500';
    newState.rushFee = lower.includes('urgent') || lower.includes('1-hour') || lower.includes('express') ? 'PKR 1,125' : 'PKR 0 (Standard)';
    newState.estimatedPrice = lower.includes('urgent') || lower.includes('1-hour') || lower.includes('express') ? 'PKR 2,625' : 'PKR 1,500';
    text =
      "Awesome! Our **ATS Resume & CV Engineering** ensures 95%+ ATS scanner compatibility to get you hired faster. 💼\n\n" +
      `• **Base Price**: ${newState.basePrice} (50% OFF Applied!)\n` +
      `• **Speed**: ${newState.turnaroundSpeed}\n` +
      `• **Total Amount**: **${newState.estimatedPrice}**\n\n` +
      "Aap kis job role ke liye apply kar rahe hain?";
  } else if (lower.includes('report') || lower.includes('format') || lower.includes('document')) {
    newState.serviceRequired = 'Corporate Report Formatting';
    newState.quantity = '1,000 Words';
    newState.turnaroundSpeed = lower.includes('urgent') || lower.includes('1-hour') || lower.includes('express') ? '1-Hour Urgent Express (+75% Rush)' : 'Standard Delivery (2-3 Days)';
    newState.basePrice = 'PKR 1,000';
    newState.rushFee = lower.includes('urgent') || lower.includes('1-hour') || lower.includes('express') ? 'PKR 750' : 'PKR 0 (Standard)';
    newState.estimatedPrice = lower.includes('urgent') || lower.includes('1-hour') || lower.includes('express') ? 'PKR 1,750' : 'PKR 1,000';
    text =
      "Got it! Our **Corporate Report Formatting** delivers executive-ready document design. 📊\n\n" +
      `• **Base Price**: ${newState.basePrice} (50% OFF Applied!)\n` +
      `• **Speed**: ${newState.turnaroundSpeed}\n` +
      `• **Total Amount**: **${newState.estimatedPrice}**\n\n` +
      "Aap ke report ke kitne pages ya words hain?";
  } else if (lower.includes('easypaisa') || lower.includes('jazzcash') || lower.includes('bank') || lower.includes('payment') || lower.includes('pay')) {
    text =
      "💳 **Official MFS Growth Agency Payment Accounts**:\n\n" +
      "• **EasyPaisa**: `03116191234` (Title: Muhammad Shehroz Sultan)\n" +
      "• **JazzCash**: `03015323688` (Title: Muhammad Shehroz Sultan)\n" +
      "• **Askari Bank**: Account `00553230017265` (Title: Muhammad Shehroz Sultan)\n\n" +
      "Payment ke baad aap screenshot upload kar sakte hain ya humein WhatsApp (`+92 301 5323689`) par send kar sakte hain!";
  } else if (lower.includes('contact') || lower.includes('whatsapp') || lower.includes('number') || lower.includes('email') || lower.includes('phone')) {
    text =
      "📞 **MFS Growth Agency Official Support Channels**:\n\n" +
      "• **WhatsApp**: **+92 301 5323689** (24/7 Support)\n" +
      "• **Agency Email**: **mfsmedia.agency@gmail.com**\n" +
      "• **Official Website**: **https://mfsgrowth.online/**\n\n" +
      "How can we help you further today?";
  } else if (
    lower.includes('kya haal') ||
    lower.includes('kaise ho') ||
    lower.includes('kese ho') ||
    lower.includes('assalam') ||
    lower.includes('hello') ||
    lower.includes('hi') ||
    lower.includes('hey')
  ) {
    text =
      "Walaikum Assalam! Main bilkul theek hoon, aap bataayein kaise hain? 😊\n\n" +
      "Welcome to **MFS Growth Agency**! May I know your name so I can address you properly, or feel free to let me know which service you need:\n" +
      "• 📊 **Presentation Design** (Executive Pitch Decks)\n" +
      "• ✍️ **Assignment Writing** (APA / Harvard References)\n" +
      "• 👔 **ATS Resume Engineering** (95%+ ATS Score)\n" +
      "• 📄 **Corporate Report Formatting**\n\n" +
      "🎉 Abhi humara **50% Grand Launch Offer** active hai!";
  } else {
    text =
      `Aap ki query "${message}" ke silsile mein **MFS Growth Agency** aap ki mukammal rehnumai ke liye hazir hai! 😊\n\n` +
      `Aap humari Presentation Design, Assignment Writing, ATS Resumes, ya Corporate Reports mein se kis service ke baare mein janana chahte hain?\n\n` +
      `Direct assistance ke liye WhatsApp par connect karein: **+92 301 5323689**!`;
  }

  return { text, newState };
}

export const BrowserVoiceConcierge: React.FC<BrowserVoiceConciergeProps> = ({ onClose, onSwitchToChat }) => {
  useModalHistory(true, onClose, 'voiceConciergeModal');
  // Speech Recognition & Synthesis States
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [typedMessage, setTypedMessage] = useState('');
  const [statusText, setStatusText] = useState('Tap microphone to speak');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Chat History & Extracted Order Brief State
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content:
        "Assalam-o-Alaikum! Welcome to **MFS Growth Agency**. 👋 I am your Voice AI Concierge.\n\nTap the microphone and ask me anything about our **Presentation Design**, **Assignment Writing**, **ATS Resumes**, **Report Formatting**, or **50% Grand Launch Offer**!",
      timestamp: new Date(),
    },
  ]);
  const [extractedState, setExtractedState] = useState<any>(null);

  // Language Preference
  const [selectedLang, setSelectedLang] = useState<'ur-PK' | 'en-US' | 'auto'>('auto');

  // References for Async & State Consistency
  const messagesRef = useRef<VoiceMessage[]>(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const extractedStateRef = useRef<any>(extractedState);
  useEffect(() => {
    extractedStateRef.current = extractedState;
  }, [extractedState]);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const lastTranscriptRef = useRef<string>('');
  const hasSubmittedRef = useRef<boolean>(false);

  // Scroll to bottom of message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, liveTranscript, isProcessing]);

  // Check and initialize Speech Synthesis with voice listener
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      const loadVoices = () => {
        if (synthRef.current) {
          synthRef.current.getVoices();
        }
      };
      loadVoices();
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  // Cleanup synthesis and recognition on unmount
  useEffect(() => {
    return () => {
      stopSpeechSynthesis();
      stopSpeechRecognition();
    };
  }, []);

  // Stop Speech Synthesis
  const stopSpeechSynthesis = () => {
    if (synthRef.current) {
      try {
        synthRef.current.cancel();
      } catch (e) {}
    }
    setIsSpeaking(false);
  };

  // Clean Markdown Text for Speech Output
  const cleanMarkdownForSpeech = (rawText: string): string => {
    return rawText
      .replace(/```json[\s\S]*?```/gi, '') // Remove JSON blocks
      .replace(/\*\*(.*?)\*\*/g, '$1')     // Remove bold asterisks
      .replace(/\*(.*?)\*/g, '$1')         // Remove italic asterisks
      .replace(/`(.*?)`/g, '$1')           // Remove backticks
      .replace(/#{1,6}\s?/g, '')           // Remove headings
      .replace(/•\s?/g, '')               // Remove bullets
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')   // Remove links
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '') // Remove emojis
      .trim();
  };

  // Speak Text using Browser Speech Synthesis
  const speakText = (text: string) => {
    if (!synthRef.current || isMuted) return;

    // Stop any ongoing speech
    stopSpeechSynthesis();

    const cleanText = cleanMarkdownForSpeech(text);
    if (!cleanText) return;

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Select natural voice
      const voices = synthRef.current.getVoices();
      let preferredVoice = voices.find(
        (v) => (v.lang.includes('ur') || v.lang.includes('en-PK') || v.lang.includes('en-US') || v.lang.includes('en-GB')) && v.name.includes('Google')
      );
      if (!preferredVoice) {
        preferredVoice = voices.find(
          (v) => v.lang.startsWith('en') || v.lang.startsWith('ur')
        );
      }
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setStatusText('MFS AI Concierge Speaking...');
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setStatusText('Tap microphone to speak');
      };

      utterance.onerror = (e) => {
        console.warn('[SpeechSynthesis Error]:', e);
        setIsSpeaking(false);
        setStatusText('Tap microphone to speak');
      };

      synthRef.current.speak(utterance);
    } catch (err) {
      console.error('[SpeechSynthesis Exception]:', err);
      setIsSpeaking(false);
      setStatusText('Tap microphone to speak');
    }
  };

  // Stop Speech Recognition cleanly
  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  // Start Speech Recognition
  const startSpeechRecognition = () => {
    stopSpeechSynthesis();
    setErrorMsg(null);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMsg('Speech recognition is not supported in this browser. You can type your message below!');
      setStatusText('Speech Recognition unavailable - use text input');
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      // Language selection (Auto / Urdu / English)
      if (selectedLang === 'ur-PK') {
        recognition.lang = 'ur-PK';
      } else if (selectedLang === 'en-US') {
        recognition.lang = 'en-US';
      } else {
        recognition.lang = 'en-US'; // Captures Roman Urdu and English best
      }

      recognition.onstart = () => {
        setIsListening(true);
        setStatusText('Listening... Speak now naturally in Roman Urdu or English');
        setLiveTranscript('');
        lastTranscriptRef.current = '';
        hasSubmittedRef.current = false;
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const chunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += chunk;
          } else {
            interim += chunk;
          }
        }

        const currentText = final || interim;
        if (currentText.trim()) {
          lastTranscriptRef.current = currentText.trim();
          setLiveTranscript(currentText.trim());
        }

        if (final.trim() && !hasSubmittedRef.current) {
          hasSubmittedRef.current = true;
          const textToSubmit = final.trim();
          stopSpeechRecognition();
          handleVoiceSubmit(textToSubmit);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('[SpeechRecognition Error]:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setErrorMsg('Microphone access denied. Please allow microphone permissions or type below.');
          setStatusText('Microphone permission required');
        } else if (event.error === 'no-speech') {
          setStatusText('No speech detected. Tap microphone to try again.');
        } else {
          setStatusText('Listening paused. Tap to try again.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        // If final wasn't caught during onresult, but transcript was captured before onend
        if (!hasSubmittedRef.current && lastTranscriptRef.current.trim()) {
          hasSubmittedRef.current = true;
          const textToSubmit = lastTranscriptRef.current.trim();
          lastTranscriptRef.current = '';
          handleVoiceSubmit(textToSubmit);
        }
      };

      recognition.start();
    } catch (e: any) {
      console.error('[SpeechRecognition Exception]:', e);
      setIsListening(false);
      setErrorMsg('Could not start microphone. Please type your message below.');
    }
  };

  // Process Query via /api/ai/chat Backend
  const handleVoiceSubmit = async (queryText: string) => {
    const textToSend = queryText.trim();
    if (!textToSend || isProcessing) return;

    stopSpeechRecognition();
    stopSpeechSynthesis();

    // Add user message to UI
    const userMsg: VoiceMessage = {
      id: Math.random().toString(36).substring(7),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLiveTranscript('');
    setTypedMessage('');
    setIsProcessing(true);
    setStatusText('MFS AI Concierge is thinking...');

    try {
      const historyPayload = messagesRef.current.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          currentState: extractedStateRef.current,
        }),
      });

      let replyText = '';

      if (res.ok) {
        const data = await res.json();
        replyText = data.reply || 'Assalam-o-Alaikum! How can I assist you with MFS Growth Agency today?';
        if (data.extractedState) {
          const newState = { ...extractedStateRef.current, ...data.extractedState };
          setExtractedState(newState);
        }
      } else {
        const fallback = generateSmartFallbackReply(textToSend, extractedStateRef.current);
        replyText = fallback.text;
        if (fallback.newState) {
          setExtractedState(fallback.newState);
        }
      }

      // Add AI reply to UI
      const aiMsg: VoiceMessage = {
        id: Math.random().toString(36).substring(7),
        role: 'assistant',
        content: replyText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsProcessing(false);

      // Speak dynamic response aloud
      speakText(replyText);
    } catch (err) {
      console.error('[Voice Concierge API Error]:', err);
      setIsProcessing(false);

      const fallback = generateSmartFallbackReply(textToSend, extractedStateRef.current);
      const aiMsg: VoiceMessage = {
        id: Math.random().toString(36).substring(7),
        role: 'assistant',
        content: fallback.text,
        timestamp: new Date(),
      };

      if (fallback.newState) {
        setExtractedState(fallback.newState);
      }

      setMessages((prev) => [...prev, aiMsg]);
      speakText(fallback.text);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      stopSpeechRecognition();
      setStatusText('Tap microphone to speak');
    } else {
      startSpeechRecognition();
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      stopSpeechSynthesis();
      setIsMuted(true);
    }
  };

  const handleSendTyped = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedMessage.trim() && !isProcessing) {
      handleVoiceSubmit(typedMessage);
    }
  };

  const quickPrompts = [
    'Kya haal hai?',
    'Presentation Design Rates',
    'ATS Resume Engineering',
    'Payment Accounts EasyPaisa',
    'Contact WhatsApp Support',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="relative w-full max-w-xl max-h-[calc(100dvh-1rem)] sm:max-h-[92vh] bg-[#0A0A0E] border border-[#E5C158]/40 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden font-sans">
        
        {/* Header Bar */}
        <div className="bg-[#121218]/95 px-3.5 sm:px-5 py-3 sm:py-4 flex items-center justify-between border-b border-[#232330] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="relative shrink-0">
              <MFSLogo size={34} />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#28C76F] rounded-full border-2 border-[#0A0A0E] shadow-[0_0_8px_rgba(40,199,111,0.8)]"></div>
            </div>
            <div className="min-w-0">
              <h3 className="text-white font-bold text-xs sm:text-base tracking-wide truncate flex items-center gap-1.5 sm:gap-2">
                MFS Voice Concierge
                <span className="hidden xs:inline-block text-[9px] sm:text-[10px] bg-[#E5C158]/15 text-[#E5C158] border border-[#E5C158]/30 px-2 py-0.5 rounded-full font-semibold">
                  100% Free
                </span>
              </h3>
              <p className="text-[10px] sm:text-xs text-[#9FA0A7] flex items-center gap-1.5 mt-0.5 truncate">
                <ShieldCheck size={12} className="text-[#28C76F] shrink-0" />
                Roman Urdu & English
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onSwitchToChat && (
              <button
                onClick={onSwitchToChat}
                className="p-1.5 sm:p-2 text-[#9FA0A7] hover:text-[#E5C158] bg-[#181820] hover:bg-[#20202C] border border-[#232330] rounded-xl transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                title="Switch to Text Chat"
              >
                <MessageSquare size={16} />
                <span className="hidden sm:inline">Text Chat</span>
              </button>
            )}

            <button
              onClick={toggleMute}
              className={`p-1.5 sm:p-2 border rounded-xl transition-all cursor-pointer ${
                isMuted
                  ? 'text-red-400 bg-red-500/10 border-red-500/30'
                  : 'text-[#E5C158] bg-[#E5C158]/10 border-[#E5C158]/30 hover:bg-[#E5C158]/20'
              }`}
              title={isMuted ? 'Unmute Audio Response' : 'Mute Audio Response'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <button
              onClick={() => {
                stopSpeechSynthesis();
                stopSpeechRecognition();
                onClose();
              }}
              className="p-2 text-[#9FA0A7] hover:text-white bg-[#181820] hover:bg-[#20202C] border border-[#232330] rounded-xl transition-all cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
              title="Close Voice Assistant"
            >
              <PhoneOff size={18} className="text-red-400" />
            </button>
          </div>
        </div>

        {/* Interactive Visual Orb / Visualizer Stage */}
        <div className="bg-gradient-to-b from-[#12121A] to-[#0A0A0E] px-6 py-6 border-b border-[#1E1E28] flex flex-col items-center justify-center relative overflow-hidden">
          {/* Subtle Ambient Golden Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#E5C158]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Animated Visualizer Circle */}
          <div className="relative mb-4 flex items-center justify-center">
            {/* Pulsing Ripple Rings */}
            {isListening && (
              <>
                <div className="absolute w-28 h-28 border border-[#E5C158]/40 rounded-full animate-ping pointer-events-none"></div>
                <div className="absolute w-36 h-36 border border-[#E5C158]/20 rounded-full animate-pulse pointer-events-none"></div>
              </>
            )}
            {isSpeaking && (
              <>
                <div className="absolute w-28 h-28 border border-[#28C76F]/50 rounded-full animate-ping pointer-events-none"></div>
                <div className="absolute w-36 h-36 border border-[#28C76F]/25 rounded-full animate-pulse pointer-events-none"></div>
              </>
            )}

            {/* Core Mic Orb Button */}
            <button
              onClick={toggleMic}
              disabled={isProcessing}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-2xl ${
                isListening
                  ? 'bg-gradient-to-tr from-[#E5C158] to-[#F5D878] text-[#050507] shadow-[0_0_35px_rgba(229,193,88,0.7)] scale-105'
                  : isSpeaking
                  ? 'bg-gradient-to-tr from-[#28C76F] to-[#48E58F] text-[#050507] shadow-[0_0_35px_rgba(40,199,111,0.7)]'
                  : isProcessing
                  ? 'bg-[#181822] text-[#E5C158] border-2 border-[#E5C158]/50'
                  : 'bg-gradient-to-tr from-[#1A1A24] to-[#252535] text-[#E5C158] border-2 border-[#E5C158]/40 hover:border-[#E5C158] hover:shadow-[0_0_25px_rgba(229,193,88,0.3)]'
              }`}
            >
              {isProcessing ? (
                <Loader2 size={32} className="animate-spin text-[#E5C158]" />
              ) : isListening ? (
                <Mic size={32} className="animate-bounce" />
              ) : isSpeaking ? (
                <Volume2 size={32} className="animate-pulse" />
              ) : (
                <Mic size={32} />
              )}
            </button>
          </div>

          {/* Status Badge & Helper Text */}
          <div className="text-center z-10">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#E5C158] flex items-center justify-center gap-1.5">
              {isListening && <span className="w-2 h-2 bg-[#E5C158] rounded-full animate-ping"></span>}
              {isSpeaking && <span className="w-2 h-2 bg-[#28C76F] rounded-full animate-ping"></span>}
              {statusText}
            </p>

            {/* Live Speech Stream Overlay */}
            {liveTranscript && (
              <div className="mt-2 max-w-md mx-auto bg-[#181824]/90 border border-[#E5C158]/30 px-3.5 py-1.5 rounded-full text-xs text-white font-medium animate-in fade-in">
                "{liveTranscript}"
              </div>
            )}
          </div>

          {/* Language Selection Bar */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[11px] text-[#9FA0A7]">Mic Mode:</span>
            <button
              onClick={() => setSelectedLang('auto')}
              className={`text-[11px] px-2.5 py-0.5 rounded-md border transition-all ${
                selectedLang === 'auto'
                  ? 'bg-[#E5C158]/20 border-[#E5C158] text-[#E5C158] font-semibold'
                  : 'bg-[#14141E] border-[#232330] text-[#9FA0A7] hover:text-white'
              }`}
            >
              Auto (Roman Urdu & EN)
            </button>
            <button
              onClick={() => setSelectedLang('ur-PK')}
              className={`text-[11px] px-2.5 py-0.5 rounded-md border transition-all ${
                selectedLang === 'ur-PK'
                  ? 'bg-[#E5C158]/20 border-[#E5C158] text-[#E5C158] font-semibold'
                  : 'bg-[#14141E] border-[#232330] text-[#9FA0A7] hover:text-white'
              }`}
            >
              Urdu Script (اردو)
            </button>
          </div>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="bg-red-500/10 border-b border-red-500/30 px-4 py-2 text-xs text-red-300 flex items-center justify-between">
            <span>{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-white font-bold ml-2">×</button>
          </div>
        )}

        {/* Scrollable Conversation Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[260px] bg-[#07070A]/80 scrollbar-thin scrollbar-thumb-[#20202C]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#050507] font-medium rounded-tr-none shadow-md'
                    : 'bg-[#14141E] border border-[#232330] text-gray-200 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
              <span className="text-[10px] text-[#6A6A75] mt-1 px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-[#E5C158] bg-[#14141E] border border-[#E5C158]/20 px-3 py-2 rounded-xl w-fit">
              <Loader2 size={14} className="animate-spin text-[#E5C158]" />
              MFS AI Concierge is processing your query...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Extracted Brief Action Banner (If Order Brief Generated) */}
        {extractedState && extractedState.serviceRequired && (
          <div className="bg-[#12121C] border-t border-[#232332] px-4 py-2.5 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-[#E5C158] font-bold">Brief Extracted:</span>{' '}
              <span className="text-white">{extractedState.serviceRequired}</span>
              {extractedState.estimatedPrice && (
                <span className="text-[#28C76F] font-semibold ml-2">({extractedState.estimatedPrice})</span>
              )}
            </div>
            <a
              href={`https://wa.me/923015323689?text=${encodeURIComponent(
                `Hello MFS Growth Agency! I spoke with the MFS Voice Concierge regarding: ${extractedState.serviceRequired}. Price: ${extractedState.estimatedPrice || '50% OFF'}. Please confirm my order!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#28C76F] hover:bg-[#22B362] text-black font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-md"
            >
              Confirm on WhatsApp
              <ArrowRight size={12} />
            </a>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-[#0A0A0E] border-t border-[#181824] flex items-center gap-1.5 overflow-x-auto no-scrollbar scrollbar-none">
          <span className="text-[10px] text-[#6A6A75] whitespace-nowrap">Try:</span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleVoiceSubmit(prompt)}
              disabled={isProcessing}
              className="text-[11px] bg-[#14141E] hover:bg-[#1E1E2C] text-[#CFCFCF] hover:text-[#E5C158] border border-[#232330] hover:border-[#E5C158]/40 px-2.5 py-1 rounded-full whitespace-nowrap transition-all flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Fallback Text Input Field */}
        <form onSubmit={handleSendTyped} className="bg-[#121218] p-3 border-t border-[#232330] flex items-center gap-2">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            placeholder="Type your message or speak above in Roman Urdu..."
            disabled={isProcessing}
            className="flex-1 bg-[#0A0A0E] border border-[#232330] focus:border-[#E5C158]/50 rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#6A6A75] outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!typedMessage.trim() || isProcessing}
            className="bg-[#E5C158] hover:bg-[#D4AF37] disabled:opacity-40 text-[#050507] font-bold p-2 rounded-xl transition-all flex items-center justify-center"
            title="Send Message"
          >
            <Send size={16} />
          </button>
        </form>

      </div>
    </div>
  );
};
