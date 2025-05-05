export async function sequentially<T, R>(
  items: T[],
  handler: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  for (const item of items) {
    results.push(await handler(item));
  }
  return results;
}
