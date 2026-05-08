/**
 * A layout is UI that is shared all pages prepended by /docs/<path>.
 * On navigation, layouts preserve state, remain interactive, and do not rerender.
 */
import { LeafyGreenProviderWrapper } from '@/app/emotion';
import { SiteBannerProvider } from '@/components/banner/site-banner/banner-context';
import Analytics from '@/components/head-scripts/anayltics';
import { DarkModeContextProvider } from '@/context/dark-mode-context';
import { getBannerData } from '@/services/db/banner';
import Footer from '@/components/footer';
import { darkModeScript } from '@/app/lib/dark-mode-script';
import { CookiesProvider } from '@/context/cookies-context';
import { cookies as nextCookies } from 'next/headers';

import mdxLayoutStyles from './layout.module.scss';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const bannerData = await getBannerData();
  const cookieStore = nextCookies();
  const cookieArray = cookieStore.getAll();
  const cookieValues = cookieArray.reduce((acc, cookie) => {
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
