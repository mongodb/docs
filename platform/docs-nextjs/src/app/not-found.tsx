'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { css, cx } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import { palette } from '@leafygreen-ui/palette';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';
import { theme } from '@/styles/theme';
import Link from '@/components/link';
import layoutStyles from '@/app/layout.module.scss';
import { ChatbotProvider } from '@/context/chatbot-context';

import { DOTCOM_BASE_URL, DOTCOM_BASE_PREFIX } from '@/constants';
import ActionBar from '@/components/action-bar';

const BASE_URL = `${DOTCOM_BASE_URL}/${DOTCOM_BASE_PREFIX}`;

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

const NotFoundImage = () => {
  const altText = 'Page not found';
  const imgPath = '/404.png';

  return (
    <div className={imageContainerStyle}>
      <Image src={imgPath} alt={altText} height={444} width={444} />
    </div>
  );
};

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
  margin-top: ${theme.size.medium};

  @media ${theme.screenSize.upToSmall} {
    display: flex;
    flex-direction: column;
  }
`;

const ErrorBoxContainer = () => {
  const { darkMode } = useDarkMode();
  const pathname = usePathname();
  const fromURL = `${DOTCOM_BASE_URL}${pathname}`;

  return (
    <div className={errorBoxStyle}>
      <Body as="h1" className={cx(errorTitleStyling)}>
        Sorry, we can&apos;t find that page.
      </Body>
      {pathname ? (
        <Body>
          The page with the URL &ldquo;<Link to={fromURL}>{fromURL}</Link>
          &rdquo; does not exist. It might have been moved or deleted.
        </Body>
      ) : (
        <Body>The page might have been moved or deleted.</Body>
      )}
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
        <Link
          to="https://support.mongodb.com/welcome"
          hideExternalIcon={true}
          className={cx(getSupportLinkDynamicStyle(darkMode))}
        >
          Contact Support →
        </Link>
      </div>
    </div>
  );
};

export const notFoundContainerStyle = css`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.size.xxlarge};
  grid-column: 6/-3;

  @media ${theme.screenSize.upToXLarge} {
    grid-column: 4/-4;
  }

  @media ${theme.screenSize.upToLarge} {
    grid-column: 3/-3;
    margin-top: -${theme.size.large};
  }
`;

export const gridStyling = `
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

export default function NotFound() {
  return (
    <ChatbotProvider>
      <div className={layoutStyles['content-container']}>
        <ActionBar template="errorpage" sidenav={false} />
        <div className={wrapperStyle}>
          <div className={notFoundContainerStyle}>
            <NotFoundImage />
            <ErrorBoxContainer />
          </div>
        </div>
      </div>
    </ChatbotProvider>
  );
}
