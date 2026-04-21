import fs from 'fs/promises';
import path from 'path';

/** Same as nextjs-extension blobUploads/utils (kept local so TS resolves within docs-nextjs). */
function stripDocsPrefix(prefix: string): string {
  if (prefix === 'docs') return '';
  if (prefix.startsWith('docs/')) return prefix.slice(5);
  return prefix;
}

const DIR_NAME_MAP_FILE = path.join(process.cwd(), 'src/generated/dir-name-to-prefix.json');

let cachedMap: Record<string, string> | undefined;
let cachedMtimeMs: number | undefined;

/** Same rules as nextjs-extension `remapFilePath` (blob keys use URL-shaped paths). */
export function remapDiskRelativeToBlobRelative(diskRelative: string, dirNameToPrefix: Record<string, string>): string {
  const filePath = diskRelative.split(path.sep).join('/');
  const firstSlash = filePath.indexOf('/');
  if (firstSlash === -1) {
    return filePath;
  }
  const dirName = filePath.slice(0, firstSlash);
  const rest = filePath.slice(firstSlash + 1);
  const prefix = dirNameToPrefix[dirName];
  if (!prefix) {
    return filePath;
  }
  const stripped = stripDocsPrefix(prefix);
  if (!stripped) return rest;
  return `${stripped}/${rest}`;
}

/**
 * Inverse of remap for local filesystem reads: blob-relative path → candidates under
 * content-mdx (longest stripped prefix first to reduce ambiguity).
 */
export function blobRelativeToDiskCandidates(blobRelative: string, dirNameToPrefix: Record<string, string>): string[] {
  const norm = blobRelative.split(path.sep).join('/');
  const seen = new Set<string>();
  const out: string[] = [];
  const push = (s: string) => {
    if (!seen.has(s)) {
      seen.add(s);
      out.push(s);
    }
  };

  push(norm);

  const entries = Object.entries(dirNameToPrefix)
    .map(([dirName, rawPrefix]) => ({
      dirName,
      stripped: stripDocsPrefix(rawPrefix),
    }))
    .sort((a, b) => {
      const da = a.stripped.split('/').length;
      const db = b.stripped.split('/').length;
      if (db !== da) return db - da;
      return b.stripped.length - a.stripped.length;
    });

  for (const { dirName, stripped } of entries) {
    if (!stripped) {
      push(`${dirName}/${norm}`);
    } else if (norm === stripped) {
      push(dirName);
    } else if (norm.startsWith(`${stripped}/`)) {
      push(`${dirName}/${norm.slice(stripped.length + 1)}`);
    }
  }

  return out;
}

export async function loadDirNameToPrefixMap(): Promise<Record<string, string>> {
  try {
    const st = await fs.stat(DIR_NAME_MAP_FILE);
    if (cachedMap !== undefined && cachedMtimeMs === st.mtimeMs) {
      return cachedMap;
    }
    const txt = await fs.readFile(DIR_NAME_MAP_FILE, 'utf-8');
    cachedMap = JSON.parse(txt) as Record<string, string>;
    cachedMtimeMs = st.mtimeMs;
    return cachedMap;
  } catch {
    cachedMap = {};
    cachedMtimeMs = undefined;
    return cachedMap;
  }
}

export async function diskPathToBlobRelative(diskRelativeFromContentMdx: string): Promise<string> {
  const norm = diskRelativeFromContentMdx.split(path.sep).join('/');
  const map = await loadDirNameToPrefixMap();
  return remapDiskRelativeToBlobRelative(norm, map);
}
