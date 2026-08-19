import {
  findStyleTags,
  formatBytes,
  formatShare,
  isHtmlDocument,
  measureHtml,
  pageUrl,
  parseArgs,
  selectGroup,
  totalMeasurements,
} from '../../../scripts/lib/inline-css';

/**
 * The inline-CSS byte report is only useful if the baseline and the
 * end-of-migration run are parsed identically, so the parsing is pinned here.
 */

const html = [
  '<!DOCTYPE html><html><head>',
  '<style data-emotion="css 1abcdef">.a{color:red}</style>',
  '<style data-emotion="css-global xyz">body{margin:0}</style>',
  '<style>.plain{padding:0}</style>',
  '</head><body><nav>nav</nav><main>content</main></body></html>',
].join('');

describe('findStyleTags', () => {
  it('finds every style tag and flags the Emotion ones', () => {
    const tags = findStyleTags(html);

    expect(tags).toHaveLength(3);
    expect(tags.map((tag) => tag.isEmotion)).toEqual([true, true, false]);
  });

  it('counts tag markup and CSS text separately', () => {
    const [first] = findStyleTags(html);

    expect(first.cssBytes).toBe('.a{color:red}'.length);
    expect(first.tagBytes).toBe('<style data-emotion="css 1abcdef">.a{color:red}</style>'.length);
  });

  it('is not affected by regex lastIndex state across calls', () => {
    expect(findStyleTags(html)).toHaveLength(3);
    expect(findStyleTags(html)).toHaveLength(3);
  });

  it('returns nothing for a document with no style tags', () => {
    expect(findStyleTags('<html><body><main>hi</main></body></html>')).toEqual([]);
  });

  it('matches regardless of tag case', () => {
    expect(findStyleTags('<STYLE>.a{color:red}</STYLE>')).toHaveLength(1);
  });

  it('does not double-count Next.js flight-payload styles, which escape the angle bracket', () => {
    // Next escapes `<` inside the RSC payload script, so style markup repeated
    // there must not count twice. Confirmed against a real page: one literal, one match.
    const escapedLt = `${String.fromCharCode(92)}u003c`;
    const flightPayload = `<script>self.__next_f.push("${escapedLt}style>.a{}${escapedLt}/style>")</script>`;

    expect(flightPayload).not.toContain('<style');
    expect(findStyleTags(flightPayload)).toEqual([]);
  });
});

describe('measureHtml', () => {
  it('reports inline style bytes and their share of the document', () => {
    const result = measureHtml(html);

    expect(result.totalBytes).toBe(Buffer.byteLength(html, 'utf8'));
    expect(result.styleTagCount).toBe(3);
    expect(result.emotionTagCount).toBe(2);
    expect(result.emotionStyleBytes).toBeLessThan(result.inlineStyleBytes);
    expect(result.inlineCssBytes).toBeLessThan(result.inlineStyleBytes);
    expect(result.inlineStyleShare).toBeCloseTo(result.inlineStyleBytes / result.totalBytes);
  });

  it('records how many bytes precede the first <main>', () => {
    expect(measureHtml(html).bytesBeforeMain).toBe(Buffer.byteLength(html.slice(0, html.indexOf('<main>')), 'utf8'));
  });

  it('reports null bytesBeforeMain when the document has no <main>', () => {
    expect(measureHtml('<html><body>no main here</body></html>').bytesBeforeMain).toBeNull();
  });

  it('counts bytes rather than characters for multi-byte CSS content', () => {
    const multibyte = '<style>.a::after{content:"→"}</style>';

    expect(measureHtml(multibyte).inlineCssBytes).toBe(Buffer.byteLength('.a::after{content:"→"}', 'utf8'));
  });

  it('counts a style tag after <main> in the byte total but not in bytesBeforeMain', () => {
    // The two figures are computed independently, so they could silently drift.
    const late = '<html><body><main>hi</main><style>.a{color:red}</style></body></html>';
    const result = measureHtml(late);

    expect(result.styleTagCount).toBe(1);
    expect(result.inlineStyleBytes).toBe('<style>.a{color:red}</style>'.length);
    expect(result.bytesBeforeMain).toBe(Buffer.byteLength('<html><body>', 'utf8'));
  });

  it('counts bytes, not characters, for multi-byte content ahead of <main>', () => {
    const prefix = '<html><body><p>café — naïve</p>';
    const result = measureHtml(`${prefix}<main>hi</main></body></html>`);

    expect(result.bytesBeforeMain).toBe(Buffer.byteLength(prefix, 'utf8'));
    expect(result.bytesBeforeMain).toBeGreaterThan(prefix.length);
  });

  it('does not divide by zero on an empty document', () => {
    expect(measureHtml('').inlineStyleShare).toBe(0);
  });
});

