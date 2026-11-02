'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Button, ButtonVariant } from '@via-ds/components/button';
import Sparkle from '@via-ds/icons/Sparkle';
import type { Environments } from '@/utils/env-config';
import styles from './action-bar.module.scss';
import { DarkModeDropdown } from './DarkModeDropdown';
import { reportAnalytics } from '@/utils/report-analytics';
import { useChatbotModal } from '@/context/chatbot-context';
import { currentScrollPosition } from '@/utils/current-scroll-position';

const Chatbot = dynamic(() => import('mongodb-chatbot-ui').then((mod) => mod), {
  ssr: false,
});

const ChatbotModal = dynamic(() => import('@/mdx-components/ActionBar/ChatbotModal').then((mod) => mod.ChatbotModal), {
  ssr: false,
});

const CHATBOT_TEXT = 'Ask MongoDB AI';

const ActionsContainer = () => {
  const { setChatbotClicked } = useChatbotModal();
  const env = process.env.NEXT_PUBLIC_ENV as Environments;

  const CHATBOT_SERVER_BASE_URL = ['dotcomstg', 'staging', 'development'].includes(env)
    ? 'https://knowledge-dev.mongodb.com/api/v1'
    : 'https://knowledge.mongodb.com/api/v1';

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
    <div className={styles.actions}>
      <Button variant={ButtonVariant.PrimaryOutline} className={styles['chatbot-button']} onPress={openChatbot}>
        <Sparkle role="presentation" />
        {CHATBOT_TEXT}
      </Button>
      <Button
        variant={ButtonVariant.Tertiary}
        className={styles['chatbot-mobile-button']}
        aria-label={CHATBOT_TEXT}
        onPress={openChatbot}
      >
        <Sparkle />
      </Button>
      {
        <Suspense>
          <Chatbot serverBaseUrl={CHATBOT_SERVER_BASE_URL}>
            <ChatbotModal />
          </Chatbot>
        </Suspense>
      }
      <DarkModeDropdown />
    </div>
  );
};

export { ActionsContainer };
