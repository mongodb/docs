'use client';

import { useId, useMemo } from 'react';
import { Link, LinkStyle } from '@via-ds/components/typography';
import { useFootnoteContext } from '@/context/footnote-context';
import styles from './footnote.module.scss';

export type FootnoteProps = {
  children?: React.ReactNode;
  /** Pairing key shared with every <FootnoteReference> that points at this footnote. */
  name?: string;
};

export const Footnote = ({ children, name }: FootnoteProps) => {
  const stableId = useId();
  const { getOrCreateFootnoteId, registerFootnote, getFootnoteData } = useFootnoteContext();

  const id = useMemo(() => {
    return getOrCreateFootnoteId(stableId, name);
  }, [stableId, name, getOrCreateFootnoteId]);

  const label = registerFootnote(id);
  const data = getFootnoteData(id);
  const refIds = data?.refIds ?? [];

  const backLinkNodes = refIds.map((refId, index) => (
    <Link className={styles.backLink} href={`#${refId}`} key={refId} linkStyle={LinkStyle.Internal} isStandalone>
      {index + 1}
    </Link>
  ));

  const labelCell =
    refIds.length === 1 ? (
      <Link className={styles.backLink} href={`#${refIds[0]}`} linkStyle={LinkStyle.Internal} isStandalone>
        {label}
      </Link>
    ) : (
      label
    );

  return (
    <table className={styles.footnote} id={`footnote-${id}`} rules="none">
      <colgroup>
        <col />
      </colgroup>
      <tbody>
        <tr style={{ verticalAlign: 'top' }}>
          <td className={styles.cell}>[{labelCell}]</td>
          <td className={styles.cell}>
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
