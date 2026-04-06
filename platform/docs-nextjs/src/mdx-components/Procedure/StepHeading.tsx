'use client';

import { Body } from '@leafygreen-ui/typography';

type StepHeadingProps = {
  children: React.ReactNode;
};

export const StepHeading = ({ children }: StepHeadingProps) => {
  return (
    <Body as="h4" weight="medium">
      {children}
    </Body>
  );
};
