'use client';

import { useEffect } from 'react';
import { useChatbotContext, ModalView, mongoDbVerifyInformationMessage } from 'mongodb-chatbot-ui';
import { useChatbotModal } from '@/context/chatbot-context';

const defaultSuggestedPrompts = [
  'Get started with MongoDB',
  'How do I register for Atlas?',
  'How do you deploy a free cluster in Atlas?',
  'Why should I use Atlas Search?',
];

const ChatbotModal = () => {
  const { openChat, setInputText } = useChatbotContext();
  const { text, setText, chatbotClicked, setChatbotClicked } = useChatbotModal();
  useEffect(() => {
    if (chatbotClicked) {
      setInputText(text);
      openChat();
      setChatbotClicked(false);
      setText('');
    }
  }, [chatbotClicked, openChat, setChatbotClicked, setText, text, setInputText]);

  return (
    <ModalView
      inputBottomText={mongoDbVerifyInformationMessage}
      initialMessageText={'Welcome to MongoDB AI'}
      initialMessageSuggestedPrompts={defaultSuggestedPrompts}
    />
  );
};

export default ChatbotModal;
