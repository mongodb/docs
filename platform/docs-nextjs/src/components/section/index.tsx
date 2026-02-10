'use client';

import { HeadingContextProvider } from '@/context/heading-context';
import type { ASTNode, HeadingNode } from '@/types/ast';
import { isHeadingNode } from '@/types/ast-utils';
import { getPlaintext } from '@/utils/get-plaintext';
import { findKeyValuePair } from '@/utils/find-key-value-pair';
import ComponentFactory from '../component-factory';
import { useHeadingContext } from '@/context/heading-context';

export type SectionProps = {
  nodeChildren?: ASTNode[];
  // New props for the MDX version
  children?: React.ReactNode;
  headingText?: string;
};

const Section = ({ children, nodeChildren = [], headingText: precomputedHeadingText, ...rest }: SectionProps) => {
  // Get depth from context (automatically incremented by parent sections)
  const { sectionDepth: currentDepth } = useHeadingContext();

  // Use pre-computed heading text from MDX conversion if available, otherwise compute at runtime
  let headingText = precomputedHeadingText ?? '';

  if (!headingText) {
    const headingNode = findKeyValuePair(nodeChildren, 'type', 'heading') as HeadingNode | undefined;

    if (headingNode && isHeadingNode(headingNode)) {
      headingText = getPlaintext(headingNode.children);
    }
  }

  // Provide incremented depth to children via context
  return (
    <HeadingContextProvider heading={headingText} sectionDepth={currentDepth + 1}>
      <section>
        {children ??
          nodeChildren.map((child, index) => {
            return <ComponentFactory {...rest} nodeData={child} key={index} />;
          })}
      </section>
    </HeadingContextProvider>
  );
};

export default Section;
