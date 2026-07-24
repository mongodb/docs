'use client';

import { Permalink } from '@/mdx-components/Permalink';
import { RefTarget } from '@/mdx-components/RefTarget';
import { Literal } from '@/mdx-components/Literal';

export type TargetProps = {
  /** Anchor id for permalinks and cross-references */
  id: string;
  /** RST/Snooty target kind (e.g. expression, method, label, binary, program) */
  name: string;
  /** Display term for definition-list targets (directive argument / expression signature) */
  term?: string;
  /** When true, render an anchor-only span (matches legacy :hidden: targets) */
  hidden?: boolean;
  children?: React.ReactNode;
};

/**
 * MDX equivalent of the Snooty Target renderer used with the AST pipeline:
 * definition-list layout for glossary-style targets, or anchor-only spans for
 * label/binary/program/hidden targets.
 */
export const Target = ({ id, name, term, hidden, children }: TargetProps) => {
  const anchorOnly = hidden || name === 'binary' || name === 'program' || name === 'label';

  if (anchorOnly) {
    return <RefTarget id={id} />;
  }

  const hasChildren =
    children !== undefined &&
    children !== null &&
    (!Array.isArray(children) || children.some((c) => c !== null && c !== false));

  if (!term && !hasChildren) {
    return <RefTarget id={id} />;
  }

  return (
    <dl className={name}>
      <dt>
        {term ? (
          <>
            <Literal>{term}</Literal>
            <Permalink id={id} description="definition" />
          </>
        ) : (
          <Permalink id={id} description="definition" />
        )}
      </dt>
      {hasChildren ? <dd>{children}</dd> : null}
    </dl>
  );
};
