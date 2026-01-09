'use client';

import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import styled from '@emotion/styled';
import Button from '@leafygreen-ui/button';
import { H2 } from '@leafygreen-ui/typography';
import { theme } from '@/styles/theme';
import Breadcrumbs from '@/components/breadcrumbs';
import { DOTCOM_BASE_URL } from '@/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const StyledMain = styled.main`
  max-width: 100vw;
  .body {
    margin: ${theme.size.default} ${theme.size.xlarge} ${theme.size.xlarge};
    @media ${theme.screenSize.upToSmall} {
      margin: ${theme.size.default} ${theme.size.medium} ${theme.size.xlarge};
    }
    overflow-x: auto;
  }
`;

const ContentBox = styled.div`
  max-width: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: ${theme.size.xxlarge};
  @media ${theme.screenSize.upToSmall} {
    margin-top: ${theme.size.medium};
  }
  margin-bottom: ${theme.size.default};
  img {
    @media ${theme.screenSize.upToSmall} {
      width: 270px;
      height: auto;
    }
  }
`;

const FeatureNotAvailImage = () => {
  const altText = 'Feature not available';
  const imgPath = `${DOTCOM_BASE_URL}/docs/assets/feature-not-avail.svg`;

  return (
    <ImageContainer>
      <Image src={imgPath} alt={altText} height={240} width={360} />
    </ImageContainer>
  );
};

const titleStyling = css`
  --color: ${palette.black};
  .dark-theme & {
    --color: white;
  }
  color: var(--color);
  text-align: center;
`;

const buttonStyling = css`
  --background-color: ${palette.gray.light3};
  --color: ${palette.black};
  .dark-theme & {
    --background-color: ${palette.gray.dark2};
    --color: white;
  }
  background-color: var(--background-color);
  color: var(--color);
`;

const LinkContainer = styled.div`
  margin-top: ${theme.size.large};
`;

const FeatureNotAvailContainer = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin-bottom: ${theme.size.xxlarge};
  @media ${theme.screenSize.upToSmall} {
    margin-bottom: 72px;
  }
`;

const FeatureNotAvailable = () => {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/docs');
    }
  };

  return (
    <StyledMain>
      <div className="body">
        <Breadcrumbs />
        <FeatureNotAvailContainer>
          <FeatureNotAvailImage />
          <ContentBox>
            <H2 className={cx(titleStyling)}>
              We&rsquo;re sorry, this page isn&rsquo;t available in the version you selected.
            </H2>
            <LinkContainer>
              <Button variant="default" className={cx(buttonStyling)} onClick={goBack}>
                Go back to previous page
              </Button>
            </LinkContainer>
          </ContentBox>
        </FeatureNotAvailContainer>
      </div>
    </StyledMain>
  );
};

export default FeatureNotAvailable;
