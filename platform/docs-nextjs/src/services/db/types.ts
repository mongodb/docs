import { WithId } from "mongodb";

interface StaticAsset {
  checksum: string;
  key: string;
}

interface UpdatedAsset extends StaticAsset {
  updated_at?: Date;
}

interface PageAst {
  options?: {
    template?: string;
  }
  [key: string]: unknown;
}

interface Facet {
  category: string;
  value: string;
  display_name: string;
  sub_facets?: { [key: string]: unknown }[];
}

export interface ASTDocument extends WithId<Document> {
  page_id: string;
  page_path: string;
  filename: string;
  ast: PageAst;
  static_assets: UpdatedAsset[];
  facets?: Facet[];
}
