import type { Store } from '@netlify/blobs';

export const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];

export const constructBlobKey = (relativePath: string): string => {
  const isImage = IMAGE_EXTENSIONS.some((ext) =>
    relativePath.toLowerCase().endsWith(ext),
  );
  const isJson = relativePath.toLowerCase().endsWith('.json');
  const prefix = isImage ? 'image' : isJson ? 'reference' : 'mdx';
  return `${prefix}/${relativePath}`;
};

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1500;

/** Returns null on success, or an error code string on failure */
export const uploadWithRetry = async (
  key: string,
  content: string | ArrayBuffer,
  localHash: string,
  mdxContentStore: Store,
): Promise<string | null> => {
  let lastErrorCode = 'unknown';
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      await mdxContentStore.set(key, content, {
        metadata: { hash: localHash },
      });
      return null;
    } catch (err) {
      lastErrorCode = classifyError(err);
      if (lastErrorCode === '429' && attempt < MAX_RETRIES - 1) {
        const waitMs = RETRY_DELAY_MS * (attempt + 1);
        console.log(
          `Rate limited on ${key} (attempt ${attempt + 1}/${MAX_RETRIES}), waiting ${waitMs}ms...`,
        );
        await new Promise((res) => setTimeout(res, waitMs));
      } else if (lastErrorCode !== '429') {
        console.log(`Error on ${key}, error code: ${lastErrorCode}`, err);
        return lastErrorCode;
      }
    }
  }
  return lastErrorCode;
};

const classifyError = (err: unknown): string => {
  if (!(err instanceof Error)) return 'unknown';
  const msg = err.message;
  // HTTP status codes
  const statusMatch = msg.match(/\b(401|403|404|429|500|502|503)\b/);
  if (statusMatch) return statusMatch[1];
  // Node connection errors
  if (msg.includes('ECONNRESET')) return 'ECONNRESET';
  if (msg.includes('ETIMEDOUT')) return 'ETIMEDOUT';
  if (msg.includes('EPIPE')) return 'EPIPE';
  if (msg.includes('ECONNREFUSED')) return 'ECONNREFUSED';
  if (msg.includes('UND_ERR_SOCKET')) return 'UND_ERR_SOCKET';
  if (msg.includes('socket hang up')) return 'SOCKET_HANG_UP';
  return msg.slice(0, 50);
};
