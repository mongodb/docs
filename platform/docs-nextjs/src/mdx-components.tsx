import React from 'react';
import type { MDXComponents } from 'mdx/types';

const components = {
  // basic example mappings
  h1: ({ children }) => <h1 style={{ color: 'green' }}>{children}</h1>,
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  // example directive mapping, which should be extracted to the components folder and most likely contain more logic, etc.
  ExampleDirective: ({ children, ...props }) => <div {...props}>{children}</div>,
  // other components from the storybook demo that need mappings for nextjs build to pass
  Introduction: ({ children, ...props }) => <div {...props}>{children}</div>,
  Kicker: ({ children, ...props }) => <div {...props}>{children}</div>,
  Button: ({ children, ...props }) => <div {...props}>{children}</div>,
  Toctree: ({ children, ...props }) => <div {...props}>{children}</div>,
  Time: ({ children, ...props }) => <div {...props}>{children}</div>,
  DefinitionList: ({ children, ...props }) => <div {...props}>{children}</div>,
  DefinitionListItem: ({ children, ...props }) => <div {...props}>{children}</div>,
  Sub: ({ children, ...props }) => <div {...props}>{children}</div>,
  Superscript: ({ children, ...props }) => <div {...props}>{children}</div>,
} satisfies MDXComponents;

export const useMDXComponents = (): MDXComponents => {
  return components;
};
