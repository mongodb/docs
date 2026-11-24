import type { Metadata } from 'next';
import { LeafyGreenProviderWrapper } from '@/app/emotion';
import { Footer } from '@/mdx-components/Footer';
import { Header } from '@/mdx-components/Header';
import { SiteBannerProvider } from '@/mdx-components/SiteBannerProvider';
import { getBannerData } from '@/services/db/banner';
import layoutStyles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'MongoDB Maintenance Scheduler | MongoDB',
  description:
    'Visualize when MongoDB maintenance will go live across multiple projects on a 2-month calendar. Configure project maintenance windows and wave assignments to plan your rollout schedule.',
};

export default async function MaintenanceSchedulerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bannerData = await getBannerData();

  return (
    <div className={layoutStyles.layout}>
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
