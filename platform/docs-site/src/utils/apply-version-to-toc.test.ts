import type { TocItem } from '@/mdx-components/UnifiedSidenav/types';
import { applyVersionToToc } from '@/utils/apply-version-to-toc';

describe('applyVersionToToc', () => {
  it('replaces :version placeholders', () => {
    const toc: TocItem[] = [
      { label: 'Overview', contentSite: 'kafka-connector', url: '/docs/kafka-connector/:version/' },
    ];
    expect(applyVersionToToc(toc, 'v1.12')[0].url).toBe('/docs/kafka-connector/v1.12/');
  });

  it('lowercases mixed-case ToC slugs', () => {
    const toc: TocItem[] = [
      {
        label: 'Change Streams',
        contentSite: 'docs',
        url: '/docs/:version/changeStreams',
      },
      {
        label: 'findOneAndUpdate',
        contentSite: 'docs',
        url: '/docs/:version/reference/method/db.collection.findOneAndUpdate',
      },
    ];
    const result = applyVersionToToc(toc, 'v8.0');
    expect(result[0].url).toBe('/docs/v8.0/changestreams');
    expect(result[1].url).toBe(
      '/docs/v8.0/reference/method/db.collection.findoneandupdate',
    );
  });
});
