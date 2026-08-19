'use client';

import { useId, useMemo } from 'react';
import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import { useFootnoteContext } from '@/context/footnote-context';

const refStyles = css`
  scroll-margin-top: ${theme.header.navbarScrollOffset};
  color: ${palette.blue.light1};

  &:visited {
    color: ${palette.purple.base};
  }
`;

export type FootnoteReferenceProps = {
  name?: string;
  /** This reference's 1-based ordinal among the references to the same footnote. */
  index?: string | number;
};

export const FootnoteReference = ({ name, index }: FootnoteReferenceProps) => {
  const stableId = useId();
  const { getOrCreateRefId, registerReference } = useFootnoteContext();

  const { label, refId, footnoteId } = useMemo(() => {
    const footnoteId = getOrCreateRefId(stableId, name);
    // `name` pairs this reference with its footnote; `index` distinguishes it from the page's
    // other references to that same footnote. Both are resolved at conversion time, so the
    // resulting anchor is the same no matter what else rendered.
    const preferredRefId = index ? `ref-${footnoteId}-${index}` : undefined;
    const result = registerReference(stableId, footnoteId, preferredRefId);
    return { ...result, footnoteId };
  }, [stableId, name, index, getOrCreateRefId, registerReference]);

  return (
    <a className={cx('footnote-reference', refStyles)} href={`#footnote-${footnoteId}`} id={refId}>
      [{label}]
    </a>
  );
};
