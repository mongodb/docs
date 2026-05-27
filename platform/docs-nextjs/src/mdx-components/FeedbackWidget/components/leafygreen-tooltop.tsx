import Tooltip from '@leafygreen-ui/tooltip';
import type { TooltipProps } from '@leafygreen-ui/tooltip';

const LeafyGreenTooltip = (props: TooltipProps) => <Tooltip className={fwTooltipId} {...props} />;
export const fwTooltipId = 'feedback-tooltip';

export default LeafyGreenTooltip;
