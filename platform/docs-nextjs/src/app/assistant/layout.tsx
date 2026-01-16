import { darkModeScript } from '@/app/lib/dark-mode-script';
import { SiteBannerProvider } from '@/components/banner/site-banner/banner-context';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { DarkModeContextProvider } from '@/context/dark-mode-context';
import type { Metadata } from 'next';
import { getBannerData } from '@/services/db/banner';

import assistantLayoutStyles from './layout.module.scss';
import { LeafyGreenProviderWrapper } from '../emotion';

export const metadata: Metadata = {
  title: 'MongoDB AI Assistant | MongoDB',
  description: 'Your AI-powered MongoDB assistant to give expert guidance and recommendations for all things MongoDB.',
};

export default async function AssistantLayout({ children }: { children: React.ReactNode }) {
  const bannerData = await getBannerData();
  console.log('bannerData', bannerData);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: darkModeScript,
        }}
      />
      <div className={assistantLayoutStyles.layout}>
        <SiteBannerProvider bannerData={bannerData}>
          <DarkModeContextProvider>
            <LeafyGreenProviderWrapper>
              <Header eol={false} />
              {children}
              <Footer />
            </LeafyGreenProviderWrapper>
          </DarkModeContextProvider>
        </SiteBannerProvider>
      </div>
    </>
  );
}
