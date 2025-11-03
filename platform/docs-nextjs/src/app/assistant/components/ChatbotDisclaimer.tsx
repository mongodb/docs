'use client';

import { Disclaimer, Link } from '@leafygreen-ui/typography';
import { css } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';

const disclaimerContainerStyle = css`
  margin-top: auto;
  padding-top: 20px;
  padding-bottom: 32px;
  padding-left: 32px;
  padding-right: 32px;

  @media ${theme.screenSize.upToSmall} {
    padding-left: 80px;
  }
`;

const disclaimerStyle = css`
  max-width: 650px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
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

export default function ChatbotDisclaimer() {
  return (
    <div className={disclaimerContainerStyle}>
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
