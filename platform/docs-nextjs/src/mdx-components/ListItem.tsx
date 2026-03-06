import { cx, css } from '@leafygreen-ui/emotion';

const listParagraphStyles = css`
  ::marker {
    color: var(--font-color-primary);
  }
  & > p {
    margin-bottom: 8px;
  }
`;

export type ListItemProps = {
  children: React.ReactNode;
};

export const ListItem = ({ children }: ListItemProps) => {
  return <li className={cx(listParagraphStyles)}>{children}</li>;
};
