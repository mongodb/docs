'use client';
import { getSegmentIdHeaders } from 'mongodb-chatbot-ui';
import { InMemoryConversationCache } from 'mongodb-chatbot-ui';
import LeafyGreenProvider, { useDarkModeContext } from '@leafygreen-ui/leafygreen-provider';

import dynamic from 'next/dynamic';
import ChatViews from './chat-views';
import ConversationCacheInfo from './conversation-cache';
import type { Environments } from '@/utils/env-config';

const Chatbot = dynamic(() => import('mongodb-chatbot-ui'), { ssr: false });
const cache = new InMemoryConversationCache();

const env = process.env.NEXT_PUBLIC_ENV as Environments;

const CHATBOT_SERVER_BASE_URL = ['dotcomprd', 'production'].includes(env)
  ? 'https://knowledge.mongodb.com/api/v1'
  : 'https://knowledge-dev.mongodb.com/api/v1';

function ChatbotComponent() {
  const { contextDarkMode: darkMode = false } = useDarkModeContext();

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <Chatbot
        name="MongoDB Assistant"
        serverBaseUrl={CHATBOT_SERVER_BASE_URL}
        darkMode={darkMode}
        fetchOptions={() => ({
          credentials: 'include',
          headers: getSegmentIdHeaders(),
        })}
        cache={cache}
      >
        <ChatViews />
        <ConversationCacheInfo />
      </Chatbot>
    </LeafyGreenProvider>
  );
}

export default ChatbotComponent;
