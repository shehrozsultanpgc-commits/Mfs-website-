import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Modality, Type } from '@google/genai';
import { OFFICIAL_AI_PRICING_PROMPT_TEXT } from '../../src/data/content';

const SYSTEM_PROMPT = `You are MFS Growth Agency's professional, highly articulate AI voice assistant (mfsmedia.agency@gmail.com, WhatsApp: +92 301 5323689).
Speak naturally, conversationally, and concisely like a human consultant.

STRICT CONVERSATION FLOW (Step-by-Step Intake):
You MUST follow this exact 4-step sequence when a caller inquires or places an order:
1. STEP 1 (Client Name): Politely ask for the caller's name first if not already known.
2. STEP 2 (Service Selection): Ask which specific MFS service they need: Presentation Design, Assignment Writing, ATS Resume & CV Engineering, or Corporate Report Formatting.
3. STEP 3 (Deadline & Scope): Ask for their required project scope (e.g. slide count, word count) AND delivery deadline (Standard, Express 24-48h +30%, Priority 12-24h +50%, Same-Day <12h +75%).
4. STEP 4 (Order Brief & Official Fixed Price Summary): Summarize all order details, quote the exact official price with active 50% Grand Launch discount, and inform them that pre-filled 1-click WhatsApp (+923015323689) and Email action buttons are now rendered directly on their screen.

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
                  deadline: { type: Type.STRING, description: 'Delivery deadline' },
                  totalPrice: { type: Type.STRING, description: 'Official price e.g. PKR 2,500' },
                  currency: { type: Type.STRING, description: 'Currency e.g. PKR' },
                  projectBrief: { type: Type.STRING, description: 'Caller notes/brief' }
                },
                required: ['clientName', 'serviceRequired']
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
                      clientName: args.clientName || '',
                      customerName: args.clientName || '',
                      serviceRequired: args.serviceRequired || '',
                      serviceName: args.serviceRequired || '',
                      quantity: args.quantity || 'Scope as discussed',
                      deadline: args.deadline || 'Standard Delivery (50% OFF)',
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

