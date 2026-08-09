import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, PhoneOff, Loader2, RefreshCw, ExternalLink, MessageSquare, Phone, X, Sparkles, Volume2, UserCheck, Send } from 'lucide-react';
import { MFSLogo } from '../common/MFSLogo';
import { AIOrderReceipt } from './AIOrderReceipt';

interface AIVoiceAssistantProps {
  onClose: () => void;
  onSwitchToChat?: () => void;
}

export type VoiceOption = 'Puck' | 'Aoede' | 'Adam' | 'Rachel';

export const AIVoiceAssistant: React.FC<AIVoiceAssistantProps> = ({ onClose, onSwitchToChat }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showReceiptScreen, setShowReceiptScreen] = useState(false);
  const [orderLinkData, setOrderLinkData] = useState<any>(null);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>('Aoede');

  // Interactive details prompt & manual entry state when clicked before details are provided
  const [showDetailsPrompt, setShowDetailsPrompt] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualService, setManualService] = useState('Presentation Design');
  const [manualScope, setManualScope] = useState('');
  
  // Audio activity tracking
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [speakerState, setSpeakerState] = useState<'quiet' | 'user' | 'ai'>('quiet');

  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const receiptRef = useRef<HTMLDivElement>(null);

  const sessionIdRef = useRef<number>(0);
  const isPlayingModelAudioRef = useRef<boolean>(false);
  const modelAudioEndTimeRef = useRef<number>(0);
  const isUserSpeakingRef = useRef<boolean>(false);
  const consecutiveInterruptFramesRef = useRef<number>(0);

  const pcmToBase64 = (pcmData: Float32Array): string => {
    // Convert Float32 to Int16
    const int16Data = new Int16Array(pcmData.length);
    for (let i = 0; i < pcmData.length; i++) {
      let s = Math.max(-1, Math.min(1, pcmData[i]));
      int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    // Convert Int16Array to Base64
    const buffer = new Uint8Array(int16Data.buffer);
    let binary = '';
    for (let i = 0; i < buffer.byteLength; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    return window.btoa(binary);
  };

  const playAudioChunk = (audioCtx: AudioContext, base64Audio: string) => {
    try {
      const binaryStr = window.atob(base64Audio);
      const len = binaryStr.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
      }
      
      const audioBuffer = audioCtx.createBuffer(1, float32Array.length, 24000);
      audioBuffer.getChannelData(0).set(float32Array);
      
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      
      isPlayingModelAudioRef.current = true;
      activeSourcesRef.current.push(source);

      source.onended = () => {
        activeSourcesRef.current = activeSourcesRef.current.filter(s => s !== source);
        if (activeSourcesRef.current.length === 0) {
          isPlayingModelAudioRef.current = false;
        }
      };
      
      const currentTime = audioCtx.currentTime;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      
      // Smooth continuous playback buffer: start slightly ahead if queue fell behind
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime + 0.08; 
      }
      
      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;
      // Set echo suppression gate for 600ms after current scheduled end time
      modelAudioEndTimeRef.current = nextStartTimeRef.current + 0.60;
    } catch (err) {
      console.warn('Audio chunk playback notice:', err);
    }
  };

  const cleanup = () => {
    sessionIdRef.current++;
    isPlayingModelAudioRef.current = false;
    modelAudioEndTimeRef.current = 0;
    consecutiveInterruptFramesRef.current = 0;
    
    activeSourcesRef.current.forEach(src => {
      try { src.stop(); } catch (e) {}
    });
    activeSourcesRef.current = [];

    if (wsRef.current) {
      try { wsRef.current.close(); } catch (e) {}
      wsRef.current = null;
    }
    if (processorRef.current) {
      try { processorRef.current.disconnect(); } catch (e) {}
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      try { mediaStreamRef.current.getTracks().forEach(track => track.stop()); } catch (e) {}
      mediaStreamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      try { inputAudioCtxRef.current.close(); } catch (e) {}
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      try { outputAudioCtxRef.current.close(); } catch (e) {}
      outputAudioCtxRef.current = null;
    }
  };

  const startVoiceSession = async (voiceToUse?: VoiceOption) => {
    cleanup();
    const currentSessionId = sessionIdRef.current;
    setIsConnecting(true);
    setError(null);
    const activeVoice = voiceToUse || selectedVoice;

    try {
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          } 
        });
      } catch (firstErr: any) {
        if (
          firstErr?.name === 'NotAllowedError' || 
          firstErr?.name === 'PermissionDeniedError' || 
          firstErr?.message?.toLowerCase().includes('permission') ||
          firstErr?.message?.toLowerCase().includes('denied')
        ) {
          throw firstErr;
        }
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      if (currentSessionId !== sessionIdRef.current) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }

      mediaStreamRef.current = stream;

      // Input: 16kHz for mic capture
      const inputAudioCtx = new AudioContext({ sampleRate: 16000 });
      inputAudioCtxRef.current = inputAudioCtx;
      
      // Output: 24kHz for model output playback
      const outputAudioCtx = new AudioContext({ sampleRate: 24000 });
      outputAudioCtxRef.current = outputAudioCtx;

      const source = inputAudioCtx.createMediaStreamSource(stream);
      
      const processor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      
      source.connect(processor);
      // Mute local mic audio from outputting to speakers (prevents sidetone / double voice)
      const silentGain = inputAudioCtx.createGain();
      silentGain.gain.value = 0;
      processor.connect(silentGain);
      silentGain.connect(inputAudioCtx.destination);

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const ws = new WebSocket(`${protocol}//${window.location.host}/api/live?voice=${activeVoice}`);
      wsRef.current = ws;
      
      ws.onopen = () => {
        if (currentSessionId !== sessionIdRef.current) {
          try { ws.close(); } catch (e) {}
          return;
        }
        setIsConnected(true);
        setIsConnecting(false);
      };

      processor.onaudioprocess = (e) => {
        if (currentSessionId !== sessionIdRef.current) return;

        // Calculate mic RMS audio volume
        const samples = e.inputBuffer.getChannelData(0);
        let sum = 0;
        for (let i = 0; i < samples.length; i += 16) {
          sum += samples[i] * samples[i];
        }
        const rms = Math.sqrt(sum / (samples.length / 16));

        const isAIActive = isPlayingModelAudioRef.current || activeSourcesRef.current.length > 0;
        const now = outputAudioCtx ? outputAudioCtx.currentTime : 0;
        const isEchoWindow = now < modelAudioEndTimeRef.current;

        // Distinguish intentional user voice from speaker playback bleed during active AI speech
        let isUserSpeaking = false;
        if ((isAIActive || isEchoWindow) && !isMuted) {
          if (rms > 0.08) {
            consecutiveInterruptFramesRef.current++;
          } else {
            consecutiveInterruptFramesRef.current = 0;
          }
          if (consecutiveInterruptFramesRef.current >= 3) {
            isUserSpeaking = true;
          }
        } else if (!isMuted) {
          consecutiveInterruptFramesRef.current = 0;
          isUserSpeaking = rms > 0.018;
        } else {
          consecutiveInterruptFramesRef.current = 0;
          isUserSpeaking = false;
        }

        isUserSpeakingRef.current = isUserSpeaking;

        // INTENTIONAL BARGE-IN / INTERRUPTION HANDLING:
        // Only interrupt playback if user intentionally speaks loud and clear over the AI voice for 3+ consecutive frames
        if (isUserSpeaking && isAIActive) {
          consecutiveInterruptFramesRef.current = 0;
          activeSourcesRef.current.forEach((src) => {
            try { src.stop(); } catch (err) {}
          });
          activeSourcesRef.current = [];
          isPlayingModelAudioRef.current = false;
          modelAudioEndTimeRef.current = 0;
          if (outputAudioCtx) {
            nextStartTimeRef.current = outputAudioCtx.currentTime;
          }
          if (ws.readyState === WebSocket.OPEN) {
            try {
              ws.send(JSON.stringify({ interrupt: true }));
            } catch (err) {}
          }
        }

        if (isUserSpeaking) {
          setSpeakerState('user');
          setAudioLevel(Math.min(1.0, rms * 15));
        } else if (isAIActive) {
          setSpeakerState('ai');
          setAudioLevel(0.6 + Math.random() * 0.4);
        } else {
          setSpeakerState('quiet');
          setAudioLevel(0);
        }

        if (ws.readyState === WebSocket.OPEN && !isMuted) {
          // Suppress sending mic samples to server during AI playback or echo window UNLESS user is intentionally barging in
          if ((isAIActive || isEchoWindow) && !isUserSpeaking) {
            return;
          }

          const base64 = pcmToBase64(samples);
          ws.send(JSON.stringify({ audio: base64 }));
        }
      };

      ws.onmessage = (event) => {
        if (currentSessionId !== sessionIdRef.current) return;
        try {
          const msg = JSON.parse(event.data);
          if (msg.audio) {
            playAudioChunk(outputAudioCtx, msg.audio);
          }
          if (msg.interrupted) {
            activeSourcesRef.current.forEach(src => {
              try { src.stop(); } catch (e) {}
            });
            activeSourcesRef.current = [];
            isPlayingModelAudioRef.current = false;
            modelAudioEndTimeRef.current = 0;
            nextStartTimeRef.current = outputAudioCtx.currentTime;
          }
          if (msg.error) {
            setError(msg.error);
            setIsConnecting(false);
          }
          if (msg.action === 'open_whatsapp' || msg.action === 'order_confirmed') {
            setOrderLinkData(msg.orderDetails);
            setIsOrderConfirmed(true);
            setShowReceiptScreen(true);
          }
        } catch (e) {
          console.warn('WebSocket message format check:', e);
        }
      };

      ws.onerror = (e) => {
        if (currentSessionId !== sessionIdRef.current) return;
        console.warn('Voice WebSocket notice:', e);
        if (!isConnected) {
          setError('Voice connection lost or unavailable. Please try again.');
        }
        setIsConnecting(false);
      };

      ws.onclose = (e) => {
        if (currentSessionId !== sessionIdRef.current) return;
        setIsConnected(false);
        setIsConnecting(false);
        if (e.reason === 'API key missing') {
          setError('API Key is missing. Add your Gemini API Key in settings to enable Voice Agent.');
        } else if (!error) {
          setError('Call ended.');
        }
      };

    } catch (err: any) {
      console.warn('Voice session setup notice:', err);
      cleanup();
      let errorMsg = err.message || 'Failed to start voice session. Check microphone permissions.';
      const lower = errorMsg.toLowerCase();
      if (
        err?.name === 'NotAllowedError' || 
        err?.name === 'PermissionDeniedError' || 
        err?.name === 'SecurityError' ||
        lower.includes('permission denied') || 
        lower.includes('notallowederror') ||
        lower.includes('permission')
      ) {
        errorMsg = 'Microphone permission was denied or blocked by the browser. Please allow microphone access in your browser site settings or open the app in a new tab.';
      }
      setError(errorMsg);
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    startVoiceSession();
    return () => cleanup();
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleEndCall = () => {
    cleanup();
    if (orderLinkData || isOrderConfirmed) {
      setShowReceiptScreen(true);
    } else {
      onClose();
    }
  };

  const handleWhatsAppButtonClick = () => {
    const hasRealDetails = orderLinkData && (orderLinkData.clientName || orderLinkData.customerName || orderLinkData.serviceRequired || orderLinkData.serviceName);
    if (hasRealDetails) {
      setShowReceiptScreen(true);
    } else {
      setShowDetailsPrompt(true);
    }
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;

    const quickData = {
      orderId: 'MFS-AI-' + Math.floor(1000 + Math.random() * 9000),
      clientName: manualName.trim(),
      customerName: manualName.trim(),
      serviceRequired: manualService,
      serviceName: manualService,
      quantity: manualScope.trim() || 'Scope as discussed',
      deadline: 'Standard Delivery (50% OFF)',
      totalPrice: manualService.includes('Assignment') ? 'PKR 1,500' : manualService.includes('Resume') ? 'PKR 2,000' : 'PKR 2,500',
      currency: 'PKR',
      projectBrief: 'Voice Consultation Brief provided directly by client.'
    };

    setOrderLinkData(quickData);
    setIsOrderConfirmed(true);
    setShowDetailsPrompt(false);
    setShowReceiptScreen(true);
  };

  const handleDownloadReceipt = () => {
    if (!orderLinkData) return;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 760;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

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

      // MFS Gold Circle Logo
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
        { label: 'Client Name', val: String(orderLinkData.customerName || 'N/A') },
        { label: 'Service Required', val: String(orderLinkData.serviceRequired || 'N/A') },
        { label: 'Scope / Quantity', val: String(orderLinkData.quantity || 'N/A') },
        { label: 'Project Deadline', val: String(orderLinkData.deadline || 'N/A') },
        { label: 'Total Price', val: `${orderLinkData.currency || 'PKR'} ${orderLinkData.estimatedPrice || 'N/A'}` },
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

      // Save
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `MFS_Order_Receipt_${String(orderLinkData.customerName || 'Client').replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate canvas receipt image, downloading text file instead', err);
      const text = `MFS Growth Agency - Official Order Brief\n\nClient Name: ${orderLinkData.customerName}\nService: ${orderLinkData.serviceRequired}\nScope: ${orderLinkData.quantity}\nDeadline: ${orderLinkData.deadline}\nEstimated Price: ${orderLinkData.currency} ${orderLinkData.estimatedPrice}\n\nSupport: +92 301 5323689 | mfsmedia.agency@gmail.com`;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MFS_Order_Brief_${String(orderLinkData.customerName || 'Client').replace(/\s+/g, '_')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (showReceiptScreen) {
    return (
      <div className="fixed bottom-3 sm:bottom-6 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[410px] max-h-[min(640px,calc(100vh-3rem))] bg-[#0F0F12] border border-[#E5C158]/35 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden font-sans animate-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-[#1A1A1F] via-[#121217] to-[#050507] p-3.5 flex items-center justify-between border-b border-[#2A2B35] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#28C76F]/10 flex items-center justify-center border border-[#28C76F]/30">
              <Sparkles className="w-4 h-4 text-[#28C76F]" />
            </div>
            <div className="text-left">
              <h3 className="text-white font-bold text-sm">Official Order Brief</h3>
              <p className="text-xs text-[#28C76F]">Send details directly on WhatsApp</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-xl hover:bg-[#2A2B35] cursor-pointer"
            title="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto min-h-0 bg-[#050507] scrollbar-thin scrollbar-thumb-gray-800 space-y-3">
          <AIOrderReceipt 
            orderState={orderLinkData} 
            onDownload={handleDownloadReceipt} 
          />
          <div className="flex items-center justify-between pt-2 border-t border-[#2A2B35]">
            <button
              onClick={() => setShowReceiptScreen(false)}
              className="text-xs text-[#E5C158] hover:underline font-semibold cursor-pointer"
            >
              ← Return to Voice Call
            </button>
            <button
              onClick={onClose}
              className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-3 sm:bottom-6 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[410px] max-h-[min(640px,calc(100vh-3rem))] bg-[#0F0F12] border border-[#E5C158]/35 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden font-sans animate-in zoom-in-95 duration-200">
      {/* Standalone Voice Assistant Header */}
      <div className="bg-gradient-to-r from-[#1A1A1F] via-[#121217] to-[#050507] p-3.5 flex items-center justify-between border-b border-[#2A2B35] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <MFSLogo size={36} />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#28C76F] rounded-full border-2 border-[#0F0F12] flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </div>
          </div>
          <div className="text-left">
            <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-1.5">
              <span>MFS Growth Executive</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E5C158]/20 text-[#E5C158] font-black uppercase tracking-wider border border-[#E5C158]/40">VP</span>
            </h3>
            <p className="text-[#28C76F] text-[11px] flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] animate-pulse"></span>
              Human Voice ({selectedVoice === 'Puck' ? 'Puck Male' : 'Aoede Female'})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Executive Voice Selector */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-[#14141A] border border-[#E5C158]/40 text-xs shadow-sm">
            <UserCheck className="w-3.5 h-3.5 text-[#E5C158]" />
            <select
              value={selectedVoice}
              onChange={(e) => {
                const newVoice = e.target.value as VoiceOption;
                setSelectedVoice(newVoice);
                startVoiceSession(newVoice);
              }}
              className="bg-transparent text-[#E5C158] font-bold text-xs focus:outline-none cursor-pointer"
              title="Select Executive Voice (Male / Female)"
            >
              <option value="Puck" className="bg-[#0F0F12] text-white">Male (Puck)</option>
              <option value="Aoede" className="bg-[#0F0F12] text-white">Female (Aoede)</option>
            </select>
          </div>

          {onSwitchToChat && (
            <button
              onClick={onSwitchToChat}
              className="px-2.5 py-1.5 rounded-xl bg-[#2A2B35] text-gray-300 hover:text-[#E5C158] flex items-center gap-1.5 text-xs font-semibold hover:bg-[#32333D] transition-colors cursor-pointer"
              title="Switch to Text Chat"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#E5C158]" />
              <span className="hidden sm:inline">Text</span>
            </button>
          )}
          <button 
            onClick={handleEndCall}
            className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-xl hover:bg-[#2A2B35] cursor-pointer"
            title="Close Voice Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Body Container with Scrollable Area for Audio Stage & Live Order Action Buttons */}
      <div className="flex-1 p-4 flex flex-col items-center justify-center text-center overflow-y-auto min-h-0 bg-[#050507] space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
        {/* Center MFS Logo Stage with Pulsing Audio Rings */}
        <div className="relative my-2 flex items-center justify-center flex-shrink-0">
          {/* Outer Ambient Glowing Rings */}
          <div className={`absolute w-32 h-32 rounded-full border-2 border-[#E5C158]/40 transition-all duration-300 ${
            speakerState !== 'quiet' ? 'scale-125 opacity-100 animate-ping' : 'scale-100 opacity-20'
          }`} />
          <div className={`absolute w-24 h-24 rounded-full border border-[#E5C158]/60 transition-all duration-300 ${
            speakerState === 'ai' ? 'scale-110 border-[#28C76F]' : ''
          }`} />
          
          {/* MFS Logo in Center Circle */}
          <div className="relative z-10 transition-transform duration-200 hover:scale-105 cursor-pointer">
            <MFSLogo size={80} />
          </div>
        </div>

        {/* Dynamic Real-Time Audio Waveform Bars */}
        <div className="w-full max-w-[280px] my-2 flex items-center justify-center gap-1.5 h-11 px-3 bg-[#0F0F12] border border-[#2A2B35] rounded-2xl shadow-inner overflow-hidden flex-shrink-0">
          {Array.from({ length: 16 }).map((_, idx) => {
            const isQuiet = speakerState === 'quiet';
            let heightPx = 4;
            if (!isQuiet) {
              const varFactor = Math.sin(idx * 0.7 + Date.now() * 0.01) * 0.4 + 0.6;
              heightPx = Math.max(6, Math.min(38, Math.round(audioLevel * 38 * varFactor)));
            }

            const barColor = speakerState === 'ai' 
              ? 'bg-[#28C76F] shadow-[0_0_8px_rgba(40,199,111,0.6)]' 
              : speakerState === 'user' 
              ? 'bg-[#E5C158] shadow-[0_0_8px_rgba(229,193,88,0.6)]' 
              : 'bg-gray-700 opacity-40';

            return (
              <div 
                key={idx} 
                className={`w-1.5 rounded-full transition-all duration-100 ${barColor}`}
                style={{ height: `${heightPx}px` }}
              />
            );
          })}
        </div>
        
        {isConnecting ? (
          <div className="flex items-center text-gray-400 gap-2 h-6">
            <Loader2 className="w-4 h-4 animate-spin text-[#E5C158]" />
            <span className="text-xs font-medium">
              Connecting MFS {selectedVoice === 'Puck' ? 'Puck Male' : 'Aoede Female'} Voice Assistant...
            </span>
          </div>
        ) : error ? (
          <div className="bg-[#1A1A22] border border-red-500/30 rounded-2xl p-3.5 max-w-sm w-full space-y-2.5 text-left my-1">
            <p className="text-red-400 text-xs leading-relaxed">{error}</p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => startVoiceSession()}
                className="w-full bg-[#E5C158] hover:bg-[#D4AF37] text-black font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Allow / Retry Microphone
              </button>
              {onSwitchToChat && (
                <button
                  onClick={onSwitchToChat}
                  className="w-full bg-[#28C76F]/20 hover:bg-[#28C76F]/30 text-[#28C76F] border border-[#28C76F]/40 font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Switch to Text Chat
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center justify-center gap-2 h-5">
              {speakerState === 'ai' ? (
                <p className="text-[#28C76F] font-semibold text-xs flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                  {selectedVoice === 'Puck' ? 'Puck Male' : 'Aoede Female'} Voice Speaking...
                </p>
              ) : speakerState === 'user' ? (
                <p className="text-[#E5C158] font-semibold text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-ping"></span>
                  Listening to You (Interrupted)...
                </p>
              ) : (
                <p className="text-gray-400 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#28C76F]"></span>
                  Active Listening Ready — Speak Anytime
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-[10px] text-[#28C76F]/90 bg-[#28C76F]/10 border border-[#28C76F]/20 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-[#E5C158]" />
              <span>Interruption-Friendly Active Listening</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-6 my-2 flex-shrink-0">
          <button
            onClick={toggleMute}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${isMuted ? 'bg-gray-700 text-white' : 'bg-[#2A2B35] text-white hover:bg-[#3A3B45]'}`}
            title={isMuted ? "Unmute Mic" : "Mute Mic"}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <button
            onClick={handleEndCall}
            className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 cursor-pointer"
            title="End Voice Call & View Brief"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>

        {/* Render Order Action Button at bottom (Always visible, validates details on click) */}
        <div className="w-full pt-2 border-t border-[#2A2B35]/80 text-center animate-in fade-in duration-300">
          <button
            onClick={handleWhatsAppButtonClick}
            className="w-full bg-[#28C76F]/15 hover:bg-[#28C76F]/25 text-[#28C76F] border border-[#28C76F]/40 py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.01]"
          >
            <Send className="w-4 h-4 text-[#28C76F]" />
            <span>Send Details on WhatsApp / View Brief</span>
          </button>
        </div>

        {/* Prompt Modal when clicked before details are provided */}
        {showDetailsPrompt && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-[#121217] border border-[#E5C158]/40 rounded-2xl p-5 max-w-sm w-full text-center relative shadow-2xl">
              <button 
                type="button"
                onClick={() => setShowDetailsPrompt(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-[#E5C158]" />
              </div>

              <h3 className="text-white font-bold text-base mb-1">Details Required First</h3>
              <p className="text-gray-300 text-xs mb-4 leading-relaxed">
                Please provide your details first (Name & Service required) to our Voice Assistant. Once you discuss your project, your custom Order Brief and 1-Click WhatsApp buttons will open automatically with your exact information!
              </p>

              <form onSubmit={handleQuickSubmit} className="space-y-3 text-left mb-3">
                <div>
                  <label className="text-[11px] text-[#E5C158] font-semibold block mb-1">Your Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder="e.g. Shehroz Sultan"
                    className="w-full bg-[#08080A] border border-[#2A2B35] focus:border-[#E5C158] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#E5C158] font-semibold block mb-1">Service Required *</label>
                  <select
                    value={manualService}
                    onChange={(e) => setManualService(e.target.value)}
                    className="w-full bg-[#08080A] border border-[#2A2B35] focus:border-[#E5C158] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="Presentation Design">Presentation Design</option>
                    <option value="Assignment Writing">Assignment Writing</option>
                    <option value="ATS Resume & CV Engineering">ATS Resume & CV Engineering</option>
                    <option value="Corporate Report Formatting">Corporate Report Formatting</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-gray-400 font-medium block mb-1">Project Scope / Details (Optional)</label>
                  <input 
                    type="text" 
                    value={manualScope}
                    onChange={(e) => setManualScope(e.target.value)}
                    placeholder="e.g. 15 slides / 2000 words"
                    className="w-full bg-[#08080A] border border-[#2A2B35] focus:border-[#E5C158] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#28C76F] to-[#20a35a] text-black font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 shadow-lg shadow-[#28C76F]/20"
                >
                  <Send className="w-4 h-4 fill-black" />
                  <span>Open My Custom Brief & WhatsApp</span>
                </button>
              </form>

              <button
                type="button"
                onClick={() => setShowDetailsPrompt(false)}
                className="text-gray-400 hover:text-white text-xs underline font-medium"
              >
                Continue Speaking with Voice Assistant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
