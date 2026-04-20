'use client';

import React, { useState } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { Icon } from '@leafygreen-ui/icon';
import { Button } from '@leafygreen-ui/button';
import { palette } from '@leafygreen-ui/palette';
import type { OutputProps } from './Output';
import { baseCodeStyle, borderCodeStyle } from './style';

const outputButtonStyling = css`
  padding: 0px;
  height: 24px;
  margin: 8px;
`;

const ioToggleStyling = css`
  ${borderCodeStyle}
  border-top: none;
  border-color: ${palette.gray.light2};

  .dark-theme & {
    border-color: ${palette.gray.dark2};
  }
`;

// Flatten the bottom border-radius of the input code block so it sits
// flush against the toggle bar. Code renders inside .intro-code-block,
// whose direct child is the LeafyGreen root div.
const inputWrapperStyle = (hasOutput: boolean) => css`
  .intro-code-block {
    margin: 0;

    > div {
      border-bottom-right-radius: ${hasOutput ? '0px' : '12px'};
      border-bottom-left-radius: ${hasOutput ? '0px' : '12px'};
      margin: 0;
    }

    > div > div {
      border-bottom-right-radius: ${hasOutput ? '0px' : '12px'};
      border-bottom-left-radius: ${hasOutput ? '0px' : '12px'};
    }
  }
`;

// Flatten the top border-radius of the output code block and keep its bottom rounded
const outputWrapperStyle = css`
  .intro-code-block {
    margin: 0;

    style {
      display: none !important;
    }

    > div {
      border: initial;
      border-top-right-radius: 0px;
      border-top-left-radius: 0px;
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
      margin: 0;

      .dark-theme & {
        border: none;
      }
    }

    > div > div {
      border-top-right-radius: 0px;
      border-top-left-radius: 0px;
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
    }

    > div > div > pre {
      border: none;
      border-top: none;

      &::after,
      &::before {
        display: none;
      }

      .dark-theme & {
        border: 1px solid ${palette.gray.dark2};
      }
    }
  }
`;

const getButtonText = (showOutput: boolean) => (showOutput ? 'HIDE OUTPUT' : 'VIEW OUTPUT');

type IoCodeBlockProps = {
  children: React.ReactNode;
};

export const IoCodeBlock = ({ children }: IoCodeBlockProps) => {
  const childArray = React.Children.toArray(children).filter(React.isValidElement);

  const [inputChild, outputChild] = childArray;
  const hasOutput = !!outputChild;

  let initialOutputVisibility = true;
  if (outputChild && React.isValidElement(outputChild)) {
    const { visible } = outputChild.props as OutputProps;
    if (visible !== undefined) {
      initialOutputVisibility = visible;
    }
  }

  const [showOutput, setShowOutput] = useState(initialOutputVisibility);
  const buttonText = getButtonText(showOutput);
  const arrow = showOutput ? 'ChevronUp' : 'ChevronDown';

  if (childArray.length === 0) {
    return null;
  }

  const containerStyle = css`
    ${baseCodeStyle}
  `;

  return (
    <div className={containerStyle}>
      <div className={inputWrapperStyle(hasOutput)}>{inputChild}</div>
      {hasOutput && (
        <>
          <div className={cx(ioToggleStyling)} data-io-toggle>
            <Button
              role="button"
              className={cx(outputButtonStyling)}
              disabled={false}
              onClick={() => setShowOutput((v) => !v)}
              leftGlyph={<Icon glyph={arrow} fill="#FF0000" />}
            >
              <span>{buttonText}</span>
            </Button>
          </div>
          <div
            data-io-output
            className={cx(
              outputWrapperStyle,
              !showOutput &&
                css`
                  display: none;
                `,
            )}
          >
            {outputChild}
          </div>
        </>
      )}
    </div>
  );
};
