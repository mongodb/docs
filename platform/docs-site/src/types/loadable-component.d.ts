declare module '@loadable/component' {
  import type { ComponentType } from 'react';

  export default function loadable<T>(loadFn: () => Promise<{ default: ComponentType<T> }>): ComponentType<T>;
}
