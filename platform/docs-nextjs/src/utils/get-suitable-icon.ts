import { ICONS_BASE_URL, INTERNAL_IMAGE_API_PATH } from '@/constants';

// Mirrors blob-path-remap.ts stripDocsPrefix (kept inline — that file uses fs, client-unsafe).
function stripDocsPrefix(prefix: string): string {
  if (prefix === 'docs') return '';
  if (prefix.startsWith('docs/')) return prefix.slice(5);
  return prefix;
}

export const getSuitableIcon = ({
  icon,
  iconDark,
  isDarkMode,
  siteBasePrefix,
}: {
  icon?: string;
  iconDark?: string;
  isDarkMode?: boolean;
  siteBasePrefix: string;
}) => {
  if (typeof icon === 'string') {
    if (icon.startsWith('/')) {
      const selectedIcon = isDarkMode && iconDark ? iconDark : icon;
      const blobPrefix = stripDocsPrefix(siteBasePrefix);
      const imagePath = blobPrefix ? `${blobPrefix}${selectedIcon}` : selectedIcon.replace(/^\//, '');
      return `${INTERNAL_IMAGE_API_PATH}${imagePath}`;
    }

    const getIcon = `${icon}${isDarkMode ? '_inverse' : ''}`;
    // ICONS_BASE_URL already has trailing slash, so just concatenate
    return `${ICONS_BASE_URL}${getIcon}.svg`;
  }

  return '';
};
