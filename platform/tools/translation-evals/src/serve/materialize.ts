import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';

/** Copy translated overlay files over content-mdx/<project>. Assumes English base is already generated. */
export function materialize(cfg: Config, project: string, runId: string, locale: string): void {
  const overlay = path.join(cfg.dataDir, project, runId, 'translated', locale);
  const target = path.join(cfg.contentMdxDir, project);
  if (!fs.existsSync(overlay)) {
    throw new Error(`No translated overlay for locale ${locale} — run: pnpm translate --project ${project} --run ${runId} --locale ${locale}`);
  }
  const copy = (src: string, rel: string) => {
    for (const e of fs.readdirSync(src, { withFileTypes: true })) {
      const s = path.join(src, e.name);
      const d = path.join(target, rel, e.name);
      if (e.isDirectory()) copy(s, path.join(rel, e.name));
      else {
        fs.mkdirSync(path.dirname(d), { recursive: true });
        fs.copyFileSync(s, d);
      }
    }
  };
  copy(overlay, '');
}
