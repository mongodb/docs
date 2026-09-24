/**
 * Values shared by the extension entry point and its onSuccess modules.
 *
 * They live here rather than in index.ts because index.ts imports those
 * modules; importing back from it would be a cycle, and offline-docs
 * derives APP_ROOT_DIR at module load, where a cycle resolves to
 * undefined.
 */

/** The Next.js app this extension always builds against. */
export const APP_DIR = 'docs-site';

/** Fallback for S3_OFFLINE_BUCKET, the bucket both onSuccess uploads target. */
export const DEFAULT_S3_BUCKET = 'docs-mongodb-org-dotcomstg';
