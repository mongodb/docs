'use client';

import Image, { type StaticImageData } from 'next/image';
import { css, cx } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import { palette } from '@leafygreen-ui/palette';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';
import { theme } from '@/styles/theme';
import { Link } from '@/mdx-components/Link';
import layoutStyles from '@/app/layout.module.scss';
import { ChatbotProvider, useChatbotModal } from '@/context/chatbot-context';

import { DOTCOM_BASE_URL, DOTCOM_BASE_PREFIX } from '@/constants';
import { ActionBar } from '@/mdx-components/ActionBar';

const BASE_URL = `${DOTCOM_BASE_URL}/${DOTCOM_BASE_PREFIX}`;

// leafygreen-ui/icon's Sparkle glyph only supports a single currentColor
// fill, with no gradient hook -- reproduce its path data here so the "Chat
// with AI Assistant" icon can match the button's green-to-blue gradient
// border.
const GradientSparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="chatAiSparkleGradient" x1="0" y1="0" x2="16" y2="16">
        <stop offset="0%" stopColor={palette.green.dark1} />
        <stop offset="100%" stopColor={palette.blue.base} />
      </linearGradient>
    </defs>
    <path
      fill="url(#chatAiSparkleGradient)"
      d="m6.273 2.893-.998 2.995c-.1.3-.336.536-.636.637l-2.995.998a.503.503 0 0 0 0 .954l2.995.998c.3.1.536.336.636.637l.998 2.995a.503.503 0 0 0 .955 0l.998-2.995c.1-.3.336-.536.636-.637l2.995-.998a.503.503 0 0 0 0-.954l-2.995-.998c-.3-.1-.536-.336-.636-.637l-.998-2.995a.503.503 0 0 0-.955 0M12.547 1.172l-.231.693c-.1.3-.336.536-.636.636l-.694.231c-.229.077-.229.401 0 .477l.694.231c.3.1.536.336.636.637l.23.693c.077.229.402.229.478 0l.231-.693c.1-.3.336-.536.636-.637l.693-.23c.23-.077.23-.401 0-.478l-.693-.23c-.3-.1-.536-.337-.636-.637l-.231-.693a.251.251 0 0 0-.477 0M12.547 11.23l-.231.693c-.1.3-.336.536-.636.636l-.694.232c-.229.076-.229.4 0 .477l.694.23c.3.1.536.337.636.637l.23.693c.077.23.402.23.478 0l.231-.693c.1-.3.336-.536.636-.636l.693-.231c.23-.077.23-.401 0-.477l-.693-.232c-.3-.1-.536-.335-.636-.636l-.231-.693a.251.251 0 0 0-.477 0"
    />
  </svg>
);

const getAiButtonDynamicStyle = (darkMode: boolean) => {
  const baseBg = darkMode ? palette.black : palette.white;
  const hoverBg = darkMode ? palette.gray.dark3 : palette.gray.light3;
  const gradient = `linear-gradient(90deg, ${palette.green.dark1}, ${palette.blue.base})`;

  return css`
    align-items: center;
    appearance: none;
    background-clip: padding-box, border-box;
    background-image: linear-gradient(${baseBg}, ${baseBg}), ${gradient};
    background-origin: padding-box, border-box;
    border: 1px solid transparent;
    border-radius: 6px;
    color: ${darkMode ? palette.white : palette.black};
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: ${theme.fontSize.small};
    font-weight: 700;
    gap: 8px;
    padding: 8px 12px;

    &:hover {
      background-image: linear-gradient(${hoverBg}, ${hoverBg}), ${gradient};
    }
  `;
};

const errorBoxStyle = css`
  flex: 1 0.5 auto;
  word-break: break-word;

  @media ${theme.screenSize.upToSmall} {
    padding: 0px ${theme.size.default};
    width: unset;
  }
`;

const getSupportLinkDynamicStyle = (darkMode: boolean) => css`
  ${!darkMode && `color: ${palette.gray.dark1};`}
  display: inline-block;
  font-size: ${theme.fontSize.small};
  line-height: 20px;
  margin-left: 16px;

  @media ${theme.screenSize.upToSmall} {
    margin-top: ${theme.size.default};
    margin-left: 0;
  }
`;

const imageContainerStyle = css`
  margin-left: -27px;
  max-width: 226px;
  display: flex;
  justify-content: flex-start;
  flex: 0.5 1 auto;
  > img {
    width: 100%;
    height: auto;
  }
`;

const errorTitleStyling = css`
  font-family: 'MongoDB Value Serif';
  line-height: 64px;
  font-size: 48px;
  margin-block-start: 0em;
  margin-block-end: 22px;

  @media ${theme.screenSize.upToSmall} {
    font-size: ${theme.fontSize.h2};
  }
`;

const linkContainerStyle = css`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.size.default};
  margin-top: ${theme.size.medium};

  @media ${theme.screenSize.upToSmall} {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const notFoundContainerStyle = css`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.size.xxlarge};
  margin-inline: auto;
  grid-column: 3/-3;
  max-width: 775px;
  width: 100%;

  @media only screen and (min-width: 1921px) {
    max-width: 884px;
  }

  @media ${theme.screenSize.upToXLarge} {
    grid-column: 4/-4;
  }

  @media ${theme.screenSize.upToLarge} {
    grid-column: 3/-3;
    margin-top: -${theme.size.large};
  }
`;

const gridStyling = `
  grid-template-columns: minmax(${theme.size.xlarge}, 1fr) repeat(12, minmax(0, 1fr)) minmax(${theme.size.xlarge}, 1fr);

  @media ${theme.screenSize.upToLarge} {
    grid-template-columns: ${theme.size.medium} repeat(12, 1fr) ${theme.size.medium};
  }

  @media ${theme.screenSize.upToMedium} {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const wrapperStyle = css`
  display: grid;
  height: 100%;
  align-content: start;
  ${gridStyling}
`;

type ErrorPageProps = {
  imageSrc: string | StaticImageData;
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
  const { darkMode } = useDarkMode();
  const { setChatbotClicked } = useChatbotModal();

  return (
    <div className={notFoundContainerStyle}>
      <div className={cx(imageContainerStyle, imageStyle)}>
        {/* unoptimized: /_next/image is not routed to this app on the CDN */}
        <Image src={imageSrc} alt={imageAlt} height={444} width={444} unoptimized />
      </div>
      <div className={errorBoxStyle}>
        <Body as="h1" className={cx(errorTitleStyling)}>
          {title}
        </Body>
        {children}
        <div className={linkContainerStyle}>
          <Button
            href={BASE_URL}
            variant="primary"
            className={cx(css`
              @media ${theme.screenSize.upToSmall} {
                max-width: 150px;
              }
            `)}
          >
            Go to Docs Home
          </Button>
          <button
            type="button"
            className={cx(getAiButtonDynamicStyle(darkMode))}
            onClick={() => setChatbotClicked(true)}
          >
            <GradientSparkleIcon />
            Chat with AI Assistant
          </button>
          {showContactSupport && (
            <Link
              to="https://support.mongodb.com/welcome"
              hideExternalIcon={true}
              className={cx(getSupportLinkDynamicStyle(darkMode))}
            >
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
        <div className={wrapperStyle}>
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
