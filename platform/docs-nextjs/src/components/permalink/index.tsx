import { useState, useRef } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import Tooltip from '@leafygreen-ui/tooltip';
import { isBrowser } from '@/utils/is-browser';
import { theme } from '@/styles/theme';
import useCopyClipboard from '@/utils/hooks/use-copy-clipboard';
import useHashAnchor from '@/utils/hooks/use-hash-anchor';
import { usePageContext } from '@/context/page-context';

const tooltipStyle = css`
  padding: 2px 8px;
  font-size: ${theme.fontSize.xsmall};

  > div {
    font-size: ${theme.fontSize.tiny};
  }
`;

const getHeaderBufferStyle = (hasComposable: boolean) => css`
  display: inline;
  left: 0;
  top: 0;
  margin-top: ${hasComposable
    ? `calc(-1 * (${theme.header.composableDesktopHeight} + ${theme.header.navbarScrollOffset}))`
    : `-${theme.header.navbarScrollOffset}`};
  position: absolute;
  // Add a bit of padding to help headings be more accurately set as "active" on FF and Safari
  padding-bottom: 2px;

  @media ${theme.screenSize.upToMedium} {
    margin-top: ${hasComposable
      ? `calc(-1 * (${theme.header.composableMobileHeight} + ${theme.header.navbarScrollOffset}))`
      : `-${theme.header.navbarScrollOffset}`};
  }
`;

const headingStyle = (copied: boolean) => css`
  ${!!copied && 'visibility: visible !important;'}
  position: absolute;
  align-self: center;
  padding: 0 10px;
  visibility: hidden;
`;

const iconStyling = css`
  vertical-align: middle;
  margin-top: -2px;
`;

export type PermalinkProps = {
  id: string;
  description: string;
};

const Permalink = ({ id, description }: PermalinkProps) => {
  const { darkMode } = useDarkMode();
  const { options } = usePageContext();
  const url = isBrowser ? window.location.href.split('#')[0] + '#' + id : '';

  const [copied, setCopied] = useState(false);

  const headingRef = useRef<HTMLAnchorElement>(null);
  useCopyClipboard(copied, setCopied, headingRef.current, url);

  const linkRef = useRef<HTMLDivElement>(null);
  useHashAnchor(id, linkRef.current);

  const handleClick = () => {
    setCopied(true);
  };

  return (
    <a
      className={cx('headerlink', headingStyle(copied))}
      ref={headingRef}
      href={`#${id}`}
      title={'Permalink to this ' + description}
      onClick={handleClick}
    >
      <Icon
        className={cx(iconStyling)}
        glyph={'Link'}
        size={12}
        fill={darkMode ? palette.gray.light1 : palette.gray.base}
      />
      <Tooltip
        className={cx(tooltipStyle)}
        triggerEvent="click"
        open={copied}
        align="top"
        justify="middle"
        darkMode={true}
      >
        {'copied'}
      </Tooltip>
      <div className={cx(getHeaderBufferStyle(options?.has_composable_tutorial ?? false))} ref={linkRef} id={id} />
    </a>
  );
};

export default Permalink;
