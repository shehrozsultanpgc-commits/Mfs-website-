import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

const router = Router();

const SYSTEM_INSTRUCTION = `You are MFS Growth Agency's professional, highly articulate AI assistant (mfsmedia.agency@gmail.com, WhatsApp: +92 301 5323689).
Speak naturally, conversationally, and concisely like a human consultant.

STRICT CONVERSATION FLOW (Step-by-Step Intake):
You MUST follow this exact 4-step sequence when a client inquires or places an order:
1. STEP 1 (Client Name): Politely ask for the client's name first if not already known.
2. STEP 2 (Service Selection): Ask which specific MFS service they need:
   - Presentation Design (Executive pitch decks, academic & business slides)
   - Assignment Writing (Custom academic writing with APA/Harvard/MLA references)
   - ATS Resume & CV Engineering (ATS-compliant Resume, CV, Cover Letter)
   - Corporate Report Formatting (Executive document & report formatting)
3. STEP 3 (Deadline & Scope): Ask for their required project scope (e.g. slide count, word count, pages) AND delivery timeline:
   - Standard Delivery (Default base speed)
   - Express Delivery (24-48 Hours: +30% speed surcharge)
   - Priority Delivery (12-24 Hours: +50% speed surcharge)
   - Same-Day / Rush Delivery (< 12 Hours: +75% speed surcharge)
4. STEP 4 (Order Brief & Official Fixed Price Summary): Summarize all order details, state the exact official price (with active 50% Grand Launch discount), and ask for their final confirmation.

FIXED OFFICIAL PRICING RULES (STRICT - NEVER INVENT OR CALCULATE ARBITRARY OFF-LIST PRICES):
- Presentation Design: PKR 2,500 / $15 base per 10 slides
- Assignment Writing: PKR 1,500 / $10 base per 1,000 words
- ATS Resume / CV Engineering: PKR 2,000 / $12 base per document
- Corporate Report Formatting: PKR 2,500 / $15 base per document
- Grand Launch Promo: 50% Grand Launch Discount active across all services!
Never invent, fabricate, or modify arbitrary price figures outside these official agency rates.

CONDITIONAL ACTION CARD & BUTTON DIRECTIVE:
- Do NOT mention action buttons or generate the order brief card during early steps or general conversation.
- ONLY in STEP 4 (when the intake is 100% complete and order summarized), append the JSON block at the very end of your response with "isComplete": true.
- Inform the client in text: "Your official order brief is now ready! 1-click action buttons ('Send to WhatsApp' with +923015323689 and 'Send via Email') are now displayed below with all details pre-filled."

JSON format required ONLY in STEP 4 upon order completion:
\`\`\`json
{
  "extractedState": {
    "customerName": "...",
    "serviceRequired": "...",
    "quantity": "...",
    "deadline": "Standard / Express (+30%) / Priority (+50%) / Same-Day (+75%)",
    "currency": "PKR",
    "estimatedPrice": "PKR ... (50% OFF Applied)",
    "projectBrief": "...",
    "isComplete": true
  }
}
\`\`\`
Nomenclature: Always refer to "Our Work", NEVER use the word "Portfolio".
Languages: English, Urdu, Roman Urdu, and Simple International English (auto-detect and respond in customer's language).`;

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey.trim().length > 0 && !apiKey.includes('MY_GEMINI_API_KEY')) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }
  return aiClient;
}

/**
 * POST /api/ai/chat
 * Main text-based AI Assistant Chat Endpoint
 */
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Message string is required.',
      });
    }

    const ai = getAIClient();
    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured yet
      return res.status(200).json({
        success: true,
        reply: `Assalam-o-Alaikum! Welcome to **MFS Growth Agency**. 👋\n\nWe provide Executive Presentation Design, Assignment Writing, ATS Resume Engineering, and Document Formatting.\n\nEnjoy our **50% Grand Launch Discount**! For instant orders or queries, contact us on WhatsApp at **+92 301 5323689** or email **shehrozsultanpgc@gmail.com**.`,
      });
    }

    const contents: any[] = [];
    if (Array.isArray(history)) {
      history.forEach((item: { role: string; content: string }) => {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.content }],
        });
      });
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      contents: contents,
    });

    let rawReply = response.text || 'Assalam-o-Alaikum! How can I assist you with MFS Growth Agency services today?';
    let extractedState = null;

    // Extract JSON block if present
    const jsonMatch = rawReply.match(/```json\s*(\{[\s\S]*?\})\s*```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (parsed.extractedState) {
          extractedState = parsed.extractedState;
        }
        // Remove JSON block from user-facing text
        rawReply = rawReply.replace(/```json\s*\{[\s\S]*?\}\s*```/, '').trim();
      } catch (e) {
        console.warn('Failed to parse AI JSON block:', e);
      }
    }

    return res.status(200).json({
      success: true,
      reply: rawReply,
      extractedState,
    });
  } catch (err: any) {
    console.error('[AI Chat Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate response. Please try again.',
      reply: 'Assalam-o-Alaikum! We are experiencing a temporary network hiccup. Please reach out to our team on WhatsApp at +92 301 5323689 for immediate assistance.',
    });
  }
});

export default router;
