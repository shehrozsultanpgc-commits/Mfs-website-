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
    currency: 'PKR',
    estimatedPrice: null,
    isComplete: false,
  };

  private messages: ChatMessage[] = [];

  constructor(initialCurrency: 'PKR' | 'USD' = 'PKR') {
    this.state.currency = initialCurrency;
    this.addMessage(
      'assistant',
      "Assalam-o-Alaikum! Welcome to **MFS Growth Agency**. 👋 I am your MFS AI Concierge.\n\nHow can I assist you with our services today? Feel free to ask about **Presentation Design**, **Assignment Writing**, **ATS Resumes**, **Report Formatting**, or our active **50% Grand Launch Offer**!"
    );
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
      const history = this.messages.slice(0, -1);

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history,
          message: content,
          currentState: this.state,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server API status: ${response.status}`);
      }

      const data = await response.json();

      if (data.extractedState) {
        this.state = {
          ...this.state,
          ...data.extractedState,
        };
      }

      const reply = data.reply || "Assalam-o-Alaikum! Welcome to MFS Growth Agency. 👋 How can I assist you today?";
      return this.addMessage('assistant', reply);
    } catch (error) {
      console.warn('Backend /api/ai/chat unavailable, using intelligent local engine fallback:', error);

      // Intelligent Local Context & Language Engine
      const replyText = this.generateLocalFallback(content);
      return this.addMessage('assistant', replyText);
    }
  }

  /**
   * Smart Local Engine for Offline / Network Fallback
   */
  private generateLocalFallback(content: string): string {
    const lower = content.toLowerCase().trim();

    // 1. Strict Security & Guardrails
    if (
      lower.includes('system prompt') ||
      lower.includes('ignore previous') ||
      lower.includes('api key') ||
      lower.includes('secret') ||
      lower.includes('env') ||
      lower.includes('shehrozsultanpgc')
    ) {
      return "Main **MFS Growth Agency** ka AI Concierge hoon! 😊\n\nMeri speciality aap ko humari services (**Presentation Design**, **Assignment Writing**, **ATS Resumes**, **Report Formatting**) aur pricing ke baare mein guide karna hai. Aap aaj kis project mein madad chahte hain?";
    }

    // 2. Name Extraction (If explicitly stated)
    const nameMatch = content.match(/(?:my name is|i am|i'm|naam|name|call me)\s+([A-Za-z\s]+)/i);
    if (nameMatch && nameMatch[1]) {
      const extractedName = nameMatch[1].trim().split(' ')[0];
      if (extractedName && extractedName.length > 1 && !['hi', 'hello', 'assalam', 'hey', 'kaise'].includes(extractedName.toLowerCase())) {
        this.state.customerName = extractedName;
      }
    }

    // 3. Greetings & Casual Small Talk
    if (
      lower.includes('kya haal') ||
      lower.includes('kaise ho') ||
      lower.includes('kese ho') ||
      lower.includes('kaise hain') ||
      lower.includes('assalam') ||
      lower.includes('hello') ||
      lower.includes('hi') ||
      lower.includes('hey') ||
      lower.includes('wassup')
    ) {
      const nameGreeting = this.state.customerName ? ` **${this.state.customerName}**` : '';
      return `Walaikum Assalam${nameGreeting}! Main bilkul theek hoon, aap bataayein kaise hain? 😊\n\nWelcome to **MFS Growth Agency**! Main aap ki kis service mein madad kar sakta hoon?\n• 📊 **Presentation Design** (Executive & Academic Slides)\n• ✍️ **Assignment Writing** (APA / Harvard / MLA References)\n• 👔 **ATS Resume & CV Engineering** (95%+ ATS Compatibility)\n• 📄 **Corporate Report Formatting**\n\n🎉 Abhi humara **50% Grand Launch Offer** active hai!`;
    }

    // 4. Rates & Pricing Queries
    if (lower.includes('rate') || lower.includes('price') || lower.includes('kitne') || lower.includes('cost') || lower.includes('charge') || lower.includes('discount')) {
      return `🏷️ **MFS Growth Agency - Grand Launch Rates (50% OFF Applied)**:\n\n` +
        `• 📊 **Presentation Design**: PKR 1,250 ($7.50 USD) / 10 slides *(Was PKR 2,500)*\n` +
        `• ✍️ **Assignment Writing**: PKR 1,000 ($7.50 USD) / 1,000 words *(Was PKR 2,000)*\n` +
        `• 👔 **Resume Writing**: PKR 1,250 ($10.00 USD) / Resume *(Was PKR 2,500)*\n` +
        `• ⚡ **ATS Resume Engineering**: PKR 1,500 ($12.00 USD) / ATS Standard *(Was PKR 3,000)*\n` +
        `• 📄 **Report Formatting**: PKR 1,000 ($7.50 USD) / 1,000 words\n\n` +
        `Aap kis service ke baare mein mazeed details chahte hain?`;
    }

    // 5. Presentation Inquiry
    if (lower.includes('presentation') || lower.includes('slide') || lower.includes('deck') || lower.includes('ppt')) {
      this.state.serviceRequired = 'Presentation Design';
      const p = calculateServicePrice('presentation', 10, 'standard', this.state.currency);
      this.state.estimatedPrice = p.finalPrice;
      return `Zabardast! **Presentation Design** humari top-rated service hai. 🎨\n\nHum executive pitch decks aur academic presentations custom layouts, typography, aur charts ke saath create karte hain.\n\n• **Price**: PKR ${p.finalPrice.toLocaleString()} per 10 slides (50% OFF Applied!)\n• **Delivery**: Standard (24-48h) or Express (<24h)\n\nAap ki presentation mein kitni slides required hain?`;
    }

    // 6. Assignment Inquiry
    if (lower.includes('assignment') || lower.includes('paper') || lower.includes('essay') || lower.includes('thesis') || lower.includes('dissertation')) {
      this.state.serviceRequired = 'Assignment Writing';
      const p = calculateServicePrice('assignment', 1000, 'standard', this.state.currency);
      this.state.estimatedPrice = p.finalPrice;
      return `Understood! Our **Assignment Writing** service guarantees 100% original research with strict APA/Harvard/MLA referencing and Turnitin check. 📚\n\n• **Price**: PKR ${p.finalPrice.toLocaleString()} per 1,000 words (50% OFF Applied!)\n\nAap ka assignment topic aur word count/deadline kya hai?`;
    }

    // 7. Resume & CV Inquiry
    if (lower.includes('resume') || lower.includes('cv') || lower.includes('cover') || lower.includes('job') || lower.includes('ats')) {
      this.state.serviceRequired = 'ATS Resume & CV Engineering';
      const p = calculateServicePrice('ats-resume', 1, 'standard', this.state.currency);
      this.state.estimatedPrice = p.finalPrice;
      return `Awesome! Our **ATS Resume & CV Engineering** ensures 95%+ ATS scanner compatibility to get you hired faster. 💼\n\n• **Professional Resume**: PKR 1,250\n• **ATS Engineered Resume**: PKR 1,500\n\nAap kis position ya industry ke liye apply kar rahe hain?`;
    }

    // 8. Report Formatting
    if (lower.includes('report') || lower.includes('format') || lower.includes('document')) {
      this.state.serviceRequired = 'Corporate Report Formatting';
      const p = calculateServicePrice('reports', 1000, 'standard', this.state.currency);
      this.state.estimatedPrice = p.finalPrice;
      return `Got it! Our **Corporate Report Formatting** delivers executive-ready document design. 📊\n\n• **Price**: PKR ${p.finalPrice.toLocaleString()} per 1,000 words\n\nAap ke report ke kitne pages ya words hain?`;
    }

    // 9. Payment Methods
    if (lower.includes('easypaisa') || lower.includes('jazzcash') || lower.includes('bank') || lower.includes('payment') || lower.includes('pay')) {
      return `💳 **Official MFS Growth Agency Payment Accounts**:\n\n` +
        `• **EasyPaisa**: \`03116191234\` (Title: Muhammad Shehroz Sultan)\n` +
        `• **JazzCash**: \`03015323688\` (Title: Muhammad Shehroz Sultan)\n` +
        `• **Askari Bank**: Account \`00553230017265\` (Title: Muhammad Shehroz Sultan)\n\n` +
        `Payment ke baad aap screenshot upload kar sakte hain ya humein WhatsApp (\`+92 301 5323689\`) par send kar sakte hain!`;
    }

    // 10. Contact & Support
    if (lower.includes('contact') || lower.includes('whatsapp') || lower.includes('number') || lower.includes('email') || lower.includes('phone')) {
      return `📞 **MFS Growth Agency Support Channels**:\n\n` +
        `• **WhatsApp**: **+92 301 5323689** (24/7 Support)\n` +
        `• **Agency Email**: **mfsmedia.agency@gmail.com**\n` +
        `• **Official Website**: **https://mfsgrowth.online/**\n\nHow can we help you further today?`;
    }

    // 11. Our Work / Samples
    if (lower.includes('sample') || lower.includes('work') || lower.includes('portfolio') || lower.includes('example')) {
      return `Aap humare past showcase projects **'Our Work'** section mein explore kar sakte hain! 🌟\n\nHum ne Presentations, Resumes, aur Assignments ke high-resolution secured previews display kiye hue hain. Aap kis service ke samples dekhna chahte hain?`;
    }

    // 12. General Completion / Discussion
    if (this.state.serviceRequired && !this.state.isComplete) {
      this.state.projectBrief = content;
      this.state.quantity = content.match(/\d+\s*(?:slides|words|pages|deck)?/i)?.[0] || '1 Standard Unit';
      this.state.deadline = lower.includes('urgent') || lower.includes('same day') ? 'Same-Day Urgent (<12h)' : 'Standard (24-48h)';
      this.state.isComplete = true;

      const price = this.state.estimatedPrice || 1250;
      const clientName = this.state.customerName || 'Valued Client';
      return `Thank you **${clientName}**! Here is your project brief summary:\n\n` +
        `📋 **Service**: ${this.state.serviceRequired}\n` +
        `📝 **Scope**: ${this.state.quantity}\n` +
        `⏱️ **Timeline**: ${this.state.deadline}\n` +
        `🏷️ **Grand Launch Offer**: **50% OFF Applied!**\n` +
        `💰 **Estimated Price**: **PKR ${price.toLocaleString()}**\n\n` +
        `Your **official order brief** is now ready! You can click 'Send to WhatsApp' (+923015323689) or 'Send via Email' below to finalize your order with our team.`;
    }

    // Default Friendly Response
    const userDisplayName = this.state.customerName ? ` **${this.state.customerName}**` : '';
    return `Shukriya${userDisplayName}! 😊 Welcome to **MFS Growth Agency**.\n\nAap humari kis service ke baare mein inquiry karna chahte hain? (Presentation Design, Assignment Writing, ATS Resume Writing, Corporate Reports)\n\nAap WhatsApp par direct support team se bhi connect ho sakte hain: **+92 301 5323689**!`;
  }

  private addMessage(role: MessageRole, content: string): ChatMessage {
    const msg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      role,
      content,
      timestamp: new Date(),
    };
    this.messages.push(msg);
    return msg;
  }
}

