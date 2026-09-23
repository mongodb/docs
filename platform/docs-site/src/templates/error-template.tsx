'use client';

import Image from 'next/image';
import { clsx } from 'clsx';
import { Button, LinkButton, ButtonVariant } from '@via-ds/components/button';
import { Text, TextStyle } from '@via-ds/components/typography';
import { Link } from '@/mdx-components/Link';
import layoutStyles from '@/app/layout.module.scss';
import { ChatbotProvider, useChatbotModal } from '@/context/chatbot-context';
import styles from './error-template.module.scss';

import { DOTCOM_BASE_URL, DOTCOM_BASE_PREFIX } from '@/constants';
import { ActionBar } from '@/mdx-components/ActionBar';

const BASE_URL = `${DOTCOM_BASE_URL}/${DOTCOM_BASE_PREFIX}`;

// Via DS's <Icon glyph="Sparkle" /> only supports a single currentColor fill,
// with no gradient hook -- reproduce its path data here so the "Chat with AI
// Assistant" icon can match the button's green-to-blue gradient border.
const GradientSparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="chatAiSparkleGradient" x1="0" y1="0" x2="16" y2="16">
        <stop offset="0%" stopColor="var(--via-color-green-500)" />
        <stop offset="100%" stopColor="var(--via-color-blue-400)" />
      </linearGradient>
    </defs>
    <path
      fill="url(#chatAiSparkleGradient)"
      d="m6.273 2.893-.998 2.995c-.1.3-.336.536-.636.637l-2.995.998a.503.503 0 0 0 0 .954l2.995.998c.3.1.536.336.636.637l.998 2.995a.503.503 0 0 0 .955 0l.998-2.995c.1-.3.336-.536.636-.637l2.995-.998a.503.503 0 0 0 0-.954l-2.995-.998c-.3-.1-.536-.336-.636-.637l-.998-2.995a.503.503 0 0 0-.955 0M12.547 1.172l-.231.693c-.1.3-.336.536-.636.636l-.694.231c-.229.077-.229.401 0 .477l.694.231c.3.1.536.336.636.637l.23.693c.077.229.402.229.478 0l.231-.693c.1-.3.336-.536.636-.637l.693-.23c.23-.077.23-.401 0-.478l-.693-.23c-.3-.1-.536-.337-.636-.637l-.231-.693a.251.251 0 0 0-.477 0M12.547 11.23l-.231.693c-.1.3-.336.536-.636.636l-.694.232c-.229.076-.229.4 0 .477l.694.23c.3.1.536.337.636.637l.23.693c.077.23.402.23.478 0l.231-.693c.1-.3.336-.536.636-.636l.693-.231c.23-.077.23-.401 0-.477l-.693-.232c-.3-.1-.536-.335-.636-.636l-.231-.693a.251.251 0 0 0-.477 0"
    />
  </svg>
);

type ErrorPageProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  children?: React.ReactNode;
  imageStyle?: string;
  showContactSupport?: boolean;
};

const ErrorContent = ({
  imageSrc,
  imageAlt,
  title,
  children,
  imageStyle,
  showContactSupport = true,
}: ErrorPageProps) => {
  const { setChatbotClicked } = useChatbotModal();

  return (
    <div className={styles.notFoundContainer}>
      <div className={clsx(styles.imageContainer, imageStyle)}>
        <Image src={imageSrc} alt={imageAlt} height={444} width={444} />
      </div>
      <div className={styles.errorBox}>
        <Text textStyle={TextStyle.heading1} elementType="h1" className={styles.errorTitle}>
          {title}
        </Text>
        {children}
        <div className={styles.linkContainer}>
          <LinkButton href={BASE_URL} variant={ButtonVariant.Primary} className={styles.homeButton}>
            Go to Docs Home
          </LinkButton>
          <Button variant={ButtonVariant.AI} onClick={() => setChatbotClicked(true)}>
            <GradientSparkleIcon />
            Chat with AI Assistant
          </Button>
          {showContactSupport && (
            <Link to="https://support.mongodb.com/welcome" hideExternalIcon={true} className={styles.supportLink}>
              Contact Support →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export const ErrorPage = ({ imageSrc, imageAlt, title, children, imageStyle, showContactSupport }: ErrorPageProps) => {
  return (
    <ChatbotProvider>
      <div className={layoutStyles['content-container']}>
        <ActionBar template="errorpage" sidenav={false} />
        <div className={styles.wrapper}>
          <ErrorContent
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            title={title}
            imageStyle={imageStyle}
            showContactSupport={showContactSupport}
          >
            {children}
          </ErrorContent>
        </div>
      </div>
    </ChatbotProvider>
  );
};
