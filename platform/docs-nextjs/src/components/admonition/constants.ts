import type { Variant } from '@leafygreen-ui/callout';
import type { AdmonitionName } from '@/types/ast';

export const admonitionMap: Record<AdmonitionName, Variant> = {
  example: 'example',
  important: 'important',
  note: 'note',
  tip: 'tip',
  see: 'tip',
  seealso: 'tip',
  warning: 'warning',
};
