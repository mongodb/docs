'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import type { ASTNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

const StyledIntroduction = styled('div')`
  .button {
    margin: 0 ${theme.size.default} ${theme.size.default} 0;
    min-height: ${theme.size.large};
  }
  .button + p {
    display: inline-block;
  }
  @media ${theme.screenSize.upToMedium} {
    margin-bottom: ${theme.size.default};

    .button {
      margin-bottom: 0px;
      margin-right: 0px;
    }
    .button + p {
      display: block;
      margin-top: ${theme.size.default};
      margin-bottom: 0;
    }
    p:last-child {
      margin-bottom: 0;
    }
  }
`;

export type IntroductionProps = {
  nodeChildren: ASTNode[];
};

const Introduction = ({ nodeChildren, ...rest }: IntroductionProps) => {
  return (
    <StyledIntroduction className="introduction">
      {nodeChildren.map((child, i) => (
        <ComponentFactory {...rest} nodeData={child} key={i} />
      ))}
    </StyledIntroduction>
  );
};

export default Introduction;
