import ComponentFactory from '@/components/component-factory';
import styled from '@emotion/styled';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';
import type { FigureNode } from '@/types/ast';

const Caption = styled('p')`
  color: ${palette.gray.dark1};
  /* TODO: Remove !important when mongodb-docs.css is removed */
  margin-top: ${theme.size.default} !important;
  text-align: center;

  /* TODO: Remove when mongodb-docs.css is removed */
  & > code {
    color: ${palette.gray.dark1};
  }
`;

export type CaptionLegendProps = {
  nodeChildren: FigureNode['children'];
};

const CaptionLegend = ({ nodeChildren, ...rest }: CaptionLegendProps) => (
  <>
    {nodeChildren.length > 0 && (
      <Caption>
        <ComponentFactory {...rest} nodeData={nodeChildren[0]} parentNode="caption" />
      </Caption>
    )}
    {nodeChildren.length > 1 && (
      <>
        {nodeChildren.slice(1).map((child, index) => (
          <ComponentFactory {...rest} key={index} nodeData={child} />
        ))}
      </>
    )}
  </>
);

export default CaptionLegend;
