'use client';

import { useState } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import Button from '@leafygreen-ui/button';
import { palette } from '@leafygreen-ui/palette';
import type { IOCodeBlockNode } from '@/types/ast';
import Input from './input';
import Output from './output';
import { baseCodeStyle, borderCodeStyle } from '../style';

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

const getButtonText = (showOutput: boolean) => (showOutput ? 'HIDE OUTPUT' : 'VIEW OUTPUT');

const outputContainerStyle = (showOutput: boolean) => css`
  ${!showOutput && 'display: none;'}
`;

export type CodeIOProps = {
  nodeChildren: IOCodeBlockNode['children'];
};

const CodeIO = ({ nodeChildren }: CodeIOProps) => {
  const needsIOToggle = nodeChildren.length === 2;
  const onlyInputSpecified = nodeChildren.length === 1;

  let initialOutputVisibility = true;
  if (needsIOToggle && nodeChildren[1]?.options?.visible !== undefined) {
    initialOutputVisibility = !!nodeChildren[1].options.visible;
  }
  const [showOutput, setShowOutput] = useState<boolean>(initialOutputVisibility);
  const buttonText = getButtonText(showOutput);
  const arrow = showOutput ? 'ChevronUp' : 'ChevronDown';
  const outputBorderRadius = !showOutput ? '12px' : '0px';
  const singleInputBorderRadius = onlyInputSpecified ? '12px' : '0px';

  const handleClick = () => {
    setShowOutput((val) => !val);
  };

  // @ts-expect-error - Fail-safe
  if (nodeChildren.length === 0) {
    return null;
  }

  const containerStyle = css`
    ${baseCodeStyle}
    // Inner div of LG component has a width set to 700px. Unset this as part of our
    // override for docs when the language switcher is being used.
    > div > div {
      border-bottom-right-radius: ${singleInputBorderRadius};
      border-bottom-left-radius: ${singleInputBorderRadius};
    }

    // Controls output code block and toggle view bar style
    > div {
      border-bottom-right-radius: ${outputBorderRadius};
      border-bottom-left-radius: ${outputBorderRadius};
      margin: 0px;
    }
  `;

  return (
    <div className={containerStyle}>
      {needsIOToggle && (
        <>
          <Input nodeChildren={nodeChildren[0].children} />
          <div className={cx(ioToggleStyling)}>
            <Button
              role="button"
              className={cx(outputButtonStyling)}
              disabled={false}
              onClick={handleClick}
              leftGlyph={<Icon glyph={arrow} fill="#FF0000" />}
            >
              <span>{buttonText}</span>
            </Button>
          </div>
          <div className={cx(outputContainerStyle(showOutput))}>
            <Output nodeChildren={nodeChildren[1].children} />
          </div>
        </>
      )}
      {onlyInputSpecified && <Input nodeChildren={nodeChildren[0].children} />}
    </div>
  );
};

export default CodeIO;
