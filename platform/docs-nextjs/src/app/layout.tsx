import type { Metadata } from 'next';
import './globals.css';
import '@/styles/mongodb-docs.css';
import '@/styles/global-dark-mode.css';
import '@/styles/icons.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import TrackJSProvider from '@/components/trackjs-provider';
import { LeafyGreenProviderWrapper } from './emotion';
import layoutStyles from './layout.module.scss';
import { DarkModeContextProvider } from '@/context/dark-mode-context';
import { SiteBannerProvider } from '@/components/banner/site-banner/banner-context';
import { getBannerData } from '@/services/db/banner';

export const metadata: Metadata = {
  title: 'MongoDB Docs',
  description: 'MongoDB Documentation',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bannerData = await getBannerData();

  return (
    <html lang="en">
      <body>
        <TrackJSProvider />
        <div className={layoutStyles.layout}>
          <DarkModeContextProvider>
            {/* <HeaderContextProvider bannerData={bannerData}> */}
            <LeafyGreenProviderWrapper>
              <SiteBannerProvider bannerData={bannerData}>
                <Header />
                {children}
              </SiteBannerProvider>
              <Footer />
            </LeafyGreenProviderWrapper>
            {/* </HeaderContextProvider> */}
          </DarkModeContextProvider>
        </div>
      </body>
    </html>
  );
}
