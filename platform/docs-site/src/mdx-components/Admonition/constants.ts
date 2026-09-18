import type { CalloutVariant } from '@via-ds/components/callout';

type AdmonitionMapKey = 'example' | 'important' | 'note' | 'tip' | 'warning';

export const admonitionMap: Record<AdmonitionMapKey, CalloutVariant> = {
  example: 'example',
  important: 'important',
  note: 'note',
  tip: 'tip',
  warning: 'warning',
};
