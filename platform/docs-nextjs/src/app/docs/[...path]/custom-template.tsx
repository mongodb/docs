import type { ASTDocument } from '@/services/db/pages';
import type { RemoteMetadata } from '@/types/data';
import type { DocumentTemplateProps } from '@/components/templates/document';
import DocumentTemplate from '@/components/templates/document';
import ComponentFactory from '@/components/component-factory';
import RootProvider from '@/components/root-provider';
import type { ImageContextType } from '@/context/image-context';

type TemplateComponent = React.ComponentType<DocumentTemplateProps>;

/** given a snooty template option, returns the appropriate template component */
function getTemplate(templateOption: string): TemplateComponent {
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
  assets: ImageContextType;
}

const CustomTemplate = ({ pageDoc, metadata, assets }: CustomTemplateProps) => {
  const template = pageDoc.ast.options?.template || 'document';
  const TemplateComponent = getTemplate(template);

  return (
    <RootProvider page={pageDoc} metadata={metadata} template={template} assets={assets}>
      <TemplateComponent pageOptions={pageDoc.ast.options} slug={pageDoc.filename}>
        <ComponentFactory nodeData={pageDoc.ast} slug={pageDoc.page_path} key={pageDoc.page_id} />
      </TemplateComponent>
    </RootProvider>
  );
};

export default CustomTemplate;
