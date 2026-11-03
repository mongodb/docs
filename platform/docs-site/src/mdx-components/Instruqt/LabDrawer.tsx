import type { SyntheticEvent } from 'react';
import { useEffect, useState, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { Resizable } from 'react-resizable';
import { ViaProvider } from '@via-ds/components/provider';
import { Text, TextStyle } from '@via-ds/components/typography';
import { ColorScheme, Size } from '@via-ds/components/types';
import { useLocale } from '@/context/locale';
import { useViewport } from '@/hooks/use-viewport';
import { theme } from '@/styles/theme';
import useScreenSize from '@/hooks/use-screen-size';
import useStickyTopValues from '@/hooks/use-sticky-top-values';
import { getHtmlLangFormat } from '@/utils/locale';
import { InstruqtFrame } from './InstruqtFrame';
import { DrawerButtons } from './DrawerButtons';
import styles from './lab-drawer.module.scss';

const CustomResizeHandle = forwardRef<HTMLDivElement, { handleAxis?: string }>((props, ref) => {
  // handleAxis is being filtered out to avoid prop warning for div
  // restProps along with ref are what actually allows react-resizable to treat this as a handle
  const { ...restProps } = props;
  return (
    <div className={styles.handleContainer}>
      {/* Allow grab area to be bigger than the actual shape of the handle */}
      <div className={styles.handleGrabArea} ref={ref} {...restProps}>
        <div className={styles.handle} />
      </div>
    </div>
  );
});

CustomResizeHandle.displayName = 'CustomResizeHandle';

export type LabDrawerProps = {
  title: string;
  embedValue: string;
};

export const LabDrawer = ({ title, embedValue }: LabDrawerProps) => {
  const viewportSize = useViewport();
  const { isMobile } = useScreenSize();
  const { locale } = useLocale();
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
    // Prevents the drawer from overlapping with the top nav, which helps avoid awkward z-indexes when
    // UnifiedNav's menu is open. We can consider removing this if the UnifiedNav provides some sort of
    // way to allow the frontend to know if its menu is open
    maxHeight -= theme.size.stripUnit(topSmall);
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
    <ViaProvider colorScheme={ColorScheme.Dark} locale={getHtmlLangFormat(locale)}>
      <Resizable
        className={styles.labContainer}
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
          <div className={styles.topContainer}>
            <Text textStyle={TextStyle.body} size={Size.Large} elementType="div" className={styles.title}>
              {labTitle}
            </Text>
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
          {isResizing && <div className={styles.iframeOverlay} style={{ height: `${frameHeight}px` }} />}
          <InstruqtFrame title={title} embedValue={embedValue} height={frameHeight} />
        </div>
      </Resizable>
    </ViaProvider>,
    document.body,
  );
};
