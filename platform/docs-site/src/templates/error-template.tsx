'use client';

import Image from 'next/image';
import { clsx } from 'clsx';
import { LinkButton, ButtonVariant } from '@via-ds/components/button';
import { Text, TextStyle } from '@via-ds/components/typography';
import { Link } from '@/mdx-components/Link';
import layoutStyles from '@/app/layout.module.scss';
import { ChatbotProvider } from '@/context/chatbot-context';
import styles from './error-template.module.scss';

import { DOTCOM_BASE_URL, DOTCOM_BASE_PREFIX } from '@/constants';
import { ActionBar } from '@/mdx-components/ActionBar';

const BASE_URL = `${DOTCOM_BASE_URL}/${DOTCOM_BASE_PREFIX}`;

type ErrorPageProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  children?: React.ReactNode;
  imageStyle?: string;
};

const ErrorContent = ({ imageSrc, imageAlt, title, children, imageStyle }: ErrorPageProps) => {
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
          <Link to="https://support.mongodb.com/welcome" hideExternalIcon={true} className={styles.supportLink}>
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ErrorPage = ({ imageSrc, imageAlt, title, children, imageStyle }: ErrorPageProps) => {
  return (
    <ChatbotProvider>
      <div className={layoutStyles['content-container']}>
        <ActionBar template="errorpage" sidenav={false} />
        <div className={styles.wrapper}>
          <ErrorContent imageSrc={imageSrc} imageAlt={imageAlt} title={title} imageStyle={imageStyle}>
            {children}
          </ErrorContent>
        </div>
      </div>
    </ChatbotProvider>
  );
};
