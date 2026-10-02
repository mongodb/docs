#!/usr/bin/env node
// Runs `pnpm install <args>` with a CodeArtifact token for the private @mdb
// scope (see platform/.npmrc). Tokens expire after at most 12 hours, so hosted
// builds mint one per install from NPM_AWS_KEY / NPM_AWS_SECRET. When those are
// unset, or NPM_AWS_AUTH is already exported, this is a plain `pnpm install`.
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';

async function mintToken() {
  const { NPM_AWS_AUTH, NPM_AWS_KEY, NPM_AWS_SECRET } = process.env;
  if (NPM_AWS_AUTH || !NPM_AWS_KEY) return NPM_AWS_AUTH;

  // Dependencies aren't installed yet, so the SDK goes into a throwaway prefix.
  const dir = mkdtempSync(path.join(tmpdir(), 'codeartifact-'));
  execFileSync('npm', ['install', '--prefix', dir, '--silent', '@aws-sdk/client-codeartifact@3'], {
    stdio: 'inherit',
  });
  const { CodeartifactClient, GetAuthorizationTokenCommand } = createRequire(path.join(dir, 'index.js'))(
    '@aws-sdk/client-codeartifact',
  );

  const client = new CodeartifactClient({
    region: 'us-east-1',
    credentials: { accessKeyId: NPM_AWS_KEY, secretAccessKey: NPM_AWS_SECRET },
  });
  const { authorizationToken } = await client.send(
    new GetAuthorizationTokenCommand({ domain: 'mongodb', domainOwner: '271346171620' }),
  );
  if (!authorizationToken) throw new Error('CodeArtifact returned an empty token');
  console.log(`[install-deps] minted CodeArtifact token (length ${authorizationToken.length})`);
  return authorizationToken;
}

const token = await mintToken();
const { status } = spawnSync('pnpm', ['install', ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: token ? { ...process.env, NPM_AWS_AUTH: token } : process.env,
});
process.exit(status ?? 1);
