import type { InstruqtProps } from '@/components/instruqt';
import dynamic from 'next/dynamic';

// Passing an object with nodeData as a property
type Data = {
  nodeData: InstruqtProps;
};

type LazyComponentMap = {
  instruqt: React.ComponentType<Data>;
};

export const ComponentMap = {
  // TODO: uncomment this out as they get ported over
  // openapi: dynamic(() => import('./OpenAPI')),
  // video: dynamic(() => import('./Video')),
  instruqt: dynamic(() => import('@/components/instruqt')),
} as const;

/**
 * Creates a map of lazy-loaded components by wrapping each component in a wrapper function.
 * i.e openapi, video, and instruqt
 */
export const LAZY_COMPONENTS: LazyComponentMap = (
  Object.keys(ComponentMap) as Array<keyof typeof ComponentMap>
).reduce<LazyComponentMap>((res, key) => {
  // Offline work will be done in the offline epic
  const LazyComponent = ComponentMap[key];
  res[key] = (props) => <LazyComponent {...props.nodeData} />;
  return res;
}, {} as LazyComponentMap);
