import fs from 'node:fs';
import path from 'node:path';

export function writeOverlay(runDir: string, locale: string, files: Record<string, string>): void {
  const base = path.join(runDir, 'translated', locale);
  for (const [rel, content] of Object.entries(files)) {
    const p = path.join(base, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, content);
  }
}
