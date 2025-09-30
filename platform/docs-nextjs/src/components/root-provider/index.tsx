'use client';

import type { ASTNode, HeadingNode } from '@/types/ast';
import { FootnoteProvider } from '../footnote/footnote-context';
import { ContentsProvider } from '@/context/contents-context';
import type { RemoteMetadata } from '@/types/data';
import { MetadataProvider } from '@/utils/use-snooty-metadata';

const RootProvider = ({
  children,
  headingNodes,
  pageNodes,
  metadata,
}: {
  children?: React.ReactNode;
  headingNodes: HeadingNode[];
  pageNodes: ASTNode[];
  metadata?: RemoteMetadata;
}) => {
  return (
    <MetadataProvider value={metadata}>
      <FootnoteProvider pageNodes={pageNodes}>
        <ContentsProvider headingNodes={headingNodes as HeadingNode[]}>{children}</ContentsProvider>
      </FootnoteProvider>
    </MetadataProvider>
  );
};

export default RootProvider;
