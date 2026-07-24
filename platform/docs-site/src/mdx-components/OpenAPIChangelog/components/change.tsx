import styled from '@emotion/styled';
import { palette } from '@leafygreen-ui/palette';
import Tooltip, { Align, Justify } from '@leafygreen-ui/tooltip';
import Icon from '@leafygreen-ui/icon';

export const Flex = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

const ChangeListItem = styled.li`
  margin-top: 12px;
  line-height: 28px;
`;

const IconWrapper = styled(Flex)`
  margin-right: 5px;
`;

type ChangeProps = {
  change: string;
  backwardCompatible: boolean;
};

const Change = ({ change, backwardCompatible }: ChangeProps) => {
  const changeStatement = change[0].toUpperCase() + change.slice(1);

  return (
    <ChangeListItem>
      {!backwardCompatible && (
        <Tooltip
          align={Align.Top}
          justify={Justify.Middle}
          trigger={
            <IconWrapper>
              <Icon glyph="ImportantWithCircle" fill={palette.red.base} />
            </IconWrapper>
          }
        >
          Breaking change
        </Tooltip>
      )}
      {changeStatement}
    </ChangeListItem>
  );
};

export default Change;
