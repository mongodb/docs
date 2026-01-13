'use client';

import { useCallback, useContext, useState } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import type { DarkModePref } from '@/context/dark-mode-context';
import { DarkModeContext } from '@/context/dark-mode-context';
import { theme } from '@/styles/theme';
import { reportAnalytics } from '@/utils/report-analytics';
import IconDarkmode from '../icons/DarkMode';
import { currentScrollPosition } from '@/utils/current-scroll-position';

const iconStyling = css`
  display: block;
  align-content: center;
  cursor: pointer;

  > div {
    position: relative;
  }
`;

const menuStyling = css`
  && {
    min-width: 124px;
    width: fit-content;
    margin-top: ${theme.size.small};
    font-weight: 700;
  }
`;

const menuItemStyling = css`
  && {
    padding: 1px ${theme.size.medium};
  }
`;

const DROPDOWN_ICON_SIZE = 20;
const darkModeSvgStyle = {
  width: DROPDOWN_ICON_SIZE,
  height: DROPDOWN_ICON_SIZE,
};

const DarkModeDropdown = () => {
  // not using dark mode from LG/provider here to account for case of 'system' dark theme
  const { setDarkModePref, darkModePref } = useContext(DarkModeContext);

  const [open, setOpen] = useState(false);

  const select = useCallback(
    (selectedPref: DarkModePref) => {
      reportAnalytics('Click', {
        position: 'secondary nav',
        position_context: 'dark mode menu',
        label: selectedPref,
        scroll_position: currentScrollPosition(),
        tagbook: 'true',
      });
      setDarkModePref(selectedPref);
      setOpen(false);
    },
    [setDarkModePref, setOpen],
  );

  return (
    <div
      className={cx(
        css`
          position: relative;
        `,
      )}
    >
      <Menu
        className={cx(menuStyling)}
        justify={'start'}
        align={'bottom'}
        open={open}
        setOpen={() => {
          reportAnalytics('Click', {
            position: 'secondary nav',
            position_context: 'dark mode menu',
            label: `action: ${open ? 'closed' : 'opened'}`,
            scroll_position: currentScrollPosition(),
            tagbook: 'true',
          });
          setOpen((e) => !e);
        }}
        trigger={
          <IconButton className={cx(iconStyling)} aria-label="Dark Mode Menu" aria-labelledby="Dark Mode Menu">
            {darkModePref === 'system' ? (
              <IconDarkmode />
            ) : (
              <Icon size={24} glyph={darkModePref === 'dark-theme' ? 'Moon' : 'Sun'} />
            )}
          </IconButton>
        }
      >
        <MenuItem
          className={cx(menuItemStyling)}
          active={darkModePref === 'light-theme'}
          onClick={() => select('light-theme')}
          glyph={<Icon size={DROPDOWN_ICON_SIZE} glyph={'Sun'} />}
        >
          Light
        </MenuItem>
        <MenuItem
          className={cx(menuItemStyling)}
          active={darkModePref === 'dark-theme'}
          onClick={() => select('dark-theme')}
          glyph={<Icon size={DROPDOWN_ICON_SIZE} glyph={'Moon'} />}
        >
          Dark
        </MenuItem>
        <MenuItem
          className={cx(menuItemStyling)}
          active={darkModePref === 'system'}
          onClick={() => select('system')}
          glyph={<IconDarkmode styles={darkModeSvgStyle} />}
        >
          System
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DarkModeDropdown;
