'use client';

import { useId, useMemo } from 'react';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import { useFootnoteContext } from '@/context/footnote-context';

const refStyles = css`
  color: ${palette.blue.light1};

  &:visited {
    color: ${palette.purple.base};
  }
`;

const scrollMarginStyles = css`
  scroll-margin-top: ${theme.header.navbarScrollOffset};
`;

export type FootnoteReferenceProps = {
  name?: string;
};

export const FootnoteReference = ({ name }: FootnoteReferenceProps) => {
  const stableId = useId();
  const { getOrCreateRefId, registerReference } = useFootnoteContext();
  const { darkMode } = useDarkMode();

  const { label, refId, footnoteId } = useMemo(() => {
    const footnoteId = getOrCreateRefId(stableId, name);
    const result = registerReference(stableId, footnoteId);
    return { ...result, footnoteId };
  }, [stableId, name, getOrCreateRefId, registerReference]);

  return (
    <a
      className={cx('footnote-reference', scrollMarginStyles, darkMode && refStyles)}
      href={`#footnote-${footnoteId}`}
      id={refId}
    >
      [{label}]
    </a>
  );
};
