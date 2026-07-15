import { normalizeHeadingOptions } from '../src/core/convertSnootyAstToMdast/normalizeHeadingOptions';

describe('normalizeHeadingOptions', () => {
  it('strips the abbr expansion from a heading title and recomputes a matching id', () => {
    const [heading] = normalizeHeadingOptions([
      {
        depth: 3,
        id: 'aws--amazon-web-services--kinesis-data-stream',
        selector_ids: {},
        title: [
          { type: 'role', name: 'abbr', children: [{ type: 'text', value: 'AWS (Amazon Web Services)' }] },
          { type: 'text', value: ' Kinesis Data Stream' },
        ],
      },
    ]);

    expect(heading.title).toEqual([
      { type: 'text', value: 'AWS' },
      { type: 'text', value: ' Kinesis Data Stream' },
    ]);
    expect(heading.id).toBe('aws-kinesis-data-stream');
  });

  it('leaves a heading with no abbr role completely untouched, including its original id', () => {
    const heading = {
      depth: 2,
      // Deliberately not a well-formed slug, to prove this is passed through as-is rather
      // than recomputed — normalizeHeadingOptions only touches headings with abbr roles.
      id: 'Some Legacy Id Format',
      selector_ids: {},
      title: [{ type: 'text', value: 'Plain Heading' }],
    };

    const [result] = normalizeHeadingOptions([heading]);

    expect(result).toBe(heading);
  });

  it('disambiguates a changed heading against the text of an earlier, unaffected heading', () => {
    // Heading A has no abbr, so it's left untouched — but its text must still be registered
    // with the slugger so heading B's recomputed id doesn't collide with it.
    const [headingA, headingB] = normalizeHeadingOptions([
      { depth: 2, id: 'section-1', selector_ids: {}, title: [{ type: 'text', value: 'Overview' }] },
      {
        depth: 2,
        id: 'section-2',
        selector_ids: {},
        title: [{ type: 'role', name: 'abbr', children: [{ type: 'text', value: 'Overview (Full Overview)' }] }],
      },
    ]);

    expect(headingA.id).toBe('section-1');
    expect(headingB.id).toBe('overview-1');
  });

  it('strips two separate abbr roles within the same heading title', () => {
    const [heading] = normalizeHeadingOptions([
      {
        depth: 2,
        id: 'aws--amazon-web-services--vs--gcp--google-cloud-platform-',
        selector_ids: {},
        title: [
          { type: 'role', name: 'abbr', children: [{ type: 'text', value: 'AWS (Amazon Web Services)' }] },
          { type: 'text', value: ' vs ' },
          { type: 'role', name: 'abbr', children: [{ type: 'text', value: 'GCP (Google Cloud Platform)' }] },
        ],
      },
    ]);

    expect(heading.title).toEqual([
      { type: 'text', value: 'AWS' },
      { type: 'text', value: ' vs ' },
      { type: 'text', value: 'GCP' },
    ]);
    expect(heading.id).toBe('aws-vs-gcp');
  });

  it('handles an abbr role nested inside another inline node', () => {
    const [heading] = normalizeHeadingOptions([
      {
        depth: 2,
        id: 'stale',
        selector_ids: {},
        title: [
          {
            type: 'strong',
            children: [
              { type: 'role', name: 'abbr', children: [{ type: 'text', value: 'MQL (MongoDB Query Language)' }] },
            ],
          },
        ],
      },
    ]);

    expect(heading.title).toEqual([{ type: 'strong', children: [{ type: 'text', value: 'MQL' }] }]);
    expect(heading.id).toBe('mql');
  });
});
