import type { Root as RootNode } from '@/types/ast';
import ComponentFactory from '../component-factory';
import { isBrowser } from '@/utils/is-browser';
import { usePageContext } from '@/context/page-context';
import { useSnootyMetadata } from '@/utils/use-snooty-metadata';
import { useVersionContext } from '@/context/version-context';
import { getSiteTitle } from '@/utils/get-site-title';
import { getPlaintext } from '@/utils/get-plaintext';
import { getNestedValue } from '@/utils/get-nested-value';

export type RootProps = {
  nodeChildren: RootNode['children'];
};

const Root = ({ nodeChildren, ...rest }: RootProps) =>
  nodeChildren.map((child, i) => <ComponentFactory {...rest} key={i} nodeData={child} />);

export default Root;
