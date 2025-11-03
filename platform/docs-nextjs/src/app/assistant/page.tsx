'use client';

import { H2, Body } from '@leafygreen-ui/typography';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import { ConversationProvider, useConversationContext } from './contexts/ConversationContext';
import DarkModeDropdown from '@/components/action-bar/dark-mode-dropdown';
import dynamic from 'next/dynamic';
import AssistantDisclaimer from './components/ChatbotDisclaimer';
import AssistantSideNav from './components/SideNav';
const ChatbotComponent = dynamic(() => import('./components/Chatbot/chatbot').then((m) => m), {
  ssr: false,
});

const assistantLayoutStyle = css`
  display: grid;
  grid-template-columns: auto 1fr;
  height: calc(100vh - 95px);
  grid-column: 1 / -1;

  @media ${theme.screenSize.upToLarge} {
    height: calc(100vh - 56px);
  }

  @media ${theme.screenSize.upToSmall} {
    display: grid;
    grid-template-columns: 1fr;
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
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  height: inherit;

  @media ${theme.screenSize.upToSmall} {
    position: absolute;
    // max-height: 95vh;
  }
`;

const openingTextStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 16px;
  padding-top: 20vh;
  padding-left: 32px;
  padding-right: 32px;

  @media ${theme.screenSize.upToSmall} {
    padding-left: 80px;
  }

  h2 {
    color: ${palette.black};
    .dark-theme & {
      color: ${palette.gray.light2};
    }
  }

  p {
    color: ${palette.gray.dark1};
    .dark-theme & {
      color: ${palette.gray.light1};
    }
  }
`;

const scrollContainerStyle = (firstSubmitted: boolean) => css`
  overflow-y: auto;
  height: inherit;
  ${!firstSubmitted &&
  css`
    justify-content: space-between;
    display: flex;
    flex-direction: column;
  `}

  @media ${theme.screenSize.upToSmall} {
    // max-height: 95vh;
  }
`;

function MongoDBAssistantPageContent() {
  const { activeConversation, firstSubmitted } = useConversationContext();

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
        <div className={scrollContainerStyle(firstSubmitted)}>
          {!firstSubmitted && (
            <div className={openingTextStyle}>
              <H2>Hello! How can I help you?</H2>
              <Body>I&apos;m here to give expert guidance and recommendations for all things MongoDB.</Body>
            </div>
          )}
          <div>
            <ChatbotComponent />
          </div>
          {!firstSubmitted && <AssistantDisclaimer />}
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
