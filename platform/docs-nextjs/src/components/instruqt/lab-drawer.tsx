import type { SyntheticEvent } from 'react';
import { useEffect, useState, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { Resizable } from 'react-resizable';
import { cx, css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { useViewport } from '@/hooks/use-viewport';
import { theme } from '@/styles/theme';
import useScreenSize from '@/hooks/use-screen-size';
import useStickyTopValues from '@/hooks/use-sticky-top-values';
import InstruqtFrame from './instruqt-frame';
import DrawerButtons from './drawer-buttons';

const labContainerStyle = css`
  background-color: ${palette.gray.dark3};
  // Keeping z-index same as chatbot modal
  z-index: ${theme.zIndexes.widgets};
  position: fixed !important;
  bottom: 0;
  color: ${palette.white};

  @media ${theme.screenSize.upToSmall} {
    // Accommodate widget buttons
    bottom: 60px;
    // We need to lower z-index to avoid floating lab when top nav menus are open/active
    z-index: 0;
  }
`;

const handleContainerStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const handleGrabArea = css`
  position: absolute;
  cursor: ns-resize;
  top: 10px;

  // Allows element to be bigger in size while maintaining visual size
  padding: 10px 20px 20px 20px;
  margin: -10px -20px -20px -20px;

  @media ${theme.screenSize.upToMedium} {
    display: none;
  }
`;

const handleStyle = css`
  border-radius: 4px;
  background-color: ${palette.white};
  width: 50px;
  height: 4px;
`;

const topContainerStyle = css`
  position: relative;
  padding: 0 17px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: 'inherit';

  .dark-theme & {
    background-color: ${palette.gray.dark2};
  }

  @media ${theme.screenSize.upToMedium} {
    justify-content: left;
  }
`;

const titleStyle = css`
  font-size: 16px;
  line-height: 28px;
  width: 50vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin-top: 10px;

  @media ${theme.screenSize.upToMedium} {
    text-align: left;
    margin-top: 0;
  }
`;

const iframeOverlayStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
  width: 100%;
`;

const CustomResizeHandle = forwardRef<HTMLDivElement, { handleAxis?: string }>((props, ref) => {
  // handleAxis is being filtered out to avoid prop warning for div
  // restProps along with ref are what actually allows react-resizable to treat this as a handle
  const { ...restProps } = props;
  return (
    <div className={cx(handleContainerStyle)}>
      {/* Allow grab area to be bigger than the actual shape of the handle */}
      <div className={cx(handleGrabArea)} ref={ref} {...restProps}>
        <div className={cx(handleStyle)} />
      </div>
    </div>
  );
});

CustomResizeHandle.displayName = 'CustomResizeHandle';

export type LabDrawerProps = {
  title: string;
  embedValue: string;
};

const LabDrawer = ({ title, embedValue }: LabDrawerProps) => {
  const viewportSize = useViewport();
  const { isMobile } = useScreenSize();
  const labTitle = title || 'MongoDB Interactive Lab';
  const [isResizing, setIsResizing] = useState(false);

  const defaultMeasurement = 200;
  const defaultHeight = viewportSize.height ? (viewportSize.height * 2) / 3 : defaultMeasurement;
  const defaultWidth = viewportSize.width ?? defaultMeasurement;
  // Set this to 100% instead of a set px to avoid overlap with the browser's scrollbar
  const wrapperWidth = '100%';

  const [height, setHeight] = useState(defaultHeight);
  const minHeight = 60;
  let maxHeight = viewportSize.height ?? defaultMeasurement;
  const { topSmall } = useStickyTopValues();

  if (isMobile) {
    // Avoids max height of drawer from being skewed by widgets
    const widgetsContainerHeight = theme.size.stripUnit(theme.widgets.buttonContainerMobileHeight);
    // Prevents the drawer from overlapping with the top nav, which helps avoid awkward z-indexes when
    // UnifiedNav's menu is open. We can consider removing this if either the UnifiedNav provides
    // some sort of way to allow the frontend to know if its menu is open, or if the lab drawer no longer
    // rests on top of the widgets container
    const topNavHeight = theme.size.stripUnit(topSmall);
    const offset = topNavHeight + widgetsContainerHeight;
    maxHeight -= offset;
  }

  const frameHeight = height - minHeight;

  // Shrink height of the drawer if new max height is less than the current height
  useEffect(() => {
    if (maxHeight < height) {
      setHeight(maxHeight);
    }
  }, [height, maxHeight]);

  const handleResize = (_e: SyntheticEvent, { size }: { size: { height: number } }) => {
    setHeight(size.height);
  };

  return createPortal(
    <Resizable
      className={cx(labContainerStyle)}
      height={height}
      maxConstraints={[defaultWidth, maxHeight]}
      minConstraints={[defaultWidth, minHeight]}
      width={defaultWidth}
      resizeHandles={['n']}
      handle={<CustomResizeHandle />}
      onResize={handleResize}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={() => setIsResizing(false)}
    >
      {/* Need this div with style as a wrapper to help with resizing */}
      <div style={{ width: wrapperWidth, height: height + 'px' }} data-testid="resizable-wrapper">
        <div className={cx(topContainerStyle)}>
          <div className={cx(titleStyle)}>{labTitle}</div>
          <DrawerButtons
            height={height}
            minHeight={minHeight}
            maxHeight={maxHeight}
            defaultHeight={defaultHeight}
            setHeight={setHeight}
          />
        </div>
        {/* Having an overlaying div allows dragging to not bug out when mouse crosses over into the iframe */}
        {/* Keep height separate from css style to avoid constant css updates */}
        {isResizing && <div className={cx(iframeOverlayStyle)} style={{ height: `${frameHeight}px` }} />}
        <InstruqtFrame title={title} embedValue={embedValue} height={frameHeight} />
      </div>
    </Resizable>,
    document.body,
  );
};

export default LabDrawer;
