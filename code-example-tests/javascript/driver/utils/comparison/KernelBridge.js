/**
 * KernelBridge — a thin JavaScript adapter for the comparison-kernel binary.
 *
 * The kernel is a native Go binary, one per supported platform, committed under
 * `tools/comparison-kernel/bin/`. This bridge spawns the binary matching the
 * host OS/arch as a managed child process and communicates over the
 * newline-delimited JSON protocol:
 *
 *   → one JSON request object per line written to the process's stdin
 *   ← one JSON response object per line read from the process's stdout
 *
 * No runtime dependency is required — the binary runs directly.
 *
 * Usage:
 *
 *   const bridge = new KernelBridge();
 *   await bridge.start();
 *   const result = await bridge.compare(expectedContent, actualJSON, options);
 *   await bridge.stop();
 *
 * @module KernelBridge
 */

import { spawn, spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline';
import { existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';

/** Wire-protocol version this bridge speaks. Must match the kernel's. */
export const PROTOCOL_VERSION = 1;

/**
 * File name of the kernel binary matching the current host's
 * platform/architecture, mapped onto the Go GOOS/GOARCH naming used by
 * tools/comparison-kernel/build.sh.
 */
function _kernelBinaryName() {
  const platformMap = { darwin: 'darwin', linux: 'linux', win32: 'windows' };
  const archMap = { arm64: 'arm64', x64: 'amd64' };
  const goos = platformMap[process.platform];
  const goarch = archMap[process.arch];
  if (!goos || !goarch) {
    throw new Error(
      `comparison-kernel: unsupported host platform ${process.platform}/${process.arch}. ` +
        `Add a target to tools/comparison-kernel/build.sh and rebuild.`
    );
  }
  const ext = goos === 'windows' ? '.exe' : '';
  return `comparison-kernel-${goos}-${goarch}${ext}`;
}

/**
 * Walk up from the current working directory looking for the committed kernel
 * binary under tools/comparison-kernel/bin/. Mirrors the resolution strategy
 * used by the Python and Go bridges so all suites locate the binary the same
 * way regardless of how the test runner sets CWD.
 *
 * @returns {string} Absolute path to the platform-specific kernel binary.
 */
export function resolveKernelBinary() {
  const binaryName = _kernelBinaryName();

  let dir = process.cwd();
  for (let i = 0; i < 12; i++) {
    const candidate = join(
      dir,
      'tools',
      'comparison-kernel',
      'bin',
      binaryName
    );
    if (existsSync(candidate)) {
      return candidate;
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  throw new Error(
    `${binaryName} not found; build it with: ./build.sh in ` +
      `code-example-tests/tools/comparison-kernel`
  );
}

/**
 * Manages the lifecycle of the comparison kernel process and exposes a
 * promise-based compare() method.
 */
export class KernelBridge {
  /**
   * @param {string} [binaryPath] - Path to the native kernel binary.
   *   Defaults to the committed binary matching the host platform.
   */
  constructor(binaryPath = resolveKernelBinary()) {
    this._binaryPath = binaryPath;
    this._process = null;
    this._rl = null;
    this._pending = []; // queue of { resolve, reject } for in-flight requests
  }

  /**
   * Starts the kernel process. Must be called before compare().
   * @returns {Promise<void>}
   */
  async start() {
    if (this._process) return;

    if (!existsSync(this._binaryPath)) {
      throw new Error(
        `comparison-kernel binary not found at ${this._binaryPath}.\n` +
          `Build it with: ./build.sh in code-example-tests/tools/comparison-kernel`
      );
    }

    this._process = spawn(this._binaryPath, [], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    this._process.stderr.on('data', (data) => {
      process.stderr.write(`[comparison-kernel] ${data}`);
    });

    this._process.on('exit', (code, signal) => {
      this._process = null;
      const err = new Error(
        `comparison-kernel exited unexpectedly (code=${code}, signal=${signal})`
      );
      for (const { reject } of this._pending) {
        reject(err);
      }
      this._pending = [];
    });

    // Read responses line by line
    this._rl = createInterface({ input: this._process.stdout });
    this._rl.on('line', (line) => {
      if (!line.trim()) return;
      const { resolve, reject } = this._pending.shift() ?? {};
      if (!resolve) return;
      try {
        resolve(JSON.parse(line));
      } catch (err) {
        reject(new Error(`Failed to parse kernel response: ${line}`));
      }
    });

    // Wait briefly to ensure the process started
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  /**
   * Stops the kernel process. Safe to call multiple times.
   * @returns {Promise<void>}
   */
  async stop() {
    if (!this._process) return;
    this._rl?.close();
    this._process.stdin.end();
    await new Promise((resolve) => this._process.once('exit', resolve));
    this._process = null;
  }

  /**
   * Compares expected content against actual JSON results.
   *
   * @param {string} expectedContent - Raw text of the expected output file.
   * @param {string|object|Array} actual - Actual results. If a string, it's
   *   treated as already JSON-encoded and parsed before sending. Otherwise the
   *   value is embedded directly in the request JSON.
   * @param {object} [options={}] - Comparison options.
   * @param {string} [options.comparisonType] - 'ordered' or 'unordered'.
   * @param {string[]} [options.ignoreFieldValues] - Field names to ignore.
   * @param {object} [options.schema] - Schema config for shouldResemble mode.
   * @returns {Promise<{isMatch: boolean, errors: Array}>}
   */
  async compare(expectedContent, actual, options = {}) {
    if (!this._process) {
      throw new Error('KernelBridge is not started. Call start() first.');
    }

    const actualValue =
      typeof actual === 'string' ? JSON.parse(actual) : actual;

    const request = JSON.stringify({
      protocolVersion: PROTOCOL_VERSION,
      expected: expectedContent,
      actual: actualValue,
      options,
    });

    return new Promise((resolve, reject) => {
      this._pending.push({ resolve, reject });
      this._process.stdin.write(request + '\n');
    });
  }
}

/**
 * Singleton bridge for test-suite use: start once in globalSetup,
 * stop in globalTeardown.
 *
 * @type {KernelBridge}
 */
export const kernelBridge = new KernelBridge();

/**
 * Convenience function: compare expected file content against actual results.
 * The bridge must already be started (via kernelBridge.start()).
 *
 * @param {string} expectedContent - Raw file content.
 * @param {*} actual - Actual results.
 * @param {object} [options={}] - Comparison options.
 * @returns {Promise<{isMatch: boolean, errors: Array}>}
 */
export async function kernelCompare(expectedContent, actual, options = {}) {
  return kernelBridge.compare(expectedContent, actual, options);
}

/**
 * Synchronous one-shot comparison via the kernel binary. Spawns the kernel
 * process per call (matching the Python and Go bridges), so callers don't
 * need to manage a long-lived async connection. Suitable for synchronous test
 * APIs like Expect.shouldMatch().
 *
 * @param {string} expectedContent - Raw text of the expected output file.
 * @param {*} actual - Actual results (any JSON-serialisable value).
 * @param {object} [options={}] - Comparison options.
 * @param {string} [options.comparisonType] - 'ordered' or 'unordered'.
 * @param {string[]} [options.ignoreFieldValues] - Field names to ignore.
 * @returns {{isMatch: boolean, errors: Array, error?: string}}
 */
export function kernelCompareSync(expectedContent, actual, options = {}) {
  const binaryPath = resolveKernelBinary();
  if (!existsSync(binaryPath)) {
    throw new Error(
      `comparison-kernel binary not found at ${binaryPath}.\n` +
        `Build it with: ./build.sh in code-example-tests/tools/comparison-kernel`
    );
  }

  const actualValue = typeof actual === 'string' ? JSON.parse(actual) : actual;
  const request = JSON.stringify({
    protocolVersion: PROTOCOL_VERSION,
    expected: expectedContent,
    actual: actualValue,
    options,
  });

  const result = spawnSync(binaryPath, [], {
    input: request + '\n',
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });

  if (result.error) {
    throw new Error(
      `comparison-kernel invocation failed: ${result.error.message}`
    );
  }
  if (result.status !== 0) {
    throw new Error(
      `comparison-kernel exited with code ${result.status}: ${(result.stderr || '').trim()}`
    );
  }

  const line = (result.stdout || '').trim();
  if (!line) {
    throw new Error('comparison-kernel returned empty response');
  }

  return JSON.parse(line);
}
