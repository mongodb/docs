#!/usr/bin/env npx tsx
/**
 * Minimal regression checks for findability-lint-rules (no external test framework).
 */
import assert from 'assert';
import {
  lintFindabilityContent,
  parseSynonymTermsFromCsv,
} from './findability-lint-rules.js';

const fakeFile = '/repo/content/test/source/page.txt';

// Invalid genre → error
{
  const src = `
.. facet::
   :name: genre
   :values: novel

:title: Test Page
==========
`;
  const issues = lintFindabilityContent(src, fakeFile);
  assert(issues.some(i => i.rule === 'facet-invalid-genre'), 'expected facet-invalid-genre');
}

// Invalid programming_language → error
{
  const src = `
.. facet::
   :name: programming_language
   :values: cobol

:title: Test
==========
`;
  const issues = lintFindabilityContent(src, fakeFile);
  assert(
    issues.some(i => i.rule === 'facet-invalid-programming-language'),
    'expected facet-invalid-programming-language',
  );
}

// Unknown facet name → warning
{
  const src = `
.. facet::
   :name: mystery_facet
   :values: foo
`;
  const issues = lintFindabilityContent(src, fakeFile);
  assert(issues.some(i => i.rule === 'facet-unknown-name'), 'expected facet-unknown-name');
}

// Trailing slash
{
  const src = `
:title: T
==========

See https://www.mongodb.com/docs/manual/administration for details.
`;
  const issues = lintFindabilityContent(src, fakeFile);
  assert(
    issues.some(i => i.rule === 'docs-url-missing-trailing-slash'),
    'expected docs-url-missing-trailing-slash',
  );
}

// Keyword in synonyms
{
  const syn = parseSynonymTermsFromCsv('foo,bar\n');
  const src = `
:title: Something Else
==========

.. meta::
   :keywords: foo
`;
  const issues = lintFindabilityContent(src, fakeFile, { synonymTerms: syn });
  assert(
    issues.some(i => i.rule === 'keyword-in-synonyms-file'),
    'expected keyword-in-synonyms-file',
  );
}

// Code example keyword missing
{
  const src = `
:title: Demo
==========

.. meta::
   :keywords: sample

.. code-block:: python

   print(1)
`;
  const issues = lintFindabilityContent(src, fakeFile);
  assert(
    issues.some(i => i.rule === 'code-example-keyword-missing'),
    'expected code-example-keyword-missing',
  );
}

// Agent path skipped
{
  const src = `
.. facet::
   :name: genre
   :values: novel
`;
  const issues = lintFindabilityContent(src, '/repo/.github/agents/foo/SKILL.md');
  assert.strictEqual(issues.length, 0, 'agent files should skip');
}

console.log('findability-lint-selftest: all checks passed');
