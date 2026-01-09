'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { cx } from '@leafygreen-ui/emotion';
import type { Environments } from '@/utils/env-config';
import { chatbotButtonStyling, ActionsBox as ActionsBoxStyled } from './styles';
import { chatbotMobileButtonStyling } from './styles';
import DarkModeDropdown from './dark-mode-dropdown';
import { reportAnalytics } from '@/utils/report-analytics';
import { useChatbotModal } from '@/context/chatbot-context';
import { currentScrollPosition } from '@/utils/current-scroll-position';

const Chatbot = dynamic(() => import('mongodb-chatbot-ui').then((mod) => mod), {
  ssr: false,
});

const ChatbotModal = dynamic(() => import('./chatbot-modal').then((mod) => mod), {
  ssr: false,
});

const CHATBOT_TEXT = 'Ask MongoDB AI';

const UIContainer = () => {
  const { setChatbotClicked } = useChatbotModal();
  const env = process.env.NEXT_PUBLIC_ENV as Environments;

  const CHATBOT_SERVER_BASE_URL = ['dotcomprd', 'production'].includes(env)
    ? 'https://knowledge.mongodb.com/api/v1'
    : 'https://knowledge.staging.corp.mongodb.com/api/v1';

  const openChatbot = () => {
    reportAnalytics('CTA Click', {
      position: 'secondary nav',
      label: 'Ask MongoDB AI',
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
    setChatbotClicked(true);
  };

  return (
    <ActionsBoxStyled>
      <Button
        className={cx(chatbotButtonStyling)}
        leftGlyph={<Icon glyph="Sparkle" />}
        aria-label={CHATBOT_TEXT}
        variant={'primaryOutline'}
        onClick={openChatbot}
      >
        {CHATBOT_TEXT}
      </Button>
      <IconButton className={cx(chatbotMobileButtonStyling)} aria-label={CHATBOT_TEXT} onClick={openChatbot}>
        <Icon glyph={'Sparkle'} />
      </IconButton>
      {
        <Suspense>
          <Chatbot serverBaseUrl={CHATBOT_SERVER_BASE_URL}>
            <ChatbotModal />
          </Chatbot>
        </Suspense>
      }
      <DarkModeDropdown />
    </ActionsBoxStyled>
  );
};

export default UIContainer;
