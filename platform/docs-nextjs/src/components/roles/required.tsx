'use client';

import styled from '@emotion/styled';
import { palette } from '@leafygreen-ui/palette';
import { theme } from '@/styles/theme';

const Em = styled('em')`
  color: ${palette.red.base};
  font-size: ${theme.fontSize.default};
  font-weight: normal !important;
`;

const RoleRequired = () => <Em>required</Em>;

export default RoleRequired;
