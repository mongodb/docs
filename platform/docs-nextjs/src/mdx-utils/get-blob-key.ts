export const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
export const JSON_EXTENSION = '.json';
export const MDX_EXTENSION = '.mdx';
export const INV_EXTENSION = '.inv';
export const ALL_FILE_EXTENSIONS = [MDX_EXTENSION, JSON_EXTENSION, INV_EXTENSION, ...IMAGE_EXTENSIONS];

const getPrefix = (lowerPath: string): string => {
  if (IMAGE_EXTENSIONS.some((ext) => lowerPath.endsWith(ext))) return 'image';
  if (lowerPath.endsWith(JSON_EXTENSION)) return 'reference';
  if (lowerPath.endsWith(INV_EXTENSION)) return 'inventory';
  return 'mdx';
};

/** create a key for blob store, such as: `image/path/to/file.png` or `mdx/path/to/file.mdx` */
export const getBlobKey = (relativePath: string): string => {
  const lowerPath = relativePath.toLowerCase();
  return `${getPrefix(lowerPath)}/${lowerPath}`;
};

/** Same as getBlobKey but preserves original casing — use as camelCase fallback during lowercase migration */
export const getBlobKeyOriginalCase = (relativePath: string): string => {
  return `${getPrefix(relativePath.toLowerCase())}/${relativePath}`;
};
