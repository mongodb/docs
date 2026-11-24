'use client';

import { Heading } from '@/mdx-components/Heading';
import { SkipPTagContext } from '@/mdx-components/Paragraph';

type StepHeadingProps = {
  children: React.ReactNode;
};

export const StepHeading = ({ children }: StepHeadingProps) => {
  return (
    <SkipPTagContext.Provider value={true}>
      <Heading headingLevel={4}>
        {/* Step titles are a single MDX paragraph; skip inner Body on Paragraph so we do not nest <p> inside <h4>. */}
        {children}
      </Heading>
    </SkipPTagContext.Provider>
  );
};
