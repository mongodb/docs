import { cx, css } from '@leafygreen-ui/emotion';

const guiLabelStyle = css`
  font-style: normal;
  font-weight: 700;
`;

type GUILabelProps = {
  children: React.ReactNode;
};

export const GUILabel = ({ children }: GUILabelProps) => (
  // Keep "guilabel" className for styling when this component is inside of a Heading.
  <span className={cx('guilabel', guiLabelStyle)}>{children}</span>
);
