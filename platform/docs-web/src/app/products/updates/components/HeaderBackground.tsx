import { theme } from '@/styles/theme';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import Image from 'next/image';

const headerBackgroundStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${palette.green.light3};
  border-radius: 0 0 40px 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* Tablet breakpoint: between small and medium */
  @media ${theme.screenSize.mediumAndUp} {
    padding-top: 0;
    padding-bottom: 0;
    border-radius: 0 0 80px 80px;
  }

  /* Desktop breakpoint: larger than medium */
  @media ${theme.screenSize.largeAndUp} {
    padding-top: 0;
    padding-bottom: 0;
    border-radius: 0 0 80px 80px;
  }
`;

const leftImageStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  @media ${theme.screenSize.mediumAndUp} {
    top: 0;
  }

  @media ${theme.screenSize['2XLargeAndUp']} {
    top: 0;
  }
`;

const rightImageStyle = css`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1;

  @media ${theme.screenSize.mediumAndUp} {
    top: 0px;
    right: -10px;
  }

  @media ${theme.screenSize['2XLargeAndUp']} {
    top: -20px;
    right: -20px;
  }
`;

const mobileImageStyle = css`
  display: block;

  @media ${theme.screenSize.mediumAndUp} {
    display: none;
  }
`;

const tabletImageStyle = css`
  display: none;

  @media ${theme.screenSize.mediumAndUp} {
    display: block;
  }

  @media ${theme.screenSize['2XLargeAndUp']} {
    display: none;
  }
`;

const desktopImageStyle = css`
  display: none;

  @media ${theme.screenSize['2XLargeAndUp']} {
    display: block;
  }
`;

const HeaderBackground = () => {
  return (
    <div className={cx(headerBackgroundStyle)} data-testid="header-background-img">
      {/* Left image container */}
      <div className={cx(leftImageStyle)}>
        <Image
          src="/products/updates/header-mobile-left.svg"
          alt="header-left"
          width={220}
          height={220}
          className={cx(mobileImageStyle)}
        />
        <Image
          src="/products/updates/header-tablet-left.svg"
          alt="header-left"
          width={320}
          height={320}
          className={cx(tabletImageStyle)}
        />
        <Image
          src="/products/updates/header-desktop-left.svg"
          alt="header-left"
          width={300}
          height={300}
          className={cx(desktopImageStyle)}
        />
      </div>

      {/* Right image container */}
      <div className={cx(rightImageStyle)}>
        <Image
          src="/products/updates/header-mobile-right.svg"
          alt="header-right"
          width={160}
          height={160}
          className={cx(mobileImageStyle)}
        />
        <Image
          src="/products/updates/header-tablet-right.svg"
          alt="header-right"
          width={200}
          height={200}
          className={cx(tabletImageStyle)}
        />
        <Image
          src="/products/updates/header-desktop-right.svg"
          alt="header-right"
          width={360}
          height={360}
          className={cx(desktopImageStyle)}
        />
      </div>
    </div>
  );
};

export default HeaderBackground;
