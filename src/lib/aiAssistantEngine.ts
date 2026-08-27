import { SERVICES, calculateServicePrice } from '../data/content';

export interface OrderState {
  customerName: string | null;
  serviceRequired: string | null;
  projectBrief: string | null;
  deadline: string | null;
  quantity: string | null;
  turnaroundSpeed?: string | null;
  basePrice?: string | number | null;
  rushFee?: string | number | null;
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
      "Assalam-o-Alaikum! Welcome to **MFS Growth Agency**. 👋 Main MFS Growth ka Senior Project Consultant hoon.\n\nBatayein sir, aaj kis project mein aap ki madad karoon? (Presentation Design, Assignment Writing, ATS Resume, ya Report Formatting) — Abhi humara **50% Grand Launch Discount** active hai!"
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
      return "Main **MFS Growth Agency** ka Senior Project Consultant hoon! 😊\n\nMeri speciality aap ko humari services (**Presentation Design**, **Assignment Writing**, **ATS Resumes**, **Report Formatting**) aur pricing ke baare mein guide karna hai. Aap aaj kis project mein madad chahte hain?";
    }

    // 2. Name Extraction & Graceful Skip
    if (!this.state.customerName) {
      if (
        lower === 'skip' ||
        lower.includes('no name') ||
        lower.includes('just tell me') ||
        lower.includes('direct order') ||
        lower.includes('no need') ||
        lower.includes('don\'t want') ||
        lower.includes('pass')
      ) {
        this.state.customerName = 'Valued Client';
      } else {
        const nameMatch = content.match(/(?:my name is|i am|i'm|naam|name|call me)\s+([A-Za-z\s]+)/i);
        if (nameMatch && nameMatch[1]) {
          const extractedName = nameMatch[1].trim().split(' ')[0];
          if (extractedName && extractedName.length > 1 && !['hi', 'hello', 'assalam', 'hey', 'kaise', 'skip', 'presentation', 'assignment', 'resume', 'rate', 'price'].includes(extractedName.toLowerCase())) {
            this.state.customerName = extractedName;
          }
        }
      }
    }

    // 3. Greetings & Casual Small Talk
    if (lower === 'hello' || lower === 'hi' || lower === 'hey' || lower === 'salam' || lower === 'assalam o alaikum' || lower === 'assalam-o-alaikum' || lower === 'aoa') {
      const nameGreeting = this.state.customerName && this.state.customerName !== 'Valued Client' ? ` **${this.state.customerName}**` : ' sir';
      return `Assalam-o-Alaikum${nameGreeting}! Welcome to **MFS Growth Agency**. 👋 Main aap ka Senior Project Consultant hoon.\n\nBatayein, aaj kis project pe kaam karwana hai? Presentation slides, Assignment research, ya ATS Resume? (Abhi **50% Grand Launch Discount** active hai!)`;
    }

    if (
      lower.includes('kya haal') ||
      lower.includes('kaise ho') ||
      lower.includes('kese ho') ||
      lower.includes('kaise hain') ||
      lower.includes('theek ho') ||
      lower.includes('how are you')
    ) {
      return `Shuker Alhamdulillah, main bilkul theek hoon! Aap sunayein sir, aap kaise hain? 😊\n\nKis service ke silsile mein rabta kiya hai? Presentation, Assignment, ya CV writing?`;
    }

    // 4. Rates & Pricing Queries
    if (lower.includes('rate') || lower.includes('price') || lower.includes('kitne') || lower.includes('cost') || lower.includes('charge') || lower.includes('discount')) {
      return `Sir, abhi humara **50% Grand Launch Discount** chal raha hai! Rates bohot affordable hain:\n\n` +
        `• 📊 **Presentation Design**: Sirf PKR 1,250 ($7.50 USD) / 10 slides *(Was PKR 2,500)*\n` +
        `• ✍️ **Assignment Writing**: Sirf PKR 1,000 ($7.50 USD) / 1,000 words *(Was PKR 2,000)*\n` +
        `• 👔 **Resume Writing**: Sirf PKR 1,250 ($10.00 USD) / Resume *(Was PKR 2,500)*\n` +
        `• ⚡ **ATS Resume Engineering**: Sirf PKR 1,500 ($12.00 USD) / ATS Standard *(Was PKR 3,000)*\n` +
        `• 📄 **Report Formatting**: Sirf PKR 1,000 ($7.50 USD) / 1,000 words\n\n` +
        `Aap batayein, aap ko kis service ka estimate calculate kar ke doon?`;
    }

    // 5. Presentation Inquiry
    if (lower.includes('presentation') || lower.includes('slide') || lower.includes('deck') || lower.includes('ppt')) {
      this.state.serviceRequired = 'Presentation Design';
      const qtyMatch = content.match(/(\d+)\s*(?:slides|slide|decks|deck)?/i);
      const slides = qtyMatch ? parseInt(qtyMatch[1], 10) : 10;
      this.state.quantity = `${slides} Slides`;

      const isUrgent = lower.includes('1-hour') || lower.includes('urgent') || lower.includes('1 hour') || lower.includes('express') || lower.includes('same day');
      const speedKey = isUrgent ? 'sameday' : 'standard';
      const p = calculateServicePrice('presentation', slides, speedKey, this.state.currency);

      this.state.turnaroundSpeed = isUrgent ? '1-Hour Urgent Express (+75% Rush)' : 'Standard Delivery (24-48h)';
      this.state.deadline = isUrgent ? '1-Hour Express (<2h)' : '24-48 Hours';
      this.state.basePrice = `${this.state.currency} ${p.basePromoPrice.toLocaleString()}`;
      this.state.rushFee = p.rushFee > 0 ? `${this.state.currency} ${p.rushFee.toLocaleString()}` : `${this.state.currency} 0 (Standard)`;
      this.state.estimatedPrice = p.finalPrice;

      return `Zabardast! **Presentation Design** humari top-rated service hai. 🎨\n\n` +
        `• **Scope**: ${this.state.quantity}\n` +
        `• **Base Price**: ${this.state.basePrice} (50% OFF Applied!)\n` +
        `• **Speed**: ${this.state.turnaroundSpeed}\n` +
        `• **Total Price**: **${this.state.currency} ${p.finalPrice.toLocaleString()}**\n\n` +
        `Would you like Standard delivery (24-48 Hours) or 1-Hour Urgent Express delivery?`;
    }

    // 6. Assignment Inquiry
    if (lower.includes('assignment') || lower.includes('paper') || lower.includes('essay') || lower.includes('thesis') || lower.includes('dissertation')) {
      this.state.serviceRequired = 'Assignment Writing';
      const qtyMatch = content.match(/(\d+)\s*(?:words|word|pages|page)?/i);
      const words = qtyMatch ? parseInt(qtyMatch[1], 10) : 1000;
      this.state.quantity = `${words.toLocaleString()} Words`;

      const isUrgent = lower.includes('1-hour') || lower.includes('urgent') || lower.includes('1 hour') || lower.includes('express') || lower.includes('same day');
      const speedKey = isUrgent ? 'sameday' : 'standard';
      const p = calculateServicePrice('assignment', words, speedKey, this.state.currency);

      this.state.turnaroundSpeed = isUrgent ? '1-Hour Urgent Express (+75% Rush)' : 'Standard Delivery (24-48h)';
      this.state.deadline = isUrgent ? '1-Hour Express (<2h)' : '24-48 Hours';
      this.state.basePrice = `${this.state.currency} ${p.basePromoPrice.toLocaleString()}`;
      this.state.rushFee = p.rushFee > 0 ? `${this.state.currency} ${p.rushFee.toLocaleString()}` : `${this.state.currency} 0 (Standard)`;
      this.state.estimatedPrice = p.finalPrice;

      return `Understood! Our **Assignment Writing** guarantees 100% original research with strict APA/Harvard/MLA referencing and Turnitin check. 📚\n\n` +
        `• **Scope**: ${this.state.quantity}\n` +
        `• **Base Price**: ${this.state.basePrice} (50% OFF Applied!)\n` +
        `• **Speed**: ${this.state.turnaroundSpeed}\n` +
        `• **Total Price**: **${this.state.currency} ${p.finalPrice.toLocaleString()}**\n\n` +
        `What is your exact topic and required deadline?`;
    }

    // 7. Resume & CV Inquiry
    if (lower.includes('resume') || lower.includes('cv') || lower.includes('cover') || lower.includes('job') || lower.includes('ats')) {
      this.state.serviceRequired = 'ATS Resume & CV Engineering';
      this.state.quantity = '1 ATS Engineered Resume';

      const isUrgent = lower.includes('1-hour') || lower.includes('urgent') || lower.includes('1 hour') || lower.includes('express') || lower.includes('same day');
      const speedKey = isUrgent ? 'sameday' : 'standard';
      const p = calculateServicePrice('ats-resume', 1, speedKey, this.state.currency);

      this.state.turnaroundSpeed = isUrgent ? '1-Hour Urgent Express (+75% Rush)' : 'Standard Delivery (24h)';
      this.state.deadline = isUrgent ? '1-Hour Express (<2h)' : '24 Hours';
      this.state.basePrice = `${this.state.currency} ${p.basePromoPrice.toLocaleString()}`;
      this.state.rushFee = p.rushFee > 0 ? `${this.state.currency} ${p.rushFee.toLocaleString()}` : `${this.state.currency} 0 (Standard)`;
      this.state.estimatedPrice = p.finalPrice;

      return `Awesome! Our **ATS Resume & CV Engineering** ensures 95%+ ATS scanner compatibility to land interviews faster. 💼\n\n` +
        `• **Scope**: ${this.state.quantity}\n` +
        `• **Base Price**: ${this.state.basePrice} (50% OFF Applied!)\n` +
        `• **Speed**: ${this.state.turnaroundSpeed}\n` +
        `• **Total Price**: **${this.state.currency} ${p.finalPrice.toLocaleString()}**\n\n` +
        `What target job role or industry are you applying for?`;
    }

    // 8. Report Formatting
    if (lower.includes('report') || lower.includes('format') || lower.includes('document')) {
      this.state.serviceRequired = 'Corporate Report Formatting';
      const qtyMatch = content.match(/(\d+)\s*(?:words|word|pages|page)?/i);
      const words = qtyMatch ? parseInt(qtyMatch[1], 10) : 1000;
      this.state.quantity = `${words.toLocaleString()} Words`;

      const isUrgent = lower.includes('1-hour') || lower.includes('urgent') || lower.includes('1 hour') || lower.includes('express') || lower.includes('same day');
      const speedKey = isUrgent ? 'sameday' : 'standard';
      const p = calculateServicePrice('reports', words, speedKey, this.state.currency);

      this.state.turnaroundSpeed = isUrgent ? '1-Hour Urgent Express (+75% Rush)' : 'Standard Delivery (2-3 Days)';
      this.state.deadline = isUrgent ? '1-Hour Express (<2h)' : '2-3 Days';
      this.state.basePrice = `${this.state.currency} ${p.basePromoPrice.toLocaleString()}`;
      this.state.rushFee = p.rushFee > 0 ? `${this.state.currency} ${p.rushFee.toLocaleString()}` : `${this.state.currency} 0 (Standard)`;
      this.state.estimatedPrice = p.finalPrice;

      return `Got it! Our **Corporate Report Formatting** delivers executive-ready document design. 📊\n\n` +
        `• **Scope**: ${this.state.quantity}\n` +
        `• **Base Price**: ${this.state.basePrice} (50% OFF Applied!)\n` +
        `• **Speed**: ${this.state.turnaroundSpeed}\n` +
        `• **Total Price**: **${this.state.currency} ${p.finalPrice.toLocaleString()}**\n\n` +
        `Would you like to proceed with this order brief?`;
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

    // 10.1 Official Social Media & Founder Profile (LinkedIn, Instagram, Facebook)
    if (lower.includes('linkedin') || lower.includes('social') || lower.includes('instagram') || lower.includes('facebook') || lower.includes('shehroz') || lower.includes('founder') || lower.includes('owner')) {
      return `🌐 **Official MFS Growth Agency & Founder Social Channels**:\n\n` +
        `• **Founder Official LinkedIn (Muhammad Shehroz Sultan)**: https://www.linkedin.com/in/muhammad-shehroz-sultan-1237543a9\n` +
        `• **Official Instagram**: https://www.instagram.com/mfsgrowth?igsh=M2JwbWJ5M2txc2Z1 (@mfsgrowth)\n` +
        `• **Official Facebook**: https://www.facebook.com/share/1G4CCwakiW/\n` +
        `• **Official WhatsApp**: +92 301 5323689\n\n` +
        `Muhammad Shehroz Sultan is the Founder & Executive Director of MFS Growth Agency. Any official inquiry can be directed through these verified channels!`;
    }

    // 11. Our Work / Samples
    if (lower.includes('sample') || lower.includes('work') || lower.includes('portfolio') || lower.includes('example')) {
      return `Aap humare past showcase projects **'Our Work'** section mein explore kar sakte hain! 🌟\n\nHum ne Presentations, Resumes, aur Assignments ke high-resolution secured previews display kiye hue hain. Aap kis service ke samples dekhna chahte hain?`;
    }

    // 12. General Completion / Discussion
    if (this.state.serviceRequired && !this.state.isComplete) {
      this.state.projectBrief = content;
      if (!this.state.quantity) {
        this.state.quantity = content.match(/\d+\s*(?:slides|words|pages|deck)?/i)?.[0] || 'Scope as discussed';
      }
      this.state.isComplete = true;

      const price = this.state.estimatedPrice || 1250;
      const clientName = this.state.customerName || 'Valued Client';
      const speed = this.state.turnaroundSpeed || 'Standard Delivery (24-48h)';
      const base = this.state.basePrice || `${this.state.currency} ${price.toLocaleString()}`;
      const rush = this.state.rushFee || `${this.state.currency} 0 (Standard)`;

      return `Thank you **${clientName}**! Here is your itemized project brief summary:\n\n` +
        `📋 **Service**: ${this.state.serviceRequired}\n` +
        `📝 **Scope / Quantity**: ${this.state.quantity}\n` +
        `⏱️ **Turnaround Speed**: ${speed}\n` +
        `💵 **Base Price (50% OFF)**: ${base}\n` +
        `⚡ **Rush Fee**: ${rush}\n` +
        `💰 **Total Amount**: **${this.state.currency} ${price.toLocaleString()}**\n\n` +
        `Your **official order brief & receipt** is now generated below! Click **Send to WhatsApp** (+923015323689), **Send via Email**, or **Download Receipt** to finalize your order.`;
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

