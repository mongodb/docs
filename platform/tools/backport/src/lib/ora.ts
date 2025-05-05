import oraOriginal from 'ora';

/* eslint-disable @typescript-eslint/no-empty-function */
export const oraNonInteractiveMode = {
  start: () => oraNonInteractiveMode,
  succeed: () => {},
  stop: () => {},
  fail: () => {},
  stopAndPersist: () => {},
  set text(value: string) {},
} as oraOriginal.Ora;

export function ora(
  interactive: boolean | undefined,
  text?: string | undefined,
): oraOriginal.Ora {
  return interactive ? oraOriginal({ text }) : oraNonInteractiveMode;
}

export type Ora = oraOriginal.Ora;
