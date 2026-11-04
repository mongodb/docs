import {
  findChangedVersions,
  resolvePathsToBuild,
} from '../../src/util/resolvePathsToBuild';
import type { BuildRunner } from '../../src/util/buildUtils';
import type { AllContentData } from '../../src/contentMetadata/processContentMetadata';

const manualVersions = [
  'manual/manual',
  'manual/upcoming',
  'manual/v8.0',
  'manual/v7.0',
];
const contentDirectories = ['atlas', ...manualVersions];

const DIFF_COMMAND = 'git diff --name-only --no-renames FETCH_HEAD...HEAD';

const makeAllContentData = (): AllContentData => ({
  docsetsByProject: {},
  pathsToBuild: [],
  docsPaths: {},
});

const makeRun = (diff: string | Error) => {
  const command = jest.fn(async (cmd: string) => {
    if (diff instanceof Error) throw diff;
    return { stdout: cmd === DIFF_COMMAND ? diff : '', stderr: '' };
  });
  return { run: { command } as unknown as BuildRunner, command };
};

const build = async (diff: string | Error) => {
  const allContentData = makeAllContentData();
  const { run, command } = makeRun(diff);
  await resolvePathsToBuild({ contentDirectories, allContentData, run });
  return { pathsToBuild: allContentData.pathsToBuild, command };
};

describe('findChangedVersions', () => {
  it('returns the version that owns every changed file', () => {
    expect(
      findChangedVersions({
        changedFiles: [
          'content/manual/upcoming/source/a.txt',
          'content/manual/upcoming/source/includes/b.rst',
        ],
        versionPaths: manualVersions,
      }),
    ).toEqual(['manual/upcoming']);
  });

  it('returns each version that owns a changed file', () => {
    expect(
      findChangedVersions({
        changedFiles: [
          'content/manual/upcoming/source/a.txt',
          'content/manual/v8.0/source/a.txt',
          'content/manual/upcoming/source/b.txt',
        ],
        versionPaths: manualVersions,
      }),
    ).toEqual(['manual/upcoming', 'manual/v8.0']);
  });

  it('returns undefined when a file sits outside every version', () => {
    expect(
      findChangedVersions({
        changedFiles: [
          'content/manual/upcoming/source/a.txt',
          'platform/docs-site/package.json',
        ],
        versionPaths: manualVersions,
      }),
    ).toBeUndefined();
  });

  it('returns undefined when there are no changed files', () => {
    expect(
      findChangedVersions({ changedFiles: [], versionPaths: manualVersions }),
    ).toBeUndefined();
  });

  it('does not match a version by a shared name prefix', () => {
    expect(
      findChangedVersions({
        changedFiles: ['content/manual/v8.03/source/a.txt'],
        versionPaths: manualVersions,
      }),
    ).toBeUndefined();
  });
});

