'use client';

import { useRef } from 'react';
import type { ASTNode } from '@/types/ast';
import ComponentFactory from '../component-factory';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import useHashAnchor from '@/utils/hooks/use-hash-anchor';
import Permalink from '../permalink';

const headerBuffer = css`
  scroll-margin-top: ${theme.header.navbarScrollOffset};
  position: absolute;
`;

// Based on condition isValid, split array into two arrays: [[valid, invalid]]
const partition = (array: ASTNode[], isValid: (elem: ASTNode) => boolean) => {
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[] as ASTNode[], [] as ASTNode[]],
  );
};

type DescriptionTermProps = {
  children?: ASTNode[];
  html_id: string;
};

const DescriptionTerm = ({ children, html_id, ...rest }: DescriptionTermProps) => {
  return (
    <dt>
      {children?.map((child, j) => (
        <ComponentFactory key={j} {...rest} nodeData={child} />
      ))}
      <Permalink id={html_id} description="definition" />
    </dt>
  );
};

export type TargetProps = {
  nodeChildren: ASTNode[];
  html_id: string;
  name: string;
  options?: {
    hidden?: boolean;
  };
};

const Target = ({ nodeChildren, html_id, name, options, ...rest }: TargetProps) => {
  const [, dictList] = partition(nodeChildren, (child) => child.type === 'target_identifier');
  const [[descriptionTerm], descriptionDetails] = partition(dictList, (elem) => elem.type === 'directive_argument');
  const hidden = !!options?.hidden;
  const targetRef = useRef<HTMLSpanElement>(null);
  useHashAnchor(html_id, targetRef.current);

  return (
    <>
      {/* Render binary and program targets **and targets with the :hidden: flag
      as empty spans such that their IDs are rendered on the page. */}
      {dictList.length > 0 && !['binary', 'program'].includes(name) && !hidden ? (
        <dl className={name}>
          {descriptionTerm && <DescriptionTerm {...rest} {...descriptionTerm} html_id={html_id} />}
          <dd>
            {descriptionDetails.map((node, i) => (
              <ComponentFactory {...rest} nodeData={node} key={i} />
            ))}
          </dd>
        </dl>
      ) : (
        <span ref={targetRef} className={cx(headerBuffer)} id={html_id} />
      )}
    </>
  );
};

export default Target;
