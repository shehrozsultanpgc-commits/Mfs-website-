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
        throw new Error('Network response was not ok');
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
      console.error('Error in AI Engine:', error);
      return this.addMessage('assistant', "I apologize, but I am experiencing some technical difficulties connecting to my brain. Please contact our support team at mfsmedia.agency@gmail.com.");
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
