import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { parseSnootyToml, resolvePipeSubstitutions, resolveSubstitutions } from '../src/snooty';

// Ported from audit-cli's internal/snooty/snooty_test.go (TestResolveSubstitutions)
describe('resolveSubstitutions', () => {
  const constants = {
    'atlas-cli': 'Atlas CLI',
    'atlas-admin-api': 'Atlas Administration API',
    nested: 'prefix {+atlas-cli+}',
  };

  it('resolves a single substitution', () => {
    expect(resolveSubstitutions('What is the {+atlas-cli+}?', constants)).toBe('What is the Atlas CLI?');
  });

  it('resolves multiple substitutions', () => {
    expect(resolveSubstitutions('Use the {+atlas-admin-api+} from the {+atlas-cli+}', constants)).toBe(
      'Use the Atlas Administration API from the Atlas CLI',
    );
  });

  it('leaves unknown constants unchanged', () => {
    expect(resolveSubstitutions('Value of {+unknown+} here', constants)).toBe('Value of {+unknown+} here');
  });

  it('resolves nested substitutions', () => {
    expect(resolveSubstitutions('{+nested+}', constants)).toBe('prefix Atlas CLI');
  });

  it('returns plain text unchanged when there are no substitutions', () => {
    expect(resolveSubstitutions('Plain title', constants)).toBe('Plain title');
  });

  it('returns text unchanged when constants are missing', () => {
    expect(resolveSubstitutions('What is the {+atlas-cli+}?', null)).toBe('What is the {+atlas-cli+}?');
  });
});

describe('resolvePipeSubstitutions', () => {
  const substitutions = {
    ak8so: 'Atlas Kubernetes Operator',
    service: 'Atlas',
    fts: 'Atlas Search',
  };

  it('resolves a single substitution', () => {
    expect(resolvePipeSubstitutions('|ak8so| Changelog', substitutions)).toBe('Atlas Kubernetes Operator Changelog');
  });

  it('resolves multiple substitutions in the same string', () => {
    expect(resolvePipeSubstitutions('Import |service| Projects into |ak8so|', substitutions)).toBe(
      'Import Atlas Projects into Atlas Kubernetes Operator',
    );
  });

  it('leaves unknown substitutions unchanged', () => {
    expect(resolvePipeSubstitutions('Value of |unknown| here', substitutions)).toBe('Value of |unknown| here');
  });

  it('returns plain text unchanged when there are no substitutions', () => {
    expect(resolvePipeSubstitutions('Plain title', substitutions)).toBe('Plain title');
  });

  it('returns text unchanged when the substitutions map is missing', () => {
    expect(resolvePipeSubstitutions('|ak8so| Changelog', null)).toBe('|ak8so| Changelog');
  });

  it('lets a page-level override take precedence when merged in by the caller', () => {
    const merged = { ...substitutions, ak8so: 'AKO' };
    expect(resolvePipeSubstitutions('|ak8so| Changelog', merged)).toBe('AKO Changelog');
  });
});

describe('parseSnootyToml', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'generate-llms-snooty-'));
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  it('parses name, title, constants, and substitutions from a snooty.toml file', async () => {
    const tomlPath = path.join(tmpDir, 'snooty.toml');
    await fs.writeFile(
      tomlPath,
      `name = "atlas-cli"
title = "Atlas CLI"

[constants]
atlas-cli = "Atlas CLI"
atlas-cli-version = "1.56.0"
package-branch = "testing"                    # dev rc releases

[substitutions]
ak8so = "Atlas Kubernetes Operator"
service = "Atlas"
`,
      'utf-8',
    );

    const config = await parseSnootyToml(tomlPath);
    expect(config).toEqual({
      name: 'atlas-cli',
      title: 'Atlas CLI',
      constants: {
        'atlas-cli': 'Atlas CLI',
        'atlas-cli-version': '1.56.0',
        'package-branch': 'testing',
      },
      substitutions: {
        ak8so: 'Atlas Kubernetes Operator',
        service: 'Atlas',
      },
    });
  });

  it('defaults substitutions to an empty object when the table is absent', async () => {
    const tomlPath = path.join(tmpDir, 'snooty.toml');
    await fs.writeFile(
      tomlPath,
      `name = "atlas-cli"
title = "Atlas CLI"

[constants]
atlas-cli = "Atlas CLI"
`,
      'utf-8',
    );

    const config = await parseSnootyToml(tomlPath);
    expect(config?.substitutions).toEqual({});
  });

  it('returns null when the file does not exist', async () => {
    const config = await parseSnootyToml(path.join(tmpDir, 'missing.toml'));
    expect(config).toBeNull();
  });
});
