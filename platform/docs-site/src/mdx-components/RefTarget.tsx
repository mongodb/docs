import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';

interface RefTargetProps {
  id: string;
}

const anchorStyle = css`
  scroll-margin-top: ${theme.header.navbarScrollOffset};
`;

export const RefTarget = ({ id }: RefTargetProps) => <span id={id} className={cx(anchorStyle)} />;
