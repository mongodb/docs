import { LeafyGreenProviderWrapper } from '@/app/emotion';
import { SiteBannerProvider } from '@/mdx-components/SiteBannerProvider';
import { Analytics } from '@/mdx-components/Analytics';
import { DarkModeContextProvider } from '@/context/dark-mode-context';
import { getBannerData } from '@/services/db/banner';
import { Footer } from '@/mdx-components/Footer';
import { darkModeScript } from '@/app/lib/dark-mode-script';
import { CookiesProvider } from '@/context/cookies-context';
import { cookies as nextCookies } from 'next/headers';
import mdxLayoutStyles from '../[...path]/layout.module.scss';

export default async function SearchLayout({ children }: { children: React.ReactNode }) {
  const bannerData = await getBannerData();
  const cookieStore = nextCookies();
  const cookieValues = cookieStore.getAll().reduce((acc, cookie) => {
    acc[cookie.name] = cookie.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: darkModeScript,
        }}
      />
      <div className={mdxLayoutStyles.layout}>
        <SiteBannerProvider bannerData={bannerData}>
          <DarkModeContextProvider>
            <CookiesProvider cookies={cookieValues}>
              <LeafyGreenProviderWrapper>
                <Analytics />
                {children}
                <Footer />
              </LeafyGreenProviderWrapper>
            </CookiesProvider>
          </DarkModeContextProvider>
        </SiteBannerProvider>
      </div>
    </>
  );
}
