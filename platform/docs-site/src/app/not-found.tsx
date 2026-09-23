'use client';

import { ErrorPage } from '@/templates/error-template';
import { darkModeScript } from '@/app/lib/dark-mode-script';
import { DarkModeContextProvider } from '@/context/dark-mode-context';
import { LeafyGreenProviderWrapper } from '@/app/emotion';
import { ViaProviderWrapper } from '@/app/via-provider';
import { getBasePath } from '@/utils/base-path';
import { NotFoundBody } from './NotFoundBody';
import styles from './not-found.module.scss';

/**
 * A root not-found page renders under app/layout.tsx alone — [[...path]]/layout.tsx
 * is skipped — so mount its providers here. Without LeafyGreenProviderWrapper, the
 * ActionBar's styles never render: emotion's compat mode only emits CSS into the
 * server-rendered HTML and does not inject on the client.
 */
export default function NotFound() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
      <DarkModeContextProvider>
        <LeafyGreenProviderWrapper>
          <ViaProviderWrapper>
            <ErrorPage
              imageSrc={`${getBasePath()}/404.png`}
              imageAlt="Page not found"
              title="Sorry, we can't find that page."
              imageStyle={styles.centeredImage}
              showContactSupport={false}
            >
              <NotFoundBody />
            </ErrorPage>
          </ViaProviderWrapper>
        </LeafyGreenProviderWrapper>
      </DarkModeContextProvider>
    </>
  );
}
