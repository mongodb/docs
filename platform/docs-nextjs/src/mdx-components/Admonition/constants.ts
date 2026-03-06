import type { Variant } from '@leafygreen-ui/callout';

type AdmonitionMapKey = 'example' | 'important' | 'note' | 'tip' | 'warning';

export const admonitionMap: Record<AdmonitionMapKey, Variant> = {
  example: 'example',
  important: 'important',
  note: 'note',
  tip: 'tip',
  warning: 'warning',
};
