import type { ReactNode } from 'react';

export type ConditionalWrapperProps = {
  condition: boolean;
  wrapper: (children: ReactNode) => ReactNode;
  children: ReactNode;
};

const ConditionalWrapper = ({ condition, wrapper, children }: ConditionalWrapperProps) =>
  condition ? wrapper(children) : children;

export default ConditionalWrapper;
