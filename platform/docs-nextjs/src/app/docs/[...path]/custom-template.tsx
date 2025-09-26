'use client';

import type { ASTDocument } from '@/services/db/types';
import type { RemoteMetadata } from '@/types/data';
import { MetadataProvider } from '@/utils/use-snooty-metadata';
import { FootnoteProvider } from '@/components/footnote/footnote-context';
import DocumentTemplate from '@/components/templates/document';
import ComponentFactory from '@/components/component-factory';

function getTemplate(templateOption: string): React.ComponentType<{ children?: React.ReactNode }> {
  switch (templateOption) {
    case 'document':
      return DocumentTemplate;
    default:
      console.warn(`Unknown template option: ${templateOption}. Defaulting to DocumentTemplate.`);
      return DocumentTemplate;
  }
}

interface CustomTemplateProps {
  pageDoc: ASTDocument;
  metadata?: RemoteMetadata;
}

export const CustomTemplate = ({ metadata, pageDoc }: CustomTemplateProps) => {
  const TemplateComponent = getTemplate(pageDoc?.ast?.options?.template || 'document');

  return (
    <MetadataProvider value={metadata}>
      <FootnoteProvider pageNodes={pageDoc?.ast?.children ?? []}>
        <TemplateComponent>
          <ComponentFactory nodeData={pageDoc.ast} slug={pageDoc.page_path} key={pageDoc.page_id} />
        </TemplateComponent>
      </FootnoteProvider>
    </MetadataProvider>
  );
};