describe('isHtmlDocument', () => {
  it('accepts a real document', () => {
    expect(isHtmlDocument(html)).toBe(true);
    expect(isHtmlDocument('<html lang="en"><body></body></html>')).toBe(true);
  });

  it('rejects an empty 200 body, which would otherwise measure as zero inline CSS', () => {
    expect(isHtmlDocument('')).toBe(false);
  });

  it('rejects a non-HTML body', () => {
    expect(isHtmlDocument('{"error":"not found"}')).toBe(false);
  });
});

describe('selectGroup', () => {
  const manual = { project: 'manual', version: 'manual', pages: [] };
  const atlas = { project: 'atlas', version: 'current', pages: [] };

  it('returns the named group', () => {
    expect(selectGroup([manual, atlas], 'atlas')).toBe(atlas);
  });

  it('defaults to the only group when the sample defines one', () => {
    expect(selectGroup([manual], undefined)).toBe(manual);
  });

  it('requires a group when the sample defines several, and lists them', () => {
    expect(() => selectGroup([manual, atlas], undefined)).toThrow(/--group is required.*manual, atlas/);
  });

  it('rejects an unknown group name', () => {
    expect(() => selectGroup([manual, atlas], 'compass')).toThrow(/Unknown group "compass".*manual, atlas/);
  });
});

describe('parseArgs', () => {
  const known = ['base-url', 'json'] as const;

  it('reads flag/value pairs', () => {
    expect(parseArgs(['--base-url', 'http://localhost:3000', '--json', 'out.json'], known)).toEqual({
      'base-url': 'http://localhost:3000',
      json: 'out.json',
    });
  });

  it('rejects an unknown flag rather than silently dropping it', () => {
    // A dropped `--baseurl` typo would otherwise surface as "missing --base-url".
    expect(() => parseArgs(['--baseurl', 'http://localhost:3000'], known)).toThrow(/Unknown flag "--baseurl"/);
  });

  it('rejects a flag with no value', () => {
    expect(() => parseArgs(['--base-url', '--json', 'out.json'], known)).toThrow(/Missing value for --base-url/);
    expect(() => parseArgs(['--base-url'], known)).toThrow(/Missing value for --base-url/);
  });

  it('rejects a stray positional argument', () => {
    expect(() => parseArgs(['oops'], known)).toThrow(/Unexpected argument "oops"/);
  });

  it('accepts no arguments', () => {
    expect(parseArgs([], known)).toEqual({});
  });
});

describe('totalMeasurements', () => {
  it('sums bytes and recomputes the share from the totals', () => {
    const total = totalMeasurements([measureHtml(html), measureHtml(html)]);
    const single = measureHtml(html);

    expect(total.totalBytes).toBe(single.totalBytes * 2);
    expect(total.styleTagCount).toBe(single.styleTagCount * 2);
    // Recomputed, not averaged — so it matches the true share across the sample.
    expect(total.inlineStyleShare).toBeCloseTo(single.inlineStyleShare);
    expect(total.bytesBeforeMain).toBeNull();
  });

  it('handles an empty sample', () => {
    expect(totalMeasurements([]).inlineStyleShare).toBe(0);
  });
});

describe('pageUrl', () => {
  it('appends a slug with a trailing slash', () => {
    expect(pageUrl('http://localhost:3000/docs/x/current', 'connect')).toBe(
      'http://localhost:3000/docs/x/current/connect/',
    );
  });

  it('treats an empty slug as the project root', () => {
    expect(pageUrl('http://localhost:3000/docs/x/current', '')).toBe('http://localhost:3000/docs/x/current/');
  });

  it('normalizes stray slashes on either side of the join', () => {
    expect(pageUrl('http://localhost:3000/docs/x/current/', '/model-data/indexes/')).toBe(
      'http://localhost:3000/docs/x/current/model-data/indexes/',
    );
  });
});

describe('formatting', () => {
  it('scales byte counts', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(2048)).toBe('2.0 KB');
    expect(formatBytes(5 * 1024 * 1024)).toBe('5.00 MB');
  });

  it('formats a fraction as a percentage', () => {
    expect(formatShare(0.605)).toBe('60.5%');
  });
});
