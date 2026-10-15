'use client';

import { useEffect } from 'react';
import { Text, TextStyle } from '@via-ds/components/typography';
import { Size } from '@via-ds/components/types';
import { ViaColorSchemeScript } from '@via-ds/components/provider';
import { ErrorPage } from '@/templates/error-template';
import { darkModeScript } from '@/app/lib/dark-mode-script';
import { DarkModeContextProvider } from '@/context/dark-mode-context';
import { LeafyGreenProviderWrapper } from '@/app/emotion';
import { ViaProviderWrapper } from '@/app/via-provider';
import { getBasePath } from '@/utils/base-path';
import { reportError } from '@/utils/trackjs';
import styles from './error.module.scss';

export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    reportError(error);
  }, [error]);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
      <ViaColorSchemeScript />
      <DarkModeContextProvider>
        <LeafyGreenProviderWrapper>
          <ViaProviderWrapper>
            <ErrorPage
              imageSrc={`${getBasePath()}/500.png`}
              imageAlt="Internal server error"
              imageStyle={styles.centeredImage}
              title="Something went wrong on our end."
            >
              <Text textStyle={TextStyle.body} size={Size.Large}>
                Try reloading the page.
              </Text>
            </ErrorPage>
          </ViaProviderWrapper>
        </LeafyGreenProviderWrapper>
      </DarkModeContextProvider>
    </>
  );
}
