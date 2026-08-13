import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Modality, Type } from '@google/genai';
import { OFFICIAL_AI_PRICING_PROMPT_TEXT } from '../../src/data/content';

const SYSTEM_PROMPT = `You are MFS Growth Agency's professional, highly articulate AI voice assistant & Sales Closing Agent (mfsmedia.agency@gmail.com, WhatsApp: +92 301 5323689).
Speak naturally, conversationally, and concisely like a human consultant.

STRICT CONVERSATION FLOW (Step-by-Step Intake):
You MUST follow this sequence when a caller inquires or places an order:
1. STEP 1 (Client Name): Politely ask for the caller's name first. IF THE CALLER SKIPS or asks directly about a service/rate, accept gracefully ("No problem!") and proceed without friction.
2. STEP 2 (Service Selection): Ask which specific MFS service they need: Presentation Design, Assignment Writing, ATS Resume & CV Engineering, or Corporate Report Formatting.
3. STEP 3 (Speed & Scope): Ask for their required project scope (e.g. slide count, word count) AND delivery speed preference:
   • Standard Delivery (24-48 Hours) - Base Rate (50% OFF)
   • Express 24-Hour - +30% Rush Fee
   • Priority 12-24 Hours - +50% Rush Fee
   • 1-Hour Urgent Express / Same-Day - +75% Rush Fee
4. STEP 4 (Order Brief & Official Price Summary): Summarize all order details, calculate base price + rush fee = total price (50% Grand Launch OFF), call the confirmOrder tool, and inform them that pre-filled 1-click WhatsApp (+923015323689), Email, and Downloadable Receipt buttons are rendered directly on their screen.

FIXED OFFICIAL PRICING RULES (STRICT - NEVER INVENT PRICES):
${OFFICIAL_AI_PRICING_PROMPT_TEXT}
Active Offer: 50% Grand Launch Discount active across all services! Never invent or modify arbitrary prices.

Nomenclature: Always refer to "Our Work", NEVER use "Portfolio".
Languages: English, Urdu, Roman Urdu, and Simple International English (auto-detect and respond in caller's language).`;

