import http from 'node:http';
import type { AddressInfo } from 'node:net';
import { describe, it, expect } from 'vitest';
import { waitForHttp, waitForPortFree } from './server-lifecycle.js';

function listen(): Promise<{ server: http.Server; origin: string }> {
  const server = http.createServer((_req, res) => res.end('ok'));
  return new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () =>
      resolve({ server, origin: `http://127.0.0.1:${(server.address() as AddressInfo).port}` }),
    ),
  );
}

describe('waitForHttp', () => {
  it('resolves once the URL responds', async () => {
    const { server, origin } = await listen();
    await expect(waitForHttp(`${origin}/`, 2000, 50)).resolves.toBeUndefined();
    server.close();
  });

  it('rejects after the timeout when nothing responds', async () => {
    await expect(waitForHttp('http://127.0.0.1:1/', 200, 50)).rejects.toThrow(/timed out/i);
  });
});

describe('waitForPortFree', () => {
  it('resolves once the port refuses connections', async () => {
    await expect(waitForPortFree('http://127.0.0.1:1', 200, 50)).resolves.toBeUndefined();
  });

  it('rejects while a server is still listening', async () => {
    const { server, origin } = await listen();
    await expect(waitForPortFree(origin, 200, 50)).rejects.toThrow(/still listening/i);
    server.close();
  });
});
