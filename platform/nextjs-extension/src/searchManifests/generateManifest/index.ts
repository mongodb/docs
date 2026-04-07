import { promises as fsPromises } from 'node:fs';
import { BSON } from 'mongodb';
import { Document } from './document';
import { Manifest } from './manifest';

// The directory in the Parser-outputted bundle.zip that contains the AST
const DOCUMENTS_DIR = 'documents';

export const generateManifest = async ({
  url,
  includeInGlobalSearch,
}: { url: string; includeInGlobalSearch: boolean }) => {
  const manifest = new Manifest(url, includeInGlobalSearch);
  console.log('=========== Generating manifests ================');

  // Get list of file entries in documents dir
  const entries = await fsPromises.readdir(DOCUMENTS_DIR, { recursive: true });
  const mappedEntries = entries.filter((fileName) => {
    return fileName.includes('.bson');
  });

  await Promise.all(
    mappedEntries.map(async (entry) => {
      // Read and decode each entry
      const decoded = BSON.deserialize(
        await fsPromises.readFile(`${DOCUMENTS_DIR}/${entry}`),
      );

      // Parse data into a document and format it as a Manifest document
      const processedDoc = new Document(decoded).exportAsManifestEntry();
      if (processedDoc) manifest.addDocument(processedDoc);
    }),
  );
  return manifest;
};
