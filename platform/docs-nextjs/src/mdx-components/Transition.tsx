import { palette } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';

const hrStyle = css`
  border: 0.5px solid ${palette.gray.light2};
`;

export const Transition = () => <hr className={hrStyle} />;
