import type { SiteBannerContent } from '@/components/banner/site-banner/types';
import type { Environments } from '@/utils/env-config';

const fetchBanner = async () => {
  const isStaging = ['staging', 'development', 'dotcomstg'].includes(process.env.DB_ENV as Environments);
  try {
    const bannerResponse = await fetch(
      `${process.env.GATSBY_NEXT_API_BASE_URL}/banners/${isStaging ? '?staging=true' : ''}`,
    );
    const bannerData = await bannerResponse.json();
    return await bannerData;
  } catch (e) {
    console.error(`Error while fetching banner data from Nextjs: ${e}`);
    return null;
  }
};

export const getBannerData = async (): Promise<SiteBannerContent> => {
  const banner = await fetchBanner();
  return {
    isEnabled: !!banner?.isEnabled,
    altText: banner?.altText ?? '',
    imgPath: banner?.imgPath,
    tabletImgPath: banner?.tabletImgPath,
    mobileImgPath: banner?.mobileImgPath,
    bgColor: banner?.bgColor,
    text: banner?.text,
    pillText: banner?.pillText,
    url: banner?.url ?? '',
  };
};
