import {
  applyHostEnvironment,
  detectHost,
  resolveHostEnvironment,
} from '../../src/util/hostEnvironment';

const vercelPreview = {
  VERCEL: '1',
  VERCEL_ENV: 'preview',
  VERCEL_GIT_COMMIT_REF: 'DOCSP-1-branch',
  VERCEL_GIT_COMMIT_SHA: 'abc123',
  VERCEL_GIT_PULL_REQUEST_ID: '42',
  VERCEL_DEPLOYMENT_ID: 'dpl_1',
  VERCEL_GIT_PROVIDER: 'github',
  VERCEL_GIT_REPO_OWNER: '10gen',
  VERCEL_GIT_REPO_SLUG: 'docs-mongodb-internal',
};

const netlifyPreview = {
  NETLIFY: 'true',
  CONTEXT: 'deploy-preview',
  HEAD: 'DOCSP-1-branch',
  COMMIT_REF: 'abc123',
  CACHED_COMMIT_REF: 'def456',
  REVIEW_ID: '42',
  DEPLOY_ID: 'deploy1',
  REPOSITORY_URL: 'https://github.com/10gen/docs-mongodb-internal',
};

describe('detectHost', () => {
  it('prefers Vercel, then Netlify, then local', () => {
    expect(detectHost({ VERCEL: '1', NETLIFY: 'true' })).toBe('vercel');
    expect(detectHost({ NETLIFY: 'true' })).toBe('netlify');
    expect(detectHost({})).toBe('local');
  });
});

describe('resolveHostEnvironment', () => {
  it('maps a Vercel preview', () => {
    expect(resolveHostEnvironment(vercelPreview)).toEqual({
      host: 'vercel',
      env: 'prd',
      branch: 'DOCSP-1-branch',
      commitRef: 'abc123',
      prId: '42',
      deployId: 'dpl_1',
      baseCommitRef: undefined,
      repositoryUrl: 'https://github.com/10gen/docs-mongodb-internal',
    });
  });

  it('maps a Netlify deploy preview', () => {
    expect(resolveHostEnvironment(netlifyPreview)).toEqual({
      host: 'netlify',
      env: 'prd',
      branch: 'DOCSP-1-branch',
      commitRef: 'abc123',
      prId: '42',
      deployId: 'deploy1',
      baseCommitRef: 'def456',
      repositoryUrl: 'https://github.com/10gen/docs-mongodb-internal',
    });
  });

  it.each([
    ['production', 'dotcomprd'],
    ['development', 'stg'],
  ])('maps VERCEL_ENV=%s to %s', (vercelEnv, expected) => {
    expect(
      resolveHostEnvironment({ ...vercelPreview, VERCEL_ENV: vercelEnv }).env,
    ).toBe(expected);
  });

  it.each([
    ['production', 'dotcomprd'],
    ['preprd', 'dotcomstg'],
    ['branch-deploy', 'prd'],
    ['dev', 'stg'],
  ])('maps Netlify CONTEXT=%s to %s', (context, expected) => {
    expect(
      resolveHostEnvironment({ ...netlifyPreview, CONTEXT: context }).env,
    ).toBe(expected);
  });

  it('lets an explicit ENV override the host context', () => {
    expect(
      resolveHostEnvironment({
        ...vercelPreview,
        VERCEL_ENV: 'production',
        ENV: 'prd',
      }).env,
    ).toBe('prd');
  });

  it('treats an empty pull request id as no pull request', () => {
    expect(
      resolveHostEnvironment({ ...vercelPreview, VERCEL_GIT_PULL_REQUEST_ID: '' })
        .prId,
    ).toBeUndefined();
  });

  it('reads the Vercel base commit from PIPELINE_BASE_COMMIT_REF', () => {
    expect(
      resolveHostEnvironment({
        ...vercelPreview,
        PIPELINE_BASE_COMMIT_REF: 'def456',
      }).baseCommitRef,
    ).toBe('def456');
  });

  it('throws on an unmapped Vercel custom environment', () => {
    expect(() =>
      resolveHostEnvironment({ ...vercelPreview, VERCEL_ENV: 'qa' }),
    ).toThrow(/unmapped context "qa"/);
  });

  it('throws on an invalid explicit ENV', () => {
    expect(() =>
      resolveHostEnvironment({ ...vercelPreview, ENV: 'production' }),
    ).toThrow(/not a build environment/);
  });

  it('requires ENV and HEAD when running locally', () => {
    expect(() => resolveHostEnvironment({ HEAD: 'main' })).toThrow(
      /set ENV explicitly/,
    );
    expect(() => resolveHostEnvironment({ ENV: 'stg' })).toThrow(
      /HEAD is not set/,
    );
    expect(resolveHostEnvironment({ ENV: 'stg', HEAD: 'main' })).toMatchObject({
      host: 'local',
      env: 'stg',
      branch: 'main',
    });
  });

  it('throws when Vercel has no branch', () => {
    const { VERCEL_GIT_COMMIT_REF, ...rest } = vercelPreview;
    expect(() => resolveHostEnvironment(rest)).toThrow(
      /VERCEL_GIT_COMMIT_REF is not set/,
    );
  });
});

describe('applyHostEnvironment', () => {
  it('writes the Netlify variable names the pipeline reads', () => {
    const vars: Record<string, string | undefined> = {};
    applyHostEnvironment(resolveHostEnvironment(vercelPreview), vars);
    expect(vars).toEqual({
      ENV: 'prd',
      HEAD: 'DOCSP-1-branch',
      COMMIT_REF: 'abc123',
      REVIEW_ID: '42',
      DEPLOY_ID: 'dpl_1',
      REPOSITORY_URL: 'https://github.com/10gen/docs-mongodb-internal',
    });
  });
});
