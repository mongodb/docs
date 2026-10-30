import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import { useCallback, useContext, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { Button } from '@via-ds/components/button';
import XWithCircle from '@via-ds/icons/XWithCircle';
import { useFeedbackContext } from '../context';
import { DarkModeContext } from '@/context/dark-mode-context';
import { isBrowser } from '@/utils/is-browser';
import useNoScroll from '@/hooks/use-no-scroll';
import { SCREENSHOT_BUTTON_TEXT, SCREENSHOT_BUTTON_TEXT_LOW, SCREENSHOT_OVERLAY_ALT_TEXT } from '../constants';
import screenshotIconDark from './screenshoticon-dark.svg';
import screenshotIconLight from './screenshoticon-light.svg';
import screenshotCTAImage from './screenshotCTA.svg';
import styles from './screenshot-button.module.scss';

const HIGHLIGHT_BORDER_SIZE = 5;
// Marks our own overlay elements so the hover picker skips them. fwInstructionsId
// contains it too, so the instruction panel is skipped as well.
const OVERLAY_CLASS = 'overlay';

type ElemProps = {
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  position: string;
};

// Runtime geometry for the overlays, highlight and exit button. Static rules live in the scss module.
const geometry = (position: string, top: number, left: number, width: number, height: number): CSSProperties => ({
  position: position as CSSProperties['position'],
  top: `${top}px`,
  left: `${left}px`,
  width: width ? `${width}px` : '100%',
  height: `${height}px`,
});

const ScreenshotButton = ({ ...props }) => {
  const {
    setScreenshotTaken,
    selectedRating,
    isScreenshotButtonClicked,
    setIsScreenshotButtonClicked,
    setDetachForm,
    setScreenshotElement,
    formRef,
    savedCardPosition,
  } = useFeedbackContext();
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
  const isFWSelected = useCallback(
    (listOfElements: Element[]) => {
      const card = formRef.current;
      if (!card) return false;
      for (let i = 0; i < listOfElements.length; i++) {
        const elem = listOfElements[i];
        if (elem && card.contains(elem)) {
          return true;
        }
      }
      return false;
    },
    [formRef],
  );

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
        if (!!elem && !elem.includes(OVERLAY_CLASS)) {
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
    savedCardPosition.current = formRef.current?.getBoundingClientRect() ?? null;
    setIsScreenshotButtonClicked(true);
    setDetachForm(true);
    domElementClickedRef.current = 'dashed';
    setSelectedElementBorderStyle('dashed');
  }, [setIsScreenshotButtonClicked, setDetachForm, formRef, savedCardPosition]);

  // close out the instructions panel
  const handleInstructionClick = () => {
    const instructionPanel = formRef.current;
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
    setScreenshotElement(null);
  };

  const handleDOMElementClick = (e: ReactMouseEvent) => {
    e.preventDefault();

    domElementClickedRef.current = 'solid';
    setSelectedElementBorderStyle(domElementClickedRef.current);
    setScreenshotTaken(true);
    setScreenshotElement(currElem.current);

    // Allows for the feedback widget to appear on top of the screenshot overlay
    const fbFormEl = formRef.current;
    if (fbFormEl) {
      fbFormEl.style.display = 'unset';
      fbFormEl.style.zIndex = '1004';
      if (savedCardPosition.current) {
        fbFormEl.style.top = `${savedCardPosition.current.top + window.scrollY}px`;
        fbFormEl.style.left = `${savedCardPosition.current.left}px`;
      }
    }
  };

  const handleExitButtonClick = (e: ReactMouseEvent) => {
    resetProperties();
    const fbFormEl = formRef.current;
    if (fbFormEl) fbFormEl.style.display = 'none';

    setIsScreenshotButtonClicked(true);
    domElementClickedRef.current = 'dashed';
    setSelectedElementBorderStyle('dashed');

    e.stopPropagation();
  };

  if (isScreenshotButtonClicked) {
    if (isBrowser && domElementClickedRef.current === 'dashed') {
      const fbFormEl = formRef.current;
      if (fbFormEl) fbFormEl.style.left = '-9000px';
      // highlight elements based on mouse movement
      document.addEventListener('mousemove', handleElementHighlight);
    }
  }

  // lock the page when element is selected
  useNoScroll(!!currElem.current && domElementClickedRef.current === 'solid');

  const { isDarkMode } = useContext(DarkModeContext);
  const glyphImage = isDarkMode ? screenshotIconDark.src : screenshotIconLight.src;

  return (
    <>
      {isScreenshotButtonClicked &&
        createPortal(
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- images are pre-optimized via build pipeline */}
            <img
              className={clsx(fwInstructionsId, styles.instructionsPanel)}
              src={screenshotCTAImage.src}
              alt={SCREENSHOT_OVERLAY_ALT_TEXT}
              onClick={handleInstructionClick}
            />
            <div className={clsx(fwInstructionsId, styles.instructionsBorder)} />
            {!currElem.current && (
              <div
                className={clsx(OVERLAY_CLASS, styles.overlay)}
                style={geometry('fixed', 0, 0, documentScrollWidth, documentScrollHeight)}
              />
            )}
            {!!currElem.current && (
              <>
                <div
                  className={clsx(OVERLAY_CLASS, elemProps && styles.highlight, {
                    [styles.selected]: !!elemProps && selectedElementBorderStyle === 'solid',
                  })}
                  style={
                    elemProps
                      ? geometry(
                          elemProps['position'],
                          elemProps['top'],
                          elemProps['left'],
                          elemProps['width'],
                          elemProps['height'],
                        )
                      : undefined
                  }
                  onClick={handleDOMElementClick}
                  role="button"
                />
                {domElementClickedRef.current === 'solid' && (
                  <div className={fwExitButtonId}>
                    <XWithCircle
                      className={elemProps ? styles.exitButton : undefined}
                      style={
                        elemProps
                          ? {
                              position: elemProps['position'] as CSSProperties['position'],
                              top: `${Math.max(elemProps['top'] - 1, 8)}px`,
                              left: `${Math.max(elemProps['left'] - 1, 8)}px`,
                            }
                          : undefined
                      }
                      size={24}
                      onClick={handleExitButtonClick}
                    />
                  </div>
                )}
                <div
                  className={clsx(OVERLAY_CLASS, elemProps && styles.overlay)}
                  style={
                    elemProps
                      ? geometry(
                          elemProps['position'],
                          0,
                          0,
                          elemProps['left'] - HIGHLIGHT_BORDER_SIZE,
                          documentScrollHeight,
                        )
                      : undefined
                  }
                />
                <div
                  className={clsx(OVERLAY_CLASS, elemProps && styles.overlay)}
                  style={
                    elemProps
                      ? geometry(
                          elemProps['position'],
                          0,
                          elemProps['left'] - HIGHLIGHT_BORDER_SIZE,
                          elemProps['width'] + HIGHLIGHT_BORDER_SIZE * 2,
                          elemProps['top'] - HIGHLIGHT_BORDER_SIZE,
                        )
                      : undefined
                  }
                />
                <div
                  className={clsx(OVERLAY_CLASS, elemProps && styles.overlay)}
                  style={
                    elemProps
                      ? geometry(
                          elemProps['position'],
                          elemProps['bottom'] + HIGHLIGHT_BORDER_SIZE,
                          elemProps['left'] - HIGHLIGHT_BORDER_SIZE,
                          elemProps['width'] + HIGHLIGHT_BORDER_SIZE * 2,
                          documentScrollHeight - elemProps['bottom'] - HIGHLIGHT_BORDER_SIZE,
                        )
                      : undefined
                  }
                />
                <div
                  className={clsx(OVERLAY_CLASS, elemProps && styles.overlay)}
                  style={
                    elemProps
                      ? geometry(
                          elemProps['position'],
                          0,
                          elemProps['left'] + elemProps['width'] + HIGHLIGHT_BORDER_SIZE,
                          documentScrollWidth - elemProps['right'],
                          documentScrollHeight,
                        )
                      : undefined
                  }
                />
              </>
            )}
          </>,
          document.body,
        )}

      <Button className={styles.screenshotSelect} onPress={takeNewScreenshot} {...props}>
        {/* eslint-disable-next-line @next/next/no-img-element -- images are pre-optimized via build pipeline */}
        <img slot="icon" src={glyphImage} alt="" width={16} height={16} />
        {selectedRating && selectedRating < 4 ? SCREENSHOT_BUTTON_TEXT_LOW : SCREENSHOT_BUTTON_TEXT}
      </Button>
    </>
  );
};

export const fwInstructionsId = 'overlay-instructions';
export const fwExitButtonId = 'exit-button';
export default ScreenshotButton;
