/**
 * A layout is UI that is shared all pages prepended by /mdx/<path>.
 * On navigation, layouts preserve state, remain interactive, and do not rerender.
 */
import { LeafyGreenProviderWrapper } from '@/app/emotion';
import { SiteBannerProvider } from '@/components/banner/site-banner/banner-context';
import Analytics from '@/components/head-scripts/anayltics';
import { DarkModeContextProvider } from '@/context/dark-mode-context';
import { getBannerData } from '@/services/db/banner';
import Footer from '@/components/footer';
import { darkModeScript } from '@/app/lib/dark-mode-script';

import mdxLayoutStyles from './layout.module.scss';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const bannerData = await getBannerData();

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
            <LeafyGreenProviderWrapper>
              <SiteBannerProvider bannerData={bannerData}>
                <Analytics />
                {children}
                <Footer />
              </SiteBannerProvider>
            </LeafyGreenProviderWrapper>
          </DarkModeContextProvider>
        </SiteBannerProvider>
      </div>
    </>
  );
}
