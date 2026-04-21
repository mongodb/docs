/**
 * Retrieves metadata for a blob in a Netlify Blobs store.
 *
 * Usage: pnpm blobs:check-meta <store> <key>
 *
 * Must be run from platform/docs-nextjs/.
 * Requires NETLIFY_TOKEN and NETLIFY_SITE_ID environment variables.
 */

import { getStore } from '@netlify/blobs';

async function main() {
  const [store, key] = process.argv.slice(2);

  if (!store || !key) {
    console.error('Usage: pnpm blobs:check-meta <store> <key>');
    process.exit(1);
  }

  const token = process.env.NETLIFY_TOKEN;
  const siteID = process.env.NETLIFY_SITE_ID;

  if (!token) {
    console.error('Error: NETLIFY_TOKEN environment variable is not set.');
    process.exit(1);
  }
  if (!siteID) {
    console.error('Error: NETLIFY_SITE_ID environment variable is not set.');
    process.exit(1);
  }

  const blobStore = getStore({ name: store, siteID, token });
  const meta = await blobStore.getMetadata(key);

  if (!meta) {
    console.log(`Blob "${key}" does not exist in store "${store}".`);
    process.exit(0);
  }

  console.log(JSON.stringify(meta, null, 2));
}

main();
