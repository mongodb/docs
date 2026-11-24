'use client';
import { css, cx } from '@leafygreen-ui/emotion';
import { H2 } from '@leafygreen-ui/typography';
import { Body } from '@leafygreen-ui/typography';
import Button, { type ButtonProps, Size } from '@leafygreen-ui/button';
import { palette } from '@leafygreen-ui/palette';
import HeaderBackground from './HeaderBackground';
import { theme } from '@/styles/theme';
import useScreenSize from '@/hooks/use-screen-size';

const headerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding-top: 27px;
  padding-bottom: 27px;
  width: 100%;
  position: relative;

  @media ${theme.screenSize.mediumAndUp} {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  @media ${theme.screenSize.largeAndUp} {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`;

const headerContentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 782px;
  z-index: 2;
`;

const titleStyle = css`
  font-size: 32px;
  line-height: 40px;
  color: ${palette.black};
  margin-bottom: 8px;
  max-width: 326px;
  text-align: center;

  @media ${theme.screenSize.mediumAndUp} {
    max-width: 520px;
  }

  @media ${theme.screenSize.largeAndUp} {
    font-size: 64px;
    line-height: 72px;
    max-width: 763px;
  }
`;

const bodyStyle = css`
  text-align: center;
  margin-bottom: 20px;
  font-size: 13px;
  line-height: 20px;
  color: ${palette.black};
  max-width: 326px;

  @media ${theme.screenSize.mediumAndUp} {
    max-width: 520px;
  }

  @media ${theme.screenSize.largeAndUp} {
    font-size: 16px;
    line-height: 28px;
    max-width: 763px;
  }
`;

const Header = () => {
  const size = useScreenSize();

  let buttonSize: ButtonProps['size'] = Size.Large;
  if (size.isTablet) {
    buttonSize = Size.Default;
  }
  if (size.isMobile) {
    buttonSize = Size.Small;
  }

  return (
    <div className={cx(headerStyle)}>
      <HeaderBackground />
      <div className={cx(headerContentStyle)}>
        <H2 className={cx(titleStyle)}>What&apos;s New at MongoDB?</H2>
        <Body className={cx(bodyStyle)}>
          Check out the latest updates in MongoDB – including improvements to the developer experience, expanded
          workload support, app modernization tools, and more.
        </Body>
        <Button
          variant="baseGreen"
          size={buttonSize}
          href="/products/updates/rss"
          target="_blank"
          rel="noopener noreferrer"
        >
          Subscribe to all updates via RSS Feed
        </Button>
      </div>
    </div>
  );
};

export default Header;
