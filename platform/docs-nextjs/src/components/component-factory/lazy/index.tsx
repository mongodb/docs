'use client';

import dynamic from 'next/dynamic';

type LazyComponentType = 'instruqt';
type LazyComponentMap = Record<LazyComponentType, React.ComponentType<Record<string, unknown>>>;

const ComponentMap: LazyComponentMap = {
  // TODO: uncomment this out as they get ported over
  // openapi: dynamic(() => import('./OpenAPI')),
  // video: dynamic(() => import('./Video')),
  instruqt: dynamic(() => import('@/components/instruqt')),
};

/**
 * Creates a map of lazy-loaded components by wrapping each component in a wrapper function.
 * @returns {Record<string, React.ComponentType<Record<string, unknown>>>} An object mapping component names to wrapped React components
 * i.e openapi, video, and instruqt
 */
type LazyLoadingComponentObject = Record<string, unknown>;
export const LAZY_COMPONENTS: Record<string, React.ComponentType<Record<string, unknown>>> = (
  Object.keys(ComponentMap) as LazyComponentType[]
).reduce<Record<string, React.ComponentType<LazyLoadingComponentObject>>>((res, key) => {
  // Offline work will be done in the offline epic
  const LazyComponent = ComponentMap[key];
  res[key] = (props) => <LazyComponent {...props} />;
  return res;
}, {});
