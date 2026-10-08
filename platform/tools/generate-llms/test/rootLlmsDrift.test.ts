import { describe, expect, it } from 'vitest';
import {
  detectDrift,
  extractLinkedUrls,
  formatDriftReport,
  projectForKey,
  validateRootLlmsUpdate,
  unmappedProjects,
} from '../src/rootLlmsDrift';

const ROOT = `# MongoDB Developer Documentation

## Start here by task

* [Get Started](https://www.mongodb.com/docs/get-started.md)

## Browse by area

* [Compass](https://www.mongodb.com/docs/compass/llms.txt)
* [Database Manual – Getting Started (Part 1 of 2)](https://www.mongodb.com/docs/manual/manual-1-llms.txt)
* [Database Manual – Reference (Part 2 of 2)](https://www.mongodb.com/docs/manual/manual-2-llms.txt)
`;

const PUBLISHED = [
  'docs/llms.txt',
  'docs/compass/llms.txt',
  'docs/manual/manual-1-llms.txt',
  'docs/manual/manual-2-llms.txt',
];

const LANDING = [
  { url: 'https://www.mongodb.com/docs/get-started.md', title: 'Get Started' },
];

describe('projectForKey', () => {
  it('derives the project from a part filename', () => {
    expect(projectForKey('docs/manual/manual-3-llms.txt')).toBe('manual');
    expect(projectForKey('docs/atlas/cli/current/atlas-cli-5-llms.txt')).toBe('atlas-cli');
  });

  it('uses the containing directory for a single-file project, skipping version dirs', () => {
    expect(projectForKey('docs/compass/llms.txt')).toBe('compass');
    expect(projectForKey('docs/drivers/go/current/llms.txt')).toBe('go');
    expect(projectForKey('docs/atlas/architecture/current/llms.txt')).toBe('architecture');
  });
});

describe('extractLinkedUrls', () => {
  it('pulls every markdown link target', () => {
    expect(extractLinkedUrls(ROOT)).toContain('https://www.mongodb.com/docs/compass/llms.txt');
    expect(extractLinkedUrls(ROOT)).toHaveLength(4);
  });
});

describe('detectDrift', () => {
  it('reports no drift when the root file matches what is published', () => {
    const report = detectDrift({ rootLlmsContent: ROOT, publishedKeys: PUBLISHED, landingPages: LANDING });
    expect(report.hasDrift).toBe(false);
    expect(formatDriftReport(report)).toContain('up to date');
  });

  it('flags a published project that nothing links to', () => {
    const report = detectDrift({
      rootLlmsContent: ROOT,
      publishedKeys: [...PUBLISHED, 'docs/new-docset/llms.txt'],
      landingPages: LANDING,
    });
    expect(report.hasDrift).toBe(true);
    expect(report.unlinkedFiles).toEqual([
      {
        key: 'docs/new-docset/llms.txt',
        url: 'https://www.mongodb.com/docs/new-docset/llms.txt',
        project: 'new-docset',
      },
    ]);
  });

  it('flags a link whose file is no longer published', () => {
    const report = detectDrift({
      rootLlmsContent: ROOT,
      publishedKeys: PUBLISHED.filter((key) => !key.includes('compass')),
      landingPages: LANDING,
    });
    expect(report.deadLinks).toEqual(['https://www.mongodb.com/docs/compass/llms.txt']);
    expect(report.hasDrift).toBe(true);
  });

  it('flags a project that gained parts, as both unlinked files and a count mismatch', () => {
    const report = detectDrift({
      rootLlmsContent: ROOT,
      publishedKeys: [...PUBLISHED, 'docs/manual/manual-3-llms.txt'],
      landingPages: LANDING,
    });
    expect(report.unlinkedFiles.map((file) => file.key)).toEqual(['docs/manual/manual-3-llms.txt']);
    expect(report.partCountMismatches).toEqual([{ project: 'manual', labelledParts: 2, publishedParts: 3 }]);
  });

  it('reports an unlinked landing page as a candidate without calling it drift', () => {
    const report = detectDrift({
      rootLlmsContent: ROOT,
      publishedKeys: PUBLISHED,
      landingPages: [...LANDING, { url: 'https://www.mongodb.com/docs/build-with-ai.md', title: 'Build with AI' }],
    });
    expect(report.landingPageCandidates).toEqual([
      { url: 'https://www.mongodb.com/docs/build-with-ai.md', title: 'Build with AI' },
    ]);
    // Curated section: a page being absent is usually deliberate.
    expect(report.hasDrift).toBe(false);
    expect(formatDriftReport(report)).toContain('candidates, not required additions');
  });

  it('ignores links outside the docs prefix, like the site-wide llms.txt', () => {
    const withSiteLink = ROOT.replace(
      '## Browse by area',
      '## Browse by area\n\n* [MongoDB site index](https://www.mongodb.com/llms.txt)',
    );
    const report = detectDrift({ rootLlmsContent: withSiteLink, publishedKeys: PUBLISHED, landingPages: LANDING });
    expect(report.deadLinks).toEqual([]);
    expect(report.hasDrift).toBe(false);
  });

  it('treats a landing link whose page is gone as drift', () => {
    const report = detectDrift({ rootLlmsContent: ROOT, publishedKeys: PUBLISHED, landingPages: [] });
    expect(report.deadLandingLinks).toEqual(['https://www.mongodb.com/docs/get-started.md']);
    expect(report.hasDrift).toBe(true);
  });
});

