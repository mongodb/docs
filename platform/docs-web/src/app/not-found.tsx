'use client';

import { css } from '@leafygreen-ui/emotion';
import { ErrorPage } from '@/templates/error-template';
import notFoundImage from '@/assets/404.png';
import { NotFoundBody } from './NotFoundBody';

const centeredImageStyle = css`
  align-self: center;
  margin-left: 0;
  max-width: 340px;
`;

export default function NotFound() {
  return (
    <ErrorPage
      imageSrc={notFoundImage}
      imageAlt="Page not found"
      title="Sorry, we can't find that page."
      imageStyle={centeredImageStyle}
      showContactSupport={false}
    >
      <NotFoundBody />
    </ErrorPage>
  );
}
