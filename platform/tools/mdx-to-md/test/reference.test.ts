import { describe, it } from 'vitest';
import { testContains, testNotContains, getFixturesDir } from './helpers.js';
import { join } from 'path';

describe('Reference Component', () => {
  const contentMdxDir = join(getFixturesDir(), '..');
  const sourceFilePath = 'django-mongodb/upcoming/page.mdx';

  it('should replace Reference with title from _references.json', async () => {
    const mdx = `See the <Reference name="django-get-started-write" /> guide.`;
    await testContains(mdx, 'Write Data to MongoDB', {
      contentMdxDir,
      sourceFilePath,
    });
    await testNotContains(mdx, '<Reference', {
      contentMdxDir,
      sourceFilePath,
    });
  });

  it('should replace multiple Reference components with their titles', async () => {
    const mdx = `Steps:

* <Reference name="django-get-started-write" />
* <Reference name="django-get-started-query" />`;

    await testContains(mdx, 'Write Data to MongoDB', {
      contentMdxDir,
      sourceFilePath,
    });
    await testContains(mdx, 'Query MongoDB Data', {
      contentMdxDir,
      sourceFilePath,
    });
    await testNotContains(mdx, '<Reference', {
      contentMdxDir,
      sourceFilePath,
    });
  });

  it('should replace flow Reference in a sentence', async () => {
    const mdx = `To learn more, see the <Reference name="django-get-started" /> tutorial.`;
    await testContains(mdx, 'Get Started', {
      contentMdxDir,
      sourceFilePath,
    });
  });

  it('should fall back to name when key is not in _references.json', async () => {
    const mdx = `See <Reference name="unknown-ref-key" />.`;
    await testContains(mdx, 'unknown-ref-key', {
      contentMdxDir,
      sourceFilePath,
    });
    await testNotContains(mdx, '<Reference', {
      contentMdxDir,
      sourceFilePath,
    });
  });

  it('should not replace Reference when contentMdxDir is not provided', async () => {
    const mdx = `See <Reference name="django-get-started-write" />.`;
    await testNotContains(mdx, 'Write Data to MongoDB');
  });

  it('should not replace Reference when sourceFilePath is not provided', async () => {
    const mdx = `See <Reference name="django-get-started-write" />.`;
    await testNotContains(mdx, 'Write Data to MongoDB', {
      contentMdxDir,
    });
  });

  it('should not replace Reference when _references.json does not exist for path', async () => {
    const mdx = `See <Reference name="django-get-started-write" />.`;
    await testNotContains(mdx, 'Write Data to MongoDB', {
      contentMdxDir,
      sourceFilePath: 'nonexistent/version/page.mdx',
    });
  });
});
