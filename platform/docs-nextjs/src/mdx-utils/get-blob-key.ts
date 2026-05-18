export const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
export const JSON_EXTENSION = '.json';
export const MDX_EXTENSION = '.mdx';
export const INV_EXTENSION = '.inv';
export const ALL_FILE_EXTENSIONS = [MDX_EXTENSION, JSON_EXTENSION, INV_EXTENSION, ...IMAGE_EXTENSIONS];

export const IMAGE_PREFIX = 'image';
export const MDX_PREFIX = 'mdx';
export const REFERENCE_PREFIX = 'reference';
export const INVENTORY_PREFIX = 'inventory';

/** create a key for blob store, such as: `image/path/to/file.png` or `mdx/path/to/file.mdx` */
export const getBlobKey = (relativePath: string) => {
  const isImage = IMAGE_EXTENSIONS.some((ext) => relativePath.toLowerCase().endsWith(ext));
  const isJson = relativePath.toLowerCase().endsWith(JSON_EXTENSION);
  const isInv = relativePath.toLowerCase().endsWith(INV_EXTENSION);

  let prefix = MDX_PREFIX;
  if (isImage) prefix = IMAGE_PREFIX;
  if (isJson) prefix = REFERENCE_PREFIX;
  if (isInv) prefix = INVENTORY_PREFIX;

  return `${prefix}/${relativePath}`;
};
