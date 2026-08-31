import fs from 'fs/promises';
import path from 'path';

/** Same as nextjs-extension blobUploads/utils (kept local so TS resolves within docs-site). */
export function stripDocsPrefix(prefix: string): string {
  if (prefix === 'docs') return '';
  if (prefix.startsWith('docs/')) return prefix.slice(5);
  return prefix;
}

const DIR_NAME_MAP_FILE = path.join(process.cwd(), 'src/generated/dir-name-to-prefix.json');

let cachedMap: Record<string, string> | undefined;
let cachedMtimeMs: number | undefined;

/** Same rules as nextjs-extension `remapFilePath` (URL-shaped paths for prefix mapping). */
export function remapDiskRelativeToBlobRelative(diskRelative: string, dirNameToPrefix: Record<string, string>): string {
  const filePath = diskRelative.split(path.sep).join('/');
  const firstSlash = filePath.indexOf('/');
  if (firstSlash === -1) {
    // Bare docset dir name: the docset's root index after scan-mdx-files pops
    // a trailing `index`. Remap to the stripped URL prefix so it lines up with
    // every other page in the same docset.
    //
    // Empty-prefix docsets (landing; prefix `docs`) strip to ''. That empty
    // string is the optional catch-all root under basePath `/docs`, not
    // `/docs/landing`. Callers must not `.split('/')` the empty string (that
    // yields `['']`); see toBasePathRelativePath.
    const rawPrefix = dirNameToPrefix[filePath];
    if (rawPrefix === undefined) return filePath;
    return stripDocsPrefix(rawPrefix);
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
 * Map on-disk content-mdx segments (including the project dir name) to
 * basePath-relative generateStaticParams segments.
 *
 * An empty remapped path is the catch-all root (`{ path: [] }` → `/docs/`
 * for landing). `''.split('/')` is `['']`, which would emit a bogus empty
 * segment instead of that root, so handle it before splitting.
 */
export function toBasePathRelativePath(
  diskSegments: string[],
  dirNameToPrefix: Record<string, string>,
  docsetPrefixSegments: string[],
): string[] {
  const remapped = remapDiskRelativeToBlobRelative(diskSegments.join('/'), dirNameToPrefix);
  if (!remapped) return [];
  const full = remapped.split('/');
  for (let i = 0; i < docsetPrefixSegments.length; i++) {
    if (full[i] !== docsetPrefixSegments[i]) {
      throw new Error(
        `Expected path "${full.join('/')}" to start with docset prefix "${docsetPrefixSegments.join('/')}"`,
      );
    }
  }
  return full.slice(docsetPrefixSegments.length);
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
