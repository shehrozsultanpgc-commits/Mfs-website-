import React from 'react';
import { BrowserVoiceConcierge } from './BrowserVoiceConcierge';

interface AIVoiceAssistantProps {
  onClose: () => void;
  onSwitchToChat?: () => void;
}

export type VoiceOption = 'Puck' | 'Aoede' | 'Adam' | 'Rachel';

export const AIVoiceAssistant: React.FC<AIVoiceAssistantProps> = ({ onClose, onSwitchToChat }) => {
  return <BrowserVoiceConcierge onClose={onClose} onSwitchToChat={onSwitchToChat} />;
};
