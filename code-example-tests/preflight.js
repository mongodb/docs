// Shared preflight for all language test suites' run-tests.js scripts.
//
// Without a preflight, a stale/paused MongoDB cluster causes every test to wait
// its full serverSelectionTimeoutMS (driver default: 30s) before failing — for a
// suite of N tests this can mean tens of minutes of pointless waits. This module
// validates the connection string is reachable at the DNS + TCP layer before the
// language-specific test runner is invoked.

import { existsSync, readFileSync } from 'fs';
import { resolveSrv } from 'dns/promises';
import { createConnection } from 'net';

// Loads variables from the first existing .env file in `candidates`, without
// overriding existing env vars. Returns the path that was loaded, or null.
export function loadDotEnv(candidates) {
  for (const envFile of candidates) {
    if (!existsSync(envFile)) continue;
    for (const line of readFileSync(envFile, 'utf8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed
        .slice(eqIdx + 1)
        .trim()
        .replace(/^["']|["']$/g, '');
      if (!(key in process.env)) process.env[key] = val;
    }
    return envFile;
  }
  return null;
}

function tcpProbe(host, port, timeoutMs) {
  return new Promise((resolve, reject) => {
    const socket = createConnection({ host, port });
    const timer = setTimeout(() => {
      socket.destroy();
      reject(new Error(`TCP connect to ${host}:${port} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
    socket.once('connect', () => {
      clearTimeout(timer);
      socket.end();
      resolve();
    });
    socket.once('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

function withTimeout(promise, timeoutMs, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`${label} timed out after ${timeoutMs}ms`)),
      timeoutMs,
    );
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

// Verifies the cluster behind a MongoDB connection string is reachable. For
// `mongodb+srv://`, resolves the SRV record then TCP-probes the first target
// (catches paused Atlas clusters whose DNS still resolves). For `mongodb://`,
// TCP-probes the host:port directly.
export async function preflightConnectivity(connectionString, { dnsTimeoutMs = 5000, tcpTimeoutMs = 5000 } = {}) {
  let url;
  try {
    url = new URL(connectionString);
  } catch {
    throw new Error('CONNECTION_STRING is not a valid URL');
  }
  if (url.protocol === 'mongodb+srv:') {
    const srvName = `_mongodb._tcp.${url.hostname}`;
    const records = await withTimeout(resolveSrv(srvName), dnsTimeoutMs, `SRV lookup for ${srvName}`);
    if (!records || records.length === 0) {
      throw new Error(`No SRV records returned for ${srvName}`);
    }
    const { name, port } = records[0];
    await tcpProbe(name, port, tcpTimeoutMs);
  } else if (url.protocol === 'mongodb:') {
    const port = parseInt(url.port || '27017', 10);
    await tcpProbe(url.hostname, port, tcpTimeoutMs);
  } else {
    throw new Error(`Unsupported scheme '${url.protocol}' in CONNECTION_STRING`);
  }
}

// Convenience wrapper: load .env, validate CONNECTION_STRING is set, and run the
// connectivity preflight. Exits the process with a clear error on any failure.
// Returns the trimmed connection string on success.
export async function requireReachableConnectionString({ envCandidates = [] } = {}) {
  const envSource = loadDotEnv(envCandidates);
  const conn = (process.env.CONNECTION_STRING || '').trim();
  if (!conn) {
    console.error('CONNECTION_STRING is not set.');
    if (envSource) {
      console.error(`  Loaded .env from: ${envSource} (no CONNECTION_STRING key found)`);
    } else if (envCandidates.length > 0) {
      console.error('  No .env file found at any of:');
      for (const p of envCandidates) console.error(`    ${p}`);
    }
    console.error('  Set CONNECTION_STRING in your shell or add it to a .env file above.');
    process.exit(1);
  }
  try {
    process.stdout.write('▶ Verifying cluster reachability... ');
    await preflightConnectivity(conn);
    console.log('ok');
  } catch (err) {
    console.log('failed');
    console.error(`\nCluster preflight failed: ${err.message}`);
    console.error('  The CONNECTION_STRING points to a host that cannot be reached.');
    console.error('  Check that the cluster exists, is not paused, and your network/IP is allowed.');
    if (envSource) console.error(`  (CONNECTION_STRING loaded from: ${envSource})`);
    process.exit(1);
  }
  return conn;
}
