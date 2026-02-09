import { expect } from 'vitest';
import { mdxToMarkdown } from '../src/parse.js';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get the test fixtures directory path
 */
export function getFixturesDir(): string {
  return join(__dirname, 'fixtures');
}

/**
 * Get the content-mdx directory path for testing includes
 */
export function getContentMdxDir(): string {
  // Go up from test -> mdx-to-md -> tools -> platform -> root -> content-mdx
  return join(__dirname, '..', '..', '..', '..', 'content-mdx');
}

/** Options passed to mdxToMarkdown in test helpers */
export interface TestMdxOptions {
  contentMdxDir?: string;
  sourceFilePath?: string;
  /** Override how include warnings are reported (e.g. no-op in tests) */
  onWarning?: (message: string, err?: unknown) => void;
}

/**
 * Helper to test MDX to Markdown conversion
 */
export async function testConversion(
  mdx: string,
  expected: string | RegExp,
  options?: TestMdxOptions
): Promise<void> {
  const result = await mdxToMarkdown(
    mdx,
    options?.contentMdxDir,
    options?.sourceFilePath,
    { onWarning: options?.onWarning }
  );

  if (typeof expected === 'string') {
    expect(result.trim()).toBe(expected.trim());
  } else {
    expect(result).toMatch(expected);
  }
}

/**
 * Helper to test that output contains certain text
 */
export async function testContains(
  mdx: string,
  expectedText: string | string[],
  options?: TestMdxOptions
): Promise<void> {
  const result = await mdxToMarkdown(
    mdx,
    options?.contentMdxDir,
    options?.sourceFilePath,
    { onWarning: options?.onWarning }
  );

  const texts = Array.isArray(expectedText) ? expectedText : [expectedText];
  for (const text of texts) {
    expect(result).toContain(text);
  }
}

/**
 * Helper to test that output does NOT contain certain text
 */
export async function testNotContains(
  mdx: string,
  unexpectedText: string | string[],
  options?: TestMdxOptions
): Promise<void> {
  const result = await mdxToMarkdown(
    mdx,
    options?.contentMdxDir,
    options?.sourceFilePath,
    { onWarning: options?.onWarning }
  );

  const texts = Array.isArray(unexpectedText) ? unexpectedText : [unexpectedText];
  for (const text of texts) {
    expect(result).not.toContain(text);
  }
}

