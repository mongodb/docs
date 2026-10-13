'use client';

import styled from '@emotion/styled';
import { H3 } from '@leafygreen-ui/typography';

const StyledColumn = styled('div')`
  flex: 1;

  .intro-code-block {
    margin-top: 0;
  }

  ul {
    list-style: none;
    padding-left: 30px;
    margin: 0;
    position: relative;

    li {
      &::before {
        content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4.25" stroke="%2300ED64" stroke-width="1.9"/></svg>');
        position: absolute;
        left: -1px;
        transform: translateY(10%);
      }

      p {
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  }
`;

const StyledTitle = styled(H3)`
  && {
    color: #fff;
  }
  margin-bottom: 37px;
  margin-top: -5px;
`;

export type ColumnProps = {
  children: React.ReactNode;
  title?: string;
};

export const Column = ({ children, title }: ColumnProps) => (
  <StyledColumn>
    {title && <StyledTitle>{title}</StyledTitle>}
    {children}
  </StyledColumn>
);