describe('resolvePathsToBuild', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.CONTEXT = 'deploy-preview';
    process.env.FORCE_REBUILD_PATHS = 'manual';
    delete process.env.ALLOW_INACTIVE_VERSIONS;
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    jest.restoreAllMocks();
  });

  it.each([
    ['upcoming', 'content/manual/upcoming/source/a.txt\n', 'manual/upcoming'],
    ['current', 'content/manual/manual/source/a.txt\n', 'manual/manual'],
    ['an older version', 'content/manual/v7.0/source/a.txt\n', 'manual/v7.0'],
  ])('builds only %s when only that version changed', async (_, diff, expected) => {
    const { pathsToBuild, command } = await build(diff);

    expect(pathsToBuild).toEqual([expected]);
    expect(command).toHaveBeenCalledWith('git fetch --no-tags origin main');
    expect(command).toHaveBeenCalledWith(DIFF_COMMAND, { stdout: 'pipe' });
  });

  it('builds only the touched versions when changes span several', async () => {
    const { pathsToBuild } = await build(
      'content/manual/manual/source/a.txt\ncontent/manual/upcoming/source/a.txt\n',
    );

    expect(pathsToBuild).toEqual(['manual/manual', 'manual/upcoming']);
  });

  it('builds a deleted or renamed-away file under its original version', async () => {
    const { pathsToBuild } = await build(
      'content/manual/v8.0/source/old.txt\ncontent/manual/upcoming/source/new.txt\n',
    );

    expect(pathsToBuild).toEqual(['manual/upcoming', 'manual/v8.0']);
  });

  it('builds every version when every version changed', async () => {
    const { pathsToBuild } = await build(
      manualVersions.map((v) => `content/${v}/source/a.txt`).join('\n'),
    );

    expect(pathsToBuild).toEqual(manualVersions);
  });

  it('builds every version when a changed file is outside the versions', async () => {
    const { pathsToBuild } = await build(
      'content/manual/upcoming/source/a.txt\nplatform/nextjs-ssg-extension/src/prepare.ts\n',
    );

    expect(pathsToBuild).toEqual(manualVersions);
  });

  it('ignores netlify.toml when deciding which versions changed', async () => {
    const { pathsToBuild } = await build(
      'content/manual/upcoming/source/a.txt\nplatform/docs-site/netlify.toml\n',
    );

    expect(pathsToBuild).toEqual(['manual/upcoming']);
  });

  it('builds every version when netlify.toml is the only change', async () => {
    const { pathsToBuild } = await build('platform/docs-site/netlify.toml\n');

    expect(pathsToBuild).toEqual(manualVersions);
  });

  it('still blocks narrowing for other platform files next to netlify.toml', async () => {
    const { pathsToBuild } = await build(
      'content/manual/upcoming/source/a.txt\nplatform/docs-site/netlify.toml\nplatform/docs-site/package.json\n',
    );

    expect(pathsToBuild).toEqual(manualVersions);
  });

  it('logs the changed files and what it will build', async () => {
    const log = jest.spyOn(console, 'log');

    await build(
      'content/manual/upcoming/source/a.txt\nplatform/docs-site/package.json\n',
    );
    await build('content/manual/upcoming/source/a.txt\n');
    await build(
      'content/manual/upcoming/source/a.txt\ncontent/manual/v8.0/source/a.txt\n',
    );

    expect(log).toHaveBeenCalledWith(
      '[ssg-extension] Deploy preview changed: content/manual/upcoming/source/a.txt, platform/docs-site/package.json; building all manual versions',
    );
    expect(log).toHaveBeenCalledWith(
      '[ssg-extension] Deploy preview changed: content/manual/upcoming/source/a.txt; building manual/upcoming',
    );
    expect(log).toHaveBeenCalledWith(
      '[ssg-extension] Deploy preview changed: content/manual/upcoming/source/a.txt, content/manual/v8.0/source/a.txt; building manual/upcoming, manual/v8.0',
    );
  });

  it('builds every version when the diff is empty', async () => {
    const { pathsToBuild } = await build('');

    expect(pathsToBuild).toEqual(manualVersions);
  });

  it('builds every version when git fails', async () => {
    const { pathsToBuild } = await build(new Error('fatal: no merge base'));

    expect(pathsToBuild).toEqual(manualVersions);
  });

  it.each(['production', 'preprd', 'branch-deploy'])(
    'does not look at git in the %s context',
    async (context) => {
      process.env.CONTEXT = context;

      const { pathsToBuild, command } = await build(
        'content/manual/upcoming/source/a.txt\n',
      );

      expect(pathsToBuild).toEqual(manualVersions);
      expect(command).not.toHaveBeenCalled();
    },
  );

  it('does not narrow other docsets or explicit version paths', async () => {
    process.env.FORCE_REBUILD_PATHS = 'manual/v8.0';
    const explicit = await build('content/manual/upcoming/source/a.txt\n');
    expect(explicit.pathsToBuild).toEqual(['manual/v8.0']);
    expect(explicit.command).not.toHaveBeenCalled();

    process.env.FORCE_REBUILD_PATHS = 'atlas';
    const other = await build('content/manual/upcoming/source/a.txt\n');
    expect(other.pathsToBuild).toEqual(['atlas']);
    expect(other.command).not.toHaveBeenCalled();
  });

  it('queues nothing when FORCE_REBUILD_PATHS is unset', async () => {
    delete process.env.FORCE_REBUILD_PATHS;
    jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const { pathsToBuild, command } = await build('');

    expect(pathsToBuild).toEqual([]);
    expect(command).not.toHaveBeenCalled();
  });
});
