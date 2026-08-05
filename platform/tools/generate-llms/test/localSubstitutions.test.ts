import { describe, expect, it } from 'vitest';
import { extractIncludePaths, extractLocalSubstitutions } from '../src/rst/localSubstitutions';

describe('extractLocalSubstitutions', () => {
  it('extracts a single page-level substitution definition', () => {
    const content = `.. |binary| replace:: MongoDB

Title
=====
`;
    expect(extractLocalSubstitutions(content)).toEqual({ binary: 'MongoDB' });
  });

  it('extracts multiple substitution definitions', () => {
    const content = `.. |timestampfmt| replace:: :setting:\`systemLog.timeStampFormat\`
.. |audit-schema-option| replace:: \`\`auditLog.schema\`\`
`;
    expect(extractLocalSubstitutions(content)).toEqual({
      timestampfmt: ':setting:`systemLog.timeStampFormat`',
      'audit-schema-option': '``auditLog.schema``',
    });
  });

  it('extracts indented substitution definitions', () => {
    const content = `Some text.

   .. |port-option| replace:: \`\`net.port\`\` option
`;
    expect(extractLocalSubstitutions(content)).toEqual({ 'port-option': '``net.port`` option' });
  });

  it('returns an empty object when there are no local substitution definitions', () => {
    const content = `Title
=====

Some content that mentions |ak8so| but does not define it.
`;
    expect(extractLocalSubstitutions(content)).toEqual({});
  });

  it('ignores other directives', () => {
    const content = `.. meta::
   :description: A page.

.. note::

   Some note text.
`;
    expect(extractLocalSubstitutions(content)).toEqual({});
  });
});

describe('extractIncludePaths', () => {
  it('extracts a root-relative include directive path', () => {
    const content = `======================================
Downgrade |newversion| to |oldversion|
======================================

.. include:: /includes/8.3-upgrade-replacements.rst

.. include:: /includes/downgrade/previous-version.rst
`;
    expect(extractIncludePaths(content)).toEqual([
      'includes/8.3-upgrade-replacements.rst',
      'includes/downgrade/previous-version.rst',
    ]);
  });

  it('returns an empty array when there are no include directives', () => {
    expect(extractIncludePaths('Title\n=====\n\nBody.\n')).toEqual([]);
  });

  it('ignores other directives', () => {
    const content = `.. meta::
   :description: A page.

.. note::

   Some note text.
`;
    expect(extractIncludePaths(content)).toEqual([]);
  });
});
