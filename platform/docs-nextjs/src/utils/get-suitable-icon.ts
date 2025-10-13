export const getSuitableIcon = (icon: string | undefined, iconDark: string | undefined, isDarkMode: boolean) => {
  if (typeof icon == 'string') {
    const isPath = icon.startsWith('/');
    const getIcon = `${icon}${isDarkMode ? '_inverse' : ''}`;
    const imageUrl = `https://webimages.mongodb.com/_com_assets/icons/${getIcon}.svg`;

    return isPath ? (isDarkMode && iconDark ? iconDark : icon) : imageUrl;
  }

  return '';
};
