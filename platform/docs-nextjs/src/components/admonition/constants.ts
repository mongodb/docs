import type { Variant } from '@leafygreen-ui/callout';
import type { AdmonitionName } from '@/types/ast';

export const admonitionMap: Record<Exclude<AdmonitionName, 'see' | 'seealso'>, Variant> = {
  example: 'example',
  important: 'important',
  note: 'note',
  tip: 'tip',
  warning: 'warning',
};
