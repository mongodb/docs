import { DOTCOM_BASE_URL, ICONS_BASE_URL } from '@/constants';

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
      // Ensure proper URL joining with slashes. Docsets prefixes do not have leading slashes
      const prefix = siteBasePrefix.length ? `${DOTCOM_BASE_URL}/${siteBasePrefix}` : DOTCOM_BASE_URL;
      return isDarkMode && iconDark ? `${prefix}${iconDark}` : `${prefix}${icon}`;
    }

    const getIcon = `${icon}${isDarkMode ? '_inverse' : ''}`;
    // ICONS_BASE_URL already has trailing slash, so just concatenate
    return `${ICONS_BASE_URL}${getIcon}.svg`;
  }

  return '';
};
