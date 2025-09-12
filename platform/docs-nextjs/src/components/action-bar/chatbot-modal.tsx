'use client';

import React, { useEffect } from 'react';
import {
  useChatbotContext,
  ModalView,
  MongoDbLegalDisclosure,
  mongoDbVerifyInformationMessage,
  PoweredByAtlasVectorSearch,
} from 'mongodb-chatbot-ui';
import { css } from '@leafygreen-ui/emotion';

const defaultSuggestedPrompts = [
  'Get started with MongoDB',
  'How do I register for Atlas?',
  'How do you deploy a free cluster in Atlas?',
  'Why should I use Atlas Search?',
];

interface ChatbotModalProps {
  chatbotClicked: boolean;
  setChatbotClicked: (chatbotClicked: boolean) => void;
}

const ChatbotModal = ({ chatbotClicked, setChatbotClicked }: ChatbotModalProps) => {
  const { openChat } = useChatbotContext();
  useEffect(() => {
    if (chatbotClicked) {
      openChat();
      setChatbotClicked(false);
    }
  }, [chatbotClicked, openChat, setChatbotClicked]);

  return (
    <ModalView
      inputBottomText={mongoDbVerifyInformationMessage}
      disclaimer={
        <>
          <MongoDbLegalDisclosure />
          <PoweredByAtlasVectorSearch
            linkStyle="text"
            className={css`
              margin-top: 8px;
            `}
          />
        </>
      }
      initialMessageText={'Welcome to MongoDB AI'}
      initialMessageSuggestedPrompts={defaultSuggestedPrompts}
    />
  );
};

export default ChatbotModal;
