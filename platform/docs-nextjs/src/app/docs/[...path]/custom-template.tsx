import React from "react";
import { ASTDocument } from "@/services/db/types";
import DocumentTemplate from "@/components/templates/document";

function getTemplate(templateOption: string): React.ComponentType<{ children?: React.ReactNode }> {
  switch (templateOption) {
    case "document":
      return DocumentTemplate;
    default:
      console.warn(`Unknown template option: ${templateOption}. Defaulting to DocumentTemplate.`);
      return DocumentTemplate;
  }
}

export default async function Template({ children, pageDoc }: {
  pageDoc: ASTDocument;
  children?: React.ReactNode;
}) {
  const TemplateComponent = getTemplate(pageDoc?.ast?.options?.template || "document");
  return (
    <TemplateComponent>
      <div>
        {children}
      </div>

    </TemplateComponent>
  );

}