export function setupLiveAssistant(wss: WebSocketServer) {
  wss.on('connection', async (clientWs: WebSocket, req: any) => {
    console.log('[MFS Voice Live] Client connected via WebSocket');

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim().length === 0 || apiKey.includes('MY_GEMINI_API_KEY')) {
      console.warn('[MFS Voice Live] Missing valid GEMINI_API_KEY for Live API session');
      clientWs.send(JSON.stringify({ error: 'API key missing' }));
      clientWs.close();
      return;
    }

    let chosenVoice = 'Aoede'; // Executive clear female voice default
    try {
      if (req && req.url) {
        const urlObj = new URL(req.url, 'http://localhost:3000');
        const v = urlObj.searchParams.get('voice');
        if (v && (v === 'Aoede' || v === 'Kore' || v === 'Puck' || v === 'Charon' || v === 'Fenrir' || v === 'Zephyr' || v === 'Adam' || v === 'Rachel')) {
          chosenVoice = v === 'Rachel' ? 'Aoede' : v;
        }
      }
    } catch (e) {
      // Default voice remains Aoede
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    let session: any = null;
    let isSessionReady = false;

    try {
      console.log(`[MFS Voice Live] Connecting to Gemini Live API (gemini-3.1-flash-live-preview) with voice ${chosenVoice}...`);
      session = await ai.live.connect({
        model: 'gemini-3.1-flash-live-preview',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: chosenVoice },
            },
          },
          systemInstruction: SYSTEM_PROMPT,
          tools: [{
            functionDeclarations: [{
              name: 'confirmOrder',
              description: 'Call this function immediately in Step 4 when summarizing order details with official price.',
              parameters: {
                type: Type.OBJECT,
                properties: {
                  clientName: { type: Type.STRING, description: 'Caller full name' },
                  serviceRequired: { type: Type.STRING, description: 'Requested MFS service' },
                  quantity: { type: Type.STRING, description: 'Scope e.g. 10 slides or 2000 words' },
                  turnaroundSpeed: { type: Type.STRING, description: 'Turnaround speed e.g. Standard or 1-Hour Urgent Express' },
                  deadline: { type: Type.STRING, description: 'Delivery deadline' },
                  basePrice: { type: Type.STRING, description: 'Base price e.g. PKR 1,250' },
                  rushFee: { type: Type.STRING, description: 'Rush fee e.g. PKR 938' },
                  totalPrice: { type: Type.STRING, description: 'Official price e.g. PKR 2,188' },
                  currency: { type: Type.STRING, description: 'Currency e.g. PKR' },
                  projectBrief: { type: Type.STRING, description: 'Caller notes/brief' }
                },
                required: ['serviceRequired']
              }
            }]
          }]
        },
        callbacks: {
          onmessage: (message: any) => {
            if (clientWs.readyState !== WebSocket.OPEN) return;

            if (message.toolCall) {
              for (const call of message.toolCall.functionCalls || []) {
                if (call.name === 'confirmOrder') {
                  const args = call.args || {};
                  clientWs.send(JSON.stringify({
                    action: 'order_confirmed',
                    orderDetails: {
                      orderId: 'MFS-AI-' + Math.floor(1000 + Math.random() * 9000),
                      clientName: args.clientName || 'Valued Client',
                      customerName: args.clientName || 'Valued Client',
                      serviceRequired: args.serviceRequired || 'Digital Solution',
                      serviceName: args.serviceRequired || 'Digital Solution',
                      quantity: args.quantity || 'Scope as discussed',
                      turnaroundSpeed: args.turnaroundSpeed || args.deadline || 'Standard Delivery',
                      deadline: args.deadline || 'Standard Delivery (50% OFF)',
                      basePrice: args.basePrice || '',
                      rushFee: args.rushFee || '',
                      totalPrice: args.totalPrice || 'PKR 2,500',
                      currency: args.currency || 'PKR',
                      projectBrief: args.projectBrief || 'Voice Consultation Order Brief'
                    }
                  }));
                }
              }
            }

            if (message.serverContent?.modelTurn?.parts) {
              for (const part of message.serverContent.modelTurn.parts) {
                if (part.inlineData && part.inlineData.data) {
                  clientWs.send(JSON.stringify({ audio: part.inlineData.data }));
                }
              }
            }

            if (message.serverContent?.interrupted) {
              clientWs.send(JSON.stringify({ interrupted: true }));
            }
          },
          onclose: () => {
            console.log('[MFS Voice Live] Gemini Live API session closed');
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.close();
            }
          },
          onerror: (err: any) => {
            console.error('[MFS Voice Live] Gemini Live API session error:', err);
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(JSON.stringify({ error: 'Gemini Live session hiccup' }));
            }
          },
        },
      });

      isSessionReady = true;
      console.log('[MFS Voice Live] Gemini Live session established successfully');
      clientWs.send(JSON.stringify({ ready: true }));
    } catch (err: any) {
      console.error('[MFS Voice Live] Failed to connect to Gemini Live API:', err);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ error: err.message || 'Failed to connect Live voice session' }));
        clientWs.close();
      }
      return;
    }

    clientWs.on('message', (data) => {
      const msg = data.toString();
      if (!session || !isSessionReady) return;

      try {
        const parsed = JSON.parse(msg);
        if (parsed.interrupt) {
          return;
        }
        if (parsed.type === 'init') {
          return;
        }
        if (parsed.audio) {
          session.sendRealtimeInput({
            audio: {
              data: parsed.audio,
              mimeType: 'audio/pcm;rate=16000',
            },
          });
          return;
        }
        if (parsed.realtimeInput) {
          session.sendRealtimeInput(parsed.realtimeInput);
          return;
        }
      } catch (e) {
        // Raw base64 string fallback
        try {
          session.sendRealtimeInput({
            audio: {
              data: msg,
              mimeType: 'audio/pcm;rate=16000',
            },
          });
        } catch (err) {
          console.warn('[MFS Voice Live] Error sending realtimeInput to Gemini:', err);
        }
      }
    });

    clientWs.on('close', () => {
      if (session && typeof session.close === 'function') {
        try { session.close(); } catch (e) {}
      }
    });

    clientWs.on('error', (err) => {
      console.warn('[MFS Voice Live] Client WebSocket error:', err);
      if (session && typeof session.close === 'function') {
        try { session.close(); } catch (e) {}
      }
    });
  });
}

