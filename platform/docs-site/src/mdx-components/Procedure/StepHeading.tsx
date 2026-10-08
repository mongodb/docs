'use client';

import { Heading } from '@/mdx-components/Heading';
import { SkipPTagContext } from '@/mdx-components/Paragraph';
import styles from './step-heading.module.scss';

// Fallback for MDX generated before StepHeading carried a headingLevel prop.
// Matches Snooty for the common case (a procedure under an H2), where the
// step title's section resolves to depth 3.
const DEFAULT_STEP_HEADING_LEVEL = 3;

type StepHeadingProps = {
  children: React.ReactNode;
  headingLevel?: number;
};

export const StepHeading = ({ children, headingLevel = DEFAULT_STEP_HEADING_LEVEL }: StepHeadingProps) => {
  return (
    <SkipPTagContext.Provider value={true}>
      <Heading headingLevel={headingLevel} className={styles.stepHeading}>
        {/* Step titles are a single MDX paragraph; skip inner Body on Paragraph so we do not nest <p> inside the heading. */}
        {children}
      </Heading>
    </SkipPTagContext.Provider>
  );
};
