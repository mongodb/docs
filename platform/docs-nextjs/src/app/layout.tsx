import type { Metadata } from 'next';
import './globals.css';
import '@/styles/mongodb-docs.css';
import '@/styles/global-dark-mode.css';
import '@/styles/icons.css';
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

  // Inline blocking script that runs synchronously when HTML is parsed
  // This must be inline to prevent any flash of unstyled content
  const blockingDarkModeScript = `
    (function() {
      try {
        var d = document.documentElement.classList;
        d.remove("light-theme", "dark-theme", "system");
        var h = window.location.href;
        if (h && h.includes('/openapi/preview')) return;
        var storage = null;
        try {
          storage = window.localStorage.getItem("mongodb-docs");
        } catch(e) {}
        var e = storage ? JSON.parse(storage || "{}")?.["theme"] : null;
        if ("system" === e || (!e)) {
          var t = "(prefers-color-scheme: dark)",
            m = window.matchMedia ? window.matchMedia(t) : null;
          if (m && (m.media !== t || m.matches)) {
            d.add("dark-theme", "system");
          } else {
            d.add("light-theme", "system");
          }
        } else if (e) {
          var x = { "light-theme": "light-theme", "dark-theme": "dark-theme" };
          if (x[e]) d.add(x[e]);
        }
      } catch (e) {
        // Silently fail - fallback to light mode
        document.documentElement.classList.add("light-theme");
      }
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: blockingDarkModeScript,
          }}
        />
        <TrackJSProvider />
        <div className={layoutStyles.layout}>
          <DarkModeContextProvider>
            {/* <HeaderContextProvider bannerData={bannerData}> */}
            <LeafyGreenProviderWrapper>
              <SiteBannerProvider bannerData={bannerData}>{children}</SiteBannerProvider>
              <Footer />
            </LeafyGreenProviderWrapper>
            {/* </HeaderContextProvider> */}
          </DarkModeContextProvider>
        </div>
      </body>
    </html>
  );
}
