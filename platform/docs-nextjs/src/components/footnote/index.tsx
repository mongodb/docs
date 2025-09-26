'use client';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import ComponentFactory from '../component-factory';
import { getNestedValue } from '@/utils/get-nested-value';
import { intersperse } from '@/utils/intersperse';
import type { ASTNode } from '@/types/ast';
import { useFootnotes } from './footnote-context';

const tableStyling = (darkMode: boolean) => css`
  border: 0;
  border-collapse: collapse;
  margin: 24px 0;
  font-size: ${theme.fontSize.small};
  line-height: 24px;

  tbody tr td a {
    font-size: ${theme.fontSize.small};
  }

  tbody tr td div.highlight pre {
    background-color: inherit;
  }

  ${darkMode &&
  `
      tbody tr td a {
        color: ${palette.blue.light1};
      }
    `}

  :target {
    background-color: ${darkMode ? palette.gray.dark2 : '#ffa'};
  }
`;

const tdStyling = css`
  border: 0;
  padding: 11px 5px 12px;
`;

export type FootnoteNodeProps = {
  id: string;
  name?: string;
  nodeChildren: ASTNode[];
};

const Footnote = ({ id, name, nodeChildren }: FootnoteNodeProps) => {
  const { footnotes } = useFootnotes();
  const { darkMode } = useDarkMode();
  const ref = name || id.replace('id', '');
  const label = getNestedValue([ref, 'label'], footnotes) as number;
  const uid = name ? `${name}-` : '';
  const footnoteReferences = footnotes?.[ref]?.references || [];
  const footnoteReferenceNodes = footnoteReferences.map((footnote, index) => (
    <a href={`#ref-${uid}${footnote}`} key={index}>
      {index + 1}
    </a>
  ));

  return (
    <table className={cx('header-buffer', tableStyling(Boolean(darkMode)))} id={`footnote-${ref}`} rules="none">
      <colgroup>
        <col />
      </colgroup>
      <tbody>
        <tr style={{ verticalAlign: 'top' }}>
          <td className={cx(tdStyling)}>
            [{footnoteReferenceNodes.length !== 1 ? label : <a href={`#ref-${uid}${footnoteReferences[0]}`}>{label}</a>}
            ]
          </td>
          <td className={cx(tdStyling)}>
            {footnoteReferenceNodes.length > 1 && <em>({intersperse(footnoteReferenceNodes)})</em>}{' '}
            {nodeChildren.map((child, index) => (
              <ComponentFactory nodeData={child} key={index} parentNode="footnote" />
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Footnote;
