'use client';

import { useId, useMemo } from 'react';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import { useFootnoteContext } from '@/context/footnote-context';

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

const scrollMarginStyles = css`
  scroll-margin-top: ${theme.header.navbarScrollOffset};
`;

export type FootnoteProps = {
  children?: React.ReactNode;
  name?: string;
};

export const Footnote = ({ children, name }: FootnoteProps) => {
  const stableId = useId();
  const { getOrCreateFootnoteId, registerFootnote, getFootnoteData } = useFootnoteContext();
  const { darkMode } = useDarkMode();

  const id = useMemo(() => {
    return getOrCreateFootnoteId(stableId, name);
  }, [stableId, name, getOrCreateFootnoteId]);

  const label = registerFootnote(id);
  const data = getFootnoteData(id);
  const refIds = data?.refIds ?? [];

  const backLinkNodes = refIds.map((refId, index) => (
    <a href={`#${refId}`} key={refId}>
      {index + 1}
    </a>
  ));

  const labelCell = refIds.length === 1 ? <a href={`#${refIds[0]}`}>{label}</a> : label;

  return (
    <table className={cx(scrollMarginStyles, tableStyling(darkMode))} id={`footnote-${id}`} rules="none">
      <colgroup>
        <col />
      </colgroup>
      <tbody>
        <tr style={{ verticalAlign: 'top' }}>
          <td className={cx(tdStyling)}>[{labelCell}]</td>
          <td className={cx(tdStyling)}>
            {backLinkNodes.length > 1 && (
              <em>
                (
                {backLinkNodes.reduce<React.ReactNode[]>((acc, node, i) => {
                  if (i > 0) acc.push(', ');
                  acc.push(node);
                  return acc;
                }, [])}
                )
              </em>
            )}{' '}
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
