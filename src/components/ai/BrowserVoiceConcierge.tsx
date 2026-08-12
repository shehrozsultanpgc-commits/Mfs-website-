import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, PhoneOff, MessageSquare, Send, Sparkles, Loader2, RefreshCw, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { MFSLogo } from '../common/MFSLogo';

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

export const BrowserVoiceConcierge: React.FC<BrowserVoiceConciergeProps> = ({ onClose, onSwitchToChat }) => {
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
      content: "Assalam-o-Alaikum! Welcome to **MFS Growth Agency**. 👋 I am your Voice AI Concierge.\n\nTap the microphone and ask me anything about our **Presentation Design**, **Assignment Writing**, **ATS Resumes**, **Report Formatting**, or **50% Grand Launch Offer**!",
      timestamp: new Date(),
    },
  ]);
  const [extractedState, setExtractedState] = useState<any>(null);

  // Language Preference
  const [selectedLang, setSelectedLang] = useState<'ur-PK' | 'en-US' | 'auto'>('auto');

  // References
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, liveTranscript, isProcessing]);

  // Check Speech Synthesis availability
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
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
      synthRef.current.cancel();
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
    synthRef.current.cancel();

    const cleanText = cleanMarkdownForSpeech(text);
    if (!cleanText) return;

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
  };

  // Stop Speech Recognition
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
        recognition.lang = 'en-US'; // Default captures Roman Urdu & English best
      }

      recognition.onstart = () => {
        setIsListening(true);
        setStatusText('Listening... Speak now naturally in Roman Urdu or English');
        setLiveTranscript('');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcriptChunk;
          } else {
            interim += transcriptChunk;
          }
        }

        const currentText = final || interim;
        setLiveTranscript(currentText);

        if (final) {
          handleVoiceSubmit(final);
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
    if (!textToSend) return;

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
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          currentState: extractedState,
        }),
      });

      let replyText = '';
      let newState = extractedState;

      if (res.ok) {
        const data = await res.json();
        replyText = data.reply || 'Assalam-o-Alaikum! How can I assist you with MFS Growth Agency today?';
        if (data.extractedState) {
          newState = { ...extractedState, ...data.extractedState };
          setExtractedState(newState);
        }
      } else {
        replyText = 'Assalam-o-Alaikum! Welcome to MFS Growth Agency. How can I help you with our presentation, assignment, or resume services?';
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

      // Speak response aloud
      speakText(replyText);
    } catch (err) {
      console.error('[Voice Concierge API Error]:', err);
      setIsProcessing(false);

      const fallbackText = "Assalam-o-Alaikum! Welcome to **MFS Growth Agency**. 😊\n\nAap humari kis service ke baare mein janana chahte hain? (Presentation Design, Assignment Writing, ATS Resumes, Corporate Reports).\n\nAap WhatsApp par bhi +92 301 5323689 par direct contact kar sakte hain!";
      
      const aiMsg: VoiceMessage = {
        id: Math.random().toString(36).substring(7),
        role: 'assistant',
        content: fallbackText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(fallbackText);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] bg-[#0A0A0E] border border-[#E5C158]/40 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden font-sans">
        
        {/* Header Bar */}
        <div className="bg-[#121218]/95 px-5 py-4 flex items-center justify-between border-b border-[#232330]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <MFSLogo size={38} />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#28C76F] rounded-full border-2 border-[#0A0A0E] shadow-[0_0_8px_rgba(40,199,111,0.8)]"></div>
            </div>
            <div>
              <h3 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
                MFS Voice Concierge
                <span className="text-[10px] bg-[#E5C158]/15 text-[#E5C158] border border-[#E5C158]/30 px-2 py-0.5 rounded-full font-semibold">
                  100% Free Voice AI
                </span>
              </h3>
              <p className="text-xs text-[#9FA0A7] flex items-center gap-1.5 mt-0.5">
                <ShieldCheck size={12} className="text-[#28C76F]" />
                Browser Native • Roman Urdu & English
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSwitchToChat && (
              <button
                onClick={onSwitchToChat}
                className="p-2 text-[#9FA0A7] hover:text-[#E5C158] bg-[#181820] hover:bg-[#20202C] border border-[#232330] rounded-xl transition-all text-xs flex items-center gap-1.5"
                title="Switch to Text Chat"
              >
                <MessageSquare size={16} />
                <span className="hidden sm:inline">Text Chat</span>
              </button>
            )}

            <button
              onClick={toggleMute}
              className={`p-2 border rounded-xl transition-all ${
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
              className="p-2 text-[#9FA0A7] hover:text-white bg-[#181820] hover:bg-[#20202C] border border-[#232330] rounded-xl transition-all"
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
