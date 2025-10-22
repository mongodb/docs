import { css } from '@leafygreen-ui/emotion';
import { Disclaimer, Link } from '@leafygreen-ui/typography';
import { PoweredByAtlasVectorSearch, useChatbotContext, MongoDbLegalDisclosure } from 'mongodb-chatbot-ui';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

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

const disclaimerStyle = css`
  max-width: 650px;
  width: 100%;
  text-align: center;
`;

const linkStyle = css`
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
`;

function ChatViews() {
  const { awaitingReply } = useChatbotContext();

  const [firstSubmitted, setFirstSubmitted] = useState(false);

  useEffect(() => {
    if (!firstSubmitted && awaitingReply) setFirstSubmitted(true);
  }, [firstSubmitted, awaitingReply]);

  const viewProps = {
    initialMessageText: INITIAL_MESSAGE_TEXT,
    initialMessageSuggestedPrompts: SUGGESTED_PROMPTS,
    initialMessageReferences: INITIAL_MESSAGE_REFERENCES,
    disclaimer: (
      <>
        <MongoDbLegalDisclosure />
        <PoweredByAtlasVectorSearch
          className={css`
            margin-top: 8px;
          `}
          linkStyle="text"
        />
      </>
    ),
  };
  return !firstSubmitted ? (
    <div>
      <InputBarTrigger suggestedPrompts={SUGGESTED_PROMPTS}></InputBarTrigger>
      <Disclaimer className={disclaimerStyle}>
        This is a generative AI chatbot. By interacting with it, you agree to MongoDB&apos;s{' '}
        <Link
          href="https://www.mongodb.com/legal/terms-of-use?tck=mongodb_ai_chatbot"
          className={linkStyle}
          hideExternalIcon={true}
        >
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link
          href="https://www.mongodb.com/legal/acceptable-use-policy?tck=mongodb_ai_chatbot"
          className={linkStyle}
          hideExternalIcon={true}
        >
          Acceptable Use Policy
        </Link>
        . To learn more about how we use your data, please see our{' '}
        <Link
          href="https://www.mongodb.com/docs/ai-chatbot-data-usage/?tck=mongodb_ai_chatbot"
          className={linkStyle}
          hideExternalIcon={true}
        >
          Data Usage Policy
        </Link>
        .
      </Disclaimer>
    </div>
  ) : (
    <ChatWindow {...viewProps} />
  );
}

export default ChatViews;
