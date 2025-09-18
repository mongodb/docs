/*
 * Safely return a deeply nested value from an object. If the property is not found, return undefined.
 * Arguments:
 * - p: an array containing the path to the desired return value
 * - o: the object to be searched
 */
function isIndexable(x: unknown): x is Record<string | number, unknown> {
  return typeof x === 'object' && x !== null;
}

export function getNestedValue<T extends object>(path: (string | number)[], obj?: T): unknown {
  if (!obj) return undefined;

  return path.reduce<unknown>((xs, x) => {
    if (isIndexable(xs) && x in xs) {
      return xs[x as keyof typeof xs];
    }
    return undefined;
  }, obj);
}
