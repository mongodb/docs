'use client';

import { css } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { Icon } from '@leafygreen-ui/icon';
import { Link } from '@/mdx-components/Link';
import type { RelatedLink } from '@/services/eai/related-links';

const boxStyle = (darkMode: boolean) => css`
  border: 1px solid ${darkMode ? palette.gray.dark2 : palette.gray.light1};
  border-radius: 12px;
  padding: 16px;
  margin-top: 24px;
`;

const headerStyle = css`
  align-items: flex-start;
  color: ${palette.green.dark1};
  display: flex;
  gap: 8px;
`;

const headerTextStyle = css`
  color: inherit;
  font-size: 13px;
  font-weight: 500;
`;

const linkListStyle = css`
  margin-top: 8px;
  list-style: disc;
  padding-left: 24px;

  li {
    margin-top: 8px;
  }
`;

const linkTitleStyle = (darkMode: boolean) => css`
  color: ${darkMode ? palette.gray.light1 : palette.gray.dark1};
  display: block;
  font-weight: 400;
`;

export const RelatedLinksList = ({ results }: { results: RelatedLink[] }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={boxStyle(darkMode)}>
      <div className={headerStyle}>
        <Icon glyph="Sparkle" color={palette.green.dark1} />
        <span className={headerTextStyle}>The MongoDB Assistant suggests the following pages instead:</span>
      </div>
      <ul className={linkListStyle}>
        {results.map((result) => (
          <li key={result.url}>
            <span className={linkTitleStyle(darkMode)}>{result.title}</span>
            <div>
              <Link to={result.url}>{result.url}</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
