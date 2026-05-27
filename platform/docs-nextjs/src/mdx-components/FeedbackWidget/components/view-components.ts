import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Subheading = styled.div`
  margin-top: 0;
  margin-bottom: ${theme.size.default};
  width: 100%;
  text-align: center;
  font-weight: regular;
  font-size: ${theme.fontSize.small};
`;
