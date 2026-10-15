'use client';

import React from 'react';
import { clsx } from 'clsx';
import { Disclosure, DisclosureHeader, DisclosurePanel, DisclosureTrigger } from '@via-ds/components/disclosure';
import { TextStyle } from '@via-ds/components/typography';
import type { OutputProps } from './Output';
import styles from './io-code.module.scss';

const getButtonText = (showOutput: boolean) => (showOutput ? 'Hide output' : 'View output');

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

  if (childArray.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={clsx(styles.inputWrapper, hasOutput && styles.inputWrapperHasOutput)}>{inputChild}</div>
      {hasOutput && (
        <Disclosure defaultExpanded={initialOutputVisibility}>
          {({ isExpanded }) => (
            <>
              <DisclosureHeader data-io-toggle textStyle={TextStyle.heading5}>
                <DisclosureTrigger className={styles.outputButton}>{getButtonText(isExpanded)}</DisclosureTrigger>
              </DisclosureHeader>
              <DisclosurePanel data-io-output className={styles.outputWrapper}>
                {outputChild}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      )}
    </div>
  );
};
