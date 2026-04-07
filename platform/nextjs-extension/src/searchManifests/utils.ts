import crypto from 'node:crypto';

export function generateHash(data: string): Promise<string> {
  const hash = crypto.createHash('sha256');

  return new Promise((resolve) => {
    hash.on('readable', () => {
      const data = hash.read();
      if (data) {
        resolve(data.toString('hex'));
      }
    });

    hash.write(data);
    hash.end();
  });
}

export function joinUrl({
  base,
  path,
}: {
  base: string;
  path: string;
}): string {
  return assertTrailingSlash(
    base.replace(/\/*$/, '/') + path.replace(/^\/*/, ''),
  );
}

export function assertTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

export function splitExt(path: string): [string, string] {
  const lastDotIndex = path.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return [path, ''];
  }
  return [path.slice(0, lastDotIndex), path.slice(lastDotIndex)];
}
