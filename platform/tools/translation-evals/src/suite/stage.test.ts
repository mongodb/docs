import { spawn } from 'node:child_process';
import { describe, it, expect } from 'vitest';
import { stageCommand, shellQuote, waitForExit, killTree } from './stage.js';

describe('stageCommand', () => {
  it('invokes the stage through the package CLI', () => {
    const cmd = stageCommand('translate', ['--project', 'atlas', '--run', '2026-11-04-abc']);
    expect(cmd.startsWith('cd ')).toBe(true);
    expect(cmd).toContain('src/cli.ts translate --project atlas --run 2026-11-04-abc');
  });
});

describe('shellQuote', () => {
  it('leaves safe arguments bare and quotes the rest', () => {
    expect(shellQuote('pages/manual.txt')).toBe('pages/manual.txt');
    expect(shellQuote('my pages.txt')).toBe("'my pages.txt'");
    expect(shellQuote("it's")).toBe(`'it'\\''s'`);
  });

  it('round-trips awkward arguments through bash', async () => {
    const args = ['my pages.txt', "it's", '$HOME', 'a;b'];
    const child = spawn('bash', ['-c', `printf '%s\\n' ${args.map(shellQuote).join(' ')}`]);
    let out = '';
    child.stdout.on('data', (d: Buffer) => (out += d.toString()));
    await new Promise((resolve) => child.on('exit', resolve));
    expect(out.trimEnd().split('\n')).toEqual(args);
  });
});

describe('waitForExit', () => {
  it('resolves the exit code of a fast command', async () => {
    const child = spawn('bash', ['-c', 'exit 3'], { detached: true });
    expect(await waitForExit(child, 5000)).toEqual({ code: 3, timedOut: false });
  });

  it('kills the process group and reports a timeout', async () => {
    const child = spawn('bash', ['-c', 'sleep 30'], { detached: true });
    const result = await waitForExit(child, 200);
    expect(result.timedOut).toBe(true);
    expect(result.code).toBeNull();
  });

  it('resolves when the child fails to spawn', async () => {
    const child = spawn('definitely-not-a-real-binary-xyz', [], { detached: true });
    expect(await waitForExit(child, 5000)).toEqual({ code: null, timedOut: false });
  });
});

describe('killTree', () => {
  it('terminates a detached child', async () => {
    const child = spawn('bash', ['-c', 'sleep 30'], { detached: true });
    killTree(child);
    const result = await waitForExit(child, 2000);
    expect(result.timedOut).toBe(false);
  });

  it('does not throw when the child has no pid', () => {
    const child = spawn('definitely-not-a-real-binary-xyz', [], { detached: true });
    child.on('error', () => {});
    expect(() => killTree(child)).not.toThrow();
  });
});
