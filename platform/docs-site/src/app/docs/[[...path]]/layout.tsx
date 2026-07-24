/**
 * A layout is UI that is shared all pages prepended by /docs/<path>.
 * On navigation, layouts preserve state, remain interactive, and do not rerender.
 */
import { LeafyGreenProviderWrapper } from '@/app/emotion';
import { SiteBannerProvider } from '@/mdx-components/SiteBannerProvider';
import { Analytics } from '@/mdx-components/Analytics';
import { DarkModeContextProvider } from '@/context/dark-mode-context';
import { getBannerData } from '@/services/db/banner';
import { Footer } from '@/mdx-components/Footer';
import { darkModeScript } from '@/app/lib/dark-mode-script';
import { CookiesProvider } from '@/context/cookies-context';
import { LocaleProvider } from '@/context/locale';
import { COOKIE_KEY_PREF_LOCALE, getInitialLocaleFromCookie } from '@/utils/locale';
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
  const initialLocale = getInitialLocaleFromCookie(cookieValues[COOKIE_KEY_PREF_LOCALE]);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: darkModeScript,
        }}
      />
      <div className={mdxLayoutStyles.hiddenDirective}>
        For AI agents: a documentation index is available at https://www.mongodb.com/docs/llms.txt — markdown versions
        of all pages are available by appending .md to any URL path.
      </div>
      <div className={mdxLayoutStyles.layout}>
        <LocaleProvider initialLocale={initialLocale}>
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
        </LocaleProvider>
      </div>
    </>
  );
}
