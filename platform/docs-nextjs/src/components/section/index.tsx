import { HeadingContextProvider } from '@/context/heading-context';
import type { ASTNode, HeadingNode } from '@/types/ast';
import { isHeadingNode } from '@/types/ast-utils';
import { getPlaintext } from '@/utils/get-plaintext';
import { findKeyValuePair } from '@/utils/find-key-value-pair';
import ComponentFactory from '../component-factory';

export type SectionProps = {
  nodeChildren: ASTNode[];
  sectionDepth?: number;
};

const Section = ({ nodeChildren, sectionDepth = 0, ...rest }: SectionProps) => {
  let headingText = '';
  const headingNode = findKeyValuePair(nodeChildren, 'type', 'heading') as HeadingNode | undefined;

  if (headingNode && isHeadingNode(headingNode)) {
    headingText = getPlaintext(headingNode.children);
  }

  return (
    <HeadingContextProvider heading={headingText}>
      <section>
        {nodeChildren.map((child, index) => {
          return <ComponentFactory {...rest} nodeData={child} key={index} sectionDepth={sectionDepth + 1} />;
        })}
      </section>
    </HeadingContextProvider>
  );
};

export default Section;
