'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

export interface Conversation {
  id?: string;
  title?: string;
}

interface ConversationContextType {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  createNewChat: boolean;
  changedConversation: string | null;
  firstSubmitted: boolean;
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: (conversation: Conversation | null) => void;
  setCreateNewChat: (create: boolean) => void;
  setChangedConversation: (changed: string | null) => void;
  setFirstSubmitted: (submitted: boolean) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

interface ConversationProviderProps {
  children: ReactNode;
}

export const ConversationProvider: React.FC<ConversationProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1', // temp id for first conversation
      title: 'Conversation 1',
    },
  ]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(conversations[0]);
  const [changedConversation, setChangedConversation] = useState<string | null>(null);
  const [createNewChat, setCreateNewChat] = useState(false);
  const [firstSubmitted, setFirstSubmitted] = useState(false);

  const value: ConversationContextType = {
    conversations,
    activeConversation,
    createNewChat,
    setConversations,
    setActiveConversation,
    setCreateNewChat,
    changedConversation,
    setChangedConversation,
    firstSubmitted,
    setFirstSubmitted,
  };

  return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
};

export const useConversationContext = (): ConversationContextType => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversationContext must be used within a ConversationProvider');
  }
  return context;
};
