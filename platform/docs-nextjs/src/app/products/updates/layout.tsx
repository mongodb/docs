import { LeafyGreenProviderWrapper } from '@/app/emotion';
import { SiteBannerProvider } from '@/components/banner/site-banner/banner-context';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { getBannerData } from '@/services/db/banner';
import productUpdatesLayoutStyles from './layout.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New in MongoDB | MongoDB',
  description:
    'Check out the latest updates in MongoDB – including improvements to the developer experience, expanded workload support, app modernization tools, and more.',
};

export default async function ProductUpdatesLayout({ children }: { children: React.ReactNode }) {
  const bannerData = await getBannerData();

  return (
    <div className={productUpdatesLayoutStyles.layout}>
      <SiteBannerProvider bannerData={bannerData}>
        <LeafyGreenProviderWrapper>
          <Header />
          {children}
          <Footer />
        </LeafyGreenProviderWrapper>
      </SiteBannerProvider>
    </div>
  );
}
