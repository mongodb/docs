'use client';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { getNestedValue } from '@/utils/get-nested-value';
import { useFootnotes } from './footnote-context';

const refStyles = css`
  color: ${palette.blue.light1};

  &:visited {
    color: ${palette.purple.base};
  }
`;

export type FootnoteReferenceProps = {
  id: string;
  refname?: string;
};

const FootnoteReference = ({ id, refname }: FootnoteReferenceProps) => {
  const { footnotes } = useFootnotes();
  const { darkMode } = useDarkMode();
  const ref = refname || id.replace('id', '');
  const uid = refname ? `${refname}-${id}` : id;

  return (
    <a
      className={cx('footnote-reference header-buffer', darkMode && refStyles)}
      href={`#footnote-${ref}`}
      id={`ref-${uid}`}
    >
      [{(getNestedValue([ref, 'label'], footnotes) as number | undefined) || ref}]
    </a>
  );
};

export default FootnoteReference;
