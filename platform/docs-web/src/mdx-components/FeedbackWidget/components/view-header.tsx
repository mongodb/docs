import styled from '@emotion/styled';
import { Body } from '@leafygreen-ui/typography';
import { theme } from '@/styles/theme';
import { RATING_QUESTION_TEXT } from '../constants';

const TextHeader = styled(Body)`
  font-weight: 600;
  text-align: center;
  margin-top: 20px;

  @media ${theme.screenSize.upToLarge} {
    margin-top: ${theme.size.large};
  }
`;

// this should only render when in modal or mobile view
const ViewHeader = () => {
  return <TextHeader>{RATING_QUESTION_TEXT}</TextHeader>;
};

export default ViewHeader;
