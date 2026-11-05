const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

export async function waitForHttp(
  url: string,
  timeoutMs: number,
  intervalMs: number,
): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return;
      }
    } catch {
      // not ready yet; retry until the deadline
    }
    await sleep(intervalMs);
  }
  throw new Error(`server at ${url} timed out after ${timeoutMs}ms`);
}

export async function waitForPortFree(
  origin: string,
  timeoutMs: number,
  intervalMs: number,
): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      await fetch(origin);
    } catch {
      return;
    }
    await sleep(intervalMs);
  }
  throw new Error(`port still listening at ${origin} after ${timeoutMs}ms`);
}
