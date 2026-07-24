import { Fragment } from 'react';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { formatText } from '@/utils/format-text';
import type { BreadcrumbType } from './breadcrumb-container';

const CollapsedBreadcrumbs = ({ crumbs }: { crumbs: BreadcrumbType[] }) => {
  const menuItems = crumbs.map((crumb, index) => {
    const to = crumb.path;

    return (
      <MenuItem key={index} href={to}>
        {formatText(crumb.title)}
      </MenuItem>
    );
  });

  return (
    <Fragment>
      <Menu
        align="bottom"
        justify="start"
        trigger={
          <IconButton aria-label="Show all breadcrumbs">
            <Icon glyph="Ellipsis" />
          </IconButton>
        }
      >
        {menuItems}
      </Menu>
    </Fragment>
  );
};

export default CollapsedBreadcrumbs;
