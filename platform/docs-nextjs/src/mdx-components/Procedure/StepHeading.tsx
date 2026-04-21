'use client';

import { Body } from '@leafygreen-ui/typography';
import { SkipPTagContext } from '@/mdx-components/Paragraph';

type StepHeadingProps = {
  children: React.ReactNode;
};

export const StepHeading = ({ children }: StepHeadingProps) => {
  return (
    <Body as="h4" weight="bold">
      {/* Step titles are a single MDX paragraph; skip inner Body so weight/color inherit from this h4 (matches Snooty). */}
      <SkipPTagContext.Provider value={true}>{children}</SkipPTagContext.Provider>
    </Body>
  );
};
