import { cx, css } from '@leafygreen-ui/emotion';

const listItemStyles = css`
  ::marker {
    color: var(--font-color-primary);
  }
`;

const listItemContentStyles = css`
  margin-bottom: 8px;

  /** Some MDX ListItem children come through with a p tag, some don't.
   *  This prevents margin-bottom on the first paragraph in the list item
   *  as the listItem itself will have the margin.
   */
  & > p {
    margin-bottom: 0;
  }
`;

export type ListItemProps = {
  children: React.ReactNode;
};

export const ListItem = ({ children }: ListItemProps) => {
  return (
    <li className={cx(listItemStyles)}>
      <div className={cx(listItemContentStyles)}>{children}</div>
    </li>
  );
};
