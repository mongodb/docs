'use client';
import { cx, css } from '@leafygreen-ui/emotion';
import styled from '@emotion/styled';
import { palette } from '@leafygreen-ui/palette';
import ComponentFactory from '@/components/component-factory';
import type { ASTNode, ProcedureStyle } from '@/types/ast';
import { theme } from '@/styles/theme';

const circleIndividualStyles = {
  connected: css`
    position: relative;
    font-weight: bold;
    background-color: ${palette.green.light3};
    color: ${palette.green.dark2};
    height: 34px;
    width: 34px;

    .dark-theme & {
      background-color: ${palette.green.dark2};
      color: ${palette.gray.light2};
    }
  `,
  normal: css`
    border: 1.5px solid ${palette.gray.light1};
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    background-color: inherit;
    color: var(--opposite-color);
    height: 27px;
    width: 27px;
  `,
};

const Circle = styled('div')`
  align-items: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
`;

const landingStepStyles = {
  connected: css`
    position: relative;
    gap: 33px;

    h2,
    h3,
    h4 {
      margin-top: ${theme.size.tiny};
    }

    :not(:last-child):before {
      content: '';
      border-left: 2px dashed ${palette.gray.light2};
      bottom: 0;
      left: 16px;
      position: absolute;
      top: 0;

      .dark-theme & {
        border-left-color: ${palette.gray.dark1};
      }
    }
  `,
  normal: css`
    gap: ${theme.size.default};
    h2,
    h4,
    h5,
    h6 {
      margin-top: unset;
    }
    h3 {
      margin-top: 2px;
    }
  `,
};

const StyledStep = styled('div')`
  display: flex;
`;

const StepBlock = styled('div')`
  position: relative;

  // 27 for circle height + 32px minimum spacing between circles
  min-height: 59px;
`;

const Content = styled('div')`
  flex: 1;
  min-width: 0;
`;

const contentStyles = {
  connected: css`
    padding-bottom: ${theme.size.xlarge};
    @media ${theme.screenSize.upToMedium} {
      padding-bottom: 40px;
    }
    @media ${theme.screenSize.upToSmall} {
      padding-bottom: ${theme.size.large};
    }
  `,
  normal: css`
    section > *,
    ol p,
    ul p {
      margin-bottom: ${theme.size.default};
    }
  `,
};

export type StepProps = {
  nodeChildren: ASTNode[];
  stepNumber: number;
  stepStyle?: ProcedureStyle;
};

const Step = ({ nodeChildren, stepNumber, stepStyle = 'connected', ...rest }: StepProps) => {
  return (
    <StyledStep className={cx(landingStepStyles[stepStyle])}>
      <StepBlock>
        <Circle className={cx(circleIndividualStyles[stepStyle])}>{stepNumber}</Circle>
      </StepBlock>
      <Content className={cx(contentStyles[stepStyle])}>
        {nodeChildren.map((child, i) => (
          <ComponentFactory {...rest} nodeData={child} key={i} />
        ))}
      </Content>
    </StyledStep>
  );
};

export default Step;
