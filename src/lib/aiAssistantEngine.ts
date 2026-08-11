import { SERVICES, calculateServicePrice } from '../data/content';

export interface OrderState {
  customerName: string | null;
  serviceRequired: string | null;
  projectBrief: string | null;
  deadline: string | null;
  quantity: string | null;
  currency: 'PKR' | 'USD';
  estimatedPrice: number | null;
  isComplete: boolean;
}

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export class AIAssistantEngine {
  private state: OrderState = {
    customerName: null,
    serviceRequired: null,
    projectBrief: null,
    deadline: null,
    quantity: null,
    currency: 'PKR', // Default
    estimatedPrice: null,
    isComplete: false,
  };

  private messages: ChatMessage[] = [];

  constructor(initialCurrency: 'PKR' | 'USD' = 'PKR') {
    this.state.currency = initialCurrency;
    this.addMessage('assistant', "Assalam-o-Alaikum! Welcome to MFS Growth Agency. 👋 I am your MFS AI Consultant. May I please know your name so I can assist you best with our services today?");
  }

  public getMessages(): ChatMessage[] {
    return this.messages;
  }

  public getState(): OrderState {
    return this.state;
  }

  public async processMessage(content: string): Promise<ChatMessage> {
    this.addMessage('user', content);
    
    try {
      // Create a payload without the very last user message (which we will send separately)
      const history = this.messages.slice(0, -1);
      
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          history,
          message: content,
          currentState: this.state
        })
      });
      
      if (!response.ok) {
        throw new Error(`Server API status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.extractedState) {
        // Merge state
        this.state = {
          ...this.state,
          ...data.extractedState
        };
      }
      
      const reply = data.reply || "I'm sorry, I didn't quite catch that. Could you please rephrase?";
      return this.addMessage('assistant', reply);
      
    } catch (error) {
      console.warn('Backend /api/ai/chat unavailable, using intelligent local engine fallback:', error);
      
      // Intelligent Local Rule Engine Fallback
      const lower = content.toLowerCase();
      let replyText = '';
      
      // Step 1: Detect Name
      if (!this.state.customerName) {
        const nameMatch = content.match(/(?:my name is|i am|i'm|naam|name|call me)\s+([A-[a-zA-Z\s]+)/i) || [null, content.trim()];
        const extractedName = nameMatch[1]?.trim() || content.trim().split(' ')[0];
        if (extractedName && extractedName.length > 1 && !['hi', 'hello', 'assalam', 'hey', 'kaise'].includes(extractedName.toLowerCase())) {
          this.state.customerName = extractedName;
          replyText = `JazakAllah Khair, **${extractedName}**! Pleasure to connect with you. 😊\n\nWhich MFS Growth Agency service are you looking for today?\n1. **Presentation Design** (Executive & Academic decks)\n2. **Assignment Writing** (Custom academic assignments & papers)\n3. **ATS Resume & CV Engineering** (ATS-compliant CVs & Cover Letters)\n4. **Corporate Report Formatting** (Executive & business document formatting)`;
        } else {
          replyText = `Assalam-o-Alaikum! Welcome to **MFS Growth Agency**. 👋 I am your MFS AI Consultant.\n\nMay I please know your name so I can assist you with our services today?`;
        }
      } 
      // Step 2: Detect Service Selection
      else if (!this.state.serviceRequired) {
        if (lower.includes('presentation') || lower.includes('slide') || lower.includes('deck') || lower.includes('ppt') || lower.includes('1')) {
          this.state.serviceRequired = 'Presentation Design';
          const p = calculateServicePrice('presentation', 10, 'standard', this.state.currency);
          this.state.estimatedPrice = p.finalPrice;
          replyText = `Excellent choice! **Presentation Design** is one of our flagship services. 🎨\n\nPlease let me know your required **number of slides** or project details, and your preferred **deadline** (Standard, Express 24h, Priority 12h, or Same-Day).`;
        } else if (lower.includes('assignment') || lower.includes('paper') || lower.includes('essay') || lower.includes('thesis') || lower.includes('2')) {
          this.state.serviceRequired = 'Assignment Writing';
          const p = calculateServicePrice('assignment', 1000, 'standard', this.state.currency);
          this.state.estimatedPrice = p.finalPrice;
          replyText = `Understood! Our **Assignment Writing** service guarantees 100% original work with strict APA/Harvard/MLA references. 📚\n\nPlease mention your **word count** (or page count) and your **submission deadline**.`;
        } else if (lower.includes('resume') || lower.includes('cv') || lower.includes('cover') || lower.includes('job') || lower.includes('3')) {
          this.state.serviceRequired = 'ATS Resume & CV Engineering';
          const p = calculateServicePrice('ats-resume', 1, 'standard', this.state.currency);
          this.state.estimatedPrice = p.finalPrice;
          replyText = `Great! Our **ATS Resume & CV Engineering** ensures 95%+ ATS scanner compatibility to get you interviewed. 💼\n\nAre you applying for a specific role or field? Do you need a Cover Letter as well?`;
        } else if (lower.includes('report') || lower.includes('format') || lower.includes('document') || lower.includes('4')) {
          this.state.serviceRequired = 'Corporate Report Formatting';
          const p = calculateServicePrice('reports', 1000, 'standard', this.state.currency);
          this.state.estimatedPrice = p.finalPrice;
          replyText = `Got it! Our **Corporate Report Formatting** delivers executive-ready document design. 📊\n\nPlease mention your page count and preferred formatting style.`;
        } else {
          this.state.serviceRequired = 'Custom Growth Package';
          this.state.estimatedPrice = 1500;
          replyText = `Got it, **${this.state.customerName}**! We can tailor a custom package for you. Could you share a quick outline of your requirements and preferred deadline?`;
        }
      } 
      // Step 3: Quantity / Brief / Deadline
      else if (!this.state.quantity || !this.state.deadline) {
        this.state.projectBrief = content;
        this.state.quantity = content.match(/\d+\s*(?:slides|words|pages|deck)?/i)?.[0] || '1 Standard Unit';
        this.state.deadline = lower.includes('urgent') || lower.includes('same day') ? 'Same-Day Urgent (<12h)' : 'Standard (24-48h)';
        this.state.isComplete = true;

        const price = this.state.estimatedPrice || 1250;
        replyText = `Thank you **${this.state.customerName}**! Here is your official order summary:\n\n` +
          `📋 **Service**: ${this.state.serviceRequired}\n` +
          `📝 **Scope**: ${this.state.quantity}\n` +
          `⏱️ **Timeline**: ${this.state.deadline}\n` +
          `🏷️ **Grand Launch Offer**: **50% OFF Applied!**\n` +
          `💰 **Estimated Total**: **PKR ${price.toLocaleString()}** ($${Math.round(price / 280)} USD)\n\n` +
          `Your **official order brief** is now ready! 1-click action buttons ('Send to WhatsApp' with +923015323689 and 'Send via Email') are now displayed below with all details pre-filled.`;
      } 
      // General QA / Payment / Info
      else {
        if (lower.includes('easypaisa') || lower.includes('jazzcash') || lower.includes('bank') || lower.includes('payment') || lower.includes('pay')) {
          replyText = `💳 **Official MFS Growth Agency Payment Accounts**:\n` +
            `• **EasyPaisa**: 03116191234 (Title: Muhammad Shehroz Sultan)\n` +
            `• **JazzCash**: 03015323688 (Title: Muhammad Shehroz Sultan)\n` +
            `• **Askari Bank**: Account 00553230017265 (Title: Muhammad Shehroz Sultan)\n\n` +
            `After payment, simply upload your screenshot on our Payment Page or send it directly on WhatsApp (+92 301 5323689)!`;
        } else if (lower.includes('contact') || lower.includes('whatsapp') || lower.includes('number') || lower.includes('email')) {
          replyText = `📞 **MFS Growth Support Channels**:\n` +
            `• **WhatsApp**: +92 301 5323689 (24/7 Support)\n` +
            `• **Agency Email**: mfsmedia.agency@gmail.com\n\nHow can we help you further?`;
        } else {
          replyText = `Thank you for reaching out, **${this.state.customerName}**! 😊\n\nYour order details are pre-filled in the summary below. You can click 'Send to WhatsApp' (+923015323689) to confirm your order directly with our leadership team!`;
        }
      }

      return this.addMessage('assistant', replyText);
    }
  }

  private addMessage(role: MessageRole, content: string): ChatMessage {
    const msg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      role,
      content,
      timestamp: new Date()
    };
    this.messages.push(msg);
    return msg;
  }
}
