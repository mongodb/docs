'use client';

import { css } from '@leafygreen-ui/emotion';
import type { ASTNode } from '@/types/ast';
import { theme } from '@/styles/theme';

import ComponentFactory from '../component-factory';
import Overline from '../overline';

const kickerBaseStyle = css`
  grid-column: 2;
  @media ${theme.screenSize.upToSmall} {
    padding-top: 56px;
  }
  @media ${theme.screenSize.upToXSmall} {
    padding-top: ${theme.size.large};
  }
`;

export type KickerProps = {
  argument: ASTNode[];
};

const Kicker = ({ argument, ...rest }: KickerProps) => {
  return (
    <Overline className={kickerBaseStyle}>
      {argument.map((child, i) => (
        <ComponentFactory {...rest} nodeData={child} key={i} />
      ))}
    </Overline>
  );
};

export default Kicker;
