'use client';

import { H1, Disclaimer, Link } from '@leafygreen-ui/typography';
import { css } from '@leafygreen-ui/emotion';

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

export default function MongoDBAssistantPage() {
  return (
    <div className={assistantContainerStyle}>
      <H1>Ask MongoDB Assistant a Question</H1>
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
  );
}
