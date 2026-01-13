import type { MouseEvent as ReactMouseEvent } from 'react';
import { useCallback, useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import Portal from '@leafygreen-ui/portal';
import { useFeedbackContext } from '../context';
import { feedbackId } from '../feedback-form';
import { isBrowser } from '@/utils/is-browser';
import useNoScroll from '@/hooks/use-no-scroll';
import { theme } from '@/styles/theme';
import { SCREENSHOT_BUTTON_TEXT, SCREENSHOT_BUTTON_TEXT_LOW, SCREENSHOT_OVERLAY_ALT_TEXT } from '../constants';

const HIGHLIGHT_BORDER_SIZE = 5;

let savedPosition: DOMRect | null = null;

type ElemProps = {
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  position: string;
};

const instructionsBorderStyling = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: #ffdd49 solid ${HIGHLIGHT_BORDER_SIZE}px;
  z-index: 1001;
`;

const instructionsPanelStyling = css`
  position: fixed;
  width: 800px;
  top: 0;
  left: 50%;
  margin-left: -400px;
  cursor: pointer;
  z-index: 1003;
`;

const baseStyle = (position: string, top: number, left: number, width: number, height: number) => css`
  position: ${position};
  top: ${top}px;
  left: ${left}px;
  width: ${width ? width + 'px' : `100%`};
  height: ${height}px;
  cursor: pointer;
`;

// styling for shadow overlays around the current selected component
const overlayElementStyle = (position: string, top: number, left: number, width: number, height: number) => css`
  ${baseStyle(position, top, left, width, height)};
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

// current hovered or selected component
const highlightedElementStyle = (
  position: string,
  top: number,
  left: number,
  width: number,
  height: number,
  lineStyle: string,
) => css`
  ${baseStyle(position, top, left, width, height)};
  outline: #ffdd49 ${lineStyle} ${HIGHLIGHT_BORDER_SIZE}px;
  outline-offset: 3px;
  float: left;
  z-index: 1001;
  cursor: ${lineStyle === 'solid' ? 'unset' : 'pointer'};
`;

const exitButtonStyle = (position: string, top: number, left: number) => css`
  position: ${position};
  top: ${Math.max(top - 1, 8)}px;
  left: ${Math.max(left - 1, 8)}px;
  color: #ffdd49;
  background-color: white;
  border-radius: 80%;
  cursor: pointer;
  z-index: 1002;
`;

//styling for entire screenshot icon selector
const ScreenshotSelect = styled(Button)`
  && {
    display: block;
    margin: 0 auto ${theme.size.small} 0;
    z-index: 5;
  }
`;

const ScreenshotButton = ({ ...props }) => {
  const { setScreenshotTaken, selectedRating, isScreenshotButtonClicked, setIsScreenshotButtonClicked, setDetachForm } =
    useFeedbackContext();
  const [currElemState, setCurrElemState] = useState<Element | null>(null);

  // border around highlighted element
  const domElementClickedRef = useRef('dashed');
  const [selectedElementBorderStyle, setSelectedElementBorderStyle] = useState('dashed');

  // store selected dom element and its attributes
  const currElem = useRef<Element | null>(null);
  const initialElemProperties = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0, position: 'absolute' };
  const currElemProperties = useRef(initialElemProperties);
  const [elemProps, setElemProps] = useState<ElemProps | null>(null);

  const documentScrollWidth = document.body.scrollWidth;
  const documentScrollHeight = document.body.scrollHeight;

  useEffect(() => {
    setElemProps({
      width: currElemProperties.current['width'],
      height: currElemProperties.current['height'],
      top: currElemProperties.current['top'],
      bottom: currElemProperties.current['bottom'],
      left: currElemProperties.current['left'],
      right: currElemProperties.current['right'],
      position: currElemProperties.current['position'],
    });
    setSelectedElementBorderStyle(domElementClickedRef.current);
  }, [currElemState]);

  // prevent FW from being selected
  const isFWSelected = useCallback((listOfElements: Element[]) => {
    for (let i = 0; i < listOfElements.length; i++) {
      if (listOfElements[i]?.id?.includes(feedbackId)) {
        return true;
      }
    }
  }, []);

  // set properties of selected DOM element based on bounding box
  const setSelectedElementProperties = useCallback((currDOMRect: DOMRect) => {
    const isScrolled = currElemProperties.current['position'] === 'absolute';

    currElemProperties.current['width'] = currDOMRect.width;
    currElemProperties.current['height'] = currDOMRect.height;

    // adjust for scrolling if element selected is not part of the side or top nav
    currElemProperties.current['top'] = isScrolled ? currDOMRect.top + window.scrollY : currDOMRect.top;
    currElemProperties.current['bottom'] = isScrolled ? currDOMRect.bottom + window.scrollY : currDOMRect.bottom;
    currElemProperties.current['left'] = isScrolled ? currDOMRect.left + window.scrollX : currDOMRect.left;
    currElemProperties.current['right'] = isScrolled ? currDOMRect.right + window.scrollX : currDOMRect.right;
  }, []);

  // event listener to check whether elements are being hovered over
  const handleElementHighlight = ({ pageX, pageY }: MouseEvent) => {
    if (domElementClickedRef.current === 'solid') {
      document.removeEventListener('mousemove', handleElementHighlight);
    }

    // current position of mouse with scrolling taken into account
    const listOfElements = document.elementsFromPoint(pageX - window.pageXOffset, pageY - window.pageYOffset);
    let domElement: Element | null = null;

    // get the topmost DOM element excluding overlays
    if (!isFWSelected(listOfElements)) {
      domElement = listOfElements[0];
      for (let i = 0; i < listOfElements.length; i++) {
        const elem = String(listOfElements[i]?.className);
        if (!!elem && !elem.includes('overlay')) {
          domElement = listOfElements[i];
          break;
        }
      }
    }

    // for elements in the top or side nav, set position to fixed. Otherwise set it to absolute
    for (let i = 0; i < listOfElements.length; i++) {
      const elem = String(listOfElements[i]?.className);
      // This boolean check only triggers in development environments
      if (!!elem && (elem.includes('SidenavContainer') || elem.includes('StyledHeaderContainer'))) {
        currElemProperties.current['position'] = 'fixed';
        break;
      }
      currElemProperties.current['position'] = 'absolute';
    }

    // hovered element is different from current element
    if (!!domElement && currElem.current !== domElement) {
      currElem.current = domElement;
      setCurrElemState(domElement);

      // set properties like width, height, top, left, etc. for selected element
      setSelectedElementProperties(currElem.current.getBoundingClientRect());
    }
  };

  // when screenshot button is first clicked
  const takeNewScreenshot = useCallback(() => {
    savedPosition = document.getElementById(feedbackId)?.getBoundingClientRect() ?? null;
    setIsScreenshotButtonClicked(true);
    setDetachForm(true);
    domElementClickedRef.current = 'dashed';
    setSelectedElementBorderStyle('dashed');
  }, [setIsScreenshotButtonClicked, setDetachForm]);

  // close out the instructions panel
  const handleInstructionClick = () => {
    const instructionPanel = document.getElementById(feedbackId);
    if (instructionPanel) instructionPanel.style.left = '';
    resetProperties();
  };

  // reset all the properties, overlays and selected elements
  const resetProperties = () => {
    currElem.current = null;
    currElemProperties.current = initialElemProperties;
    setIsScreenshotButtonClicked(false);
    setCurrElemState(null);
    setScreenshotTaken(false);
  };

  const handleDOMElementClick = (e: ReactMouseEvent) => {
    e.preventDefault();

    domElementClickedRef.current = 'solid';
    setSelectedElementBorderStyle(domElementClickedRef.current);
    setScreenshotTaken(true);

    // Allows for the feedback widget to appear on top of the screenshot overlay
    const fbFormEl = document.getElementById(feedbackId);
    if (fbFormEl) {
      fbFormEl.style.display = 'unset';
      fbFormEl.style.zIndex = '1004';
      if (savedPosition) {
        fbFormEl.style.top = `${savedPosition.top + window.scrollY}px`;
        fbFormEl.style.left = `${savedPosition.left}px`;
      }
    }
  };

  const handleExitButtonClick = (e: ReactMouseEvent) => {
    resetProperties();
    const fbFormEl = document.getElementById(feedbackId);
    if (fbFormEl) fbFormEl.style.display = 'none';

    setIsScreenshotButtonClicked(true);
    domElementClickedRef.current = 'dashed';
    setSelectedElementBorderStyle('dashed');

    e.stopPropagation();
  };

  if (isScreenshotButtonClicked) {
    if (isBrowser && domElementClickedRef.current === 'dashed') {
      const fbFormEl = document.getElementById(feedbackId);
      if (fbFormEl) fbFormEl.style.left = '-9000px';
      // highlight elements based on mouse movement
      document.addEventListener('mousemove', handleElementHighlight);
    }
  }

  // lock the page when element is selected
  useNoScroll(!!currElem.current && domElementClickedRef.current === 'solid');

  const { darkMode } = useDarkMode();
  const glyphImage = darkMode ? '/screenshoticon-dark.svg' : '/screenshoticon-light.svg';

  return (
    <>
      {isScreenshotButtonClicked && (
        <Portal>
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- images are pre-optimized via build pipeline */}
            <img
              className={cx(fwInstructionsId, instructionsPanelStyling)}
              src={'/screenshotCTA.svg'}
              alt={SCREENSHOT_OVERLAY_ALT_TEXT}
              onClick={handleInstructionClick}
            />
            <div className={cx(fwInstructionsId, instructionsBorderStyling)} />
          </>
          {!currElem.current && (
            <div
              className={cx('overlay', overlayElementStyle('fixed', 0, 0, documentScrollWidth, documentScrollHeight))}
            />
          )}
          {!!currElem.current && (
            <>
              <div
                className={cx(
                  'overlay',
                  elemProps
                    ? highlightedElementStyle(
                        elemProps['position'],
                        elemProps['top'],
                        elemProps['left'],
                        elemProps['width'],
                        elemProps['height'],
                        selectedElementBorderStyle,
                      )
                    : '',
                )}
                onClick={handleDOMElementClick}
                role="button"
              />
              {domElementClickedRef.current === 'solid' && (
                <div className={fwExitButtonId}>
                  <Icon
                    glyph="XWithCircle"
                    className={
                      elemProps ? exitButtonStyle(elemProps['position'], elemProps['top'], elemProps['left']) : ''
                    }
                    size={24}
                    onClick={handleExitButtonClick}
                  />
                </div>
              )}
              <div
                className={cx(
                  'overlay-left',
                  elemProps
                    ? overlayElementStyle(
                        elemProps['position'],
                        0,
                        0,
                        elemProps['left'] - HIGHLIGHT_BORDER_SIZE,
                        documentScrollHeight,
                      )
                    : '',
                )}
              />
              <div
                className={cx(
                  'overlay-top',
                  elemProps
                    ? overlayElementStyle(
                        elemProps['position'],
                        0,
                        elemProps['left'] - HIGHLIGHT_BORDER_SIZE,
                        elemProps['width'] + HIGHLIGHT_BORDER_SIZE * 2,
                        elemProps['top'] - HIGHLIGHT_BORDER_SIZE,
                      )
                    : '',
                )}
              />
              <div
                className={cx(
                  'overlay-bottom',
                  elemProps
                    ? overlayElementStyle(
                        elemProps['position'],
                        elemProps['bottom'] + HIGHLIGHT_BORDER_SIZE,
                        elemProps['left'] - HIGHLIGHT_BORDER_SIZE,
                        elemProps['width'] + HIGHLIGHT_BORDER_SIZE * 2,
                        documentScrollHeight - elemProps['bottom'] - HIGHLIGHT_BORDER_SIZE,
                      )
                    : '',
                )}
              />
              <div
                className={cx(
                  'overlay-right',
                  elemProps
                    ? overlayElementStyle(
                        elemProps['position'],
                        0,
                        elemProps['left'] + elemProps['width'] + HIGHLIGHT_BORDER_SIZE,
                        documentScrollWidth - elemProps['right'],
                        documentScrollHeight,
                      )
                    : '',
                )}
              />
            </>
          )}
        </Portal>
      )}

      <ScreenshotSelect
        onClick={takeNewScreenshot}
        size="small"
        {...props}
        leftGlyph={
          /* eslint-disable-next-line @next/next/no-img-element -- images are pre-optimized via build pipeline */
          <img src={glyphImage} alt="Screenshot Button" />
        }
      >
        {selectedRating && selectedRating < 4 ? SCREENSHOT_BUTTON_TEXT_LOW : SCREENSHOT_BUTTON_TEXT}
      </ScreenshotSelect>
    </>
  );
};

export const fwInstructionsId = 'overlay-instructions';
export const fwExitButtonId = 'exit-button';
export default ScreenshotButton;
