'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { css } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import { useChatbotContext } from 'mongodb-chatbot-ui';
import { useConversationContext } from '../../contexts/ConversationContext';

const InputBarTrigger = dynamic(() => import('mongodb-chatbot-ui').then((m) => m.InputBarTrigger), { ssr: false });
const ChatWindow = dynamic(() => import('mongodb-chatbot-ui').then((m) => m.ChatWindow), { ssr: false });

const SUGGESTED_PROMPTS = [
  'How do you deploy a free cluster in Atlas?',
  'How do I register for Atlas?',
  'How do I get started with MongoDB?',
  'Why should I use Atlas Search?',
];

const INITIAL_MESSAGE_TEXT = "Hi! I'm the MongoDB Assistant. What can I help you with today?";

const INITIAL_MESSAGE_REFERENCES = [
  {
    url: 'https://docs.mongodb.com/',
    title: 'MongoDB Documentation',
    metadata: {
      sourceType: 'Docs',
    },
  },
  {
    url: 'https://university.mongodb.com/',
    title: 'MongoDB University',
    metadata: {
      sourceType: 'Learn',
    },
  },
  {
    url: 'https://developer.mongodb.com/',
    title: 'MongoDB Developer Hub',
    metadata: {
      sourceType: 'Article',
    },
  },
];

const firstLoadContainerStyle = css`
  padding: 10px 32px;
  max-width: 830px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;

  @media ${theme.screenSize.upToSmall} {
    padding-left: 80px;
  }
`;

const chatWindowStyle = css`
  [class*='chat-message-feed'] {
    height: calc(100vh - 127px - 95px - 56px) !important;
  }

  [class*='chat-message-feed'] > div {
    overflow-y: auto !important;
  }

  textarea {
    overflow-y: auto !important;
    max-height: 100px !important;
  }

  @media ${theme.screenSize.upToSmall} {
    padding-left: 40px;
  }

  @media ${theme.screenSize.largeAndUp} {
    padding-left: 15%;
    padding-right: 15%;
  }
`;

const inputBarTriggerStyle = css`
  form > div {
    padding: 5px;
  }

  textarea {
    overflow-y: auto !important;
    max-height: 100px !important;
  }
`;

function ChatViews() {
  const { awaitingReply } = useChatbotContext();
  const { firstSubmitted, setFirstSubmitted } = useConversationContext();

  useEffect(() => {
    if (!firstSubmitted && awaitingReply) setFirstSubmitted(true);
  }, [firstSubmitted, awaitingReply, setFirstSubmitted]);

  const viewProps = {
    initialMessageText: INITIAL_MESSAGE_TEXT,
    initialMessageSuggestedPrompts: SUGGESTED_PROMPTS,
    initialMessageReferences: INITIAL_MESSAGE_REFERENCES,
  };
  return !firstSubmitted ? (
    <div className={firstLoadContainerStyle}>
      <InputBarTrigger suggestedPrompts={SUGGESTED_PROMPTS} className={inputBarTriggerStyle}></InputBarTrigger>
    </div>
  ) : (
    <div className={chatWindowStyle}>
      <ChatWindow {...viewProps} />
    </div>
  );
}

export default ChatViews;
