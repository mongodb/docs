import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

const goldStyles = css`
  color: ${palette.yellow.dark2};

  .dark-theme & {
    color: ${palette.yellow.light2};
  }
`;

type GoldProps = {
  children: React.ReactNode;
};

export const Gold = ({ children }: GoldProps) => <strong className={cx(goldStyles)}>{children}</strong>;
