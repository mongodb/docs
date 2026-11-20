#!/usr/bin/env npx tsx
/**
 * Focused regression checks for constants-aware 404 link preprocessing.
 */
import assert from 'assert';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import {
  expandSnootyTomlInputs,
  expandTemplateMarkers,
  findSnootyToml,
  listSourceDocFiles,
  removeUnexpandedTemplateUrls,
} from './404-lint-rules.js';

// Constants can reference other constants, and both RST template forms expand.
{
  const values = {
    'driver-version': '5.8',
    'api-root': 'https://mongodb.github.io/mongo-java-driver/{+driver-version+}/apidocs',
    'core-api': '{+api-root+}/driver-core/com/mongodb',
    'docs-url': 'https://example.test/v5/',
  };
  const source = [
    '`BulkWriteError <{+core-api+}/bulk/BulkWriteError.html>`__',
    '`Versioned guide <|docs-url|>_',
    'https://example.test/{+unknown+}/page',
  ].join('\n');
  const expanded = expandTemplateMarkers(source, values);
  assert(expanded.includes('https://mongodb.github.io/mongo-java-driver/5.8/apidocs/driver-core/com/mongodb/bulk/BulkWriteError.html'));
  assert(expanded.includes('https://example.test/v5/'));
  assert(expanded.includes('{+unknown+}'), 'unknown markers should remain visible');
}

// Cycles are left unresolved instead of recursing indefinitely.
{
  const expanded = expandTemplateMarkers('{+first+}', {
    first: '{+second+}',
    second: '{+first+}',
  });
  assert.strictEqual(expanded, '{+first+}');
}

// URL templates that could not be expanded are surfaced and removed before Lychee.
{
  const source = [
    'Broken: https://example.test/{+missing+}/page',
    'Also broken: https://example.test/|unknown|/page',
    'Encoded: https://example.test/%7B+unknown+%7D/page',
    'Okay: https://example.test/stable/page',
  ].join('\n');
  const result = removeUnexpandedTemplateUrls(source);
  assert.strictEqual(result.urls.length, 3);
  assert(result.urls[0].includes('{+missing+}'));
  assert(result.urls[1].includes('|unknown|'));
  assert(result.urls[2].includes('%7B+unknown+%7D'));
  assert(!result.content.includes('{+missing+}'));
  assert(result.content.includes('https://example.test/stable/page'));
}

// Passing snooty.toml as a lint input selects documentation in its sibling source tree.
{
  const root = mkdtempSync(join(tmpdir(), '404-lint-selftest-'));
  const sourceDirectory = join(root, 'source');
  mkdirSync(join(sourceDirectory, 'nested'), { recursive: true });
  writeFileSync(join(root, 'snooty.toml'), '[constants]\nexample = "https://example.test"\n');
  writeFileSync(join(sourceDirectory, 'page.txt'), 'Page');
  writeFileSync(join(sourceDirectory, 'nested', 'include.rst'), 'Include');
  writeFileSync(join(sourceDirectory, 'nested', 'data.json'), '{}');

  try {
    const sourceFiles = listSourceDocFiles(join(root, 'snooty.toml'));
    assert.strictEqual(sourceFiles.length, 2);
    assert.strictEqual(findSnootyToml(join(sourceDirectory, 'nested', 'include.rst')), join(root, 'snooty.toml'));
    const expandedInputs = expandSnootyTomlInputs([
      join(root, 'snooty.toml'),
      join(sourceDirectory, 'page.txt'),
    ]);
    assert.strictEqual(expandedInputs.length, 2, 'inputs should be deduplicated');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

console.log('404-lint-selftest: all checks passed');
