import { theme } from '@/styles/theme';
import useMedia from './use-media';

export default function useScreenSize() {
  const isMobile = useMedia(theme.screenSize.upToSmall);
  const isTabletOrMobile = useMedia(theme.screenSize.upToLarge);
  const isMedium = useMedia(theme.screenSize.upToMedium);
  const isTablet = useMedia(theme.screenSize.tablet);
  const isDesktop = useMedia(theme.screenSize.upTo2XLarge);
  const isLargeDesktop = useMedia(theme.screenSize.upTo3XLarge);

  const screen = {
    isMobile,
    isTabletOrMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isMedium,
  };
  return screen;
}
