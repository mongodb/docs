import type { BlockQuoteNode } from '@/types/ast';
import ComponentFactory from '../component-factory';

export type BlockQuoteProps = {
  nodeChildren: BlockQuoteNode['children'];
};

const BlockQuote = ({ nodeChildren, ...rest }: BlockQuoteProps) => (
  <blockquote>
    {nodeChildren.map((element, index) => (
      <ComponentFactory key={index} nodeData={element} {...rest} />
    ))}
  </blockquote>
);

export default BlockQuote;
