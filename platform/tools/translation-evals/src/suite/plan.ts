import type { BackendName } from '@mongodb-docs/translation-service';
import type { SuiteConfig, Translator } from './config.js';

export interface Iteration {
  id: string;
  backend: BackendName;
  model?: string;
  repeat: number;
}

export function iterationId(t: Translator, repeat: number): string {
  return `${t.backend}:${t.model ?? ''}#${repeat}`;
}

export function expandPlan(cfg: SuiteConfig): Iteration[] {
  const iterations: Iteration[] = [];
  for (const translator of cfg.translators) {
    for (let repeat = 1; repeat <= cfg.repeats; repeat++) {
      iterations.push({
        id: iterationId(translator, repeat),
        backend: translator.backend,
        model: translator.model,
        repeat,
      });
    }
  }
  return iterations;
}
