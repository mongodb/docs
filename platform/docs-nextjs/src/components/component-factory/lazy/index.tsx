import type { InstruqtProps } from '@/components/instruqt';
import type { OpenAPIProps } from '@/components/openapi';
import type { VideoProps } from '@/components/video';
import type { OpenAPINode } from '@/types/ast';
import type { InstruqtNode } from '@/types/ast';
import type { VideoNode } from '@/types/ast';
import type { ComponentFactoryProps } from '@/components/component-factory';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

type LazyComponentMapType = {
  instruqt: ComponentType<ComponentFactoryProps>;
  openapi: ComponentType<ComponentFactoryProps>;
  video: ComponentType<ComponentFactoryProps>;
};

export const LazyComponentMap = {
  instruqt: dynamic(() => import('@/components/instruqt')),
  openapi: dynamic(() => import('@/components/openapi')),
  video: dynamic(() => import('@/components/video'), { ssr: false }),
} as const;

/**
 * Creates a map of lazy-loaded components by wrapping each component in a wrapper function.
 * i.e openapi, video, and instruqt
 */
export const LAZY_COMPONENTS: LazyComponentMapType = (
  Object.keys(LazyComponentMap) as Array<keyof typeof LazyComponentMap>
).reduce<LazyComponentMapType>((res, key) => {
  if (key === 'openapi') {
    const LazyComponent = LazyComponentMap.openapi as ComponentType<OpenAPIProps>;
    res.openapi = (props: ComponentFactoryProps) => {
      const node = props.nodeData as OpenAPINode;
      const openAPIProps: OpenAPIProps = {
        nodeChildren: node.children,
        options: node.options,
      };
      return <LazyComponent {...openAPIProps} />;
    };
  } else if (key === 'instruqt') {
    const LazyComponent = LazyComponentMap.instruqt as ComponentType<InstruqtProps>;
    res.instruqt = (props: ComponentFactoryProps) => {
      const node = props.nodeData as InstruqtNode;
      const instruqtProps: InstruqtProps = {
        argument: node.argument,
        options: node.options,
      };
      return <LazyComponent {...instruqtProps} />;
    };
  } else if (key === 'video') {
    const LazyComponent = LazyComponentMap.video as ComponentType<VideoProps>;
    res.video = (props: ComponentFactoryProps) => {
      const node = props.nodeData as VideoNode;
      const videoProps: VideoProps = {
        argument: node.argument,
        options: node.options,
      };
      return <LazyComponent {...videoProps} />;
    };
  }

  return res;
}, {} as LazyComponentMapType);
