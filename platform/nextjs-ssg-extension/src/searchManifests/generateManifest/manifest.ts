import type { ManifestEntry } from './document';

export class Manifest {
  url: string;
  includeInGlobalSearch: boolean;
  documents: ManifestEntry[];

  constructor(url: string, includeInGlobalSearch: boolean) {
    this.url = url;
    this.documents = [];
    this.includeInGlobalSearch = includeInGlobalSearch;
  }

  /** Adds a document to a manifest
   * @param document - the document to add to the manifest
   */
  addDocument(document: ManifestEntry) {
    this.documents.push(document);
  }

  /** Returns the manifest as JSON formatted string
   * @returns the manifest as JSON formatted string
   */
  export() {
    return JSON.stringify(this);
  }
}
