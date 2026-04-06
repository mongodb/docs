import React from 'react';

import { render, waitFor, fireEvent } from '@testing-library/react';
import DownloadButton from '@/components/offline-download-modal/download-button';
import { OfflineDownloadProvider } from '@/components/offline-download-modal/download-context';
import { setMatchMedia } from '../utils';

jest.mock('@/context/unified-toc-context', () => ({
  useUnifiedToc: () => ({
    tocTree: [],
    processedUnifiedToc: [],
  }),
}));

jest.mock('@/context/version-context', () => ({
  useVersionContext: () => ({
    availableVersions: {},
    activeVersions: {},
  }),
}));

describe('Offline download button', () => {
  beforeAll(() => {
    setMatchMedia();
  });

  it('opens the offline modal when clicked', async () => {
    const renderRes = render(
      <OfflineDownloadProvider>
        <DownloadButton />
      </OfflineDownloadProvider>,
    );
    const button = renderRes.container.querySelector('button');
    fireEvent.click(button as HTMLButtonElement);
    await waitFor(() => {
      expect(renderRes.getByRole('dialog')).toBeTruthy();
    });

    expect(renderRes.baseElement).toMatchSnapshot();
  });
});
