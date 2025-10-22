'use client';

import { H1 } from '@leafygreen-ui/typography';
import { css } from '@leafygreen-ui/emotion';
import dynamic from 'next/dynamic';
const ChatbotComponent = dynamic(() => import('./chatbot').then((m) => m), {
  ssr: false,
});

const assistantContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  min-height: 80vh;
  padding: 64px 32px;
  width: 100vw;
`;

export default function MongoDBAssistantPage() {
  return (
    <div className={assistantContainerStyle}>
      <H1>Ask MongoDB Assistant a Question</H1>
      <ChatbotComponent />
    </div>
  );
}
