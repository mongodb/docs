import type { TocItem } from '@/mdx-components/UnifiedSidenav/types';
import { applyVersionToToc } from '@/utils/apply-version-to-toc';

describe('applyVersionToToc', () => {
  it('replaces :version placeholders', () => {
    const toc: TocItem[] = [
      { label: 'Overview', contentSite: 'kafka-connector', url: '/docs/kafka-connector/:version/' },
    ];
    expect(applyVersionToToc(toc, 'v1.12')[0].url).toBe('/docs/kafka-connector/v1.12/');
  });
});
