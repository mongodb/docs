import { palette } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';

const hrStyle = css`
  border: 0.5px solid ${palette.gray.light2};
`;

const Transition = () => <hr className={hrStyle} />;

export default Transition;
