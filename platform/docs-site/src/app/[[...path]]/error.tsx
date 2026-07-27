'use client';

import { Body } from '@leafygreen-ui/typography';
import { css } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import { ErrorPage } from '@/templates/error-template';
import { getBasePath } from '@/utils/base-path';

const centeredImageStyle = css`
  align-self: center;
  margin-top: ${theme.size.large};
`;

export default function Error() {
  return (
    <ErrorPage
      imageSrc={`${getBasePath()}/500.png`}
      imageAlt="Internal server error"
      title="Something went wrong on our end."
      imageStyle={centeredImageStyle}
    >
      <Body>Try reloading the page.</Body>
    </ErrorPage>
  );
}