import { LeafyGreenProviderWrapper } from '@/app/emotion';
import { DarkModeContextProvider } from '@/context/dark-mode-context';
import { darkModeScript } from '@/app/lib/dark-mode-script';

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
          <LeafyGreenProviderWrapper>{children}</LeafyGreenProviderWrapper>
        </DarkModeContextProvider>
      </div>
    </>
  );
}
