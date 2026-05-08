import { LeafyGreenProviderWrapper } from '@/app/emotion';
import { DarkModeContextProvider } from '@/context/dark-mode-context';
import { darkModeScript } from '@/app/lib/dark-mode-script';
import { CookiesProvider } from '@/context/cookies-context';

import mdxLayoutStyles from './layout.module.scss';

export default function LayoutOffline({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: darkModeScript,
        }}
      />
      <div className={mdxLayoutStyles.layout}>
        <DarkModeContextProvider>
          <CookiesProvider cookies={{}}>
            <LeafyGreenProviderWrapper>{children}</LeafyGreenProviderWrapper>
          </CookiesProvider>
        </DarkModeContextProvider>
      </div>
    </>
  );
}