describe('validateRootLlmsUpdate', () => {
  const NEW_KEY = 'docs/new-docset/llms.txt';
  const NEW_URL = 'https://www.mongodb.com/docs/new-docset/llms.txt';
  const publishedKeys = [...PUBLISHED, NEW_KEY];
  const drift = detectDrift({ rootLlmsContent: ROOT, publishedKeys, landingPages: LANDING });

  it('accepts an edit that adds the missing link and changes nothing else', () => {
    const after = ROOT.replace(
      '* [Compass](https://www.mongodb.com/docs/compass/llms.txt)',
      `* [Compass](https://www.mongodb.com/docs/compass/llms.txt)\n* [New Docset](${NEW_URL})`,
    );
    expect(validateRootLlmsUpdate({ before: ROOT, after, drift, publishedKeys })).toEqual([]);
  });

  it('rejects an edit that leaves the drift unresolved', () => {
    const problems = validateRootLlmsUpdate({ before: ROOT, after: ROOT, drift, publishedKeys });
    expect(problems.join(' ')).toContain('Still not linked');
  });

  it('rejects an edit that drops an unrelated link while fixing the drift', () => {
    const after = ROOT.replace(
      '* [Compass](https://www.mongodb.com/docs/compass/llms.txt)',
      `* [New Docset](${NEW_URL})`,
    );
    const problems = validateRootLlmsUpdate({ before: ROOT, after, drift, publishedKeys });
    expect(problems.join(' ')).toContain('Removed links that are still published');
  });

  it('allows removing a link the drift report flagged as dead', () => {
    const withoutCompass = PUBLISHED.filter((key) => !key.includes('compass'));
    const deadDrift = detectDrift({ rootLlmsContent: ROOT, publishedKeys: withoutCompass, landingPages: LANDING });
    const after = ROOT.split('\n')
      .filter((line) => !line.includes('compass'))
      .join('\n');
    expect(
      validateRootLlmsUpdate({ before: ROOT, after, drift: deadDrift, publishedKeys: withoutCompass }),
    ).toEqual([]);
  });

  it('rejects output that is not a markdown document', () => {
    const problems = validateRootLlmsUpdate({
      before: ROOT,
      after: 'Here is your updated file!',
      drift,
      publishedKeys,
    });
    expect(problems.join(' ')).toContain('does not start with a heading');
  });
});

describe('unmappedProjects', () => {
  const excluded = new Set(['404', 'meta']);

  it('reports a content directory with no prefix entry', () => {
    expect(unmappedProjects(['atlas', 'compass', 'new-docset'], ['atlas', 'compass'], excluded)).toEqual([
      'new-docset',
    ]);
  });

  it('ignores directories that are never projects', () => {
    expect(unmappedProjects(['atlas', '404', 'meta'], ['atlas'], excluded)).toEqual([]);
  });

  it('returns nothing when every project is mapped', () => {
    expect(unmappedProjects(['atlas', 'compass'], ['atlas', 'compass', 'extra'], excluded)).toEqual([]);
  });
});
