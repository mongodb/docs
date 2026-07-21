import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface ChatbotContextType {
  chatbotClicked: boolean;
  setChatbotClicked: (value: boolean | ((prev: boolean) => boolean)) => void;
  text: string;
  setText: (value: string | ((prev: string) => string)) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [chatbotClicked, setChatbotClicked] = useState(false);
  const [text, setText] = useState('');

  return (
    <ChatbotContext.Provider value={{ chatbotClicked, setChatbotClicked, text, setText }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbotModal = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbotModal must be used within a ChatbotProvider');
  }
  return context;
};
