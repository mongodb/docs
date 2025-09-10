import type { Root } from '@/types/ast';
import type { WithId } from 'mongodb';

interface StaticAsset {
  checksum: string;
  key: string;
}

interface UpdatedAsset extends StaticAsset {
  updated_at?: Date;
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
  ast: Root;
  static_assets: UpdatedAsset[];
  facets?: Facet[];
}
