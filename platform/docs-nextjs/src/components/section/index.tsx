'use client';

import { HeadingContextProvider } from '@/context/heading-context';
import type { ASTNode, HeadingNode } from '@/types/ast';
import { isHeadingNode } from '@/types/ast-utils';
import { getPlaintext } from '@/utils/get-plaintext';
import { findKeyValuePair } from '@/utils/find-key-value-pair';
import ComponentFactory from '../component-factory';
import { useHeadingContext } from '@/context/heading-context';

export type SectionProps = {
  nodeChildren: ASTNode[];
};

const Section = ({ nodeChildren, ...rest }: SectionProps) => {
  // Get depth from context (automatically incremented by parent sections)
  const { sectionDepth: currentDepth } = useHeadingContext();

  let headingText = '';
  const headingNode = findKeyValuePair(nodeChildren, 'type', 'heading') as HeadingNode | undefined;

  if (headingNode && isHeadingNode(headingNode)) {
    headingText = getPlaintext(headingNode.children);
  }

  // Provide incremented depth to children via context
  return (
    <HeadingContextProvider heading={headingText} sectionDepth={currentDepth + 1}>
      <section>
        {nodeChildren.map((child, index) => {
          return <ComponentFactory {...rest} nodeData={child} key={index} />;
        })}
      </section>
    </HeadingContextProvider>
  );
};

export default Section;
