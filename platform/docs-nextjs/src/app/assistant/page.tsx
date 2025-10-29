'use client';

import { H1, Body } from '@leafygreen-ui/typography';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import AssistantSideNav from './components/SideNav';
import { theme } from '@/styles/theme';
import { ConversationProvider, useConversationContext } from './contexts/ConversationContext';
import DarkModeDropdown from '@/components/action-bar/dark-mode-dropdown';
import dynamic from 'next/dynamic';
const ChatbotComponent = dynamic(() => import('./chatbot').then((m) => m), {
  ssr: false,
});

const assistantLayoutStyle = css`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 80vh;
  grid-column: 1 / -1; /* Span across all columns of parent grid */

  @media ${theme.screenSize.upToSmall} {
    display: grid;
    grid-template-columns: 1fr; /* One column */
    grid-template-rows: 1fr;
  }
`;

const headerBarStyle = css`
  border-bottom: 1px solid ${palette.gray.light2};
  padding: 13.5px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

const dropdownPositionStyle = css`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
`;

const mainContentAreaStyle = css`
  z-index: 1;

  @media ${theme.screenSize.upToSmall} {
    position: absolute;
    max-height: 80vh;
    overflow-y: scroll;
    padding: 0px;
  }
`;

const assistantContentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 16px;
  padding: 64px 32px;
`;

const chatbotContainerStyle = css`
  padding: 10px 50px;

  div > {
    max-height: 90vh;
  }
`;

function MongoDBAssistantPageContent() {
  const { activeConversation } = useConversationContext();

  return (
    <div className={assistantLayoutStyle}>
      <AssistantSideNav />
      <div className={mainContentAreaStyle}>
        <header className={headerBarStyle}>
          <Body weight="semiBold">{activeConversation?.title || 'Conversation 1'}</Body>
          <div className={dropdownPositionStyle}>
            <DarkModeDropdown />
          </div>
        </header>
        <div className={assistantContentStyle}>
          <H1>Ask MongoDB Assistant a Question</H1>
        </div>
        <div className={chatbotContainerStyle}>
          <ChatbotComponent />
        </div>
      </div>
    </div>
  );
}

export default function MongoDBAssistantPage() {
  return (
    <ConversationProvider>
      <MongoDBAssistantPageContent />
    </ConversationProvider>
  );
}
