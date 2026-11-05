import fs from 'node:fs';
import path from 'node:path';
import type { Config } from '../config.js';
import { suiteDir } from './state.js';

export function pristineDir(cfg: Config, project: string, name: string): string {
  return path.join(suiteDir(cfg, project, name), 'pristine');
}

export function pristineProjectDir(cfg: Config, project: string, name: string): string {
  return path.join(pristineDir(cfg, project, name), project);
}

export function hasPristine(cfg: Config, project: string, name: string): boolean {
  return fs.existsSync(pristineProjectDir(cfg, project, name));
}

// Copy into a sibling temp dir and rename it into place, so an interrupted copy
// never leaves a truncated tree that the snapshot guard would accept as complete.
export function snapshotPristine(cfg: Config, project: string, name: string): void {
  const target = pristineProjectDir(cfg, project, name);
  const tmp = `${target}.tmp`;
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(tmp), { recursive: true });
  fs.cpSync(path.join(cfg.contentMdxDir, project), tmp, { recursive: true });
  fs.rmSync(target, { recursive: true, force: true });
  fs.renameSync(tmp, target);
}

export function restorePristine(cfg: Config, project: string, name: string): void {
  const projectDir = path.join(cfg.contentMdxDir, project);
  fs.rmSync(projectDir, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(projectDir), { recursive: true });
  fs.cpSync(pristineProjectDir(cfg, project, name), projectDir, { recursive: true });
}
